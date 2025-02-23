'use client';

import { X01Game } from '@/components/darts/x01/X01Game';
import { PlayerProfileProvider } from '@/components/darts/x01/context/PlayerProfileContext';

export const DartsGames: React.FC = () => {
    return (
        <PlayerProfileProvider>
            <div className="container mx-auto p-4">
                <X01Game />
            </div>
        </PlayerProfileProvider>
    );
};
