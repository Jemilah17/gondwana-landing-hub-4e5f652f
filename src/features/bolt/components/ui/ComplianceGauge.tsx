interface GaugeProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

export default function ComplianceGauge({ percentage, size = 44, strokeWidth = 4 }: GaugeProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (percentage >= 80) return '#2D7A4F';
    if (percentage >= 55) return '#9A6E1A';
    return '#B53A2F';
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#EFECE6"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor()}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-[11px] font-medium text-primary">
        {percentage}%
      </span>
    </div>
  );
}
