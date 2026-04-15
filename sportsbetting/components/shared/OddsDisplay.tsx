interface OddsDisplayProps {
  odds: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function OddsDisplay({ odds, className = '', size = 'md' }: OddsDisplayProps) {
  const isPositive = odds > 0;
  const formatted = isPositive ? `+${odds}` : `${odds}`;

  const sizeClasses = {
    sm: 'text-xs font-medium',
    md: 'text-sm font-semibold',
    lg: 'text-base font-bold',
  };

  return (
    <span
      className={`${sizeClasses[size]} ${
        isPositive ? 'text-emerald-400' : 'text-slate-200'
      } ${className}`}
    >
      {formatted}
    </span>
  );
}

interface SpreadDisplayProps {
  spread: number;
  odds?: number;
  className?: string;
}

export function SpreadDisplay({ spread, odds, className = '' }: SpreadDisplayProps) {
  const formattedSpread = spread > 0 ? `+${spread}` : `${spread}`;
  const formattedOdds = odds !== undefined ? (odds > 0 ? `+${odds}` : `${odds}`) : '';

  return (
    <span className={`text-sm font-semibold text-slate-200 ${className}`}>
      {formattedSpread}
      {odds !== undefined && (
        <span className="text-xs font-normal text-slate-500 ml-1">({formattedOdds})</span>
      )}
    </span>
  );
}
