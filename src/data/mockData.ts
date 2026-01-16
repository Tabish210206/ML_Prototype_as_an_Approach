// Historical enrolment data (48 months)
export const generateHistoricalData = () => {
  const regions = ['North', 'South', 'East', 'West', 'Central'];
  const data: Array<{
    month: string;
    date: Date;
    North: number;
    South: number;
    East: number;
    West: number;
    Central: number;
    total: number;
  }> = [];
  
  const startDate = new Date(2022, 0, 1);
  
  for (let i = 0; i < 48; i++) {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + i);
    
    const seasonalFactor = 1 + 0.2 * Math.sin((i / 12) * 2 * Math.PI);
    const trend = 1 + i * 0.008;
    
    const entry: any = {
      month: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      date: date,
    };
    
    let total = 0;
    regions.forEach(region => {
      const base = {
        'North': 65000,
        'South': 72000,
        'East': 58000,
        'West': 68000,
        'Central': 45000,
      }[region] || 50000;
      
      const value = Math.round(base * seasonalFactor * trend * (0.9 + Math.random() * 0.2));
      entry[region] = value;
      total += value;
    });
    
    entry.total = total;
    data.push(entry);
  }
  
  return data;
};

// Forecast data (12 months)
export const generateForecastData = () => {
  const regions = ['North', 'South', 'East', 'West', 'Central'];
  const data: Array<{
    month: string;
    date: Date;
    North: number;
    South: number;
    East: number;
    West: number;
    Central: number;
    total: number;
    confidence80Upper: number;
    confidence80Lower: number;
    confidence95Upper: number;
    confidence95Lower: number;
    isHighDemand: boolean;
  }> = [];
  
  const startDate = new Date(2026, 0, 1);
  
  for (let i = 0; i < 12; i++) {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + i);
    
    const seasonalFactor = 1 + 0.25 * Math.sin(((i + 2) / 12) * 2 * Math.PI);
    const trend = 1.4 + i * 0.01;
    
    const entry: any = {
      month: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      date: date,
    };
    
    let total = 0;
    regions.forEach(region => {
      const base = {
        'North': 68000,
        'South': 75000,
        'East': 62000,
        'West': 72000,
        'Central': 48000,
      }[region] || 55000;
      
      const value = Math.round(base * seasonalFactor * trend);
      entry[region] = value;
      total += value;
    });
    
    entry.total = total;
    entry.confidence80Upper = Math.round(total * 1.08);
    entry.confidence80Lower = Math.round(total * 0.92);
    entry.confidence95Upper = Math.round(total * 1.15);
    entry.confidence95Lower = Math.round(total * 0.85);
    entry.isHighDemand = seasonalFactor > 1.15;
    
    data.push(entry);
  }
  
  return data;
};

// Regional heatmap data
export const regionalHeatmapData = [
  { state: 'Delhi', Mar26: 92, Apr26: 78, May26: 65, Jun26: 58, Jul26: 72, Aug26: 85 },
  { state: 'Maharashtra', Mar26: 85, Apr26: 82, May26: 70, Jun26: 62, Jul26: 75, Aug26: 80 },
  { state: 'Tamil Nadu', Mar26: 78, Apr26: 88, May26: 75, Jun26: 68, Jul26: 70, Aug26: 72 },
  { state: 'Karnataka', Mar26: 72, Apr26: 75, May26: 82, Jun26: 70, Jul26: 68, Aug26: 75 },
  { state: 'Uttar Pradesh', Mar26: 88, Apr26: 85, May26: 80, Jun26: 72, Jul26: 78, Aug26: 82 },
  { state: 'Gujarat', Mar26: 70, Apr26: 72, May26: 68, Jun26: 60, Jul26: 65, Aug26: 70 },
  { state: 'Rajasthan', Mar26: 75, Apr26: 78, May26: 72, Jun26: 65, Jul26: 70, Aug26: 75 },
  { state: 'West Bengal', Mar26: 82, Apr26: 80, May26: 75, Jun26: 68, Jul26: 72, Aug26: 78 },
];

// Resource allocation recommendations
export const resourceRecommendations = [
  { region: 'Delhi', period: "Mar'26", forecast: 85200, tempCentres: 12, mobileUnits: 8, staff: 45, priority: 'HIGH' },
  { region: 'Mumbai', period: "Apr'26", forecast: 72100, tempCentres: 8, mobileUnits: 5, staff: 32, priority: 'MEDIUM' },
  { region: 'Chennai', period: "Mar'26", forecast: 68500, tempCentres: 7, mobileUnits: 4, staff: 28, priority: 'MEDIUM' },
  { region: 'Kolkata', period: "May'26", forecast: 58200, tempCentres: 5, mobileUnits: 3, staff: 22, priority: 'LOW' },
  { region: 'Bangalore', period: "Apr'26", forecast: 62800, tempCentres: 6, mobileUnits: 4, staff: 25, priority: 'MEDIUM' },
  { region: 'Lucknow', period: "Mar'26", forecast: 78500, tempCentres: 10, mobileUnits: 7, staff: 38, priority: 'HIGH' },
];

