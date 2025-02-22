import { Player } from '../types';

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

export const quickScores = [100, 60, 41, 26, 22, 11];

export const calculateStats = (player: Player) => {
    if (!player.throws.length) return { average: 0, highest: 0 };

    const average = player.throws.reduce((a, b) => a + b, 0) / player.throws.length;
    const highest = Math.max(...player.throws);

    return {
        average: average.toFixed(1),
        highest
    };
};

export const calculateDetailedStats = (player: Player, startingScore: number) => {
    if (!player.throws.length) return { average: 0, highest: 0, lowest: 0, tons: 0, ton40s: 0, ton80s: 0 };

    const throws = player.throws;
    const average = throws.reduce((a, b) => a + b, 0) / throws.length;
    const highest = Math.max(...throws);
    const lowest = Math.min(...throws);
    const tons = throws.filter(t => t >= 100 && t < 140).length;
    const ton40s = throws.filter(t => t >= 140 && t < 180).length;
    const ton80s = throws.filter(t => t === 180).length;
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
        tons,
        ton40s,
        ton80s,
        dartsThrown,
        pointsPerDart: pointsPerDart.toFixed(2)
    };
};