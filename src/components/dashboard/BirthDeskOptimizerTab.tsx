import { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  ComposedChart,
  Line,
  RadialBarChart,
  RadialBar,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  birthDeskData, 
  ageDistributionData, 
  immunizationSchedule, 
  consentSummaryData,
  fraudPatternAlerts,
} from '@/data/mockData';
import MetricCard from './MetricCard';
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  Building2, 
  Users, 
  AlertTriangle,
  ArrowRight,
  Hospital,
  FileCheck,
  Fingerprint,
  IdCard,
  RefreshCw,
  MapPin,
  Baby,
  Syringe,
  GraduationCap,
  FileWarning,
  Lock,
  Unlock,
  Clock,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const BirthDeskOptimizerTab = () => {
  const [annualBirths, setAnnualBirths] = useState([2500000]);
  const [deskCoverage, setDeskCoverage] = useState([75]);
  const [conversionRate, setConversionRate] = useState([92]);
  const [fraudRisk, setFraudRisk] = useState([12]);

  const metrics = useMemo(() => {
    const births = annualBirths[0];
    const coverage = deskCoverage[0] / 100;
    const conversion = conversionRate[0] / 100;
    const fraud = fraudRisk[0] / 100;

    const coveredBirths = Math.round(births * coverage);
    const preEnrolled = Math.round(coveredBirths * conversion);
    const dropOffsPrevented = Math.round(births * (1 - coverage) * 0.6);
    const fraudAvoided = Math.round(births * fraud * coverage * 0.78);
    const efficiencyGain = Math.round(coverage * conversion * 100 * 0.92);
    const savings = (fraudAvoided * 18000 + preEnrolled * 120) / 10000000;

    return {
      preEnrolled,
      dropOffsPrevented,
      fraudAvoided,
      efficiencyGain,
      savings: savings.toFixed(1),
      coveragePercent: Math.round(coverage * 100),
    };
  }, [annualBirths, deskCoverage, conversionRate, fraudRisk]);

  // Lifecycle-aware identity flow (DEMOGRAPHIC-ONLY at birth, NO forced biometrics)
  const lifecycleSteps = [
    { 
      icon: Hospital, 
      title: 'Birth Registered', 
      desc: 'CRS birth event captured', 
      status: 'complete',
      note: 'Demographic only'
    },
    { 
      icon: FileCheck, 
      title: 'Foundational ID', 
      desc: 'Temp Aadhaar ref created', 
      status: 'complete',
      note: 'No biometrics required'
    },
    { 
      icon: Syringe, 
      title: 'Immunization Anchors', 
      desc: 'Trust events strengthen ID', 
      status: 'active',
      note: 'Photo metadata only'
    },
    { 
      icon: Clock, 
      title: 'Lifecycle Updates', 
      desc: 'Confidence score improves', 
      status: 'pending',
      note: 'ML-predicted timing'
    },
    { 
      icon: Fingerprint, 
      title: 'Age 5 Biometric', 
      desc: 'First mandatory capture', 
      status: 'pending',
      note: 'Delayed & predictive'
    },
    { 
      icon: IdCard, 
      title: 'Full Aadhaar', 
      desc: 'Complete identity issued', 
      status: 'pending',
      note: 'Opt-out at 18'
    },
  ];

  const hospitalPredictionData = useMemo(() => {
    return birthDeskData.map(state => ({
      state: state.state,
      births: state.births,
      predictedBirths: Math.round(state.births * (1 + Math.random() * 0.08)),
      desksRequired: Math.ceil(state.births / 3500),
      currentDesks: state.desks,
      gap: Math.max(0, Math.ceil(state.births / 3500) - state.desks),
      staffNeeded: Math.ceil(state.births / 3500) * 3,
      kitsNeeded: Math.ceil(state.births / 3500) * 2,
      dropOffRisk: state.coverage < 80 ? 'HIGH' : state.coverage < 90 ? 'MEDIUM' : 'LOW',
      fraudRisk: state.instBirthRate < 80 ? 'HIGH' : state.instBirthRate < 90 ? 'MEDIUM' : 'LOW',
      // Lifecycle metrics
      avgConfidenceScore: Math.round(60 + state.coverage * 0.35),
      immunizationCoverage: Math.round(state.instBirthRate * 0.92),
    }));
  }, []);

  const stateComparisonData = useMemo(() => {
    return birthDeskData.map(state => ({
      state: state.state.substring(0, 3).toUpperCase(),
      fullName: state.state,
      keralaModel: state.state === 'Tamil Nadu' || state.state === 'Karnataka' || state.state === 'Delhi',
      coverage: state.coverage,
      instBirthRate: state.instBirthRate,
      gap: 100 - state.coverage,
    })).sort((a, b) => b.coverage - a.coverage);
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* HIBID Header with Research-Aligned Philosophy */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-lg p-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Hospital-Integrated Birth Identity Desks (HIBID)
            </h2>
            <p className="text-muted-foreground mt-1 max-w-2xl">
              Lifecycle-aware identity system: Demographic-only Aadhaar at birth, immunization-anchored trust building, 
              and predictive biometric capture at age 5+. Compliant with Supreme Court judgment and DPDP Act.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge variant="secondary" className="text-xs">
                <Baby className="h-3 w-3 mr-1" />
                No Biometrics at Birth
              </Badge>
              <Badge variant="secondary" className="text-xs">
                <Syringe className="h-3 w-3 mr-1" />
                Immunization Trust Anchors
              </Badge>
              <Badge variant="secondary" className="text-xs">
                <Lock className="h-3 w-3 mr-1" />
                DPDP Consent Compliant
              </Badge>
            </div>
          </div>
          <Badge variant="outline" className="border-primary/50 text-primary">
            Inspired by Kerala Model
          </Badge>
        </div>
      </div>

      {/* Interactive Simulation Controls */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Policy Simulation Controls
          </CardTitle>
          <CardDescription>
            Adjust parameters to model operational scenarios and resource requirements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Annual Hospital-Registered Births</label>
                <span className="text-sm font-bold text-primary">{(annualBirths[0] / 1000000).toFixed(1)}M</span>
              </div>
              <Slider
                value={annualBirths}
                onValueChange={setAnnualBirths}
                min={500000}
                max={5000000}
                step={100000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0.5M</span>
                <span>5M</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Hospital Aadhaar Desk Coverage</label>
                <span className="text-sm font-bold text-primary">{deskCoverage[0]}%</span>
              </div>
              <Slider
                value={deskCoverage}
                onValueChange={setDeskCoverage}
                min={40}
                max={98}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>40%</span>
                <span>98%</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Birth-to-Aadhaar Conversion Rate</label>
                <span className="text-sm font-bold text-primary">{conversionRate[0]}%</span>
              </div>
              <Slider
                value={conversionRate}
                onValueChange={setConversionRate}
                min={60}
                max={99}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>60%</span>
                <span>99%</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Fraud / Duplicate Risk Level</label>
                <span className="text-sm font-bold text-destructive">{fraudRisk[0]}%</span>
              </div>
              <Slider
                value={fraudRisk}
                onValueChange={setFraudRisk}
                min={5}
                max={25}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>5%</span>
                <span>25%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Outcome Metrics */}
      <div className="grid gap-4 md:grid-cols-5">
        <MetricCard
          title="Children Pre-Enrolled at Birth"
          value={(metrics.preEnrolled / 1000).toFixed(0) + 'K'}
          subtitle="Hospital-registered"
          icon={CheckCircle}
        />
        <MetricCard
          title="Drop-Offs Prevented"
          value={(metrics.dropOffsPrevented / 1000).toFixed(0) + 'K'}
          subtitle="Annually"
          icon={XCircle}
        />
        <MetricCard
          title="Fraud Cases Avoided"
          value={(metrics.fraudAvoided / 1000).toFixed(0) + 'K'}
          subtitle="Duplicate prevention"
          icon={Shield}
        />
        <MetricCard
          title="Efficiency Gain"
          value={`${metrics.efficiencyGain}%`}
          subtitle="Operational improvement"
          icon={TrendingUp}
        />
        <MetricCard
          title="Government Savings"
          value={`Rs ${metrics.savings} Cr`}
          subtitle="Estimated annually"
          icon={Building2}
        />
      </div>

      {/* Identity Lifecycle Flow (Research-Aligned) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            Identity Lifecycle Flow
            <Badge variant="outline" className="text-xs ml-2">Demographic → Biometric Progression</Badge>
          </CardTitle>
          <CardDescription>
            Birth-to-Aadhaar journey: Demographic-only creation at birth, immunization-anchored trust building, delayed biometric capture
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap justify-between items-start gap-2">
            {lifecycleSteps.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <div key={idx} className="flex items-center flex-1 min-w-[140px]">
                  <div className="flex flex-col items-center text-center w-full">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                      step.status === 'complete' 
                        ? 'bg-primary text-primary-foreground' 
                        : step.status === 'active'
                        ? 'bg-primary/20 text-primary border-2 border-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <p className="mt-2 text-sm font-medium">{step.title}</p>
                    <p className="text-xs text-muted-foreground max-w-28 mt-0.5">{step.desc}</p>
                    <Badge variant="secondary" className="text-[10px] mt-1 px-1.5">
                      {step.note}
                    </Badge>
                  </div>
                  {idx < lifecycleSteps.length - 1 && (
                    <ArrowRight className="hidden lg:block h-5 w-5 text-muted-foreground/50 mx-1 flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Immunization Trust Anchors + Consent Tracking */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Immunization Schedule as Trust Anchors */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Syringe className="h-4 w-4" />
              Immunization Trust Anchors
            </CardTitle>
            <CardDescription>
              Each immunization event strengthens identity confidence (photo metadata only, no raw biometrics)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {immunizationSchedule.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    idx === 0 ? 'bg-primary text-primary-foreground' : 
                    idx < 3 ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                  }`}>
                    {idx === 0 ? <Baby className="h-4 w-4" /> : <Syringe className="h-4 w-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{item.event}</p>
                      <Badge variant="outline" className="text-[10px]">
                        +{item.confidenceBoost} confidence
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* DPDP-Compliant Consent Tracking */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Consent Tracking (DPDP Compliant)
            </CardTitle>
            <CardDescription>
              Granular, independent, revocable consent flags per identity purpose
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {consentSummaryData.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.type}</span>
                    <span className="text-xs text-muted-foreground">
                      {item.granted}% granted
                    </span>
                  </div>
                  <div className="flex h-2 gap-0.5 rounded overflow-hidden">
                    <div 
                      className="bg-primary transition-all"
                      style={{ width: `${item.granted}%` }}
                    />
                    <div 
                      className="bg-destructive transition-all"
                      style={{ width: `${item.revoked}%` }}
                    />
                    <div 
                      className="bg-muted transition-all"
                      style={{ width: `${item.pending}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Unlock className="h-2.5 w-2.5" /> Granted: {item.granted}%
                    </span>
                    <span className="flex items-center gap-1">
                      <XCircle className="h-2.5 w-2.5" /> Revoked: {item.revoked}%
                    </span>
                    <span>Pending: {item.pending}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Hospital-wise Desk Intelligence */}
        {/* Hospital-wise Desk Intelligence */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              HIBID Placement Recommendations
            </CardTitle>
            <CardDescription>
              Hospital-wise birth volume prediction and desk allocation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-7 text-xs font-medium text-muted-foreground pb-2 border-b">
                <span className="col-span-2">State</span>
                <span className="text-right">Births</span>
                <span className="text-right">Desks Req.</span>
                <span className="text-right">Gap</span>
                <span className="text-right">Staff</span>
                <span className="text-center">Risk</span>
              </div>
              {hospitalPredictionData.slice(0, 6).map((item) => (
                <div key={item.state} className="grid grid-cols-7 text-sm items-center py-2 border-b border-border/50 last:border-0">
                  <span className="col-span-2 font-medium truncate">{item.state}</span>
                  <span className="text-right text-muted-foreground">{(item.predictedBirths / 1000).toFixed(0)}K</span>
                  <span className="text-right">{item.desksRequired}</span>
                  <span className={`text-right font-medium ${item.gap > 10 ? 'text-destructive' : item.gap > 5 ? 'text-amber-500' : 'text-green-600'}`}>
                    {item.gap > 0 ? `+${item.gap}` : '0'}
                  </span>
                  <span className="text-right text-muted-foreground">{item.staffNeeded}</span>
                  <span className="text-center">
                    <Badge 
                      variant={item.dropOffRisk === 'HIGH' ? 'destructive' : item.dropOffRisk === 'MEDIUM' ? 'secondary' : 'outline'}
                      className="text-[10px] px-1.5"
                    >
                      {item.dropOffRisk}
                    </Badge>
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* State Coverage Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">State-Wise Coverage Analytics</CardTitle>
            <CardDescription>
              Kerala-model adoption vs traditional approach
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stateComparisonData.slice(0, 6).map((state) => (
                <div key={state.state} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium w-24 truncate">{state.fullName}</span>
                      {state.keralaModel && (
                        <Badge variant="outline" className="text-[10px] px-1.5 border-primary/50 text-primary">
                          Kerala Model
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm font-semibold">{state.coverage}%</span>
                  </div>
                  <div className="flex gap-1 h-2">
                    <div 
                      className="bg-primary rounded-l transition-all"
                      style={{ width: `${state.coverage}%` }}
                    />
                    <div 
                      className="bg-destructive/30 rounded-r transition-all"
                      style={{ width: `${state.gap}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Coverage: {state.coverage}%</span>
                    <span>Inst. Birth: {state.instBirthRate}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Age 0-5 Comparison Chart (with Immunization-Linked) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Age 0-5 Enrolment Comparison</CardTitle>
          <CardDescription>
            Current approach vs Birth-linked vs Immunization-anchored lifecycle model
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={ageDistributionData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis 
                  dataKey="age" 
                  tick={{ fontSize: 12 }} 
                  label={{ value: 'Age Group', position: 'bottom', offset: -5, fontSize: 11 }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }} 
                  tickFormatter={(v) => `${v}%`}
                  label={{ value: 'Coverage %', angle: -90, position: 'insideLeft', fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number, name: string) => [
                    `${value}%`, 
                    name === 'current' ? 'Current Approach' : 'HIBID Model'
                  ]}
                />
                <Legend 
                  formatter={(value) => {
                    if (value === 'current') return 'Current Approach';
                    if (value === 'birthLinked') return 'Birth-Linked (HIBID)';
                    return 'Immunization-Anchored';
                  }}
                />
                <Bar 
                  dataKey="current" 
                  fill="hsl(var(--muted-foreground))" 
                  name="current" 
                  radius={[4, 4, 0, 0]}
                  opacity={0.6}
                />
                <Bar 
                  dataKey="birthLinked" 
                  fill="hsl(var(--secondary))" 
                  name="birthLinked" 
                  radius={[4, 4, 0, 0]}
                  opacity={0.8}
                />
                <Bar 
                  dataKey="immunizationLinked" 
                  fill="hsl(var(--primary))" 
                  name="immunizationLinked" 
                  radius={[4, 4, 0, 0]}
                />
                <Line 
                  type="monotone" 
                  dataKey="immunizationLinked" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                  name="immunizationLinked"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="w-3 h-3 rounded bg-muted-foreground" />
              <div>
                <p className="font-medium">Current Approach</p>
                <p className="text-xs text-muted-foreground">Avg 63.6% coverage</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/20">
              <div className="w-3 h-3 rounded bg-secondary" />
              <div>
                <p className="font-medium">Birth-Linked (HIBID)</p>
                <p className="text-xs text-muted-foreground">Avg 88.4% coverage</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10">
              <div className="w-3 h-3 rounded bg-primary" />
              <div>
                <p className="font-medium">Immunization-Anchored</p>
                <p className="text-xs text-muted-foreground">Avg 92.2% coverage</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fraud Alert Panel (ML-Detected Anomalies) */}
      <Card className="border-amber-500/30 bg-amber-500/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <AlertTriangle className="h-4 w-4" />
            ML-Detected Fraud Pattern Alerts
          </CardTitle>
          <CardDescription>
            Anomaly detection for birth spikes, duplicate parents, and location inconsistencies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {fraudPatternAlerts.map((alert, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-background border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{alert.district}</span>
                  <Badge variant={alert.severity === 'HIGH' ? 'destructive' : 'secondary'} className="text-[10px]">
                    {alert.severity}
                  </Badge>
                </div>
                <Badge variant="outline" className="text-[10px] mb-2">
                  {alert.alertType.replace('_', ' ')}
                </Badge>
                <p className="text-xs text-muted-foreground mb-2">{alert.description}</p>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Affected Records:</span>
                    <span className="font-medium text-destructive">{alert.affectedRecords}</span>
                  </div>
                  <div className="pt-1 border-t">
                    <span className="text-primary text-[10px]">{alert.recommendation}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BirthDeskOptimizerTab;
