import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X, RotateCcw, Trophy } from 'lucide-react';
import { useX01GameContext } from '../context/X01GameContext';
import { NumPad } from '../../common/components/NumPad';
import { CurrentPlayerCard } from './CurrentPlayerCard';
import { OtherPlayersGrid } from './OtherPlayersGrid';
import { CheckoutDartPrompt } from './CheckoutDartPrompt';
import { CelebrationAnimation } from '../../common/components/CelebrationAnimation';
import { quickScores } from '../utils/checkout-suggestions';
import { dartsColors } from '@/lib/theme';

export const X01Board: React.FC = () => {
    const {
        gameStarted,
        startingScore,
        setStartingScore,
        newPlayerName,
        setNewPlayerName,
        currentThrow,
        setCurrentThrow,
        winner,
        players,
        history,
        isProcessingInput,
        currentPlayerIndex,
        setIsProcessingInput,
        showResetConfirm,
        setShowResetConfirm,
        celebration,
        addPlayer,
        removePlayer,
        startGame,
        resetGame,
        handleThrow,
        handleUndo
    } = useX01GameContext();

    return (
        <Card className="w-full max-w-full sm:max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
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
                                className="w-32 border-2 border-blue-300 focus:border-blue-500"
                                min="101"
                                step="100"
                            />
                            <span className="font-semibold text-blue-800">Starting Score</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Input
                                value={newPlayerName}
                                onChange={(e) => setNewPlayerName(e.target.value)}
                                placeholder="Player name"
                                onKeyUp={(e) => e.key === 'Enter' && addPlayer()}
                                className="w-48 border-2 border-blue-300 focus:border-purple-500"
                            />
                            <Button
                                onClick={addPlayer}
                                disabled={players.length >= 9}
                                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
                            >
                                <Plus className="w-4 h-4 mr-2"/>
                                Add Player
                            </Button>
                        </div>

                        <div className="space-y-2">
                            {players.map((player, index) => (
                                <div key={index}
                                     className="flex items-center justify-between rounded-lg"
                                     style={{
                                         backgroundColor: `${dartsColors.players[index % dartsColors.players.length]}20`,
                                         borderLeft: `4px solid ${dartsColors.players[index % dartsColors.players.length]}`
                                     }}
                                >
                                    <span className="p-2 font-medium"
                                          style={{ color: dartsColors.players[index % dartsColors.players.length] }}>
                                        {player.name}
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removePlayer(index)}
                                        className="text-red-500 hover:text-red-700 hover:bg-red-100"
                                    >
                                        <X className="w-4 h-4"/>
                                    </Button>
                                </div>
                            ))}
                        </div>

                        <Button
                            onClick={startGame}
                            disabled={players.length < 1 || startingScore < 2}
                            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-lg font-bold py-3"
                        >
                            Start Game
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {winner ? (
                            <div className="text-center py-8 space-y-4">
                                <div className="relative w-24 h-24 mx-auto">
                                    <div className="absolute inset-0 rounded-full bg-gradient-rainbow opacity-20 animate-pulse"></div>
                                    <Trophy className="w-16 h-16 mx-auto text-yellow-500 relative z-10 drop-shadow-lg"/>
                                </div>
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
                                    {winner.name} Wins!
                                </h2>
                                <Button onClick={resetGame} className="bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600">
                                    New Game
                                </Button>
                            </div>
                        ) : (
                            <>
                                {/* Player display section */}
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
                                        className="text-2xl text-center h-16 border-2 border-blue-300 focus:border-purple-500 shadow-md"
                                        style={{
                                            appearance: 'textfield',
                                            MozAppearance: 'textfield'
                                        }}
                                    />
                                    <Button
                                        onClick={handleUndo}
                                        disabled={history.length === 0}
                                        variant="outline"
                                        className="h-16 w-32 border-2 border-amber-300 hover:bg-amber-100 text-amber-700"
                                    >
                                        <RotateCcw className="w-6 h-6"/>
                                    </Button>
                                </div>

                                <NumPad
                                    currentPlayerIndex={currentPlayerIndex}
                                    players={players}
                                    currentThrow={currentThrow}
                                    setCurrentThrow={setCurrentThrow}
                                    handleThrow={handleThrow}
                                    isProcessingInput={isProcessingInput}
                                    setIsProcessingInput={setIsProcessingInput}
                                    quickScores={quickScores}
                                />

                                <Button
                                    variant="outline"
                                    onClick={() => setShowResetConfirm(true)}
                                    className="mt-2 border-2 border-gray-300 hover:bg-gray-100 text-gray-700"
                                >
                                    Reset Game
                                </Button>

                                {/* Reset game confirmation dialog */}
                                {showResetConfirm && (
                                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full border-4 border-red-400">
                                            <h3 className="font-bold mb-4 text-red-600 text-lg">Reset Game?</h3>
                                            <p className="mb-4 text-gray-700">Are you sure you want to reset the game? All
                                                progress will be lost.</p>
                                            <div className="flex justify-end gap-2">
                                                <Button variant="outline"
                                                        onClick={() => setShowResetConfirm(false)}
                                                        className="border-2 border-gray-300 hover:bg-gray-100">
                                                    Cancel
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    onClick={() => {
                                                        resetGame();
                                                        setShowResetConfirm(false);
                                                    }}
                                                    className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
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
            <CheckoutDartPrompt />
            {celebration.show && <CelebrationAnimation celebration={celebration} />}
        </Card>
    );
};