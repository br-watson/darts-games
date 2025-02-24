'use client';

import React from 'react';
import { X01GameProvider, useX01GameContext } from './context/X01GameContext';
import { X01StatsScreen } from './components/X01StatsScreen';
import { X01Board } from './components/X01Board';
import { WinningCelebration } from '@/components/darts/common/components/WinningCelebration';
import { CelebrationAnimation } from '@/components/darts/common/components/CelebrationAnimation';

const GameContent: React.FC = () => {
    const { winner, celebration } = useX01GameContext();

    return (
        <>
            {winner ? (
                <div className="space-y-4">
                    <X01StatsScreen />
                </div>
            ) : (
                <X01Board />
            )}
            {celebration.show && (
                <CelebrationAnimation celebration={celebration} />
            )}
            <WinningCelebration />
        </>
    );
};

export const X01Game: React.FC = () => {
    return (
        <X01GameProvider>
            <GameContent />
        </X01GameProvider>
    );
};
