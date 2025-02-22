'use client'

import React from 'react';
import { GameProvider } from './context/GameContext';
import { GameStatsScreen } from './darts/GameStatsScreen';
import { MainStack } from './darts/MainStack';
import { useGameContext } from './context/GameContext';

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