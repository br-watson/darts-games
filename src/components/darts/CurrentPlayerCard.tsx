import React from 'react';
import { useGameContext } from '../context/GameContext';
import { calculateStats } from '../score-utils';
import { getCheckoutSuggestion } from '../checkout-suggestions';
import { CheckoutDisplay } from './CheckoutDisplay';

export const CurrentPlayerCard: React.FC = () => {
    const { players, currentPlayerIndex } = useGameContext();
    const currentPlayer = players[currentPlayerIndex];

    if (!currentPlayer) return null;

    const stats = calculateStats(currentPlayer);
    const checkout = getCheckoutSuggestion(currentPlayer.score);

    return (
        <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex justify-between items-center mb-2">
                <div className="text-xl font-bold">{currentPlayer.name}'s Turn</div>
                <div className="text-2xl font-extrabold">{currentPlayer.score}</div>
            </div>
            <div className="grid grid-cols-4 gap-2 text-sm">
                <div>Avg: {stats.average}</div>
                <div className="text-center">High: {stats.highest}</div>
                <div className="text-right">Last: {currentPlayer.throws.slice(-1)[0] || '-'}</div>
                <div className="text-right text-gray-400">{currentPlayerIndex + 1}</div>
            </div>
            {checkout && <CheckoutDisplay checkout={checkout} />}
        </div>
    );
};