import React, { useEffect, useRef } from 'react';

interface ParticleProps {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    hue: number;
    opacity: number;
}

class Particle implements ParticleProps {
    x!: number;
    y!: number;
    size!: number;
    speedX!: number;
    speedY!: number;
    hue!: number;
    opacity!: number;
    canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.reset();
    }

    reset(): void {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.size = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.hue = Math.random() * 360;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update(): void {
        this.x += this.speedX;
        this.y += this.speedY;

        if (
            this.x < 0 ||
            this.x > this.canvas.width ||
            this.y < 0 ||
            this.y > this.canvas.height
        ) {
            this.reset();
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
            this.x,
            this.y,
            0,
            this.x,
            this.y,
            this.size * 2,
        );
        gradient.addColorStop(
            0,
            `hsla(${this.hue}, 100%, 70%, ${this.opacity})`,
        );
        gradient.addColorStop(1, `hsla(${this.hue}, 100%, 70%, 0)`);
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

const AnimatedBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const bgRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];

        const resizeCanvas = (): void => {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const initParticles = (): void => {
            if (!canvas) return;
            particles = [];
            const particleCount = Math.floor(
                (canvas.width * canvas.height) / 10000,
            );
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(canvas));
            }
        };

        const animate = (): void => {
            if (!ctx || !canvas) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                particle.update();
                particle.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = (): void => {
            resizeCanvas();
            initParticles();
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div
            className="fixed inset-0"
            style={{
                background:
                    'linear-gradient(to bottom right, var(--from-color) 10%, black 30%, black 70%, var(--to-color) 90%)',
                zIndex: -1,
            }}
        >
            <div
                ref={bgRef}
                className="absolute inset-0"
                style={
                    {
                        '--from-color': '#312e81',
                        '--to-color': '#1e3a8a',
                        background:
                            'linear-gradient(to bottom right, var(--from-color) 0%, black 30%, black 70%, var(--to-color) 100%)',
                    } as React.CSSProperties
                }
            />
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
            />
        </div>
    );
};

export default AnimatedBackground;
