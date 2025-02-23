import React, { useState } from 'react';
import { usePlayerProfiles } from '../context/PlayerProfileContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { PlayerProfile } from '../types/player-profile';
import { UserPlus, Edit2, Trash2 } from 'lucide-react';
import { ProfileStatsModal } from '@/components/darts/x01/components/ProfileStatsModal';

const profileNameSchema = {
    minLength: 2,
    maxLength: 30,
    pattern: /^[a-zA-Z0-9\s-_]+$/,
    messages: {
        minLength: 'Name must be at least 2 characters',
        maxLength: 'Name must be less than 30 characters',
        pattern:
            'Name can only contain letters, numbers, spaces, hyphens, and underscores',
        duplicate: 'A player with this name already exists',
    },
};

export const PlayerProfileManagement: React.FC = () => {
    const { profiles, addProfile, updateProfile, deleteProfile } =
        usePlayerProfiles();
    const [newProfileName, setNewProfileName] = useState('');
    const [editingProfile, setEditingProfile] = useState<PlayerProfile | null>(
        null,
    );
    const [error, setError] = useState<string>('');
    const [viewingProfile, setViewingProfile] = useState<PlayerProfile | null>(
        null,
    );

    const validateName = (
        name: string,
        isEditing: boolean = false,
    ): string | null => {
        if (name.length < profileNameSchema.minLength) {
            return profileNameSchema.messages.minLength;
        }
        if (name.length > profileNameSchema.maxLength) {
            return profileNameSchema.messages.maxLength;
        }
        if (!profileNameSchema.pattern.test(name)) {
            return profileNameSchema.messages.pattern;
        }
        const isDuplicate = profiles.some(
            (p) =>
                p.name.toLowerCase() === name.toLowerCase() &&
                (!isEditing || p.id !== editingProfile?.id),
        );
        if (isDuplicate) {
            return profileNameSchema.messages.duplicate;
        }
        return null;
    };

    const handleAddProfile = () => {
        const validationError = validateName(newProfileName);
        if (validationError) {
            setError(validationError);
            return;
        }

        addProfile({ name: newProfileName.trim() });
        setNewProfileName('');
        setError('');
    };

    const handleUpdateProfile = () => {
        if (editingProfile && editingProfile.name.trim()) {
            const validationError = validateName(editingProfile.name, true);
            if (validationError) {
                setError(validationError);
                return;
            }

            updateProfile(editingProfile.id, editingProfile);
            setEditingProfile(null);
            setError('');
        }
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString();
    };

    return (
        <Card className="w-full mt-4">
            <CardContent className="pt-6">
                <div className="space-y-4">
                    {/* Add new profile */}
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                            <Input
                                value={newProfileName}
                                onChange={(e) => {
                                    setNewProfileName(e.target.value);
                                    setError('');
                                }}
                                placeholder="New player name"
                                className={`flex-1 ${error ? 'border-red-500' : ''}`}
                                onKeyUp={(e) => {
                                    if (
                                        e.key === 'Enter' &&
                                        newProfileName.trim()
                                    ) {
                                        handleAddProfile();
                                    }
                                }}
                            />
                            <Button
                                onClick={handleAddProfile}
                                disabled={!newProfileName.trim()}
                            >
                                <UserPlus className="w-4 h-4 mr-2" />
                                Add Player
                            </Button>
                        </div>
                        {error && (
                            <div className="text-sm text-red-500">{error}</div>
                        )}
                    </div>

                    {/* Profile list */}
                    <div className="space-y-2">
                        {profiles.map((profile) => (
                            <div
                                key={profile.id}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                                {editingProfile?.id === profile.id ? (
                                    <div className="flex gap-2 flex-1">
                                        <Input
                                            value={editingProfile.name}
                                            onChange={(e) =>
                                                setEditingProfile({
                                                    ...editingProfile,
                                                    name: e.target.value,
                                                })
                                            }
                                            className={
                                                error ? 'border-red-500' : ''
                                            }
                                        />
                                        <Button onClick={handleUpdateProfile}>
                                            Save
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                setEditingProfile(null);
                                                setError('');
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                ) : (
                                    <>
                                        <div
                                            className="flex-1 cursor-pointer hover:bg-gray-100 p-2 rounded"
                                            onClick={() =>
                                                setViewingProfile(profile)
                                            }
                                        >
                                            <div className="font-medium">
                                                {profile.name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Games:{' '}
                                                {profile.stats.gamesPlayed} |
                                                Wins: {profile.stats.gamesWon} |
                                                Last played:{' '}
                                                {formatDate(
                                                    profile.stats.lastPlayed,
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent opening stats modal
                                                    setEditingProfile(profile);
                                                    setError('');
                                                }}
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent opening stats modal
                                                    deleteProfile(profile.id);
                                                }}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
            {viewingProfile && (
                <ProfileStatsModal
                    profile={viewingProfile}
                    onClose={() => setViewingProfile(null)}
                />
            )}
        </Card>
    );
};
