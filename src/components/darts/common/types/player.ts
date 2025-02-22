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
