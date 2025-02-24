import { Player } from '../types/player';

export function isValidThreeDartScore(score: number): boolean {
    if (score > 180) return false;
    if (score === 179 || score === 178 || score === 176) return false;
    if (score === 175 || score === 173 || score === 172) return false;
    return score !== 169;
}

export function calculateValidThreeDartScores(): Set<number> {
    const validScores = new Set<number>();
    for (let i = 0; i <= 180; i++) {
        if (isValidThreeDartScore(i)) {
            validScores.add(i);
        }
    }
    return validScores;
}

export const calculateBasicStats = (player: Player) => {
    if (!player.throws.length) return { average: 0, highest: 0 };

    const average =
        player.throws.reduce((a, b) => a + b, 0) / player.throws.length;
    const highest = Math.max(...player.throws);

    return {
        average: average.toFixed(1),
        highest,
    };
};

export const calculateDetailedStats = (
    player: Player,
    startingScore: number,
) => {
    if (!player.throws.length)
        return {
            averageThrow: 0,
            highestThrow: 0,
            lowestThrow: 0,
            totalThrows: 0,
            averagePerDart: 0,
        };

    const throws = player.throws;
    const averageThrow = throws.reduce((a, b) => a + b, 0) / throws.length;
    const highestThrow = Math.max(...throws);
    const throwsWithoutZeroes = throws.filter((t) => t !== 0);
    const lowestThrow = Math.min(...throwsWithoutZeroes);

    let totalThrows = (throws.length - 1) * 3;
    if (player.score === 0 && player.checkoutDart) {
        totalThrows += player.checkoutDart;
    } else {
        totalThrows += 3;
    }

    const totalScore = startingScore - player.score;
    const averagePerDart = totalScore / totalThrows;

    return {
        averageThrow: averageThrow,
        highestThrow,
        lowestThrow,
        totalThrows,
        averagePerDart: averagePerDart,
    };
};
