import React from 'react';
import { useX01GameContext } from '../context/X01GameContext';
import { dartsColors } from '@/lib/theme';

export const OtherPlayersGrid: React.FC = () => {
    const { players, currentPlayerIndex } = useX01GameContext();

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-4">
            {players.map((player, index) => {
                if (index === currentPlayerIndex) return null;

                // Get player color based on index
                const playerColor = dartsColors.players[index % dartsColors.players.length];

                return (
                    <div
                        key={index}
                        className="p-3 rounded-lg shadow-sm border transition-all hover:shadow-md"
                        style={{
                            background: `linear-gradient(135deg, ${playerColor}10, ${playerColor}20)`,
                            borderColor: playerColor,
                            borderWidth: '2px'
                        }}
                    >
                        <div className="flex justify-between">
                            <span
                                className="font-medium truncate"
                                style={{ color: playerColor }}
                            >
                                {player.name}
                            </span>
                            <span
                                className="font-bold px-2 py-0.5 rounded-lg text-white"
                                style={{ backgroundColor: playerColor }}
                            >
                                {player.score}
                            </span>
                        </div>
                        <div className="flex justify-between mt-1">
                            <span className="text-sm bg-white bg-opacity-70 px-2 py-0.5 rounded-md">
                                Last: <span className="font-semibold">{player.throws.slice(-1)[0] || '-'}</span>
                            </span>
                            <span className="text-xs text-gray-500 bg-white bg-opacity-70 px-2 py-0.5 rounded-md">
                                #{index + 1}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};