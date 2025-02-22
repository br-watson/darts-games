import React from 'react';
import { Button } from '@/components/ui/button';
import { Trophy } from 'lucide-react';
import { calculateDetailedStats } from '../../common/utils/score-utils';
import { useX01GameContext } from '../context/X01GameContext';
import { calculateX01Stats } from '@/components/darts/x01/utils/checkout-suggestions';
import { dartsColors } from '@/lib/theme';

export const X01StatsScreen: React.FC = () => {
    const { players, startingScore, resetGame } = useX01GameContext();

    const sortedPlayers = [...players].sort((a, b) => a.score - b.score);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Game Statistics</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedPlayers.map((player, index) => {
                    const stats = calculateDetailedStats(player, startingScore);
                    const x01Stats = calculateX01Stats(player);
                    const isWinner = player.score === 0;

                    // Get player color
                    const playerColor = dartsColors.players[index % dartsColors.players.length];

                    // Card background and border
                    const cardStyle = isWinner
                        ? { background: '#fffde7', borderColor: '#ffd54f' }
                        : { background: 'white', borderColor: playerColor };

                    // Name tag style
                    const nameTagStyle = {
                        backgroundColor: isWinner ? '#fff9c4' : `${playerColor}20`,
                        color: isWinner ? '#b45309' : playerColor
                    };

                    return (
                        <div
                            key={index}
                            className="p-5 rounded-lg shadow border-2"
                            style={cardStyle}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3
                                    className="text-xl font-bold px-3 py-1 rounded-lg"
                                    style={nameTagStyle}
                                >
                                    {player.name}
                                </h3>
                                {isWinner && (
                                    <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-lg">
                                        <Trophy className="w-5 h-5 text-yellow-600 mr-2" />
                                        <span className="font-bold text-yellow-800">Winner</span>
                                    </div>
                                )}
                            </div>

                            <div className="rounded-lg overflow-hidden border border-gray-200">
                                <table className="w-full border-collapse">
                                    <tbody>
                                    <StatRow
                                        label="Score Left"
                                        value={player.score.toString()}
                                        isSpecial={isWinner}
                                        isFirst={true}
                                    />
                                    <StatRow
                                        label="Avg Per Dart"
                                        value={stats.pointsPerDart}
                                        valueColor="text-blue-700"
                                    />
                                    <StatRow
                                        label="Avg Per Throw"
                                        value={stats.average.toString()}
                                        valueColor="text-blue-700"
                                    />
                                    <StatRow
                                        label="Best 3 Darts"
                                        value={stats.highest.toString()}
                                        valueColor="text-blue-700"
                                    />
                                    <StatRow
                                        label="Worst 3 Darts"
                                        value={stats.lowest.toString()}
                                    />
                                    <StatRow
                                        label="100+ Throws"
                                        value={x01Stats.tons.toString()}
                                        valueColor={x01Stats.tons > 0 ? "text-blue-700" : ""}
                                    />
                                    <StatRow
                                        label="140+ Throws"
                                        value={x01Stats.ton40s.toString()}
                                        valueColor={x01Stats.ton40s > 0 ? "text-blue-700" : ""}
                                    />
                                    <StatRow
                                        label="180s"
                                        value={x01Stats.ton80s.toString()}
                                        valueColor={x01Stats.ton80s > 0 ? "text-blue-700" : ""}
                                    />
                                    <StatRow
                                        label="Darts Thrown"
                                        value={stats.dartsThrown.toString()}
                                    />

                                    {player.score === 0 && (
                                        <StatRow
                                            label="Checkout Dart"
                                            value={player.checkoutDart ?
                                                `${player.checkoutDart}${player.checkoutDart === 1 ? 'st' : player.checkoutDart === 2 ? 'nd' : 'rd'} dart` :
                                                'Unknown'
                                            }
                                            isSpecial={true}
                                            isLast={true}
                                        />
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-center mt-6">
                <Button
                    onClick={resetGame}
                    className="px-6 py-2 text-lg bg-blue-600 hover:bg-blue-700 text-white"
                >
                    Play Again
                </Button>
            </div>
        </div>
    );
};

// Helper component for stat rows
const StatRow: React.FC<{
    label: string,
    value: string,
    isSpecial?: boolean,
    isFirst?: boolean,
    isLast?: boolean,
    valueColor?: string
}> = ({
          label,
          value,
          isSpecial = false,
          isFirst = false,
          isLast = false,
          valueColor = ""
      }) => {
    // Row background
    let bgClass = "bg-white";

    if (isSpecial) {
        bgClass = "bg-yellow-50";
    } else if (isFirst) {
        bgClass = "bg-gray-50";
    }

    // Border classes
    const borderClass = isLast ? "" : "border-b border-gray-200";

    // Value color
    const textColorClass = valueColor || "text-gray-800";

    return (
        <tr className={`${bgClass} ${borderClass}`}>
            <td className="py-2 px-4 font-medium text-gray-800">{label}</td>
            <td className={`py-2 px-4 text-right font-bold ${textColorClass}`}>{value}</td>
        </tr>
    );
};