export interface PlayerStats {
    gamesPlayed: number;
    gamesWon: number;
    totalThrows: number;
    highestThrow: number;
    highestCheckout: number;
    averageThrow: number;
    averagePerDart: number;
    ton80s: number;
    ton40s: number;
    tons: number;
    averageCheckout: number;
    checkoutPercentage: number;
    lastPlayed: Date;
}

export interface PlayerProfile {
    id: string;
    name: string;
    nickname?: string;
    avatar?: string;
    created: Date;
    stats: PlayerStats;
    preferredStartingScore?: number;
}

export interface PlayerProfileContextType {
    profiles: PlayerProfile[];
    addProfile: (
        profile: Omit<PlayerProfile, 'id' | 'created' | 'stats'>,
    ) => void;
    updateProfile: (id: string, profile: Partial<PlayerProfile>) => void;
    deleteProfile: (id: string) => void;
    updatePlayerStats: (id: string, gameStats: Partial<PlayerStats>) => void;
}
