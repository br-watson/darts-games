import React from 'react';
import { Button } from '@/components/ui/button';
import { useGameContext } from '../context/GameContext';

export const CheckoutDartPrompt: React.FC = () => {
    const { checkoutDartPrompt, players, setPlayers, setWinner, setCheckoutDartPrompt } = useGameContext();

    if (!checkoutDartPrompt || !checkoutDartPrompt.show) return null;

    const handleDartSelection = (dartNumber: 1 | 2 | 3) => {
        const updatedPlayers = [...players];
        updatedPlayers[checkoutDartPrompt.playerIndex].checkoutDart = dartNumber;
        setPlayers(updatedPlayers);
        setWinner(updatedPlayers[checkoutDartPrompt.playerIndex]);
        setCheckoutDartPrompt(null);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
                <h3 className="font-bold text-lg mb-4">Which dart did you checkout with?</h3>
                <div className="grid grid-cols-3 gap-2 mb-4">
                    <Button onClick={() => handleDartSelection(1)}>First Dart</Button>
                    <Button onClick={() => handleDartSelection(2)}>Second Dart</Button>
                    <Button onClick={() => handleDartSelection(3)}>Third Dart</Button>
                </div>
            </div>
        </div>
    );
};