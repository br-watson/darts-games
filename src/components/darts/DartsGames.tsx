'use client';

import { X01Game } from '@/components/darts/x01/X01Game';
import { PlayerProfileProvider } from '@/components/darts/x01/context/PlayerProfileContext';
import AnimatedBackground from '@/components/darts/common/components/AnimatedBackground';

export const DartsGames: React.FC = () => {
    return (
        <>
            <AnimatedBackground/>
            <PlayerProfileProvider>
                <div className="container mx-auto p-4">
                    <X01Game />
                </div>
            </PlayerProfileProvider>
        </>
    );
};
