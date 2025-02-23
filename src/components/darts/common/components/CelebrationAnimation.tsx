import React from 'react';
import { CelebrationState } from '../types/ui-state';

interface CelebrationAnimationProps {
    celebration: CelebrationState;
}

export const CelebrationAnimation: React.FC<CelebrationAnimationProps> = ({ celebration }) => {
    if (!celebration.show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="relative">
                <div className="absolute inset-0 bg-yellow-400 opacity-70 rounded-lg blur-sm"></div>

                <div className="absolute -top-8 -left-8 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                <div className="absolute -top-12 left-0 w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
                <div className="absolute -top-10 left-8 w-5 h-5 bg-green-500 rounded-full animate-ping"></div>
                <div className="absolute -top-6 -right-8 w-4 h-4 bg-purple-500 rounded-full animate-ping"></div>
                <div className="absolute -top-12 right-0 w-6 h-6 bg-pink-500 rounded-full animate-ping"></div>
                <div className="absolute -top-10 right-8 w-3 h-3 bg-indigo-500 rounded-full animate-ping"></div>

                <div className="absolute -bottom-8 -left-8 w-5 h-5 bg-red-400 rounded-full animate-ping"></div>
                <div className="absolute -bottom-12 left-0 w-4 h-4 bg-blue-400 rounded-full animate-ping"></div>
                <div className="absolute -bottom-10 left-8 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                <div className="absolute -bottom-6 -right-8 w-5 h-5 bg-purple-400 rounded-full animate-ping"></div>
                <div className="absolute -bottom-12 right-0 w-3 h-3 bg-pink-400 rounded-full animate-ping"></div>
                <div className="absolute -bottom-10 right-8 w-4 h-4 bg-indigo-400 rounded-full animate-ping"></div>

                <div className="relative bg-yellow-400 bg-opacity-100 text-black font-bold text-2xl p-6 rounded-lg shadow-lg animate-bounce border-2 border-yellow-600">
                    {celebration.message}
                </div>
            </div>
        </div>
    );
};
