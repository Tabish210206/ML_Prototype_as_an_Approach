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

// Age distribution data
export const ageDistributionData = [
  { age: '0-1', current: 45, birthLinked: 95 },
  { age: '1-2', current: 58, birthLinked: 92 },
  { age: '2-3', current: 65, birthLinked: 88 },
  { age: '3-4', current: 72, birthLinked: 85 },
  { age: '4-5', current: 78, birthLinked: 82 },
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
