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
                                <Plus className="w-4 h-4 mr-2"/>
                                Add Player
                            </Button>
                        </div>

                        <div className="space-y-2">
                            {players.map((player, index) => (
                                <div key={index}
                                     className="flex items-center justify-between bg-gray-100 p-2 rounded">
                                    <span>{player.name}</span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removePlayer(index)}
                                    >
                                        <X className="w-4 h-4"/>
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
                                <Trophy className="w-16 h-16 mx-auto text-yellow-500"/>
                                <h2 className="text-2xl font-bold">{winner.name} Wins!</h2>
                                <Button onClick={resetGame}>New Game</Button>
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
                                        className="text-2xl text-center h-16"
                                        style={{
                                            appearance: 'textfield',
                                            MozAppearance: 'textfield'
                                        }}
                                    />
                                    <Button
                                        onClick={handleUndo}
                                        disabled={history.length === 0}
                                        variant="outline"
                                        className="h-16 w-32"
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
                                    className="mt-2"
                                >
                                    Reset Game
                                </Button>

                                {/* Reset game confirmation dialog */}
                                {showResetConfirm && (
                                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                        <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
                                            <h3 className="font-bold mb-4">Reset Game?</h3>
                                            <p className="mb-4">Are you sure you want to reset the game? All
                                                progress will be lost.</p>
                                            <div className="flex justify-end gap-2">
                                                <Button variant="outline"
                                                        onClick={() => setShowResetConfirm(false)}>
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
            <CheckoutDartPrompt />
            {celebration.show && <CelebrationAnimation celebration={celebration} />}
        </Card>
    );
};
