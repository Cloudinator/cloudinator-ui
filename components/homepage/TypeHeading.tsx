'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TextItem {
    text: string
    style?: React.CSSProperties
}

interface TypeHeadingProps {
    texts: TextItem[]
    typingSpeed?: number
    delayBetweenTexts?: number
}

export default function TypeHeading({
                                        texts,
                                        typingSpeed = 50,
                                        delayBetweenTexts = 1000
                                    }: TypeHeadingProps) {
    const [currentTextIndex, setCurrentTextIndex] = useState(0)
    const [displayedText, setDisplayedText] = useState('')
    const [isDeleting, setIsDeleting] = useState(false)

    const currentItem = texts[currentTextIndex]

    const typeText = useCallback(() => {
        const currentText = currentItem.text

        setDisplayedText(prev => {
            if (isDeleting) {
                return prev.slice(0, -1)
            } else {
                return currentText.slice(0, prev.length + 1)
            }
        })

        if (!isDeleting && displayedText === currentText) {
            setTimeout(() => setIsDeleting(true), delayBetweenTexts)
        } else if (isDeleting && displayedText === '') {
            setIsDeleting(false)
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
        }
    }, [currentItem.text, displayedText, isDeleting, texts.length, delayBetweenTexts])

    useEffect(() => {
        const timer = setTimeout(typeText, isDeleting ? typingSpeed / 2 : typingSpeed)
        return () => clearTimeout(timer)
    }, [typeText, isDeleting, typingSpeed])

    return (
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 h-[120px] flex items-center justify-center">
            <AnimatePresence mode="wait">
                <motion.span
                    key={currentTextIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    style={currentItem.style}
                >
                    {displayedText}
                    <span className="inline-block w-[2px] h-[1em] bg-current animate-blink" />
                </motion.span>
            </AnimatePresence>
        </h1>
    )
}

