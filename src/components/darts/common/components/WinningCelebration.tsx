import React, { useEffect, useState } from 'react';
import { Trophy } from 'lucide-react';
import { useX01GameContext } from '@/components/darts/x01/context/X01GameContext';

export const WinningCelebration: React.FC = () => {
    const { winningCelebration, completeWinningCelebration } = useX01GameContext();
    const [animationPhase, setAnimationPhase] = useState(0);
    const [animateConfetti, setAnimateConfetti] = useState(false);

    useEffect(() => {
        if (winningCelebration?.show) {
            setAnimateConfetti(true);

            const phaseTimers = [
                setTimeout(() => setAnimationPhase(1), 300),
                setTimeout(() => setAnimationPhase(2), 1000),
                setTimeout(() => completeWinningCelebration(), 6000)
            ];
            return () => phaseTimers.forEach(timer => clearTimeout(timer));
        } else {
            setAnimationPhase(0);
            setAnimateConfetti(false);
        }
    }, [winningCelebration, completeWinningCelebration]);

    if (!winningCelebration?.show) return null;

    const { playerName, checkoutDart } = winningCelebration;
    const dartText = checkoutDart === 1 ? '1st' : checkoutDart === 2 ? '2nd' : '3rd';

    const generateConfetti = (count: number) => {
        return Array.from({ length: count }).map((_, i) => {
            const colors = [
                'bg-red-500', 'bg-emerald-500', 'bg-indigo-500',
                'bg-amber-400', 'bg-blue-500', 'bg-purple-500',
                'bg-teal-500', 'bg-pink-500', 'bg-lime-500'
            ];

            const size = Math.random() * 10 + 5;
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 600 + 50;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const duration = (Math.random() * 4 + 2).toFixed(1);
            const delay = (Math.random() * 0.5).toFixed(2);

            return (
                <div
                    key={i}
                    className="absolute left-1/2 top-1/2"
                    style={{ transform: 'translate(-50%, -50%)' }}
                >
                    <div
                        className={`rounded-full ${color} opacity-90`}
                        style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            // If animateConfetti is true, transition to the randomized offset and fade out.
                            transform: animateConfetti ? `translate(${x}px, ${y}px)` : 'translate(0, 0)',
                            opacity: animateConfetti ? 0 : 1,
                            transition: `transform ${duration}s ease-out ${delay}s, opacity ${duration}s ease-out ${delay}s`
                        }}
                    />
                </div>
            );
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            {/* Dark overlay with subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-80"></div>

            {/* Subtle spotlight effect */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vh] h-[120vh] rounded-full bg-gradient-to-br from-indigo-900/20 via-transparent to-purple-900/20 opacity-60 animate-pulse"></div>

            {generateConfetti(500)}

            {/* Trophy with dedicated positioning */}
            <div className={`absolute z-10 left-1/2 -translate-x-1/2 transition-all duration-700 ${
                animationPhase >= 1 ? 'opacity-100 top-[calc(50%-140px)]' : 'opacity-0 top-[calc(50%-120px)]'
            }`}>
                <Trophy
                    className="w-20 h-20 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.7)]"
                    style={{
                        animationName: 'bounce',
                        animationDuration: '2s',
                        animationIterationCount: 'infinite'
                    }}
                />
            </div>

            {/* Main celebration card with scaling entrance */}
            <div
                className={`relative transition-transform duration-700 ease-out mt-8 ${
                    animationPhase >= 1 ? 'scale-100' : 'scale-0'
                }`}
            >
                {/* Outer glow */}
                <div className="absolute -inset-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl opacity-70 blur-xl"></div>

                <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 p-10 rounded-xl border-2 border-white/20 shadow-2xl min-w-[400px]">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"></div>

                    <div className="text-center">
                        <div className={`text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-purple-300 text-4xl font-bold mb-2 transition-all duration-500 ${
                            animationPhase >= 1 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
                        }`}>
                            {playerName}
                        </div>

                        <div className={`text-white text-5xl font-black tracking-wider mb-4 transition-all duration-500 delay-200 ${
                            animationPhase >= 1 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
                        }`}>
                            CHAMPION
                        </div>

                        <div className={`flex justify-center items-center gap-2 mt-4 transition-all duration-500 delay-300 ${
                            animationPhase >= 2 ? 'opacity-100' : 'opacity-0'
                        }`}>
                            <div className="h-[2px] w-6 bg-gradient-to-r from-transparent to-amber-500"></div>
                            <span className="text-amber-400 font-medium">
                                {dartText} dart checkout
                            </span>
                            <div className="h-[2px] w-6 bg-gradient-to-l from-transparent to-amber-500"></div>
                        </div>
                    </div>

                    {/* Circular light beams in background */}
                    <div className="absolute -left-20 -bottom-20 w-40 h-40 rounded-full bg-blue-500/20 blur-2xl"></div>
                    <div className="absolute -right-20 -bottom-20 w-40 h-40 rounded-full bg-purple-500/20 blur-2xl"></div>
                    <div className="absolute left-1/2 -top-20 -translate-x-1/2 w-40 h-40 rounded-full bg-pink-500/20 blur-2xl"></div>
                </div>
            </div>

            <style jsx>{`
                @keyframes bounce {
                    0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); }
                    50% { transform: translateY(0); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); }
                }
            `}</style>
        </div>
    );
};
