
import React from 'react';

interface ScoreGaugeProps {
  score: number;
  label: string;
}

const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score, label }) => {
  const percentage = Math.max(0, Math.min(100, score)); // Clamp score between 0 and 100
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  let colorClass = 'text-secondary'; // Green for good scores
  if (percentage < 50) {
    colorClass = 'text-red-500'; // Red for low scores
  } else if (percentage < 75) {
    colorClass = 'text-yellow-500'; // Yellow for medium scores
  }

  return (
    <div className="flex flex-col items-center p-4 bg-white/10 rounded-lg shadow-md">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full" viewBox="0 0 120 120">
          <circle
            className="text-neutral-light/20"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
          />
          <circle
            className={colorClass}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
            transform="rotate(-90 60 60)"
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy=".3em"
            className={`text-3xl font-bold fill-current ${colorClass}`}
          >
            {percentage}
          </text>
        </svg>
      </div>
      <p className="mt-2 text-sm font-medium text-neutral-light/90 text-center">{label}</p>
    </div>
  );
};

export default ScoreGauge;
