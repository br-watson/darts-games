import React from 'react';

export interface Player {
    name: string;
    score: number;
    throws: number[];
    checkoutDart?: 1 | 2 | 3;
}

export interface HistoryState {
    players: Player[];
    currentPlayerIndex: number;
}

export interface CelebrationState {
    show: boolean;
    message: string;
}

export interface CheckoutDartPromptState {
    show: boolean;
    playerIndex: number;
    score: number;
}

export interface GameContextType {
    // State
    gameStarted: boolean;
    startingScore: number;
    currentPlayerIndex: number;
    newPlayerName: string;
    currentThrow: string;
    winner: Player | null;
    players: Player[];
    history: HistoryState[];
    isProcessingInput: boolean;
    showResetConfirm: boolean;
    celebration: CelebrationState;
    checkoutDartPrompt: CheckoutDartPromptState | null;

    // State setters
    setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
    setStartingScore: React.Dispatch<React.SetStateAction<number>>;
    setNewPlayerName: React.Dispatch<React.SetStateAction<string>>;
    setCurrentThrow: React.Dispatch<React.SetStateAction<string>>;
    setShowResetConfirm: React.Dispatch<React.SetStateAction<boolean>>;
    setWinner: React.Dispatch<React.SetStateAction<Player | null>>;
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
    setIsProcessingInput: React.Dispatch<React.SetStateAction<boolean>>;
    setCheckoutDartPrompt: React.Dispatch<React.SetStateAction<CheckoutDartPromptState | null>>;

    // Actions
    triggerCelebration: (message: string) => void;
    addPlayer: () => void;
    removePlayer: (index: number) => void;
    startGame: () => void;
    resetGame: () => void;
    handleThrow: (score: number | string) => void;
    handleUndo: () => void;
    validThreeDartScores: Set<number>;
}