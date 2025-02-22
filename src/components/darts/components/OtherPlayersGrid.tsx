import React from 'react';
import { useGameContext } from '@/components/darts/context/GameContext';

export const OtherPlayersGrid: React.FC = () => {
    const { players, currentPlayerIndex } = useGameContext();

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-4">
            {players.map((player, index) => {
                if (index === currentPlayerIndex) return null;

                return (
                    <div key={index} className="p-2 bg-gray-100 rounded border">
                        <div className="flex justify-between">
                            <span className="font-medium truncate">{player.name}</span>
                            <span className="font-bold">{player.score}</span>
                        </div>
                        <div className="text-sm text-gray-600 flex justify-between">
                            <span>Last: {player.throws.slice(-1)[0] || '-'}</span>
                            <span className="text-xs text-gray-400">{index + 1}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};