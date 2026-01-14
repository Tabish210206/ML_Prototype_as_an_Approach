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
  Cell,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { birthDeskData, ageDistributionData } from '@/data/mockData';
import MetricCard from './MetricCard';
import { Shield, CheckCircle, XCircle, Zap, TrendingUp } from 'lucide-react';

const BirthDeskOptimizerTab = () => {
  const [annualBirths, setAnnualBirths] = useState([25000]);
  const [captureRate, setCaptureRate] = useState([95]);
  const [fraudRate, setFraudRate] = useState([15]);

  const metrics = useMemo(() => {
    const births = annualBirths[0];
    const capture = captureRate[0] / 100;
    const fraud = fraudRate[0] / 100;

    const birthCaptures = Math.round(births * capture);
    const baselineRejects = Math.round(births * fraud);
    const fraudSaved = Math.round(baselineRejects * capture * 0.75);
    const efficiency = ((capture * 100) - (100 - capture * 100) * 0.5);
    const roi = (fraudSaved * 20000) / 10000000; // Rs 20K per fraud case, in Cr

    return {
      birthCaptures,
      baselineRejects,
      fraudSaved,
      efficiency: efficiency.toFixed(1),
      roi: roi.toFixed(1),
      reductionPercent: Math.round(capture * 75),
    };
  }, [annualBirths, captureRate, fraudRate]);

  const workflowSteps = [
    { step: 1, title: 'Birth Registration', desc: 'Hospital records birth' },
    { step: 2, title: 'Pre-Aadhaar ID', desc: 'Temporary ID generated' },
    { step: 3, title: 'Biometric Capture', desc: 'Photo + parent link' },
    { step: 4, title: 'EID Generation', desc: 'Enrolment ID issued' },
    { step: 5, title: 'School Ready', desc: 'Full Aadhaar at age 5' },
  ];

  const stateMapData = useMemo(() => {
    return birthDeskData.map(state => ({
      ...state,
      bubbleSize: Math.sqrt(state.desks) * 8,
    }));
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Controls */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Simulation Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Annual Hospital Births</label>
                <span className="text-sm font-bold text-primary">{annualBirths[0].toLocaleString()}</span>
              </div>
              <Slider
                value={annualBirths}
                onValueChange={setAnnualBirths}
                min={5000}
                max={100000}
                step={1000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>5K</span>
                <span>100K</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Capture Rate</label>
                <span className="text-sm font-bold text-primary">{captureRate[0]}%</span>
              </div>
              <Slider
                value={captureRate}
                onValueChange={setCaptureRate}
                min={70}
                max={99}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>70%</span>
                <span>99%</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Current Fraud Rate</label>
                <span className="text-sm font-bold text-destructive">{fraudRate[0]}%</span>
              </div>
              <Slider
                value={fraudRate}
                onValueChange={setFraudRate}
                min={8}
                max={25}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>8%</span>
                <span>25%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-5">
        <MetricCard
          title="Baseline Rejects"
          value={metrics.baselineRejects.toLocaleString()}
          change={`-${metrics.reductionPercent}% reduction`}
          changeType="positive"
          icon={XCircle}
        />
        <MetricCard
          title="Birth Captures"
          value={metrics.birthCaptures.toLocaleString()}
          subtitle="At hospital desks"
          icon={CheckCircle}
        />
        <MetricCard
          title="Fraud Cases Saved"
          value={metrics.fraudSaved.toLocaleString()}
          subtitle="Prevented annually"
          icon={Shield}
        />
        <MetricCard
          title="Efficiency Gain"
          value={`+${metrics.efficiency}%`}
          subtitle="Process improvement"
          icon={Zap}
        />
        <MetricCard
          title="Annual ROI"
          value={`Rs ${metrics.roi} Cr`}
          subtitle="Cost savings"
          icon={TrendingUp}
        />
      </div>

      {/* Workflow Diagram */}
      <Card>
        <CardHeader>
          <CardTitle>Birth-to-Aadhaar Workflow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap justify-between items-center gap-4">
            {workflowSteps.map((step, idx) => (
              <div key={step.step} className="flex items-center">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                    {step.step}
                  </div>
                  <p className="mt-2 text-sm font-medium">{step.title}</p>
                  <p className="text-xs text-muted-foreground max-w-24">{step.desc}</p>
                </div>
                {idx < workflowSteps.length - 1 && (
                  <div className="hidden md:block w-12 h-0.5 bg-border mx-2" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* State Coverage Table */}
        <Card>
          <CardHeader>
            <CardTitle>State-wise Birth Desk Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {birthDeskData.slice(0, 6).map((state) => (
                <div key={state.state} className="flex items-center gap-4">
                  <div className="w-28 text-sm font-medium truncate">{state.state}</div>
                  <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${state.coverage}%` }}
                    />
                  </div>
                  <div className="w-12 text-sm font-medium text-right">{state.coverage}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Age Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Age 0-5 Enrolment Comparison</CardTitle>
            <p className="text-sm text-muted-foreground">Current vs Birth-Linked approach</p>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ageDistributionData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="age" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${v}%`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [`${value}%`, '']}
                  />
                  <Legend />
                  <Bar 
                    dataKey="current" 
                    fill="hsl(var(--muted-foreground))" 
                    name="Current" 
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="birthLinked" 
                    fill="hsl(var(--primary))" 
                    name="Birth-Linked" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BirthDeskOptimizerTab;
