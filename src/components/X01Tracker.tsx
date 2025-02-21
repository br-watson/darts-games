'use client'

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X, Trophy, RotateCcw } from 'lucide-react';

interface Player {
    name: string;
    score: number;
    throws: number[];
}

interface HistoryState {
    players: Player[];
    currentPlayerIndex: number;
}

export const X01Tracker = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [startingScore, setStartingScore] = useState(501);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [newPlayerName, setNewPlayerName] = useState('');
    const [currentThrow, setCurrentThrow] = useState('');
    const [winner, setWinner] = useState<Player | null>(null);
    const [players, setPlayers] = useState<Player[]>([]);
    const [history, setHistory] = useState<HistoryState[]>([]);

    // Calculate valid three-dart scores
    const validThreeDartScores = new Set();
    for (let i = 0; i <= 180; i++) {
        if (isValidThreeDartScore(i)) {
            validThreeDartScores.add(i);
        }
    }

    const quickScores = [60, 41, 26, 22, 11, 7];

    const handleKeyPress = (e: { key: string; }) => {
        // Only allow if game is started and no winner
        if (!gameStarted || winner) return;

        if (e.key === 'Enter') {
            handleThrow(parseInt(currentThrow));
        } else if (e.key === 'Backspace') {
            setCurrentThrow(prev => prev.slice(0, -1));
        }
    };

    // Add useEffect for keyboard listener
    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [currentThrow, gameStarted, winner]);

    function isValidThreeDartScore(score: number) {
        // Special case handling
        if (score > 180) return false;
        if (score === 179 || score === 178 || score === 176) return false;
        if (score === 175 || score === 173 || score === 172) return false;
        return score !== 169;
    }

    const calculateStats = (player: Player) => {
        if (!player.throws.length) return { average: 0, highest: 0 };

        const average = player.throws.reduce((a, b) => a + b, 0) / player.throws.length;
        const highest = Math.max(...player.throws);
        const throwsNeeded = Math.ceil((startingScore - player.score) / 3);

        return {
            average: average.toFixed(1),
            highest,
            throwsNeeded
        };
    };

    const addPlayer = () => {
        if (newPlayerName.trim() && players.length < 10 && !gameStarted) {
            setPlayers([...players, {
                name: newPlayerName.trim(),
                score: startingScore,
                throws: []
            }]);
            setNewPlayerName('');
        }
    };

    const removePlayer = (index: number) => {
        if (!gameStarted) {
            setPlayers(players.filter((_, i) => i !== index));
        }
    };

    const startGame = () => {
        if (players.length >= 1) {
            setGameStarted(true);
            setHistory([]);
        }
    };

    const resetGame = () => {
        setGameStarted(false);
        setPlayers(players.map(player => ({
            ...player,
            score: startingScore,
            throws: []
        })));
        setCurrentPlayerIndex(0);
        setWinner(null);
        setCurrentThrow('');
        setHistory([]);
    };

    const handleThrow = (score: number | string) => {
        const throwScore = typeof score === 'number' ? score : parseInt(currentThrow);
        if (!validThreeDartScores.has(throwScore)) {
            return;
        }

        const updatedPlayers = [...players];
        const currentPlayer = updatedPlayers[currentPlayerIndex];
        const newScore = currentPlayer.score - throwScore;

        if (newScore < 0) {
            setCurrentThrow('');
            return;
        }

        // Save state for undo
        setHistory([...history, {
            players: JSON.parse(JSON.stringify(players)),
            currentPlayerIndex
        }]);

        currentPlayer.throws.push(throwScore);
        currentPlayer.score = newScore;

        if (newScore === 0) {
            setWinner(currentPlayer);
        } else {
            setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
        }

        setPlayers(updatedPlayers);
        setCurrentThrow('');
    };

    const handleUndo = () => {
        if (history.length > 0) {
            const lastState = history[history.length - 1];
            setPlayers(lastState.players);
            setCurrentPlayerIndex(lastState.currentPlayerIndex);
            setHistory(history.slice(0, -1));
            setWinner(null);
        }
    };

    const NumPad = () => {
        const buttons = [
            [7, 8, 9],
            [4, 5, 6],
            [1, 2, 3],
            ['←', 0, 'Enter']
        ];

        return (
            <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                    {buttons.map((row, i) => (
                        row.map((btn, j) => (
                            <Button
                                key={`${i}-${j}`}
                                className="h-16 text-2xl"
                                variant={btn === 'Enter' ? "default" : "outline"}
                                onClick={() => {
                                    if (btn === '←') {
                                        setCurrentThrow(prev => prev.slice(0, -1));
                                    } else if (btn === 'Enter') {
                                        handleThrow(parseInt(currentThrow));
                                    } else if (currentThrow.length < 3) {
                                        setCurrentThrow(currentThrow + btn.toString());
                                    }
                                }}
                            >
                                {btn}
                            </Button>
                        ))
                    ))}
                </div>

                <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
                    {quickScores.map(score => (
                        <Button
                            key={score}
                            variant="outline"
                            className="h-12"
                            onClick={() => handleThrow(score)}
                        >
                            {score}
                        </Button>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle className="text-2xl">X01 Darts Tracker</CardTitle>
            </CardHeader>
            <CardContent>
                {!gameStarted ? (
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <Input
                                type="number"
                                value={startingScore}
                                onChange={(e) => setStartingScore(parseInt(e.target.value))}
                                className="w-32"
                                min="101"
                                step="100"
                            />
                            <span>Starting Score</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Input
                                value={newPlayerName}
                                onChange={(e) => setNewPlayerName(e.target.value)}
                                placeholder="Player name"
                                onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
                                className="w-48"
                            />
                            <Button
                                onClick={addPlayer}
                                disabled={players.length >= 10}
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Player
                            </Button>
                        </div>

                        <div className="space-y-2">
                            {players.map((player, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                                    <span>{player.name}</span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removePlayer(index)}
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>

                        <Button
                            onClick={startGame}
                            disabled={players.length < 1}
                            className="w-full"
                        >
                            Start Game
                        </Button>
                    </div>                    ) : (
                    <div className="space-y-4">
                        {winner ? (
                            <div className="text-center py-8 space-y-4">
                                <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
                                <h2 className="text-2xl font-bold">{winner.name} Wins!</h2>
                                <Button onClick={resetGame}>New Game</Button>
                            </div>                            ) : (
                            <>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    {players.map((player, index) => {
                                        const stats = calculateStats(player);
                                        return (
                                            <Card key={index} className={`p-2 ${index === currentPlayerIndex ? 'ring-2 ring-blue-500' : ''}`}>
                                                <div className="font-bold text-sm">{player.name}</div>
                                                <div className="text-xl font-bold">{player.score}</div>
                                                <div className="text-xs text-gray-500">
                                                    Last: {player.throws.slice(-1)[0] || '-'}
                                                </div>
                                                <div className="text-xs mt-1">
                                                    <div>Avg: {stats.average}</div>
                                                    <div>High: {stats.highest}</div>
                                                </div>
                                            </Card>
                                        );
                                    })}
                                </div>

                                <div className="flex flex-col items-center gap-4">
                                    <div className="text-xl font-bold">
                                        {players[currentPlayerIndex].name}'s Turn
                                    </div>

                                    <div className="flex items-center gap-2 w-full max-w-md">
                                        <Input
                                            value={currentThrow}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/[^0-9]/g, '');
                                                if (value.length <= 3) {
                                                    setCurrentThrow(value);
                                                }
                                            }}
                                            placeholder="Score (0-180)"
                                            className="text-2xl text-center h-16"
                                            style={{
                                                appearance: 'textfield',
                                                MozAppearance: 'textfield'
                                            }}
                                        />
                                        <Button
                                            onClick={() => handleUndo()}
                                            disabled={history.length === 0}
                                            variant="outline"
                                            className="h-16 w-16"
                                        >
                                            <RotateCcw className="w-6 h-6" />
                                        </Button>
                                    </div>

                                    <NumPad />

                                    <Button variant="outline" onClick={resetGame} className="mt-2">
                                        Reset Game
                                    </Button>
                                </div>
                            </>
                            )}
                    </div>
                    )}
            </CardContent>
        </Card>
    );
};
