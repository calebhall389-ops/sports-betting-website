interface SportBadgeProps {
  sport: string;
  size?: 'sm' | 'md';
}

const sportColors: Record<string, string> = {
  NFL: 'bg-red-500/20 text-red-400 border-red-500/30',
  NBA: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  NHL: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  MLB: 'bg-green-500/20 text-green-400 border-green-500/30',
  NCAAB: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  CBB: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Soccer: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  default: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
};

export default function SportBadge({ sport, size = 'sm' }: SportBadgeProps) {
  const colors = sportColors[sport] || sportColors.default;
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-2.5 py-1';

  return (
    <span className={`inline-flex items-center rounded border font-medium ${colors} ${sizeClass}`}>
      {sport}
    </span>
  );
}
