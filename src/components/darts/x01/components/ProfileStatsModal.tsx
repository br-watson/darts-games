import React from 'react';
import { Button } from '@/components/ui/button';
import { PlayerProfile } from '../types/player-profile';
import { Trophy, X } from 'lucide-react';

interface ProfileStatsModalProps {
    profile: PlayerProfile;
    onClose: () => void;
}

export const ProfileStatsModal: React.FC<ProfileStatsModalProps> = ({
    profile,
    onClose,
}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
                <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2"
                    onClick={onClose}
                >
                    <X className="h-4 w-4" />
                </Button>

                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
                    <p className="text-gray-500">Career Statistics</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 bg-blue-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                            <div className="text-xl font-semibold">
                                Win Rate
                            </div>
                            <div className="text-2xl font-bold">
                                {profile.stats.gamesPlayed > 0
                                    ? (
                                          (profile.stats.gamesWon /
                                              profile.stats.gamesPlayed) *
                                          100
                                      ).toFixed(1)
                                    : 0}
                                %
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-500">
                            Games Played
                        </div>
                        <div className="text-xl font-semibold">
                            {profile.stats.gamesPlayed}
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-500">Games Won</div>
                        <div className="text-xl font-semibold flex items-center gap-2">
                            {profile.stats.gamesWon}
                            {profile.stats.gamesWon > 0 && (
                                <Trophy className="h-4 w-4 text-yellow-500" />
                            )}
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-500">
                            3-Dart Average
                        </div>
                        <div className="text-xl font-semibold">
                            {profile.stats.averageThrow.toFixed(2)}
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-500">
                            Per Dart Average
                        </div>
                        <div className="text-xl font-semibold">
                            {profile.stats.averagePerDart.toFixed(2)}
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-500">
                            Highest Throw
                        </div>
                        <div className="text-xl font-semibold">
                            {profile.stats.highestThrow}
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-500">Total 180s</div>
                        <div className="text-xl font-semibold">
                            {profile.stats.ton80s}
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-500">140+ Throws</div>
                        <div className="text-xl font-semibold">
                            {profile.stats.ton40s}
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-500">100+ Throws</div>
                        <div className="text-xl font-semibold">
                            {profile.stats.tons}
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-500">
                            Total Throws
                        </div>
                        <div className="text-xl font-semibold">
                            {profile.stats.totalThrows}
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-sm text-gray-500 text-center">
                    Last played:{' '}
                    {new Date(profile.stats.lastPlayed).toLocaleDateString()}
                </div>
            </div>
        </div>
    );
};
