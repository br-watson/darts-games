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

interface CelebrationState {
    show: boolean;
    message: string;
}

export const X01Tracker = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [startingScore, setStartingScore] = useState<number>(501);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [newPlayerName, setNewPlayerName] = useState('');
    const [currentThrow, setCurrentThrow] = useState('');
    const [winner, setWinner] = useState<Player | null>(null);
    const [players, setPlayers] = useState<Player[]>([]);
    const [history, setHistory] = useState<HistoryState[]>([]);
    const [isProcessingInput, setIsProcessingInput] = useState(false);
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const [celebration, setCelebration] = useState<CelebrationState>({
        show: false,
        message: ''
    });

    const triggerCelebration = (message: string) => {
        setCelebration({ show: true, message });
        setTimeout(() => {
            setCelebration({ show: false, message: '' });
        }, 3000);
    };

    const getCheckoutSuggestion = (score: number): string => {
        // Common checkout routes
        const checkouts: Record<number, string> = {
            170: "T20 T20 Bull",
            167: "T20 T19 Bull",
            164: "T20 T18 Bull",
            161: "T20 T17 Bull",
            160: "T20 T20 D20",
            158: "T20 T20 D19",
            157: "T20 T19 D20",
            156: "T20 T20 D18",
            155: "T20 T19 D19",
            154: "T20 T18 D20",
            153: "T20 T19 D18",
            152: "T20 T20 D16",
            151: "T20 T17 D20",
            150: "T20 T18 D18",
            149: "T20 T19 D16",
            148: "T20 T16 D20",
            147: "T20 T17 D18",
            146: "T20 T18 D16",
            145: "T20 T15 D20",
            144: "T20 T20 D12",
            143: "T20 T17 D16",
            142: "T20 T14 D20",
            141: "T20 T19 D12",
            140: "T20 T20 D10",
            139: "T20 T13 D20",
            138: "T20 T18 D12",
            137: "T20 T19 D10",
            136: "T20 T20 D8",
            135: "T20 T17 D12",
            134: "T20 T14 D16",
            133: "T20 T19 D8",
            132: "T20 T16 D12",
            131: "T20 T13 D16",
            130: "T20 T18 D8",
            129: "T19 T16 D12",
            128: "T20 T20 D4",
            127: "T20 T17 D8",
            126: "T19 T19 D6",
            125: "T20 T19 D4",
            124: "T20 T16 D8",
            123: "T19 T16 D9",
            122: "T18 T20 D4",
            121: "T20 T11 D14",
            120: "T20 20 D20",
            119: "T19 T10 D16",
            118: "T20 18 D20",
            117: "T20 17 D20",
            116: "T20 16 D20",
            115: "T20 15 D20",
            114: "T20 14 D20",
            113: "T20 13 D20",
            112: "T20 12 D20",
            111: "T20 11 D20",
            110: "T20 10 D20",
            109: "T20 9 D20",
            108: "T20 8 D20",
            107: "T19 10 D20",
            106: "T20 6 D20",
            105: "T20 5 D20",
            104: "T20 4 D20",
            103: "T20 3 D20",
            102: "T20 2 D20",
            101: "T20 1 D20",
            100: "T20 D20",
            99: "T19 10 D16",
            98: "T20 D19",
            97: "T19 D20",
            96: "T20 D18",
            95: "T19 D19",
            94: "T18 D20",
            93: "T19 D18",
            92: "T20 D16",
            91: "T17 D20",
            90: "T18 D18",
            89: "T19 D16",
            88: "T16 D20",
            87: "T17 D18",
            86: "T18 D16",
            85: "T15 D20",
            84: "T20 D12",
            83: "T17 D16",
            82: "T14 D20",
            81: "T19 D12",
            80: "T20 D10",
            79: "T13 D20",
            78: "T18 D12",
            77: "T19 D10",
            76: "T20 D8",
            75: "T17 D12",
            74: "T14 D16",
            73: "T19 D8",
            72: "T16 D12",
            71: "T13 D16",
            70: "T18 D8",
            69: "T19 D6",
            68: "T20 D4",
            67: "T17 D8",
            66: "T10 D18",
            65: "T19 D4",
            64: "T16 D8",
            63: "T13 D12",
            62: "T10 D16",
            61: "T15 D8",
            60: "20 D20",
            59: "19 D20",
            58: "18 D20",
            57: "17 D20",
            56: "16 D20",
            55: "15 D20",
            54: "14 D20",
            53: "13 D20",
            52: "12 D20",
            51: "11 D20",
            50: "10 D20",
            49: "9 D20",
            48: "8 D20",
            47: "15 D16",
            46: "6 D20",
            45: "5 D20",
            44: "4 D20",
            43: "3 D20",
            42: "10 D16",
            41: "9 D16",
            40: "D20",
            39: "7 D16",
            38: "D19",
            37: "5 D16",
            36: "D18",
            35: "3 D16",
            34: "D17",
            33: "1 D16",
            32: "D16",
            31: "15 D8",
            30: "D15",
            29: "13 D8",
            28: "D14",
            27: "11 D8",
            26: "D13",
            25: "9 D8",
            24: "D12",
            23: "7 D8",
            22: "D11",
            21: "5 D8",
            20: "D10",
            19: "3 D8",
            18: "D9",
            17: "1 D8",
            16: "D8",
            15: "7 D4",
            14: "D7",
            13: "5 D4",
            12: "D6",
            11: "3 D4",
            10: "D5",
            9: "1 D4",
            8: "D4",
            7: "3 D2",
            6: "D3",
            5: "1 D2",
            4: "D2",
            3: "1 D1",
            2: "D1"
        };

        return checkouts[score] || "";
    };

    // Calculate valid three-dart scores
    const validThreeDartScores = new Set();
    for (let i = 0; i <= 180; i++) {
        if (isValidThreeDartScore(i)) {
            validThreeDartScores.add(i);
        }
    }

    const quickScores = [60, 41, 26, 22, 11, 7];

    // Add useEffect for keyboard listener
    React.useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (isProcessingInput) return;
            if (!gameStarted || winner) return;

            if (e.key === 'Enter') {
                handleThrow(parseInt(currentThrow));
            } else if (e.key === 'Backspace') {
                setCurrentThrow(prev => prev.slice(0, -1));
            }
        };

        document.addEventListener('keydown', handler);
        return () => {
            document.removeEventListener('keydown', handler);
        };
    }, [currentThrow, gameStarted, winner, isProcessingInput]);

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
        if (newPlayerName.trim() && players.length < 9 && !gameStarted) {
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

        // Check for invalid scores - can't go to 1 or negative
        if (newScore < 0 || newScore === 1) {
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

        if (throwScore === 26) {
            triggerCelebration(`${currentPlayer.name} hit a perfect 26!`);
        }

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

    const CelebrationAnimation = () => {
        if (!celebration.show) return null;

        return (
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                <div className="relative">
                    {/* Background */}
                    <div className="absolute inset-0 bg-yellow-400 opacity-70 rounded-lg blur-sm"></div>

                    {/* Wacky confetti */}
                    <div className="absolute -top-8 -left-8 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                    <div className="absolute -top-12 left-0 w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
                    <div className="absolute -top-10 left-8 w-5 h-5 bg-green-500 rounded-full animate-ping"></div>
                    <div className="absolute -top-6 -right-8 w-4 h-4 bg-purple-500 rounded-full animate-ping"></div>
                    <div className="absolute -top-12 right-0 w-6 h-6 bg-pink-500 rounded-full animate-ping"></div>
                    <div className="absolute -top-10 right-8 w-3 h-3 bg-indigo-500 rounded-full animate-ping"></div>

                    <div className="absolute -bottom-8 -left-8 w-5 h-5 bg-red-400 rounded-full animate-ping"></div>
                    <div className="absolute -bottom-12 left-0 w-4 h-4 bg-blue-400 rounded-full animate-ping"></div>
                    <div className="absolute -bottom-10 left-8 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                    <div className="absolute -bottom-6 -right-8 w-5 h-5 bg-purple-400 rounded-full animate-ping"></div>
                    <div className="absolute -bottom-12 right-0 w-3 h-3 bg-pink-400 rounded-full animate-ping"></div>
                    <div className="absolute -bottom-10 right-8 w-4 h-4 bg-indigo-400 rounded-full animate-ping"></div>

                    {/* Main content */}
                    <div className="relative bg-yellow-400 bg-opacity-80 text-black font-bold text-2xl p-6 rounded-lg shadow-lg animate-bounce border-2 border-yellow-600">
                        {celebration.message}
                    </div>
                </div>
            </div>
        );
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
                <div className="grid grid-cols-3 gap-2 max-w-full mx-auto">
                    {buttons.map((row, i) => (
                        row.map((btn, j) => (
                            <Button
                                key={`${i}-${j}`}
                                className="h-16 text-2xl"
                                variant={btn === 'Enter' ? "default" : "outline"}
                                onClick={() => {
                                    if (isProcessingInput) return;
                                    setIsProcessingInput(true);

                                    if (btn === '←') {
                                        setCurrentThrow(prev => prev.slice(0, -1));
                                    } else if (btn === 'Enter') {
                                        handleThrow(parseInt(currentThrow));
                                    } else if (currentThrow.length < 3) {
                                        setCurrentThrow(currentThrow + btn.toString());
                                    }

                                    setTimeout(() => setIsProcessingInput(false), 100);
                                }}
                            >
                                {btn}
                            </Button>
                        ))
                    ))}
                </div>

                <div className="grid grid-cols-3 gap-2 max-w-full mx-auto">
                    {quickScores.map(score => (
                        <Button
                            key={score}
                            variant="outline"
                            className="h-12"
                            onClick={() => {
                                if (isProcessingInput) return;
                                setIsProcessingInput(true);
                                handleThrow(score);
                                setTimeout(() => setIsProcessingInput(false), 100);
                            }}
                        >
                            {score}
                        </Button>
                    ))}
                </div>
            </div>
        );
    };

    // Render active player (current player)
    const CurrentPlayerCard = () => {
        const currentPlayer = players[currentPlayerIndex];
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
                {checkout && (
                    <div className="mt-2 p-1 bg-green-100 text-green-800 text-sm font-medium rounded">
                        Checkout: {checkout}
                    </div>
                )}
            </div>
        );
    };

    // Render other players in a compact grid
    const OtherPlayersGrid = () => {
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

    return (
        <Card className="w-full max-w-full sm:max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-xl font-extrabold text-center">X01 Darts Tracker</CardTitle>
            </CardHeader>
            <CardContent>
                {!gameStarted ? (
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <Input
                                type="number"
                                value={startingScore}
                                onChange={(e) => {
                                    if (!isNaN(parseInt(e.target.value))) setStartingScore(parseInt(e.target.value));
                                    else setStartingScore(0);
                                }}
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
                                onKeyUp={(e) => e.key === 'Enter' && addPlayer()}
                                className="w-48"
                            />
                            <Button
                                onClick={addPlayer}
                                disabled={players.length >= 9}
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
                            disabled={players.length < 1 || startingScore < 2}
                            className="w-full"
                        >
                            Start Game
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {winner ? (
                            <div className="text-center py-8 space-y-4">
                                <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
                                <h2 className="text-2xl font-bold">{winner.name} Wins!</h2>
                                <Button onClick={resetGame}>New Game</Button>
                            </div>
                        ) : (
                            <>
                                {/* Updated player display section */}
                                <CurrentPlayerCard />
                                <OtherPlayersGrid />

                                <div className="flex items-center gap-2 w-full max-w-full mx-auto">
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
                                        className="h-16 w-32"
                                    >
                                        <RotateCcw className="w-6 h-6" />
                                    </Button>
                                </div>

                                <NumPad />

                                <Button
                                    variant="outline"
                                    onClick={() => setShowResetConfirm(true)}
                                    className="mt-2"
                                >
                                    Reset Game
                                </Button>

                                {/* Add this confirmation dialog */}
                                {showResetConfirm && (
                                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                        <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
                                            <h3 className="font-bold mb-4">Reset Game?</h3>
                                            <p className="mb-4">Are you sure you want to reset the game? All progress will be lost.</p>
                                            <div className="flex justify-end gap-2">
                                                <Button variant="outline" onClick={() => setShowResetConfirm(false)}>
                                                    Cancel
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    onClick={() => {
                                                        resetGame();
                                                        setShowResetConfirm(false);
                                                    }}
                                                >
                                                    Reset
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}
            </CardContent>
            {celebration.show && <CelebrationAnimation />}
        </Card>
    );
};