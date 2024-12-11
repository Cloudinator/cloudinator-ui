'use client'

import { useEffect, useRef } from 'react'

export default function CloudParticles() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const createParticle = () => {
            const particle = document.createElement('div')
            particle.className = 'absolute bg-purple-100 rounded-full opacity-20'

            const size = Math.random() * 20 + 5
            particle.style.width = `${size}px`
            particle.style.height = `${size}px`

            const startX = Math.random() * container.offsetWidth
            const startY = container.offsetHeight
            particle.style.left = `${startX}px`
            particle.style.top = `${startY}px`

            container.appendChild(particle)

            const animation = particle.animate([
                { transform: `translate(0, 0)` },
                { transform: `translate(${Math.random() * 100 - 50}px, -${container.offsetHeight + 50}px)` }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'linear'
            })

            animation.onfinish = () => {
                particle.remove()
                createParticle()
            }
        }

        for (let i = 0; i < 20; i++) {
            createParticle()
        }
    }, [])

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Particles will be created here dynamically */}
        </div>
    )
}

