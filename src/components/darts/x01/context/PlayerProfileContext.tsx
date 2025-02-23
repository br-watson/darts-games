'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    PlayerProfile,
    PlayerProfileContextType,
    PlayerStats,
} from '../types/player-profile';

const PlayerProfileContext = createContext<
    PlayerProfileContextType | undefined
>(undefined);

const STORAGE_KEY = 'dart-game-player-profiles';

const defaultStats: PlayerStats = {
    gamesPlayed: 0,
    gamesWon: 0,
    totalThrows: 0,
    highestThrow: 0,
    highestCheckout: 0,
    averageThrow: 0,
    averagePerDart: 0,
    ton80s: 0,
    ton40s: 0,
    tons: 0,
    averageCheckout: 0,
    checkoutPercentage: 0,
    lastPlayed: new Date(),
};

export const PlayerProfileProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [profiles, setProfiles] = useState<PlayerProfile[]>([]);

    useEffect(() => {
        const savedProfiles = localStorage.getItem(STORAGE_KEY);
        if (savedProfiles) {
            try {
                const parsed = JSON.parse(savedProfiles);
                const profilesWithDates = parsed.map(
                    (profile: PlayerProfile) => ({
                        ...profile,
                        created: new Date(profile.created),
                        stats: {
                            ...profile.stats,
                            lastPlayed: new Date(profile.stats.lastPlayed),
                        },
                    }),
                );
                setProfiles(profilesWithDates);
            } catch (error) {
                console.error('Error loading player profiles:', error);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
    }, [profiles]);

    const addProfile = (
        profileData: Omit<PlayerProfile, 'id' | 'created' | 'stats'>,
    ) => {
        const newProfile: PlayerProfile = {
            ...profileData,
            id: crypto.randomUUID(),
            created: new Date(),
            stats: defaultStats,
        };
        setProfiles((prev) => [...prev, newProfile]);
    };

    const updateProfile = (
        id: string,
        profileUpdate: Partial<PlayerProfile>,
    ) => {
        setProfiles((prev) =>
            prev.map((profile) =>
                profile.id === id ? { ...profile, ...profileUpdate } : profile,
            ),
        );
    };

    const deleteProfile = (id: string) => {
        setProfiles((prev) => prev.filter((profile) => profile.id !== id));
    };

    const updatePlayerStats = (id: string, gameStats: Partial<PlayerStats>) => {
        setProfiles((prev) =>
            prev.map((profile) => {
                if (profile.id === id) {
                    const updatedStats = { ...profile.stats };

                    if ('gamesPlayed' in gameStats) {
                        updatedStats.gamesPlayed += 1;
                    }

                    if ('gamesWon' in gameStats && gameStats.gamesWon) {
                        updatedStats.gamesWon += 1;
                    }

                    if ('highestThrow' in gameStats && gameStats.highestThrow) {
                        updatedStats.highestThrow = Math.max(
                            updatedStats.highestThrow,
                            gameStats.highestThrow as number,
                        );
                    }

                    if ('ton80s' in gameStats && gameStats.ton80s) {
                        updatedStats.ton80s += gameStats.ton80s as number;
                    }

                    if ('ton40s' in gameStats && gameStats.ton40s) {
                        updatedStats.ton40s += gameStats.ton40s as number;
                    }

                    if ('tons' in gameStats && gameStats.tons) {
                        updatedStats.tons += gameStats.tons as number;
                    }

                    if ('averageThrow' in gameStats && gameStats.averageThrow) {
                        const newAvg = gameStats.averageThrow as number;
                        const oldGamesPlayed = updatedStats.gamesPlayed - 1;
                        const oldTotalPoints =
                            oldGamesPlayed * updatedStats.averageThrow;
                        const newTotalPoints = oldTotalPoints + newAvg;
                        updatedStats.averageThrow =
                            newTotalPoints / updatedStats.gamesPlayed;
                    }

                    if (
                        'averagePerDart' in gameStats &&
                        gameStats.averagePerDart
                    ) {
                        const newAvg = gameStats.averagePerDart as number;
                        const oldGamesPlayed = updatedStats.gamesPlayed - 1;
                        const oldTotalPoints =
                            oldGamesPlayed * updatedStats.averagePerDart;
                        const newTotalPoints = oldTotalPoints + newAvg;
                        updatedStats.averagePerDart =
                            newTotalPoints / updatedStats.gamesPlayed;
                    }

                    if ('totalThrows' in gameStats && gameStats.totalThrows) {
                        updatedStats.totalThrows +=
                            gameStats.totalThrows as number;
                    }

                    updatedStats.lastPlayed = new Date();

                    return {
                        ...profile,
                        stats: updatedStats,
                    };
                }
                return profile;
            }),
        );
    };

    const value: PlayerProfileContextType = {
        profiles,
        addProfile,
        updateProfile,
        deleteProfile,
        updatePlayerStats,
    };

    return (
        <PlayerProfileContext.Provider value={value}>
            {children}
        </PlayerProfileContext.Provider>
    );
};

export const usePlayerProfiles = () => {
    const context = useContext(PlayerProfileContext);
    if (context === undefined) {
        throw new Error(
            'usePlayerProfiles must be used within a PlayerProfileProvider',
        );
    }
    return context;
};
