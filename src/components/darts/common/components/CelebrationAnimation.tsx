import React from 'react';
import { CelebrationState } from '../types/ui-state';

interface CelebrationAnimationProps {
    celebration: CelebrationState;
}

export const CelebrationAnimation: React.FC<CelebrationAnimationProps> = ({ celebration }) => {
    if (!celebration.show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none overflow-hidden">
            {/* Firework-like animations in the background */}
            <div className="absolute inset-0">
                {/* Create multiple explosion points */}
                <div className="absolute top-1/4 left-1/4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={`explosion1-${i}`}
                            className="absolute w-2 h-8 bg-red-500 rounded-full opacity-70 animate-ping"
                            style={{
                                transformOrigin: 'bottom',
                                transform: `rotate(${i * 45}deg) translateY(-50px)`,
                                animationDuration: `${1.5 + Math.random()}s`
                            }}
                        />
                    ))}
                </div>

                <div className="absolute top-3/4 right-1/4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={`explosion2-${i}`}
                            className="absolute w-2 h-8 bg-blue-500 rounded-full opacity-70 animate-ping"
                            style={{
                                transformOrigin: 'bottom',
                                transform: `rotate(${i * 45}deg) translateY(-50px)`,
                                animationDuration: `${1.5 + Math.random()}s`
                            }}
                        />
                    ))}
                </div>

                <div className="absolute bottom-1/4 right-1/3">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={`explosion3-${i}`}
                            className="absolute w-2 h-8 bg-green-500 rounded-full opacity-70 animate-ping"
                            style={{
                                transformOrigin: 'bottom',
                                transform: `rotate(${i * 45}deg) translateY(-50px)`,
                                animationDuration: `${1.5 + Math.random()}s`
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-yellow-400 opacity-70 rounded-lg blur-xl"></div>

                {/* Confetti-like animations around the message */}
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

                {/* Main message with rainbow gradient background */}
                <div className="relative bg-gradient-rainbow text-white font-bold text-2xl p-6 rounded-lg shadow-xl animate-bounce border-4 border-white overflow-hidden">
                    {/* Extra shimmer effect */}
                    <div className="absolute inset-0 bg-white opacity-20 transform -skew-x-12 animate-pulse"></div>
                    <span className="relative z-10 drop-shadow-md">
                        {celebration.message}
                    </span>
                </div>
            </div>
        </div>
    );
};