// Birth desk data by state
export const birthDeskData = [
  { state: 'Maharashtra', births: 180000, hospitals: 450, instBirthRate: 92, desks: 45, coverage: 88 },
  { state: 'Tamil Nadu', births: 120000, hospitals: 380, instBirthRate: 95, desks: 38, coverage: 92 },
  { state: 'Karnataka', births: 95000, hospitals: 320, instBirthRate: 94, desks: 32, coverage: 90 },
  { state: 'Gujarat', births: 110000, hospitals: 290, instBirthRate: 88, desks: 29, coverage: 82 },
  { state: 'Rajasthan', births: 140000, hospitals: 350, instBirthRate: 78, desks: 35, coverage: 72 },
  { state: 'Uttar Pradesh', births: 280000, hospitals: 520, instBirthRate: 72, desks: 52, coverage: 65 },
  { state: 'West Bengal', births: 130000, hospitals: 340, instBirthRate: 82, desks: 34, coverage: 78 },
  { state: 'Delhi', births: 45000, hospitals: 180, instBirthRate: 96, desks: 36, coverage: 94 },
];

// Age distribution data (Lifecycle-aware)
export const ageDistributionData = [
  { age: '0-1', current: 45, birthLinked: 95, immunizationLinked: 98 },
  { age: '1-2', current: 58, birthLinked: 92, immunizationLinked: 96 },
  { age: '2-3', current: 65, birthLinked: 88, immunizationLinked: 92 },
  { age: '3-4', current: 72, birthLinked: 85, immunizationLinked: 89 },
  { age: '4-5', current: 78, birthLinked: 82, immunizationLinked: 86 },
];

// Lifecycle demand forecast data (Age-5 updates, school pressure, migration)
export const lifecycleDemandData = [
  { 
    month: "Jan'26", 
    age5Updates: 42000, 
    schoolPressure: 12000, 
    migrationDemand: 18000, 
    total: 72000,
    riskLevel: 'MEDIUM' as const
  },
  { 
    month: "Feb'26", 
    age5Updates: 38000, 
    schoolPressure: 8000, 
    migrationDemand: 22000, 
    total: 68000,
    riskLevel: 'MEDIUM' as const
  },
  { 
    month: "Mar'26", 
    age5Updates: 45000, 
    schoolPressure: 35000, 
    migrationDemand: 15000, 
    total: 95000,
    riskLevel: 'HIGH' as const
  },
  { 
    month: "Apr'26", 
    age5Updates: 52000, 
    schoolPressure: 68000, 
    migrationDemand: 10000, 
    total: 130000,
    riskLevel: 'HIGH' as const
  },
  { 
    month: "May'26", 
    age5Updates: 48000, 
    schoolPressure: 55000, 
    migrationDemand: 8000, 
    total: 111000,
    riskLevel: 'HIGH' as const
  },
  { 
    month: "Jun'26", 
    age5Updates: 40000, 
    schoolPressure: 25000, 
    migrationDemand: 12000, 
    total: 77000,
    riskLevel: 'MEDIUM' as const
  },
  { 
    month: "Jul'26", 
    age5Updates: 35000, 
    schoolPressure: 10000, 
    migrationDemand: 15000, 
    total: 60000,
    riskLevel: 'LOW' as const
  },
  { 
    month: "Aug'26", 
    age5Updates: 38000, 
    schoolPressure: 8000, 
    migrationDemand: 14000, 
    total: 60000,
    riskLevel: 'LOW' as const
  },
];

// Immunization anchor schedule
export const immunizationSchedule = [
  { event: 'Birth', weeks: 0, confidenceBoost: 25, description: 'Demographic registration' },
  { event: 'Week 6', weeks: 6, confidenceBoost: 15, description: 'First photo anchor' },
  { event: 'Week 14', weeks: 14, confidenceBoost: 15, description: 'Photo quality check' },
  { event: 'Month 9', weeks: 39, confidenceBoost: 20, description: 'Face embedding update' },
  { event: 'Month 18', weeks: 78, confidenceBoost: 15, description: 'Pre-biometric prep' },
  { event: 'Age 5', weeks: 260, confidenceBoost: 10, description: 'First biometric capture' },
];

