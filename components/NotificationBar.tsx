'use client'

import React, { useState } from "react"
import { X } from 'lucide-react'
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

const NotificationBar: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true)

    const handleClose = () => {
        setIsVisible(false)
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="sticky top-0 left-0 right-0 z-50"
                >
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 shadow-lg">
                        <div className="container mx-auto flex justify-center items-center space-x-4">
                            <Link 
                                href="/service"
                                className="text-center group transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                <span className="text-sm font-medium">
                                    🚀 New Feature is here! <span className="underline group-hover:no-underline">Click now for info</span>
                                </span>
                            </Link>
                            <button
                                onClick={handleClose}
                                className="text-white hover:text-gray-200 transition duration-300 ease-in-out transform hover:scale-110"
                                aria-label="Close notification"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default NotificationBar

