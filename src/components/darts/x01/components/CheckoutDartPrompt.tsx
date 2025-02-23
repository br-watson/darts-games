import React from 'react';
import { Button } from '@/components/ui/button';
import { useX01GameContext } from '../context/X01GameContext';
import { usePlayerProfiles } from '@/components/darts/x01/context/PlayerProfileContext';

export const CheckoutDartPrompt: React.FC = () => {
    const {
        checkoutDartPrompt,
        players,
        startingScore,
        setPlayers,
        setWinner,
        setCheckoutDartPrompt,
    } = useX01GameContext();
    const { profiles, updatePlayerStats } = usePlayerProfiles();

    if (!checkoutDartPrompt || !checkoutDartPrompt.show) return null;

    const handleDartSelection = (dartNumber: 1 | 2 | 3) => {
        const updatedPlayers = [...players];
        updatedPlayers[checkoutDartPrompt.playerIndex].checkoutDart =
            dartNumber;

        players.forEach((player, idx) => {
            const dartsThrown =
                (player.throws.length - 1) * 3 +
                (idx === checkoutDartPrompt.playerIndex ? dartNumber : 3);

            const totalScore = startingScore - player.score;
            const totalThrows = player.throws.length;

            const averagePerThrow =
                totalThrows > 0
                    ? player.throws.reduce((a, b) => a + b, 0) / totalThrows
                    : 0;

            const averagePerDart =
                dartsThrown > 0 ? totalScore / dartsThrown : 0;

            const gameStats = {
                gamesPlayed: 1,
                gamesWon: idx === checkoutDartPrompt.playerIndex ? 1 : 0,
                highestThrow: Math.max(...player.throws, 0),
                ton80s: player.throws.filter((t) => t === 180).length,
                ton40s: player.throws.filter((t) => t >= 140 && t < 180).length,
                tons: player.throws.filter((t) => t >= 100 && t < 140).length,
                averageThrow: averagePerThrow,
                averagePerDart: averagePerDart,
                totalThrows: dartsThrown,
            };

            const playerProfile = profiles.find((p) => p.name === player.name);
            if (playerProfile) {
                updatePlayerStats(playerProfile.id, gameStats);
            }
        });

        setPlayers(updatedPlayers);
        setWinner(updatedPlayers[checkoutDartPrompt.playerIndex]);
        setCheckoutDartPrompt(null);
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
