/**
 * JANMASETU Identity Lifecycle Engine
 * 
 * Core Philosophy (Research Paper Aligned):
 * - Aadhaar-at-birth MUST be demographic-only (no forced biometrics)
 * - Biometric capture is delayed, predictive, and lifecycle-aware
 * - Immunization events act as trust anchors
 * - System is proactive, not reactive
 * 
 * Legal Compliance:
 * - Supreme Court Aadhaar judgment (child opt-out at 18)
 * - Aadhaar ≠ proof of birth
 * - DPDP Act consent rules
 */

// ============================================
// IDENTITY STATES (Lifecycle Model)
// ============================================

export type IdentityState = 
  | 'FOUNDATIONAL'      // 0-5 years: demographic-only, no biometrics required
  | 'JUVENILE'          // 5-15 years: first mandatory biometric update
  | 'ADOLESCENT'        // 15-18 years: second biometric update
  | 'ADULT';            // 18+: full biometric, opt-out available

export type BiometricReadiness = 'NOT_REQUIRED' | 'PENDING' | 'PARTIAL' | 'COMPLETE';

// ============================================
// CONSENT FRAMEWORK (DPDP Compliant)
// ============================================

export interface ConsentFlags {
  identity: boolean;      // Core identity use
  health: boolean;        // Health/immunization linkage
  education: boolean;     // School enrollment linkage
  welfare: boolean;       // Welfare scheme linkage
  revokedAt?: Date;       // Consent can be revoked
  grantedAt: Date;
  grantedBy: 'PARENT' | 'GUARDIAN' | 'SELF';  // Self only for 18+
}

// ============================================
// BIRTH EVENT STRUCTURE (CRS-Style Ingestion)
// ============================================

export interface BirthEvent {
  birthId: string;                    // CRS Birth Registration ID
  birthDate: Date;
  hospitalCode: string;
  districtCode: string;
  stateCode: string;
  
  // Demographic data (NO biometrics at birth)
  childName: string;
  gender: 'M' | 'F' | 'O';
  birthWeight?: number;
  
  // Parent Linkage (temporary anchor only)
  parentAadhaarRef?: string;          // Used for linking, NOT child identity
  motherName: string;
  fatherName?: string;
  
  // ML Entity Resolution fields
  nameVariants?: string[];            // Handle transliteration noise
  phoneticHash?: string;              // For duplicate detection
}

// ============================================
// FOUNDATIONAL IDENTITY (Birth-Created)
// ============================================

export interface FoundationalIdentity {
  tempAadhaarRef: string;             // Temporary reference (not final Aadhaar)
  birthEventId: string;
  identityState: IdentityState;
  biometricReadiness: BiometricReadiness;
  
  // Consent tracking (independent, revocable)
  consent: ConsentFlags;
  
  // Identity confidence (0-100, improves over lifecycle)
  confidenceScore: number;
  
  // Immunization anchors (trust events)
  immunizationAnchors: ImmunizationAnchor[];
  
  // Lifecycle tracking
  createdAt: Date;
  lastUpdated: Date;
  nextUpdateDue?: Date;               // Predicted update date
  
  // Deduplication metadata
  entityResolutionScore: number;      // ML-based duplicate probability
  potentialDuplicates?: string[];     // Flagged similar identities
}

// ============================================
// IMMUNIZATION-LINKED IDENTITY LOGIC
// ============================================

export interface ImmunizationAnchor {
  eventType: 'BIRTH' | 'WEEK_6' | 'WEEK_14' | 'MONTH_9' | 'MONTH_18' | 'AGE_5';
  eventDate: Date;
  facilityCode: string;
  
  // Photo metadata (NOT raw image storage)
  faceEmbeddingHash?: string;         // Only hash stored, not raw biometric
  photoQualityScore?: number;         // 0-100, for update readiness
  
  // Impact on identity
  confidenceBoost: number;            // How much this event strengthens identity
  deduplicationContribution: number;  // Helps prevent duplicates
}

