import React from 'react';
import { Button } from '@/components/ui/button';
import { useX01GameContext } from '../context/X01GameContext';

export const CheckoutDartPrompt: React.FC = () => {
    const { checkoutDartPrompt, players, setPlayers, setWinner, setCheckoutDartPrompt } = useX01GameContext();

    if (!checkoutDartPrompt || !checkoutDartPrompt.show) return null;

    const handleDartSelection = (dartNumber: 1 | 2 | 3) => {
        const updatedPlayers = [...players];
        updatedPlayers[checkoutDartPrompt.playerIndex].checkoutDart = dartNumber;
        setPlayers(updatedPlayers);
        setWinner(updatedPlayers[checkoutDartPrompt.playerIndex]);
        setCheckoutDartPrompt(null);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -top-8 -left-8 w-16 h-16 bg-red-500 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -top-8 -right-8 w-16 h-16 bg-green-500 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-purple-500 rounded-full opacity-20 animate-pulse"></div>

                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full border-4 border-green-400 relative overflow-hidden">
                    {/* Background animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-blue-100 opacity-50"></div>

                    <h3 className="font-bold text-xl mb-6 text-center text-green-600 relative">
                        Which dart did you checkout with?
                    </h3>
                    <div className="grid grid-cols-3 gap-3 mb-4 relative">
                        <Button
                            onClick={() => handleDartSelection(1)}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3"
                        >
                            First Dart
                        </Button>
                        <Button
                            onClick={() => handleDartSelection(2)}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3"
                        >
                            Second Dart
                        </Button>
                        <Button
                            onClick={() => handleDartSelection(3)}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3"
                        >
                            Third Dart
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};