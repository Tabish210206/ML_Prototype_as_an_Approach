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
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { birthDeskData, ageDistributionData } from '@/data/mockData';
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

  const lifecycleSteps = [
    { icon: Hospital, title: 'Birth Registered', desc: 'Hospital records birth event', status: 'complete' },
    { icon: FileCheck, title: 'Certificate Issued', desc: 'Birth certificate generated', status: 'complete' },
    { icon: IdCard, title: 'Temp ID Created', desc: 'Temporary identity reference', status: 'active' },
    { icon: Fingerprint, title: 'Biometric Capture', desc: 'Age-appropriate collection', status: 'pending' },
    { icon: CheckCircle, title: 'Aadhaar Issued', desc: 'Unique ID assigned', status: 'pending' },
    { icon: RefreshCw, title: 'Updates till Age 5', desc: 'Continuous biometric refresh', status: 'pending' },
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
      {/* HIBID Header */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Hospital-Integrated Birth Identity Desks (HIBID)
            </h2>
            <p className="text-muted-foreground mt-1 max-w-2xl">
              Predictive optimization system for Aadhaar desks embedded within hospital birth registration units, 
              enabling early identity creation aligned with birth certificate issuance.
            </p>
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

      {/* Identity Lifecycle Flow */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Identity Lifecycle Flow Visualization</CardTitle>
          <CardDescription>
            Birth-to-Aadhaar journey with continuous updates through age 5
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

      <div className="grid gap-6 lg:grid-cols-2">
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

      {/* Age 0-5 Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Age 0-5 Enrolment Comparison</CardTitle>
          <CardDescription>
            Current Aadhaar enrolment approach vs Hospital-integrated birth-linked model
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
                  formatter={(value) => value === 'current' ? 'Current Approach' : 'HIBID Model'}
                />
                <Bar 
                  dataKey="current" 
                  fill="hsl(var(--muted-foreground))" 
                  name="current" 
                  radius={[4, 4, 0, 0]}
                  opacity={0.7}
                />
                <Bar 
                  dataKey="birthLinked" 
                  fill="hsl(var(--primary))" 
                  name="birthLinked" 
                  radius={[4, 4, 0, 0]}
                />
                <Line 
                  type="monotone" 
                  dataKey="birthLinked" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                  name="birthLinked"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="w-3 h-3 rounded bg-muted-foreground" />
              <div>
                <p className="font-medium">Current Approach</p>
                <p className="text-xs text-muted-foreground">Average 63.6% coverage at ages 0-5</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10">
              <div className="w-3 h-3 rounded bg-primary" />
              <div>
                <p className="font-medium">HIBID Model</p>
                <p className="text-xs text-muted-foreground">Average 88.4% coverage at ages 0-5</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fraud Alert Panel */}
      <Card className="border-amber-500/30 bg-amber-500/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <AlertTriangle className="h-4 w-4" />
            Fraud-Prone Enrolment Pattern Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {hospitalPredictionData
              .filter(s => s.fraudRisk === 'HIGH' || s.dropOffRisk === 'HIGH')
              .slice(0, 3)
              .map((state) => (
                <div key={state.state} className="p-3 rounded-lg bg-background border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{state.state}</span>
                    <Badge variant="destructive" className="text-[10px]">High Risk</Badge>
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Drop-off Risk:</span>
                      <span className={state.dropOffRisk === 'HIGH' ? 'text-destructive font-medium' : ''}>
                        {state.dropOffRisk}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fraud Pattern Risk:</span>
                      <span className={state.fraudRisk === 'HIGH' ? 'text-destructive font-medium' : ''}>
                        {state.fraudRisk}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Desk Gap:</span>
                      <span className="font-medium">+{state.gap} required</span>
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
