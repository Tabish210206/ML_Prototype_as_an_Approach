import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { impactScenarios, saturationFunnelData, radarMetrics } from '@/data/mockData';

const AnimatedCounter = ({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <span className="tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

const ImpactAnalyticsTab = () => {
  const funnelData = [
    { name: 'Current', value: 65, fill: 'hsl(var(--muted-foreground))' },
    { name: 'Forecast Only', value: 82, fill: 'hsl(var(--secondary))' },
    { name: 'Birth-Linked', value: 88, fill: 'hsl(var(--accent))' },
    { name: 'Full System', value: 97, fill: 'hsl(var(--primary))' },
  ];

  const comparisonData = impactScenarios.map(s => ({
    name: s.scenario,
    Coverage: s.coverage,
    'Fraud Prevention': 100 - s.fraud,
    Efficiency: s.efficiency,
    'Wait Time': 100 - s.waitTime,
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Counters */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="pt-6 text-center">
            <p className="text-3xl lg:text-4xl font-bold text-primary">
              <AnimatedCounter target={20} suffix="M+" />
            </p>
            <p className="text-sm text-muted-foreground mt-1">Proactive Slots</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <CardContent className="pt-6 text-center">
            <p className="text-3xl lg:text-4xl font-bold text-accent">
              <AnimatedCounter target={1.2} suffix="M" />
            </p>
            <p className="text-sm text-muted-foreground mt-1">Fraud Prevented</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-gold/10 to-gold/5 border-gold/20">
          <CardContent className="pt-6 text-center">
            <p className="text-3xl lg:text-4xl font-bold text-yellow-600">
              <AnimatedCounter target={145} prefix="Rs " suffix=" Cr" />
            </p>
            <p className="text-sm text-muted-foreground mt-1">Total Savings</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
          <CardContent className="pt-6 text-center">
            <p className="text-3xl lg:text-4xl font-bold text-secondary">
              <AnimatedCounter target={75} suffix="%" />
            </p>
            <p className="text-sm text-muted-foreground mt-1">Less School Queues</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-primary/10 to-secondary/5 border-primary/20">
          <CardContent className="pt-6 text-center">
            <p className="text-3xl lg:text-4xl font-bold text-primary">
              <AnimatedCounter target={97} suffix="%" />
            </p>
            <p className="text-sm text-muted-foreground mt-1">Saturation Achieved</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Saturation Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Saturation Progression</CardTitle>
            <p className="text-sm text-muted-foreground">
              Coverage improvement by implementation stage
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={funnelData}
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 80, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [`${value}%`, 'Coverage']}
                  />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                    {funnelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Radar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Multi-Metric Comparison</CardTitle>
            <p className="text-sm text-muted-foreground">
              Performance across 5 key dimensions
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarMetrics} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                  <PolarGrid className="stroke-border" />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Radar
                    name="Current"
                    dataKey="current"
                    stroke="hsl(var(--muted-foreground))"
                    fill="hsl(var(--muted-foreground))"
                    fillOpacity={0.2}
                  />
                  <Radar
                    name="Forecast"
                    dataKey="forecast"
                    stroke="hsl(var(--secondary))"
                    fill="hsl(var(--secondary))"
                    fillOpacity={0.2}
                  />
                  <Radar
                    name="Combined"
                    dataKey="combined"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scenario Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Scenario Comparison</CardTitle>
          <p className="text-sm text-muted-foreground">
            Performance metrics across all implementation scenarios
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 11 }}
                  angle={-15}
                  textAnchor="end"
                  height={60}
                />
                <YAxis tickFormatter={(v) => `${v}%`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`${value}%`, '']}
                />
                <Legend />
                <Bar dataKey="Coverage" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Fraud Prevention" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Efficiency" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Wait Time" fill="hsl(var(--warning))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImpactAnalyticsTab;
