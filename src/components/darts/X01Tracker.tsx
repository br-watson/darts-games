'use client'

import React from 'react';
import { GameProvider } from '@/components/darts/context/GameContext';
import { GameStatsScreen } from './components/GameStatsScreen';
import { MainStack } from './components/MainStack';
import { useGameContext } from '@/components/darts/context/GameContext';

const GameContent: React.FC = () => {
    const { winner } = useGameContext();

    return (
        <>
            {winner ? (
                <div className="space-y-4">
                    <GameStatsScreen />
                </div>
            ) : (
                <MainStack />
            )}
        </>
    );
};

export const X01Tracker: React.FC = () => {
    return (
        <GameProvider>
            <GameContent />
        </GameProvider>
    );
};