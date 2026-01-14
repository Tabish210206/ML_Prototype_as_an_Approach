import { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart,
  AreaChart,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { generateHistoricalData, generateForecastData, regionalHeatmapData, resourceRecommendations } from '@/data/mockData';
import { cn } from '@/lib/utils';

const DemandForecastingTab = () => {
  const [region, setRegion] = useState('All India');
  const [horizon, setHorizon] = useState('12');
  const [granularity, setGranularity] = useState('Monthly');

  const historicalData = useMemo(() => generateHistoricalData(), []);
  const forecastData = useMemo(() => generateForecastData(), []);

  const combinedData = useMemo(() => {
    const hist = historicalData.slice(-24).map(d => ({
      ...d,
      type: 'historical',
    }));
    const forecast = forecastData.slice(0, parseInt(horizon)).map(d => ({
      ...d,
      type: 'forecast',
    }));
    return [...hist, ...forecast];
  }, [historicalData, forecastData, horizon]);

  const getHeatmapColor = (value: number) => {
    if (value >= 85) return 'bg-destructive/80 text-destructive-foreground';
    if (value >= 70) return 'bg-warning/80 text-warning-foreground';
    if (value >= 55) return 'bg-accent/60 text-accent-foreground';
    return 'bg-muted text-muted-foreground';
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return <Badge variant="destructive">HIGH</Badge>;
      case 'MEDIUM':
        return <Badge className="bg-warning text-warning-foreground">MEDIUM</Badge>;
      default:
        return <Badge variant="secondary">LOW</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Filters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-muted-foreground">Region</label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All India">All India</SelectItem>
                  <SelectItem value="North">North</SelectItem>
                  <SelectItem value="South">South</SelectItem>
                  <SelectItem value="East">East</SelectItem>
                  <SelectItem value="West">West</SelectItem>
                  <SelectItem value="Central">Central</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-muted-foreground">Forecast Horizon</label>
              <Select value={horizon} onValueChange={setHorizon}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 months</SelectItem>
                  <SelectItem value="6">6 months</SelectItem>
                  <SelectItem value="12">12 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-muted-foreground">Granularity</label>
              <Select value={granularity} onValueChange={setGranularity}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Weekly">Weekly</SelectItem>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Forecast Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Enrolment Demand Forecast</CardTitle>
          <p className="text-sm text-muted-foreground">
            Historical data (24 months) + Forecast ({horizon} months) with confidence intervals
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={combinedData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                  className="text-muted-foreground"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                  formatter={(value: number) => [value.toLocaleString(), '']}
                />
                <Legend />
                
                {/* Confidence bands for forecast */}
                <Area
                  dataKey="confidence95Upper"
                  stroke="none"
                  fill="hsl(var(--warning))"
                  fillOpacity={0.1}
                  name="95% Confidence"
                />
                <Area
                  dataKey="confidence95Lower"
                  stroke="none"
                  fill="hsl(var(--background))"
                  fillOpacity={1}
                />
                <Area
                  dataKey="confidence80Upper"
                  stroke="none"
                  fill="hsl(var(--secondary))"
                  fillOpacity={0.2}
                  name="80% Confidence"
                />
                <Area
                  dataKey="confidence80Lower"
                  stroke="none"
                  fill="hsl(var(--background))"
                  fillOpacity={1}
                />
                
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                  name="Total Enrolments"
                />
                
                {region !== 'All India' && (
                  <Line
                    type="monotone"
                    dataKey={region}
                    stroke="hsl(var(--secondary))"
                    strokeWidth={2}
                    dot={false}
                    name={region}
                  />
                )}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Regional Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle>Regional Demand Pressure Heatmap</CardTitle>
          <p className="text-sm text-muted-foreground">
            Demand intensity by state and month (percentage of capacity)
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>State</TableHead>
                  <TableHead>Mar 26</TableHead>
                  <TableHead>Apr 26</TableHead>
                  <TableHead>May 26</TableHead>
                  <TableHead>Jun 26</TableHead>
                  <TableHead>Jul 26</TableHead>
                  <TableHead>Aug 26</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {regionalHeatmapData.map((row) => (
                  <TableRow key={row.state}>
                    <TableCell className="font-medium">{row.state}</TableCell>
                    {['Mar26', 'Apr26', 'May26', 'Jun26', 'Jul26', 'Aug26'].map((month) => (
                      <TableCell key={month}>
                        <div
                          className={cn(
                            'px-2 py-1 rounded text-center text-sm font-medium',
                            getHeatmapColor(row[month as keyof typeof row] as number)
                          )}
                        >
                          {row[month as keyof typeof row]}%
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Resource Allocation Table */}
      <Card>
        <CardHeader>
          <CardTitle>Resource Allocation Recommendations</CardTitle>
          <p className="text-sm text-muted-foreground">
            Auto-generated based on demand forecast
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Region</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead className="text-right">Forecast</TableHead>
                  <TableHead className="text-right">Temp Centres</TableHead>
                  <TableHead className="text-right">Mobile Units</TableHead>
                  <TableHead className="text-right">Staff</TableHead>
                  <TableHead>Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resourceRecommendations.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{row.region}</TableCell>
                    <TableCell>{row.period}</TableCell>
                    <TableCell className="text-right">{row.forecast.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{row.tempCentres}</TableCell>
                    <TableCell className="text-right">{row.mobileUnits}</TableCell>
                    <TableCell className="text-right">{row.staff}</TableCell>
                    <TableCell>{getPriorityBadge(row.priority)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DemandForecastingTab;
