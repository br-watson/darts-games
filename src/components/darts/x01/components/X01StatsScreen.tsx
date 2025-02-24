import React from 'react';
import { Button } from '@/components/ui/button';
import { Trophy } from 'lucide-react';
import { calculateDetailedStats } from '../../common/utils/score-utils';
import { useX01GameContext } from '../context/X01GameContext';
import { calculateX01Stats } from '@/components/darts/x01/utils/checkout-suggestions';
import { usePlayerProfiles } from '../context/PlayerProfileContext';

export const X01StatsScreen: React.FC = () => {
    const { players, startingScore, resetGame } = useX01GameContext();
    const { profiles } = usePlayerProfiles();

    const sortedPlayers = [...players].sort((a, b) => a.score - b.score);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Game Statistics</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sortedPlayers.map((player, index) => {
                    const stats = calculateDetailedStats(player, startingScore);
                    const x01Stats = calculateX01Stats(player);
                    const isWinner = player.score === 0;

                    const playerProfile = profiles.find(
                        (p) => p.name === player.name,
                    );

                    return (
                        <div
                            key={index}
                            className={`p-4 rounded-lg shadow ${isWinner ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300' : 'bg-gray-50'}`}
                        >
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-xl font-bold">
                                    {player.name}
                                </h3>
                                {isWinner && (
                                    <Trophy className="w-6 h-6 text-yellow-500" />
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-y-2">
                                <div>Score Left:</div>
                                <div className="font-bold text-right">
                                    {player.score}
                                </div>

                                <div>Avg Per Dart:</div>
                                <div className="font-bold text-right">
                                    {stats.averagePerDart.toFixed(2)}
                                </div>

                                <div>3-Dart Average:</div>
                                <div className="font-bold text-right">
                                    {stats.averageThrow.toFixed(2)}
                                </div>

                                <div>Best 3 Darts:</div>
                                <div className="font-bold text-right">
                                    {stats.highestThrow}
                                </div>

                                <div>Worst 3 Darts:</div>
                                <div className="font-bold text-right">
                                    {stats.lowestThrow}
                                </div>

                                <div>100+ Throws:</div>
                                <div className="font-bold text-right">
                                    {x01Stats.tons}
                                </div>

                                <div>140+ Throws:</div>
                                <div className="font-bold text-right">
                                    {x01Stats.ton40s}
                                </div>

                                <div>180s:</div>
                                <div className="font-bold text-right">
                                    {x01Stats.ton80s}
                                </div>

                                <div>Darts Thrown:</div>
                                <div className="font-bold text-right">
                                    {stats.totalThrows}
                                </div>

                                {player.score === 0 && (
                                    <>
                                        <div>Checkout Dart:</div>
                                        <div className="font-bold text-right">
                                            {player.checkoutDart
                                                ? `${player.checkoutDart}${player.checkoutDart === 1 ? 'st' : player.checkoutDart === 2 ? 'nd' : 'rd'} dart`
                                                : 'Unknown'}
                                        </div>
                                    </>
                                )}
                            </div>

                            {playerProfile && (
                                <div className="mt-4 pt-4 border-t">
                                    <h4 className="font-semibold mb-2">
                                        Career Stats
                                    </h4>
                                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                                        <div>Games Played:</div>
                                        <div className="text-right">
                                            {playerProfile.stats.gamesPlayed}
                                        </div>

                                        <div>Games Won:</div>
                                        <div className="text-right">
                                            {playerProfile.stats.gamesWon}
                                        </div>

                                        <div>Win Rate:</div>
                                        <div className="text-right">
                                            {(
                                                (playerProfile.stats.gamesWon /
                                                    playerProfile.stats
                                                        .gamesPlayed) *
                                                100
                                            ).toFixed(1)}
                                            %
                                        </div>

                                        <div>3-Dart Avg:</div>
                                        <div className="text-right">
                                            {playerProfile.stats.averageThrow.toFixed(
                                                2,
                                            )}
                                        </div>

                                        <div>Per Dart Avg:</div>
                                        <div className="text-right">
                                            {playerProfile.stats.averagePerDart.toFixed(
                                                2,
                                            )}
                                        </div>

                                        <div>Highest Throw:</div>
                                        <div className="text-right">
                                            {playerProfile.stats.highestThrow}
                                        </div>

                                        <div>Worst Throw:</div>
                                        <div className="text-right">
                                            {playerProfile.stats.lowestThrow}
                                        </div>

                                        <div>Total 180s:</div>
                                        <div className="text-right">
                                            {playerProfile.stats.ton80s}
                                        </div>

                                        <div>Darts thrown:</div>
                                        <div className="text-right">
                                            {playerProfile.stats.totalThrows}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-center mt-6">
                <Button onClick={resetGame} className="px-6">
                    Play Again
                </Button>
            </div>
        </div>
    );
};
