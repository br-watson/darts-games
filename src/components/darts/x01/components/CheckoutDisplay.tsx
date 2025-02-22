import React from 'react';

interface CheckoutDisplayProps {
    checkout: string;
}

export const CheckoutDisplay: React.FC<CheckoutDisplayProps> = ({ checkout }) => {
    if (!checkout) return null;
    const parts = checkout.split(' ');

    return (
        <div className="mt-3 p-3 rounded-lg shadow-md border-2 border-green-300 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 opacity-10 animate-gradient"></div>

            <div className="flex justify-center items-center space-x-3 relative">
                <div className="text-lg font-bold text-center px-3 py-1 rounded-lg bg-white bg-opacity-80 text-green-700 shadow">
                    Checkout:
                </div>
                {parts.map((part: string, index: number) => {
                    const isTriple = part.startsWith('T');
                    const isDouble = part.startsWith('D');
                    const isBull = part === 'Bull';

                    let bgColor = "bg-gray-200";
                    let textColor = "text-gray-800";
                    let extraClasses = "";
                    let animationClass = "";

                    if (isTriple) {
                        bgColor = "bg-gradient-to-r from-red-500 to-pink-500";
                        textColor = "text-white";
                        animationClass = "hover:animate-pulse";
                    } else if (isDouble) {
                        bgColor = "bg-gradient-to-r from-pink-500 to-purple-500";
                        textColor = "text-white";
                        animationClass = "hover:animate-pulse";
                    } else if (isBull) {
                        bgColor = "";
                        textColor = "text-white";
                        extraClasses = "bg-gradient-rainbow bg-animate border-2 border-white p-2 text-white font-bold text-center rounded-full shadow-lg";
                        animationClass = "animate-gradient";
                    } else if (part === '25') {
                        bgColor = "bg-gradient-to-r from-green-500 to-teal-500";
                        textColor = "text-white";
                        animationClass = "hover:animate-pulse";
                    } else {
                        // For regular numbers
                        bgColor = "bg-gradient-to-r from-blue-500 to-indigo-500";
                        textColor = "text-white";
                    }

                    return (
                        <div
                            key={index}
                            className={`${bgColor} ${textColor} ${extraClasses} ${animationClass} px-3 py-1 rounded-full text-center font-bold shadow-md transition-all hover:shadow-lg`}
                            style={isBull ? { backgroundSize: "200% 200%" } : {}}
                        >
                            {part}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};