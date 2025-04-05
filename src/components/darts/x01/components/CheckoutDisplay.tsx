import React from 'react';

interface CheckoutDisplayProps {
    checkout: string;
}

export const CheckoutDisplay: React.FC<CheckoutDisplayProps> = ({
    checkout,
}) => {
    if (!checkout) return null;
    const parts = checkout.split(' ');

    return (
        <div className="mt-2 p-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg shadow-md">
            <div className="flex justify-center items-center space-x-2">
                <div className="text-lg font-bold text-center mb-1">
                    {' '}
                </div>
                {parts.map((part: string, index: number) => {
                    const isTriple = part.startsWith('T');
                    const isDouble = part.startsWith('D');
                    const isBull = part === 'Bull';

                    let bgColor = 'bg-gray-200';
                    let textColor = 'text-gray-800';
                    let extraClasses = '';

                    if (isTriple) {
                        bgColor = 'bg-red-500';
                        textColor = 'text-white';
                    } else if (isDouble) {
                        bgColor = 'bg-pink-500';
                        textColor = 'text-white';
                    } else if (isBull) {
                        bgColor = '';
                        textColor = 'text-white';
                        extraClasses =
                            'bg-[linear-gradient(90deg,_#f87171,_#fb923c,_#facc15,_#4ade80,_#60a5fa,_#818cf8,_#8b5cf6)] bg-[length:800%_800%] animate-gradient border-2 border-white p-2 text-white font-bold text-center rounded-full';
                    } else if (part === '25') {
                        bgColor = 'bg-green-500';
                        textColor = 'text-white';
                    }

                    return (
                        <div
                            key={index}
                            className={`${bgColor} ${textColor} ${extraClasses} px-3 py-1 rounded-full text-center font-bold animate-none`}
                            style={
                                isBull
                                    ? {
                                          backgroundSize: '200% 200%',
                                          animation:
                                              'gradient 2s ease infinite',
                                      }
                                    : {}
                            }
                        >
                            {part}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
