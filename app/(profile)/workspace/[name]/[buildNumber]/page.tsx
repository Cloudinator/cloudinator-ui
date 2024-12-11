'use client'

import { useEffect, useRef, useState, useMemo } from "react"
import { AlertCircle, CheckCircle, Loader2, Terminal, AlertTriangle, Info } from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"


type PropsParams = {
    params: Promise<{ name: string; buildNumber: number }>;
};

const LogPage = (props: PropsParams) => {
    const [params, setParams] = useState<{ name: string; buildNumber: number } | null>(null);

    useEffect(() => {
        props.params.then(setParams);
    }, [props.params]);

    const [logs, setLogs] = useState<string[]>([])
    const [isDeploying, setIsDeploying] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [autoScroll, setAutoScroll] = useState(true)
    const [progress, setProgress] = useState(0)
    const eventSourceRef = useRef<EventSource | null>(null)
    const logContainerRef = useRef<HTMLDivElement>(null)



    useEffect(() => {
        if (!params) return;

        const { name, buildNumber } = params;
        const url = `http://localhost:8081/project/api/v1/deploy-service/stream-log/${name}/${buildNumber}`
        console.log(`Connecting to: ${url}`)

        eventSourceRef.current = new EventSource(url)

        eventSourceRef.current.onopen = (event: Event) => {
            console.log('Connection opened:', event)
            setError(null)
        }

        eventSourceRef.current.onmessage = (event) => {
            console.log('Received message:', event.data)
            const newLogs = event.data.split('\n')
            setLogs(prevLogs => [...prevLogs, ...newLogs])
            setProgress(prev => Math.min(prev + 2, 100))
        }

        eventSourceRef.current.onerror = (error: Event) => {
            console.log('Connection error:', error)

            if (eventSourceRef.current?.readyState === EventSource.CLOSED) {
                console.log('Stream ended normally')
                setIsDeploying(false)
                setProgress(100)
            } else {
                setIsDeploying(false)
                setError("Failed to connect to the log stream. The build may have completed successfully.")
            }

            eventSourceRef.current?.close()
        }

        return () => {
            console.log('Closing connection')
            eventSourceRef.current?.close()
        }
    }, [params])

    useEffect(() => {
        if (autoScroll && logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
        }
    }, [logs, autoScroll])

    const toggleAutoScroll = () => setAutoScroll(!autoScroll)

    const logStats = useMemo(() => {
        const errorCount = logs.filter(log => log.toLowerCase().includes('error')).length
        const warningCount = logs.filter(log => log.toLowerCase().includes('warning')).length
        const infoCount = logs.filter(log => log.toLowerCase().includes('info')).length
        return { errorCount, warningCount, infoCount }
    }, [logs])

    const getLogClass = (log: string) => {
        if (log.toLowerCase().includes('error')) return 'text-red-500'
        if (log.toLowerCase().includes('warning')) return 'text-yellow-500'
        if (log.toLowerCase().includes('info')) return 'text-blue-500'
        return ''
    }

    if (!params) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
            <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-2 text-gray-800">{params.name} Logs</h1>
                <p className="text-gray-600">
                    Build: <span className="font-semibold">{params.name}</span> |
                    Number: <span className="font-semibold">#{params.buildNumber}</span>
                </p>
                <Progress value={progress} className="mt-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                    <div className="flex items-center">
                        <Terminal className="h-6 w-6 text-gray-500 mr-2" />
                        <span className="font-semibold">Total Logs</span>
                    </div>
                    <span className="text-2xl font-bold">{logs.length}</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                    <div className="flex items-center">
                        <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
                        <span className="font-semibold">Errors</span>
                    </div>
                    <span className="text-2xl font-bold text-red-500">{logStats.errorCount}</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                    <div className="flex items-center">
                        <AlertTriangle className="h-6 w-6 text-yellow-500 mr-2" />
                        <span className="font-semibold">Warnings</span>
                    </div>
                    <span className="text-2xl font-bold text-yellow-500">{logStats.warningCount}</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                    <div className="flex items-center">
                        <Info className="h-6 w-6 text-blue-500 mr-2" />
                        <span className="font-semibold">Info</span>
                    </div>
                    <span className="text-2xl font-bold text-blue-500">{logStats.infoCount}</span>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                        <Switch id="auto-scroll" checked={autoScroll} onCheckedChange={toggleAutoScroll} />
                        <label htmlFor="auto-scroll" className="text-sm font-medium">
                            Auto-scroll
                        </label>
                    </div>
                    {isDeploying && (
                        <div className="flex items-center text-blue-600">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Deploying...
                        </div>
                    )}
                    {!isDeploying && !error && (
                        <div className="flex items-center text-green-600">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Deployment Complete
                        </div>
                    )}
                </div>

                {error && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <div
                    ref={logContainerRef}
                    className="bg-gray-100 p-4 rounded-lg overflow-auto h-[600px] font-mono text-sm"
                >
                    {logs.map((log, index) => (
                        <div key={index} className={`py-1 ${getLogClass(log)}`}>
                            <span className="text-gray-500 mr-2">{String(index + 1).padStart(4, '0')}</span>
                            {log}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LogPage