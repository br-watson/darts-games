import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RotateCcw, Trophy, Trash2 } from 'lucide-react';
import { useX01GameContext } from '../context/X01GameContext';
import { NumPad } from '../../common/components/NumPad';
import { CurrentPlayerCard } from './CurrentPlayerCard';
import { OtherPlayersGrid } from './OtherPlayersGrid';
import { CheckoutDartPrompt } from './CheckoutDartPrompt';
import { CelebrationAnimation } from '../../common/components/CelebrationAnimation';
import { quickScores } from '../utils/checkout-suggestions';
import { usePlayerProfiles } from '../context/PlayerProfileContext';
import { PlayerProfileManagement } from './PlayerProfileManagement';

export const X01Board: React.FC = () => {
    const {
        gameStarted,
        startingScore,
        setStartingScore,
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
        startGame,
        resetGame,
        handleThrow,
        handleUndo,
        setPlayers,
        showClearDataConfirm,
        setShowClearDataConfirm,
        clearGameData,
    } = useX01GameContext();

    const { profiles } = usePlayerProfiles();

    return (
        <Card className="w-full max-w-full sm:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
            <CardHeader className="relative">
                <CardTitle className="text-xl font-extrabold">
                    X01 Darts Tracker
                </CardTitle>
                {!gameStarted &&
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowClearDataConfirm(true)}
                        className="text-red-500 hover:text-red-700 absolute right-6 top-3"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                }
            </CardHeader>
            <CardContent>
                {!gameStarted ? (
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <Input
                                type="number"
                                value={startingScore}
                                onChange={(e) => {
                                    if (!isNaN(parseInt(e.target.value)))
                                        setStartingScore(
                                            parseInt(e.target.value),
                                        );
                                    else setStartingScore(0);
                                }}
                                className="w-32"
                                min="101"
                                step="100"
                            />
                            <span>Starting Score</span>
                        </div>

                        {showClearDataConfirm && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
                                    <h3 className="font-bold mb-4">
                                        Clear All Game Data?
                                    </h3>
                                    <p className="mb-4">
                                        This will clear all saved players and
                                        game history. This action cannot be
                                        undone.
                                    </p>
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                setShowClearDataConfirm(false)
                                            }
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            onClick={clearGameData}
                                        >
                                            Clear Data
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Select Players from Profiles */}
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold">
                                Select Players
                            </h3>
                            {profiles.map((profile) => {
                                const isSelected = players.some(
                                    (p) => p.name === profile.name,
                                );
                                return (
                                    <div
                                        key={profile.id}
                                        className={`flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-100 
                    ${isSelected ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50'}`}
                                        onClick={() => {
                                            if (isSelected) {
                                                // Remove player
                                                const playerIndex =
                                                    players.findIndex(
                                                        (p) =>
                                                            p.name ===
                                                            profile.name,
                                                    );
                                                if (playerIndex !== -1) {
                                                    const newPlayers = [
                                                        ...players,
                                                    ];
                                                    newPlayers.splice(
                                                        playerIndex,
                                                        1,
                                                    );
                                                    setPlayers(newPlayers);
                                                }
                                            } else {
                                                // Add player
                                                if (
                                                    !players.some(
                                                        (p) =>
                                                            p.name ===
                                                            profile.name,
                                                    )
                                                ) {
                                                    addPlayer(profile.name);
                                                }
                                            }
                                        }}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div
                                                className={`w-4 h-4 rounded-full border-2 
                        ${isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}
                                            />
                                            <span>{profile.name}</span>
                                        </div>
                                        <span className="text-sm text-gray-500">
                                            Games: {profile.stats.gamesPlayed} |
                                            Wins: {profile.stats.gamesWon}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        <Button
                            onClick={startGame}
                            disabled={players.length < 1 || startingScore < 2}
                            className="w-full"
                        >
                            Start Game
                        </Button>

                        {/* Add player profile management */}
                        <div className="mt-12">
                            <PlayerProfileManagement />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {winner ? (
                            <div className="text-center py-8 space-y-4">
                                <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
                                <h2 className="text-2xl font-bold">
                                    {winner.name} Wins!
                                </h2>
                                <Button onClick={resetGame}>New Game</Button>
                            </div>
                        ) : (
                            <>
                                <CurrentPlayerCard />
                                <OtherPlayersGrid />

                                <div className="flex items-center gap-2 w-full max-w-full mx-auto">
                                    <Input
                                        value={currentThrow}
                                        onChange={(e) => {
                                            const value =
                                                e.target.value.replace(
                                                    /[^0-9]/g,
                                                    '',
                                                );
                                            if (value.length <= 3) {
                                                setCurrentThrow(value);
                                            }
                                        }}
                                        placeholder="Score (0-180)"
                                        className="text-2xl text-center h-16"
                                        style={{
                                            appearance: 'textfield',
                                            MozAppearance: 'textfield',
                                        }}
                                    />
                                    <Button
                                        onClick={handleUndo}
                                        disabled={history.length === 0}
                                        variant="outline"
                                        className="h-16 w-32"
                                    >
                                        <RotateCcw className="w-6 h-6" />
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

                                {showResetConfirm && (
                                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                        <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
                                            <h3 className="font-bold mb-4">
                                                Reset Game?
                                            </h3>
                                            <p className="mb-4">
                                                Are you sure you want to reset
                                                the game? All progress will be
                                                lost.
                                            </p>
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    onClick={() =>
                                                        setShowResetConfirm(
                                                            false,
                                                        )
                                                    }
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    onClick={() => {
                                                        resetGame();
                                                        setShowResetConfirm(
                                                            false,
                                                        );
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
            {celebration.show && (
                <CelebrationAnimation celebration={celebration} />
            )}
        </Card>
    );
};