// ============================================
// LIFECYCLE PREDICTION ENGINE
// ============================================

export interface LifecyclePrediction {
  identityRef: string;
  currentAge: number;
  
  // Predicted update events
  predictedAge5Update: {
    estimatedMonth: string;
    readinessScore: number;           // 0-100
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  };
  
  // School admission pressure
  schoolAdmissionPressure: {
    estimatedPeakMonth: string;       // e.g., "Apr'27"
    likelyDistrict: string;
    demandMultiplier: number;         // 1.0 = normal, 2.0 = double demand
  };
  
  // Migration risk
  migrationRisk: {
    probability: number;              // 0-1
    likelyDestination?: string;
    impactOnUpdate: 'NONE' | 'DELAY' | 'LOCATION_CHANGE';
  };
}

// ============================================
// BIRTH ANALYZER LOGIC (Core Enhancement)
// ============================================

/**
 * Create Foundational Identity from Birth Event
 * 
 * CRITICAL: This creates DEMOGRAPHIC-ONLY identity
 * - NO biometric capture at birth
 * - Parent Aadhaar is ONLY for linking, not child identity
 * - Consent is granular and revocable
 */
export function createFoundationalIdentity(
  birthEvent: BirthEvent,
  parentConsent: Partial<ConsentFlags>
): FoundationalIdentity {
  // ML-based entity resolution score
  // Handles name spelling variance, transliteration noise
  const entityResolutionScore = calculateEntityResolution(birthEvent);
  
  // Initial confidence based on data quality
  const initialConfidence = calculateInitialConfidence(birthEvent);
  
  return {
    tempAadhaarRef: generateTempAadhaarRef(birthEvent),
    birthEventId: birthEvent.birthId,
    identityState: 'FOUNDATIONAL',
    biometricReadiness: 'NOT_REQUIRED',  // Key: No biometrics at birth
    
    consent: {
      identity: parentConsent.identity ?? false,
      health: parentConsent.health ?? false,
      education: parentConsent.education ?? false,
      welfare: parentConsent.welfare ?? false,
      grantedAt: new Date(),
      grantedBy: 'PARENT',
    },
    
    confidenceScore: initialConfidence,
    immunizationAnchors: [{
      eventType: 'BIRTH',
      eventDate: birthEvent.birthDate,
      facilityCode: birthEvent.hospitalCode,
      confidenceBoost: 25,              // Birth event provides base confidence
      deduplicationContribution: 10,
    }],
    
    createdAt: new Date(),
    lastUpdated: new Date(),
    nextUpdateDue: calculateNextUpdateDate(birthEvent.birthDate, 'WEEK_6'),
    
    entityResolutionScore,
    potentialDuplicates: [],
  };
}

/**
 * Process Immunization Event (Identity Strengthening)
 * 
 * Each immunization acts as a trust anchor:
 * - Improves confidence score
 * - Enhances deduplication
 * - Prepares for future biometric (age 5+)
 */
export function processImmunizationEvent(
  identity: FoundationalIdentity,
  anchor: ImmunizationAnchor
): FoundationalIdentity {
  const updatedAnchors = [...identity.immunizationAnchors, anchor];
  
  // Cumulative confidence improvement
  const newConfidence = Math.min(100, 
    identity.confidenceScore + anchor.confidenceBoost
  );
  
  // Update deduplication score
  const newEntityScore = Math.min(100,
    identity.entityResolutionScore + anchor.deduplicationContribution
  );
  
  // Determine next expected update
  const nextEvent = getNextImmunizationEvent(anchor.eventType);
  const nextUpdateDue = nextEvent 
    ? calculateNextUpdateDate(identity.createdAt, nextEvent)
    : undefined;
  
  return {
    ...identity,
    immunizationAnchors: updatedAnchors,
    confidenceScore: newConfidence,
    entityResolutionScore: newEntityScore,
    lastUpdated: new Date(),
    nextUpdateDue,
    
    // Update biometric readiness based on photo quality
    biometricReadiness: anchor.photoQualityScore && anchor.photoQualityScore > 70
      ? 'PARTIAL'
      : identity.biometricReadiness,
  };
}

