'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image';

const tutorialSteps = [
    {
        title: "Welcome to Cloudinator",
        content: "Your deployment is not easier than that",
        image: "/tutorial/homepage.png"
    },
    {
        title: "Deployment Pipeline",
        content: "Create automating workflows with CI/CD Tools.",
        image: "/tutorial/service2.png"
    },
    {
        title: "Personal Cloud Storage",
        content: "Provision user about send and save file in clouds",
        image: "/tutorial/cloud.png"
    },
    {
        title: "Documentation",
        content: "A ton of resources for software developers to deep dive with DevSecOps",
        image: "/tutorial/document.png"
    },
    {
        title: "Get in Touch",
        content: "Ready to start? Contact us to begin your journey with SpringOps.",
        image: "/tutorial/contact.png"
    }
]

const TutorialPopup: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)

    useEffect(() => {
        const hasSeenTutorial = localStorage.getItem('hasSeenTutorial')
        if (!hasSeenTutorial) {
            setIsOpen(true)
        }
    }, [])

    const closeTutorial = () => {
        setIsOpen(false)
        localStorage.setItem('hasSeenTutorial', 'true')
    }

    const nextStep = () => {
        if (currentStep < tutorialSteps.length - 1) {
            setCurrentStep(currentStep + 1)
        } else {
            closeTutorial()
        }
    }

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    useEffect(() => {
        const handleKeyDown = (event: { key: string; }) => {
            if (event.key === 'ArrowRight') {
                nextStep();
            } else if (event.key === 'ArrowLeft') {
                prevStep();
            } else if (event.key === 'Escape') {
                closeTutorial();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentStep]);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 left-6 bg-purple-500 text-primary-foreground px-4 py-2 rounded-full shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:bg-primary-dark dark:text-primary-foreground-dark dark:hover:bg-primary-dark/90"
                aria-label="Open Tutorial"
            >
                ?
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 dark:bg-opacity-50 bg-opacity-50 dark:bg-gray-900 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
                        onClick={closeTutorial} // Add click event here
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl px-8 pt-4 pb-6 max-w-md w-full relative transition-transform duration-300 ease-in-out"
                            onClick={(e) => e.stopPropagation()} // Prevent click event from bubbling up
                        >
                            <button onClick={closeTutorial} className="text-gray-500 flex justify-end w-full">
                                Skip Tutorial
                            </button>
                            <div className="mb-4 pt-2">
                                <motion.div
                                    key={currentStep}
                                    initial={{ x: '100%', opacity: 0 }}
                                    animate={{ x: '0%', opacity: 1 }}
                                    exit={{ x: '-100%', opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Image
                                        src={tutorialSteps[currentStep].image}
                                        width={1200}
                                        height={200}
                                        alt={tutorialSteps[currentStep].title}
                                        className="w-full h-48 object-cover rounded-lg shadow-md"
                                    />
                                </motion.div>
                            </div>
                            <div className="pb-16">
                                <h2 className="text-2xl font-bold mb-2 text-purple-500">{tutorialSteps[currentStep].title}</h2>
                                <p className="mb-4 dark:text-gray-400">{tutorialSteps[currentStep].content}</p>
                            </div>
                            <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded">
                                <div
                                    className="absolute h-full bg-purple-500 dark:bg-purple-400 rounded"
                                    style={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
                                />
                            </div>
                            <div className="flex justify-between items-center pt-6">
                                <button
                                    onClick={prevStep}
                                    disabled={currentStep === 0}
                                    className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep === 0 ? 'bg-gray-300' : 'bg-gray-200'} dark:bg-gray-700 text-gray-${currentStep === 0 ? '400' : '600'} disabled:opacity-50`}
                                    aria-label="Previous step"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <span className="text-md text-purple-500 dark:text-gray-400">
                  {currentStep + 1} / {tutorialSteps.length}
                </span>
                                <button
                                    onClick={nextStep}
                                    className={`flex items-center justify-center w-10 h-10 rounded-full bg-purple-500 text-primary-foreground ${currentStep === tutorialSteps.length - 1 ? 'bg-green-500' : ''} dark:bg-primary-dark dark:text-primary-foreground-dark`}
                                    aria-label={currentStep === tutorialSteps.length - 1 ? "Finish tutorial" : "Next step"}
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default TutorialPopup;