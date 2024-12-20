'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import { useGetMeQuery } from '@/redux/api/userApi'

const tutorialSteps = [
    {
        title: "Welcome to Cloudinator",
        content: "Your deployment is not easier than that",
        image: "/tutorial/homepage.png"
    },
    {
        title: "Deployment Pipeline",
        content: "Create automating workflows with CI/CD Tools.",
        image: "/tutorial/service.png"
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
    const { data: userData, isLoading: isUserLoading} = useGetMeQuery();

    useEffect(() => {
        const hasSeenTutorial = localStorage.getItem('hasSeenTutorial')
        if (!hasSeenTutorial && !isUserLoading && userData) {
            setIsOpen(true)
        }
    }, [isUserLoading, userData])

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

    const getPersonalizedContent = (step: typeof tutorialSteps[0]) => {
        if (userData) {
            switch (step.title) {
                case "Welcome to Cloudinator":
                    return `Welcome, ${userData.username}! Your deployment journey starts here.`
                case "Deployment Pipeline":
                    return `${userData.username}, create automating workflows with our CI/CD Tools.`
                case "Personal Cloud Storage":
                    return `${userData.username}, securely send and save files in your personal cloud.`
                default:
                    return step.content
            }
        }
        return step.content
    }

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
                        onClick={closeTutorial}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl px-8 pt-4 pb-6 max-w-md w-full relative transition-transform duration-300 ease-in-out"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500 flex items-center px-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m12 16l1.4-1.4l-1.6-1.6H16v-2h-4.2l1.6-1.6L12 8l-4 4zm0 6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m12 16l4-4l-4-4l-1.4 1.4l1.6 1.6H8v2h4.2l-1.6 1.6zm0 6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
                                    <h1 className="ml-2">Navigate</h1>
                                </span>
                                <button onClick={closeTutorial} className="text-gray-500">
                                    Skip Tutorial
                                </button>
                            </div>
                            
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
                                <p className="mb-4 dark:text-gray-400">{getPersonalizedContent(tutorialSteps[currentStep])}</p>
                                {tutorialSteps[currentStep].title === "Documentation" && (
                                    <Link href="https://cloudinator-doc-vercel.vercel.app/">
                                        <span className="text-purple-500 underline">Go to Documentation</span>
                                    </Link>
                                )}
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
