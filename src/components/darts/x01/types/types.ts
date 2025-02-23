import React from 'react';
import { Player, HistoryState } from '../../common/types/player';
import { CelebrationState } from '../../common/types/ui-state';

export interface CheckoutDartPromptState {
    show: boolean;
    playerIndex: number;
    score: number;
}

export interface X01GameContextType {
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
    validThreeDartScores: Set<number>;
    showClearDataConfirm: boolean;

    // State setters
    setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
    setStartingScore: React.Dispatch<React.SetStateAction<number>>;
    setNewPlayerName: React.Dispatch<React.SetStateAction<string>>;
    setCurrentThrow: React.Dispatch<React.SetStateAction<string>>;
    setShowResetConfirm: React.Dispatch<React.SetStateAction<boolean>>;
    setWinner: React.Dispatch<React.SetStateAction<Player | null>>;
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
    setIsProcessingInput: React.Dispatch<React.SetStateAction<boolean>>;
    setCheckoutDartPrompt: React.Dispatch<
        React.SetStateAction<CheckoutDartPromptState | null>
    >;
    setShowClearDataConfirm: React.Dispatch<React.SetStateAction<boolean>>;

    // Actions
    triggerCelebration: (message: string) => void;
    addPlayer: (name?: string) => void;
    removePlayer: (index: number) => void;
    startGame: () => void;
    resetGame: () => void;
    handleThrow: (score: number | string) => void;
    handleUndo: () => void;
    clearGameData: () => void;
}

export interface X01Stats {
    average: string;
    highest: number;
    tons?: number;
    ton40s?: number;
    ton80s?: number;
}
