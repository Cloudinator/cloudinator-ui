"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Define the Particle type and class outside useEffect for clarity
interface Particle {
    update(canvas: HTMLCanvasElement): unknown;
    draw(ctx: CanvasRenderingContext2D): unknown;
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
}

class ParticleImpl implements Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;

    constructor(canvas: HTMLCanvasElement) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }

    update(canvas: HTMLCanvasElement) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Particle wrapping logic
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;

        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "rgba(200, 200, 255, 0.5)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const AnimatedBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles: Particle[] = [];
        const particleCount = 100;

        // Initialize particles
        const init = () => {
            for (let i = 0; i < particleCount; i++) {
                particles.push(new ParticleImpl(canvas));
            }
        };

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
            for (let i = 0; i < particles.length; i++) {
                particles[i].update(canvas);
                particles[i].draw(ctx);
            }
            requestAnimationFrame(animate); // Keep animating
        };

        // Initialize and animate particles
        init();
        animate();

        // Handle window resizing
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);

        // Cleanup on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <motion.canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        />
    );
};

export default AnimatedBackground;