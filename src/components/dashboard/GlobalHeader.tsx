import { Moon, Sun, Database, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface GlobalHeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onLoadDemo: () => void;
  onExportAll: () => void;
}

const GlobalHeader = ({ isDarkMode, onToggleTheme, onLoadDemo, onExportAll }: GlobalHeaderProps) => {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-foreground">
              Aadhaar Enrolment Intelligence Hub
            </h1>
            <p className="text-sm text-muted-foreground">
              Predictive and Birth-Linked ML Prototype
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              Next 12M: 28.4M
            </Badge>
            <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
              High-Demand: 7/28
            </Badge>
            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
              Fraud Reduction: 78%
            </Badge>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              Backlog Reduction: 65%
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleTheme}
              className="gap-2"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="hidden sm:inline">{isDarkMode ? 'Light' : 'Dark'}</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onLoadDemo}
              className="gap-2"
            >
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">Demo Data</span>
            </Button>
            
            <Button
              variant="default"
              size="sm"
              onClick={onExportAll}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export All</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default GlobalHeader;
