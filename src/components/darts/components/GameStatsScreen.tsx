import React from 'react';
import { Button } from '@/components/ui/button';
import { Trophy } from 'lucide-react';
import { calculateDetailedStats } from '../utils/score-utils';
import { useGameContext } from '@/components/darts/context/GameContext';

export const GameStatsScreen: React.FC = () => {
    const { players, startingScore, resetGame } = useGameContext();

    const sortedPlayers = [...players].sort((a, b) => a.score - b.score);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Game Statistics</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sortedPlayers.map((player, index) => {
                    const stats = calculateDetailedStats(player, startingScore);
                    const isWinner = player.score === 0;

                    return (
                        <div
                            key={index}
                            className={`p-4 rounded-lg shadow ${isWinner ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300' : 'bg-gray-50'}`}
                        >
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-xl font-bold">{player.name}</h3>
                                {isWinner && <Trophy className="w-6 h-6 text-yellow-500" />}
                            </div>

                            <div className="grid grid-cols-2 gap-y-2">
                                <div>Score Left:</div>
                                <div className="font-bold text-right">{player.score}</div>

                                <div>Avg Per Dart:</div>
                                <div className="font-bold text-right">{stats.pointsPerDart}</div>

                                <div>Avg Per Throw:</div>
                                <div className="font-bold text-right">{stats.average}</div>

                                <div>Best 3 Darts:</div>
                                <div className="font-bold text-right">{stats.highest}</div>

                                <div>Worst 3 Darts:</div>
                                <div className="font-bold text-right">{stats.lowest}</div>

                                <div>100+ Throws:</div>
                                <div className="font-bold text-right">{stats.tons}</div>

                                <div>140+ Throws:</div>
                                <div className="font-bold text-right">{stats.ton40s}</div>

                                <div>180s:</div>
                                <div className="font-bold text-right">{stats.ton80s}</div>

                                <div>Darts Thrown:</div>
                                <div className="font-bold text-right">{stats.dartsThrown}</div>

                                {player.score === 0 && (
                                    <>
                                        <div>Checkout Dart:</div>
                                        <div className="font-bold text-right">
                                            {player.checkoutDart ?
                                                `${player.checkoutDart}${player.checkoutDart === 1 ? 'st' : player.checkoutDart === 2 ? 'nd' : 'rd'} dart` :
                                                'Unknown'}
                                        </div>
                                    </>
                                )}
                            </div>
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