// District-wise backlog prediction
export const districtBacklogPrediction = [
  { 
    district: 'Lucknow', 
    state: 'Uttar Pradesh',
    predictedBacklog: 8500, 
    age5Updates: 3200,
    schoolPressure: 4100,
    migrationImpact: 1200,
    riskLevel: 'HIGH' as const,
    recommendation: 'Deploy 5 additional mobile units'
  },
  { 
    district: 'Patna', 
    state: 'Bihar',
    predictedBacklog: 7200, 
    age5Updates: 2800,
    schoolPressure: 3500,
    migrationImpact: 900,
    riskLevel: 'HIGH' as const,
    recommendation: 'Extend center hours, add 3 staff'
  },
  { 
    district: 'Jaipur', 
    state: 'Rajasthan',
    predictedBacklog: 5100, 
    age5Updates: 2100,
    schoolPressure: 2400,
    migrationImpact: 600,
    riskLevel: 'MEDIUM' as const,
    recommendation: 'School enrollment camps recommended'
  },
  { 
    district: 'Nagpur', 
    state: 'Maharashtra',
    predictedBacklog: 3800, 
    age5Updates: 1500,
    schoolPressure: 1800,
    migrationImpact: 500,
    riskLevel: 'MEDIUM' as const,
    recommendation: 'Monitor and prepare resources'
  },
  { 
    district: 'Chennai', 
    state: 'Tamil Nadu',
    predictedBacklog: 2200, 
    age5Updates: 900,
    schoolPressure: 1100,
    migrationImpact: 200,
    riskLevel: 'LOW' as const,
    recommendation: 'Standard operations sufficient'
  },
];

// Fraud pattern alerts (ML-detected anomalies)
export const fraudPatternAlerts = [
  {
    district: 'Meerut',
    state: 'Uttar Pradesh',
    alertType: 'BIRTH_SPIKE' as const,
    severity: 'HIGH' as const,
    deviation: 78,
    description: 'Birth registrations 78% above historical average',
    affectedRecords: 1240,
    recommendation: 'Manual verification required for recent registrations'
  },
  {
    district: 'Bhagalpur',
    state: 'Bihar',
    alertType: 'DUPLICATE_PARENT' as const,
    severity: 'HIGH' as const,
    deviation: 0,
    description: '47 parent Aadhaar IDs used for multiple births',
    affectedRecords: 94,
    recommendation: 'Cross-verify parent-child linkages'
  },
  {
    district: 'Muzaffarpur',
    state: 'Bihar',
    alertType: 'LOCATION_ANOMALY' as const,
    severity: 'MEDIUM' as const,
    deviation: 45,
    description: '45% registrations from non-institutional births',
    affectedRecords: 320,
    recommendation: 'Verify home birth documentation'
  },
];

// Consent tracking summary
export const consentSummaryData = [
  { type: 'Identity', granted: 98.2, revoked: 0.3, pending: 1.5 },
  { type: 'Health', granted: 87.5, revoked: 2.1, pending: 10.4 },
  { type: 'Education', granted: 82.3, revoked: 1.8, pending: 15.9 },
  { type: 'Welfare', granted: 76.8, revoked: 3.2, pending: 20.0 },
];

// Impact scenarios
export const impactScenarios = [
  { 
    scenario: 'Current State', 
    coverage: 65, 
    fraud: 100, 
    waitTime: 100, 
    backlog: 100, 
    efficiency: 50,
    color: 'hsl(var(--muted-foreground))'
  },
  { 
    scenario: 'Forecast Only', 
    coverage: 82, 
    fraud: 72, 
    waitTime: 65, 
    backlog: 55, 
    efficiency: 72,
    color: 'hsl(var(--secondary))'
  },
  { 
    scenario: 'Birth-Linked Only', 
    coverage: 88, 
    fraud: 35, 
    waitTime: 45, 
    backlog: 40, 
    efficiency: 80,
    color: 'hsl(var(--accent))'
  },
  { 
    scenario: 'Combined (Full)', 
    coverage: 97, 
    fraud: 25, 
    waitTime: 25, 
    backlog: 35, 
    efficiency: 95,
    color: 'hsl(var(--primary))'
  },
];

// Saturation funnel data
export const saturationFunnelData = [
  { name: 'Current', value: 65, fill: 'hsl(var(--muted-foreground))' },
  { name: 'With Forecast', value: 82, fill: 'hsl(var(--secondary))' },
  { name: 'With Birth-Link', value: 88, fill: 'hsl(var(--accent))' },
  { name: 'Full Implementation', value: 97, fill: 'hsl(var(--primary))' },
];

// Radar chart data
export const radarMetrics = [
  { metric: 'Efficiency', current: 50, forecast: 72, birthLinked: 80, combined: 95 },
  { metric: 'Fraud Prevention', current: 20, forecast: 45, birthLinked: 75, combined: 88 },
  { metric: 'Wait Time', current: 30, forecast: 55, birthLinked: 70, combined: 85 },
  { metric: 'Backlog', current: 25, forecast: 60, birthLinked: 72, combined: 82 },
  { metric: 'Coverage', current: 65, forecast: 82, birthLinked: 88, combined: 97 },
];