// ============================================
// ML PREDICTION HELPERS (Conceptual)
// ============================================

/**
 * ML-based Entity Resolution
 * Handles: name spelling variance, transliteration noise
 * 
 * Algorithm (conceptual):
 * - Phonetic hashing (Soundex/Metaphone for Indian names)
 * - Fuzzy string matching
 * - Parent linkage correlation
 */
function calculateEntityResolution(birthEvent: BirthEvent): number {
  let score = 50; // Base score
  
  // Hospital registration adds trust
  if (birthEvent.hospitalCode) score += 15;
  
  // Parent Aadhaar linkage adds verification
  if (birthEvent.parentAadhaarRef) score += 20;
  
  // Complete demographic data
  if (birthEvent.motherName && birthEvent.childName) score += 10;
  
  // Add noise for realistic simulation
  return Math.min(100, score + Math.random() * 5);
}

/**
 * Calculate initial confidence from birth data quality
 */
function calculateInitialConfidence(birthEvent: BirthEvent): number {
  let confidence = 30; // Base from birth registration
  
  // Institutional birth is more reliable
  if (birthEvent.hospitalCode) confidence += 20;
  
  // Parent linkage verification
  if (birthEvent.parentAadhaarRef) confidence += 15;
  
  // Complete data improves confidence
  if (birthEvent.birthWeight) confidence += 5;
  if (birthEvent.fatherName) confidence += 5;
  
  return Math.min(100, confidence);
}

/**
 * Generate temporary Aadhaar reference
 * NOT the final Aadhaar number - just a tracking ID
 */
function generateTempAadhaarRef(birthEvent: BirthEvent): string {
  const statePrefix = birthEvent.stateCode.substring(0, 2);
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 6);
  return `TEMP-${statePrefix}-${timestamp}-${random}`.toUpperCase();
}

/**
 * Calculate next update date based on event type
 */
function calculateNextUpdateDate(
  birthDate: Date, 
  eventType: ImmunizationAnchor['eventType']
): Date {
  const result = new Date(birthDate);
  
  switch (eventType) {
    case 'WEEK_6': result.setDate(result.getDate() + 42); break;
    case 'WEEK_14': result.setDate(result.getDate() + 98); break;
    case 'MONTH_9': result.setMonth(result.getMonth() + 9); break;
    case 'MONTH_18': result.setMonth(result.getMonth() + 18); break;
    case 'AGE_5': result.setFullYear(result.getFullYear() + 5); break;
    default: break;
  }
  
  return result;
}

/**
 * Get next immunization event in sequence
 */
function getNextImmunizationEvent(
  current: ImmunizationAnchor['eventType']
): ImmunizationAnchor['eventType'] | null {
  const sequence: ImmunizationAnchor['eventType'][] = [
    'BIRTH', 'WEEK_6', 'WEEK_14', 'MONTH_9', 'MONTH_18', 'AGE_5'
  ];
  const idx = sequence.indexOf(current);
  return idx < sequence.length - 1 ? sequence[idx + 1] : null;
}

// ============================================
// FRAUD DETECTION HELPERS
// ============================================

export interface FraudIndicator {
  type: 'DUPLICATE_PARENT' | 'BIRTH_SPIKE' | 'LOCATION_ANOMALY' | 'DATA_INCONSISTENCY';
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  description: string;
  affectedRecords: number;
}

/**
 * Detect fraud patterns in birth data
 * 
 * Patterns detected:
 * - Improbable birth spikes (statistical anomaly)
 * - Duplicate parent registrations
 * - Location inconsistencies
 */
