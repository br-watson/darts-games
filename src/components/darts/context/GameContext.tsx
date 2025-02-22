import React, { createContext, useContext, useState, useEffect } from 'react';
import { Player, HistoryState, CelebrationState, CheckoutDartPromptState, GameContextType } from '../types';
import { calculateValidThreeDartScores } from '../utils/score-utils';

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGameContext = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGameContext must be used within a GameProvider');
    }
    return context;
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
    const [checkoutDartPrompt, setCheckoutDartPrompt] = useState<CheckoutDartPromptState | null>(null);

    const validThreeDartScores = calculateValidThreeDartScores();

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
                setCurrentThrow(prev => prev.slice(0, -1));
            }
        };

        document.addEventListener('keydown', handler);
        return () => {
            document.removeEventListener('keydown', handler);
        };
    }, [currentThrow, gameStarted, winner, isProcessingInput]);

    const triggerCelebration = (message: string) => {
        setCelebration({ show: true, message });
        setTimeout(() => {
            setCelebration({ show: false, message: '' });
        }, 3000);
    };

    const addPlayer = () => {
        if (newPlayerName.trim() && players.length < 9 && !gameStarted) {
            const updatedPlayers = [...players, {
                name: newPlayerName.trim(),
                score: startingScore,
                throws: []
            }];
            setPlayers(updatedPlayers);
            localStorage.setItem('x01Players', JSON.stringify(updatedPlayers));
            setNewPlayerName('');
        }
    };

    const removePlayer = (index: number) => {
        if (!gameStarted) {
            const updatedPlayers = players.filter((_, i) => i !== index);
            setPlayers(updatedPlayers);
            localStorage.setItem('x01Players', JSON.stringify(updatedPlayers));
        }
    };

    const startGame = () => {
        if (players.length >= 1) {
            setGameStarted(true);
            setHistory([]);
        }
    };

    const resetGame = () => {
        const resetPlayers = players.map(player => ({
            ...player,
            score: startingScore,
            throws: []
        }));
        setGameStarted(false);
        setPlayers(resetPlayers);
        localStorage.setItem('x01Players', JSON.stringify(resetPlayers));
        const randomIndex = Math.floor(Math.random() * players.length);
        setCurrentPlayerIndex(randomIndex);
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

        if (newScore < 0 || newScore === 1) {
            setCurrentThrow('');
            return;
        }

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
            setCheckoutDartPrompt({
                show: true,
                playerIndex: currentPlayerIndex,
                score: currentPlayer.score + throwScore // Original score before this throw
            });
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

    const contextValue: GameContextType = {
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

        // Actions
        triggerCelebration,
        addPlayer,
        removePlayer,
        startGame,
        resetGame,
        handleThrow,
        handleUndo
    };

    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    );
};
