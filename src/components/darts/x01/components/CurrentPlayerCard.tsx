import React from 'react';
import { useX01GameContext } from '../context/X01GameContext';
import { calculateBasicStats } from '../../common/utils/score-utils';
import { getCheckoutSuggestion } from '../utils/checkout-suggestions';
import { CheckoutDisplay } from './CheckoutDisplay';
import { dartsColors } from '@/lib/theme';

export const CurrentPlayerCard: React.FC = () => {
    const { players, currentPlayerIndex } = useX01GameContext();
    const currentPlayer = players[currentPlayerIndex];

    if (!currentPlayer) return null;

    const stats = calculateBasicStats(currentPlayer);
    const checkout = getCheckoutSuggestion(currentPlayer.score);

    // Get player color based on index
    const playerColor = dartsColors.players[currentPlayerIndex % dartsColors.players.length];

    // Determine background gradient based on player color
    const gradientBg = `linear-gradient(135deg, ${playerColor}15, ${playerColor}30)`;

    // Determine border color
    const borderColor = playerColor;

    return (
        <div
            className="mb-4 p-4 rounded-lg shadow-md border-2"
            style={{
                background: gradientBg,
                borderColor: borderColor
            }}
        >
            <div className="flex justify-between items-center mb-2">
                <div
                    className="text-xl font-bold px-3 py-1 rounded-full"
                    style={{
                        background: `${playerColor}`,
                        color: '#ffffff',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                >
                    {currentPlayer.name}&apos;s Turn
                </div>
                <div
                    className="text-3xl font-extrabold px-4 py-2 rounded-lg"
                    style={{
                        background: 'white',
                        color: playerColor,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                >
                    {currentPlayer.score}
                </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
                <div className="bg-white bg-opacity-70 p-2 rounded-lg font-medium text-center shadow-sm">
                    Avg: <span className="font-bold">{stats.average}</span>
                </div>
                <div className="bg-white bg-opacity-70 p-2 rounded-lg font-medium text-center shadow-sm">
                    High: <span className="font-bold">{stats.highest}</span>
                </div>
                <div className="bg-white bg-opacity-70 p-2 rounded-lg font-medium text-center shadow-sm">
                    Last: <span className="font-bold">{currentPlayer.throws.slice(-1)[0] || '-'}</span>
                </div>
                <div className="bg-white bg-opacity-70 p-2 rounded-lg font-medium text-center shadow-sm">
                    <span className="text-gray-500"># {currentPlayerIndex + 1}</span>
                </div>
            </div>
            {checkout && <CheckoutDisplay checkout={checkout} />}
        </div>
    );
};