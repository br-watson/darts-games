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
    quickScores = [100, 60, 40, 26, 20, 10],
}) => {
    function getBackspaceButtonText() {
        const currentPlayer = players[currentPlayerIndex];
        const isPotentialBust =
            currentPlayer?.score <= 170 && currentThrow === '';
        return isPotentialBust ? 'BUST' : '←';
    }

    const buttons = [
        [7, 8, 9],
        [4, 5, 6],
        [1, 2, 3],
        [getBackspaceButtonText(), 0, 'Enter'],
    ];

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2 max-w-full mx-auto">
                {buttons.map((row, i) =>
                    row.map((btn, j) => {
                        const isBustButton = btn === 'BUST';
                        const isBackspaceButton = btn === '←';

                        return (
                            <Button
                                key={`${i}-${j}`}
                                className={`h-16 text-2xl ${isBustButton ? 'bg-red-500 hover:bg-red-600' : ''}`}
                                variant={
                                    btn === 'Enter' || isBustButton
                                        ? 'default'
                                        : 'outline'
                                }
                                onClick={() => {
                                    if (isProcessingInput) return;
                                    setIsProcessingInput(true);

                                    if (isBustButton) {
                                        handleThrow(0);
                                    } else if (isBackspaceButton) {
                                        setCurrentThrow((prev) =>
                                            prev.slice(0, -1),
                                        );
                                    } else if (btn === 'Enter') {
                                        handleThrow(parseInt(currentThrow));
                                    } else if (currentThrow.length < 3) {
                                        setCurrentThrow(
                                            currentThrow + btn.toString(),
                                        );
                                    }

                                    setTimeout(
                                        () => setIsProcessingInput(false),
                                        100,
                                    );
                                }}
                            >
                                {btn}
                            </Button>
                        );
                    }),
                )}
            </div>

            <div className="grid grid-cols-3 gap-2 max-w-full mx-auto">
                {quickScores.map((score) => (
                    <Button
                        key={score}
                        variant="outline"
                        className="h-12 font-bold"
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
