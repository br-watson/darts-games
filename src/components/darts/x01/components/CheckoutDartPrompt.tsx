import React from 'react';
import { Button } from '@/components/ui/button';
import { useX01GameContext } from '../context/X01GameContext';
import { usePlayerProfiles } from '@/components/darts/x01/context/PlayerProfileContext';
import { PlayerStats } from '@/components/darts/x01/types/player-profile';
import { calculateX01Stats } from '@/components/darts/x01/utils/checkout-suggestions';
import { calculateDetailedStats } from '@/components/darts/common/utils/score-utils';

export const CheckoutDartPrompt: React.FC = () => {
    const {
        checkoutDartPrompt,
        players,
        startingScore,
        setPlayers,
        setWinner,
        setCheckoutDartPrompt,
        setWinningCelebration,
    } = useX01GameContext();
    const { profiles, updatePlayerStats } = usePlayerProfiles();

    if (!checkoutDartPrompt || !checkoutDartPrompt.show) return null;

    const handleDartSelection = (dartNumber: 1 | 2 | 3) => {
        const updatedPlayers = [...players];
        updatedPlayers[checkoutDartPrompt.playerIndex].checkoutDart = dartNumber;

        players.forEach((player, idx) => {
            const x01Stats = calculateX01Stats(player);
            const stats = calculateDetailedStats(player, startingScore);

            const gameStats: Partial<PlayerStats> = {
                gamesPlayed: 1,
                gamesWon: idx === checkoutDartPrompt.playerIndex ? 1 : 0,
                ...stats,
                ...x01Stats,
            };

            const playerProfile = profiles.find((p) => p.name === player.name);
            if (playerProfile) {
                updatePlayerStats(playerProfile.id, gameStats);
            }
        });

        setPlayers(updatedPlayers);

        setCheckoutDartPrompt(null);

        const winningPlayer = updatedPlayers[checkoutDartPrompt.playerIndex];
        setWinningCelebration({
            playerName: winningPlayer.name,
            checkoutDart: dartNumber,
            playerIndex: checkoutDartPrompt.playerIndex,
            show: true
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
                <h3 className="font-bold text-lg mb-4">
                    Which dart did you checkout with?
                </h3>
                <div className="grid grid-cols-3 gap-2 mb-4">
                    <Button onClick={() => handleDartSelection(1)}>
                        First Dart
                    </Button>
                    <Button onClick={() => handleDartSelection(2)}>
                        Second Dart
                    </Button>
                    <Button onClick={() => handleDartSelection(3)}>
                        Third Dart
                    </Button>
                </div>
            </div>
        </div>
    );
};
