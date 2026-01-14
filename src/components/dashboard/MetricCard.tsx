import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: LucideIcon;
  className?: string;
}

const MetricCard = ({
  title,
  value,
  subtitle,
  change,
  changeType = 'neutral',
  icon: Icon,
  className,
}: MetricCardProps) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border border-border bg-card p-4 lg:p-6 card-hover',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl lg:text-3xl font-bold text-foreground animate-count-up">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
          {change && (
            <p
              className={cn(
                'text-sm font-medium',
                changeType === 'positive' && 'text-accent',
                changeType === 'negative' && 'text-destructive',
                changeType === 'neutral' && 'text-muted-foreground'
              )}
            >
              {change}
            </p>
          )}
        </div>
        {Icon && (
          <div className="rounded-lg bg-primary/10 p-2.5">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export default MetricCard;
