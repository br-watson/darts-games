export interface CelebrationState {
    show: boolean;
    message: string;
}

export interface WinningCelebrationState {
    playerName: string;
    checkoutDart: 1 | 2 | 3;
    throws: number;
    playerIndex: number;
    show: boolean;
}
