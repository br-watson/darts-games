'use client'

import React from 'react';
import { X01GameProvider, useX01GameContext } from './context/X01GameContext';
import { X01StatsScreen } from './components/X01StatsScreen';
import { X01Board } from './components/X01Board';

const GameContent: React.FC = () => {
    const { winner } = useX01GameContext();

    return (
        <>
            {winner ? (
                <div className="space-y-4">
                    <X01StatsScreen />
                </div>
            ) : (
                <X01Board />
            )}
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