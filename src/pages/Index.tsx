import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import GlobalHeader from '@/components/dashboard/GlobalHeader';
import DemandForecastingTab from '@/components/dashboard/DemandForecastingTab';
import BirthDeskOptimizerTab from '@/components/dashboard/BirthDeskOptimizerTab';
import ImpactAnalyticsTab from '@/components/dashboard/ImpactAnalyticsTab';
import AdminControlsTab from '@/components/dashboard/AdminControlsTab';
import { TrendingUp, Baby, BarChart3, Settings } from 'lucide-react';

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('forecasting');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    toast.success(`Switched to ${!isDarkMode ? 'dark' : 'light'} mode`);
  };

  const handleLoadDemo = () => {
    toast.success('Demo data loaded successfully');
  };

  const handleExportAll = () => {
    toast.success('Exporting all data...');
  };

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
        onLoadDemo={handleLoadDemo}
        onExportAll={handleExportAll}
      />

      <main className="container mx-auto px-4 py-6">
        {/* Hero Banner */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-primary to-secondary p-6 lg:p-8 text-primary-foreground">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                Aadhaar Enrolment Revolution
              </h2>
              <p className="text-primary-foreground/90 text-lg">
                97% Saturation Achieved through ML-Powered Optimization
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm lg:text-base">
              <div className="bg-white/10 rounded-lg px-4 py-2">
                <p className="font-bold">Rs 145 Cr</p>
                <p className="text-xs opacity-80">Annual Savings</p>
              </div>
              <div className="bg-white/10 rounded-lg px-4 py-2">
                <p className="font-bold">75%</p>
                <p className="text-xs opacity-80">Fraud Reduction</p>
              </div>
              <div className="bg-white/10 rounded-lg px-4 py-2">
                <p className="font-bold">20M+</p>
                <p className="text-xs opacity-80">Proactive Slots</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto p-1 bg-muted/50">
            <TabsTrigger 
              value="forecasting" 
              className="gap-2 py-3 data-[state=active]:bg-background"
            >
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Demand</span> Forecasting
            </TabsTrigger>
            <TabsTrigger 
              value="birth-desk" 
              className="gap-2 py-3 data-[state=active]:bg-background"
            >
              <Baby className="h-4 w-4" />
              <span className="hidden sm:inline">Birth Desk</span> Optimizer
            </TabsTrigger>
            <TabsTrigger 
              value="impact" 
              className="gap-2 py-3 data-[state=active]:bg-background"
            >
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Impact</span> Analytics
            </TabsTrigger>
            <TabsTrigger 
              value="admin" 
              className="gap-2 py-3 data-[state=active]:bg-background"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Admin</span> Controls
            </TabsTrigger>
          </TabsList>

          <TabsContent value="forecasting" className="mt-6">
            <DemandForecastingTab />
          </TabsContent>

          <TabsContent value="birth-desk" className="mt-6">
            <BirthDeskOptimizerTab />
          </TabsContent>

          <TabsContent value="impact" className="mt-6">
            <ImpactAnalyticsTab />
          </TabsContent>

          <TabsContent value="admin" className="mt-6">
            <AdminControlsTab />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Aadhaar Enrolment Intelligence Hub - ML Hackathon Prototype</p>
          <p className="mt-1">UIDAI Predictive and Birth-Linked Optimization System</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