export function detectFraudPatterns(
  districtData: { births: number; avgBirths: number; parentDuplicates: number }
): FraudIndicator[] {
  const indicators: FraudIndicator[] = [];
  
  // Birth spike detection (>2 std dev from mean)
  const birthDeviation = (districtData.births - districtData.avgBirths) / districtData.avgBirths;
  if (birthDeviation > 0.5) {
    indicators.push({
      type: 'BIRTH_SPIKE',
      severity: birthDeviation > 1 ? 'HIGH' : 'MEDIUM',
      description: `Birth registrations ${(birthDeviation * 100).toFixed(0)}% above average`,
      affectedRecords: Math.round(districtData.births * birthDeviation * 0.3),
    });
  }
  
  // Duplicate parent detection
  if (districtData.parentDuplicates > 10) {
    indicators.push({
      type: 'DUPLICATE_PARENT',
      severity: districtData.parentDuplicates > 50 ? 'HIGH' : 'MEDIUM',
      description: `${districtData.parentDuplicates} parent Aadhaar IDs used multiple times`,
      affectedRecords: districtData.parentDuplicates,
    });
  }
  
  return indicators;
}

// ============================================
// BACKLOG PREDICTION ENGINE
// ============================================

export interface BacklogPrediction {
  district: string;
  month: string;
  predictedBacklog: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  
  // Contributing factors
  factors: {
    age5Updates: number;              // Children turning 5
    schoolAdmissions: number;         // School season pressure
    migrationInflow: number;          // Migration impact
    pendingImmunization: number;      // Missed immunization updates
  };
  
  // Recommended actions
  recommendations: string[];
}

/**
 * Predict backlog BEFORE it forms
 * 
 * Uses:
 * - Age-5 cohort analysis
 * - School admission season patterns
 * - Migration trend data
 * - Immunization drop-off rates
 */
export function predictBacklog(
  districtCode: string,
  birthCohortSize: number,
  currentMonth: number
): BacklogPrediction {
  // School admission season (Apr-Jun) creates pressure
  const isSchoolSeason = currentMonth >= 3 && currentMonth <= 5;
  const schoolMultiplier = isSchoolSeason ? 1.8 : 1.0;
  
  // Age-5 updates are mandatory
  const age5Updates = Math.round(birthCohortSize * 0.18); // ~18% of cohort turns 5
  
  // Migration typically peaks post-harvest
  const migrationMultiplier = currentMonth >= 10 || currentMonth <= 2 ? 1.3 : 1.0;
  
  const totalPredicted = Math.round(
    (age5Updates * schoolMultiplier) + 
    (birthCohortSize * 0.05 * migrationMultiplier)
  );
  
  const riskLevel: BacklogPrediction['riskLevel'] = 
    totalPredicted > 5000 ? 'HIGH' : 
    totalPredicted > 2000 ? 'MEDIUM' : 'LOW';
  
  return {
    district: districtCode,
    month: new Date(2026, currentMonth, 1).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
    predictedBacklog: totalPredicted,
    riskLevel,
    factors: {
      age5Updates,
      schoolAdmissions: Math.round(age5Updates * (isSchoolSeason ? 0.6 : 0.1)),
      migrationInflow: Math.round(birthCohortSize * 0.05 * migrationMultiplier),
      pendingImmunization: Math.round(birthCohortSize * 0.08),
    },
    recommendations: generateBacklogRecommendations(riskLevel, isSchoolSeason),
  };
}

function generateBacklogRecommendations(
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH',
  isSchoolSeason: boolean
): string[] {
  const recs: string[] = [];
  
  if (riskLevel === 'HIGH') {
    recs.push('Deploy additional mobile enrollment units');
    recs.push('Extend enrollment center operating hours');
  }
  
  if (isSchoolSeason) {
    recs.push('Coordinate with schools for pre-admission enrollment camps');
  }
  
  if (riskLevel !== 'LOW') {
    recs.push('Prioritize pending immunization-linked updates');
    recs.push('Alert district registrar for resource allocation');
  }
  
  return recs;
}
