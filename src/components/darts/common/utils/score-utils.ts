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
            average: 0,
            highest: 0,
            lowest: 0,
            dartsThrown: 0,
            pointsPerDart: '0',
        };

    const throws = player.throws;
    const average = throws.reduce((a, b) => a + b, 0) / throws.length;
    const highest = Math.max(...throws);
    const lowest = Math.min(...throws);

    let dartsThrown = (throws.length - 1) * 3;
    if (player.score === 0 && player.checkoutDart) {
        dartsThrown += player.checkoutDart;
    } else {
        dartsThrown += 3;
    }

    const totalScore = startingScore - player.score;
    const pointsPerDart = totalScore / dartsThrown;

    return {
        average: average.toFixed(1),
        highest,
        lowest,
        dartsThrown,
        pointsPerDart: pointsPerDart.toFixed(2),
    };
};
