'use client'

import React from 'react';
import { X01Game } from './x01/X01Game';
// Future ideas
// import { CricketGame } from './cricket/CricketGame';
// import { AroundTheClockGame } from './around-the-clock/AroundTheClockGame';

// Sample component to switch between different games
// For now, just renders X01Game
export const DartsGames: React.FC = () => {
    // const [gameType, setGameType] = useState<'x01' | 'cricket' | 'aroundTheClock'>('x01');

    return (
        <div className="container mx-auto p-4">
            {/*
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-4">Darts Tracker</h1>
                <div className="flex flex-wrap gap-2">
                    <Button
                        variant={gameType === 'x01' ? 'default' : 'outline'}
                        onClick={() => setGameType('x01')}
                    >
                        X01
                    </Button>
                    <Button
                        variant={gameType === 'cricket' ? 'default' : 'outline'}
                        onClick={() => setGameType('cricket')}
                    >
                        Cricket
                    </Button>
                    <Button
                        variant={gameType === 'aroundTheClock' ? 'default' : 'outline'}
                        onClick={() => setGameType('aroundTheClock')}
                    >
                        Around The Clock
                    </Button>
                </div>
            </div> */}

            {/* {gameType === 'x01' && <X01Game />}
            {gameType === 'cricket' && <CricketGame />}
            {gameType === 'aroundTheClock' && <AroundTheClockGame />} */}

            {/* For now, just render X01Game */}
            <X01Game />
        </div>
    );
};