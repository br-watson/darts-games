import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from 'react';
import { Player, HistoryState } from '../../common/types/player';
import { CelebrationState, WinningCelebrationState } from '../../common/types/ui-state';
import { CheckoutDartPromptState, X01GameContextType } from '../types/types';
import { calculateValidThreeDartScores } from '../../common/utils/score-utils';

const X01GameContext = createContext<X01GameContextType | undefined>(undefined);

export const useX01GameContext = () => {
    const context = useContext(X01GameContext);
    if (!context) {
        throw new Error(
            'useX01GameContext must be used within an X01GameProvider',
        );
    }
    return context;
};

export const X01GameProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
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
        message: '',
    });
    const [checkoutDartPrompt, setCheckoutDartPrompt] =
        useState<CheckoutDartPromptState | null>(null);
    const [showClearDataConfirm, setShowClearDataConfirm] = useState(false);
    const [winningCelebration, setWinningCelebration] = useState<WinningCelebrationState | null>(null);

    const clearGameData = useCallback(() => {
        localStorage.clear();
        window.location.reload();
    }, []);

    const validThreeDartScores = calculateValidThreeDartScores();

    const triggerCelebration = useCallback((message: string) => {
        setCelebration({ show: true, message });
        setTimeout(() => {
            setCelebration({ show: false, message: '' });
        }, 3000);
    }, []);

    const completeWinningCelebration = useCallback(() => {
        if (winningCelebration) {
            const winningPlayer = players[winningCelebration.playerIndex];
            setWinner(winningPlayer);
            setWinningCelebration(null);
        }
    }, [winningCelebration, players]);

    const addPlayer = useCallback(
        (name?: string) => {
            const playerName = name?.trim() || newPlayerName.trim();
            if (playerName && players.length < 9 && !gameStarted) {
                const updatedPlayers = [
                    ...players,
                    {
                        name: playerName,
                        score: startingScore,
                        throws: [],
                    },
                ];
                setPlayers(updatedPlayers);
                localStorage.setItem(
                    'x01Players',
                    JSON.stringify(updatedPlayers),
                );
                setNewPlayerName('');
            }
        },
        [newPlayerName, players, gameStarted, startingScore],
    );

    const removePlayer = useCallback(
        (index: number) => {
            if (!gameStarted) {
                const updatedPlayers = players.filter((_, i) => i !== index);
                setPlayers(updatedPlayers);
                localStorage.setItem(
                    'x01Players',
                    JSON.stringify(updatedPlayers),
                );
            }
        },
        [gameStarted, players],
    );

    const startGame = useCallback(() => {
        if (players.length >= 1) {
            const updatedPlayers = players.map(player => ({
                ...player,
                score: startingScore
            }));
            setPlayers(updatedPlayers);
            setGameStarted(true);
            setHistory([]);
        }
    }, [players.length, players, startingScore]);

    const resetGame = useCallback(() => {
        const resetPlayers = players.map((player) => ({
            ...player,
            score: startingScore,
            throws: [],
        }));
        setGameStarted(false);
        setPlayers(resetPlayers);
        localStorage.setItem('x01Players', JSON.stringify(resetPlayers));
        const randomIndex = Math.floor(Math.random() * players.length);
        setCurrentPlayerIndex(randomIndex);
        setWinner(null);
        setCurrentThrow('');
        setHistory([]);
    }, [players, startingScore]);

    const handleThrow = useCallback(
        (score: number | string) => {
            const throwScore =
                typeof score === 'number' ? score : parseInt(currentThrow);
            if (!validThreeDartScores.has(throwScore)) {
                return;
            }

            const updatedPlayers = [...players];
            const currentPlayer = updatedPlayers[currentPlayerIndex];
            const newScore = currentPlayer.score - throwScore;

            if (newScore < 0 || newScore === 1) {
                setCurrentThrow('');
                return;
            }

            setHistory([
                ...history,
                {
                    players: JSON.parse(JSON.stringify(players)),
                    currentPlayerIndex,
                },
            ]);

            currentPlayer.throws.push(throwScore);
            currentPlayer.score = newScore;

            if (throwScore === 26) {
                triggerCelebration(`${currentPlayer.name} hit a perfect 26!`);
            }

            if (newScore === 0) {
                setCheckoutDartPrompt({
                    show: true,
                    playerIndex: currentPlayerIndex,
                    score: currentPlayer.score + throwScore,
                });
            } else {
                setCurrentPlayerIndex(
                    (currentPlayerIndex + 1) % players.length,
                );
            }

            setPlayers(updatedPlayers);
            setCurrentThrow('');
        },
        [
            currentThrow,
            players,
            currentPlayerIndex,
            validThreeDartScores,
            history,
            triggerCelebration,
        ],
    );

    const handleUndo = useCallback(() => {
        if (history.length > 0) {
            const lastState = history[history.length - 1];
            setPlayers(lastState.players);
            setCurrentPlayerIndex(lastState.currentPlayerIndex);
            setHistory(history.slice(0, -1));
            setWinner(null);
        }
    }, [history]);

    useEffect(() => {
        const savedPlayers = localStorage.getItem('x01Players');
        if (savedPlayers) {
            setPlayers(JSON.parse(savedPlayers));
        }
    }, []);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (isProcessingInput) return;
            if (!gameStarted || winner) return;

            if (e.key === 'Enter') {
                handleThrow(parseInt(currentThrow));
            } else if (e.key === 'Backspace') {
                setCurrentThrow((prev) => prev.slice(0, -1));
            }
        };

        document.addEventListener('keydown', handler);
        return () => {
            document.removeEventListener('keydown', handler);
        };
    }, [currentThrow, gameStarted, winner, isProcessingInput, handleThrow]);

    const contextValue: X01GameContextType = {
        // State
        gameStarted,
        startingScore,
        currentPlayerIndex,
        newPlayerName,
        currentThrow,
        winner,
        players,
        history,
        isProcessingInput,
        showResetConfirm,
        celebration,
        checkoutDartPrompt,
        validThreeDartScores,
        showClearDataConfirm,
        winningCelebration,

        // State setters
        setGameStarted,
        setStartingScore,
        setNewPlayerName,
        setCurrentThrow,
        setShowResetConfirm,
        setWinner,
        setPlayers,
        setIsProcessingInput,
        setCheckoutDartPrompt,
        setShowClearDataConfirm,
        setWinningCelebration,

        // Actions
        triggerCelebration,
        addPlayer,
        removePlayer,
        startGame,
        resetGame,
        handleThrow,
        handleUndo,
        clearGameData,
        completeWinningCelebration,
    };

    return (
        <X01GameContext.Provider value={contextValue}>
            {children}
        </X01GameContext.Provider>
    );
};
