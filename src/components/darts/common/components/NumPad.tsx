import React from 'react';
import { Button } from '@/components/ui/button';
import { Player } from '../types/player';

interface NumPadProps {
    currentPlayerIndex: number;
    players: Player[];
    currentThrow: string;
    setCurrentThrow: React.Dispatch<React.SetStateAction<string>>;
    handleThrow: (score: number | string) => void;
    isProcessingInput: boolean;
    setIsProcessingInput: React.Dispatch<React.SetStateAction<boolean>>;
    quickScores?: number[];
}

export const NumPad: React.FC<NumPadProps> = ({
                                                  currentPlayerIndex,
                                                  players,
                                                  currentThrow,
                                                  setCurrentThrow,
                                                  handleThrow,
                                                  isProcessingInput,
                                                  setIsProcessingInput,
                                                  quickScores = [100, 60, 40, 26, 20, 10]
                                              }) => {
    function getBackspaceButtonText() {
        const currentPlayer = players[currentPlayerIndex];
        const isPotentialBust = currentPlayer?.score <= 170 && currentThrow === '';
        return isPotentialBust ? 'BUST' : '←';
    }

    const buttons = [
        [7, 8, 9],
        [4, 5, 6],
        [1, 2, 3],
        [getBackspaceButtonText(), 0, 'Enter']
    ];

    // Define colorful button styles
    const getButtonStyle = (btn: number | string) => {
        const isBustButton = btn === 'BUST';
        const isBackspaceButton = btn === '←';
        const isEnterButton = btn === 'Enter';

        if (isBustButton) {
            return "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white border-0";
        } else if (isBackspaceButton) {
            return "bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white border-0";
        } else if (isEnterButton) {
            return "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0";
        } else {
            // For number buttons, create a subtle gradient
            return "bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-gray-800 border-2 border-blue-200";
        }
    };

    // Define quick score button styles
    const getQuickScoreStyle = (score: number) => {
        // Create colorful styles based on score value
        if (score >= 100) {
            return "bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white border-0";
        } else if (score >= 60) {
            return "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0";
        } else if (score >= 40) {
            return "bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white border-0";
        } else if (score >= 20) {
            return "bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white border-0";
        } else {
            return "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0";
        }
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2 max-w-full mx-auto">
                {buttons.map((row, i) => (
                    row.map((btn, j) => {
                        const isBustButton = btn === 'BUST';
                        const isBackspaceButton = btn === '←';
                        const customClass = getButtonStyle(btn);

                        return (
                            <Button
                                key={`${i}-${j}`}
                                className={`h-16 text-2xl shadow-md transition-all ${customClass}`}
                                onClick={() => {
                                    if (isProcessingInput) return;
                                    setIsProcessingInput(true);

                                    if (isBustButton) {
                                        handleThrow(0);
                                    } else if (isBackspaceButton) {
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
                        );
                    })
                ))}
            </div>

            <div className="grid grid-cols-3 gap-2 max-w-full mx-auto">
                {quickScores.map(score => {
                    const customClass = getQuickScoreStyle(score);

                    return (
                        <Button
                            key={score}
                            className={`h-12 font-bold shadow-sm hover:shadow-md transition-all ${customClass}`}
                            onClick={() => {
                                if (isProcessingInput) return;
                                setIsProcessingInput(true);
                                handleThrow(score);
                                setTimeout(() => setIsProcessingInput(false), 100);
                            }}
                        >
                            {score}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
};