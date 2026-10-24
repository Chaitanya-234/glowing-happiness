import React from 'react';

interface DifficultyBadgeProps {
    difficulty: string;
}

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
    const lower = difficulty.toLowerCase();

    let colorClass = "bg-gray-800 text-gray-300 border-gray-700"; // Default

    if (lower.includes('junior') || lower.includes('entry') || lower.includes('easy')) {
        colorClass = "bg-green-900/30 text-green-300 border-green-500/30";
    } else if (lower.includes('mid') || lower.includes('intermediate') || lower.includes('medium')) {
        colorClass = "bg-blue-900/30 text-blue-300 border-blue-500/30";
    } else if (lower.includes('senior') || lower.includes('hard')) {
        colorClass = "bg-orange-900/30 text-orange-300 border-orange-500/30";
    } else if (lower.includes('lead') || lower.includes('principal') || lower.includes('expert') || lower.includes('staff')) {
        colorClass = "bg-red-900/30 text-red-300 border-red-500/30";
    }

    return (
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${colorClass} uppercase tracking-wide`}>
            {difficulty}
        </span>
    );
}
