'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { devopsCommands } from '@/utils/devopsCommands'

export function ErrorTerminal() {
    const [input, setInput] = useState('')
    const [output, setOutput] = useState<string[]>([
        'Cloudinator!',
        'Error: Unspecified page cannot be found!',
        'Type "help" to see available commands.',
    ])
    const [suggestions, setSuggestions] = useState<string[]>([])
    const terminalRef = useRef<HTMLDivElement>(null)
    const router = useRouter() // Initialize router

    useEffect(() => {
        // Auto-scroll to bottom
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight
        }
    }, [output])

    const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const command = input.trim().toLowerCase()
            const result = devopsCommands[command] || `❌ Command not found: "${command}"`

            // Update terminal output and reset input
            setOutput((prev) => [...prev, `$ ${input}`, result])
            setInput('')
            setSuggestions([])
        } else {
            // Show suggestions as user types
            const query = input.toLowerCase()
            const matches = Object.keys(devopsCommands).filter((cmd) =>
                cmd.startsWith(query)
            )
            setSuggestions(matches)
        }
    }

    const handleSuggestionClick = (suggestion: string) => {
        setInput(suggestion)
        setSuggestions([])
    }

    const handleHomeClick = () => {
        router.push('/')
    }

    return (
        <div className="bg-black p-4 rounded-lg shadow-lg font-mono text-sm">
            <div
                ref={terminalRef}
                className="h-96 overflow-y-auto mb-4 whitespace-pre-wrap text-green-400" // Changed text color to green for hacker theme
            >
                {output.map((line, index) => (
                    <div
                        key={index}
                        className={`mb-1 ${
                            line.startsWith('❌') ? 'text-red-500' : 'text-green-400' // Consistent green color for output
                        }`}
                    >
                        {line.startsWith('$ ') ? (
                            <span
                                className="cursor-pointer hover:text-cyan-400" // Change hover color to cyan for links
                                onClick={() => setInput(line.replace('$ ', ''))}
                            >
                                {line}
                            </span>
                        ) : (
                            line
                        )}
                    </div>
                ))}
            </div>
            <div className="relative">
                <div className="flex items-center bg-gray-900 p-2 rounded-md"> {/* Darker background for input area */}
                    <span className="text-green-400 mr-2">$</span> {/* Change prompt color to green */}
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleInput}
                        className="bg-transparent border-none outline-none flex-grow text-green-400 placeholder-gray-500"
                        placeholder="Type a command..."
                        autoFocus
                    />
                </div>
                {suggestions.length > 0 && (
                    <ul className="absolute top-12 left-0 w-full bg-gray-800 border border-gray-700 rounded-md overflow-hidden z-10">
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-700 text-green-400" // Keep suggestion text green
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {/* Button to return to home */}
            <button
                onClick={handleHomeClick}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200"
            >
                Go Home
            </button>
        </div>
    )
}