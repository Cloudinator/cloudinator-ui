"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import {
  AlertCircle,
  CheckCircle,
  Loader2,
  Terminal,
  AlertTriangle,
  Info,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

type StreamingLogProps = {
  name: string;
  buildNumber: number;
};

export const StreamingLog = ({ name, buildNumber }: StreamingLogProps) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isDeploying, setIsDeploying] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [progress, setProgress] = useState(0);
  const eventSourceRef = useRef<EventSource | null>(null);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");

  const connectToEventSource = () => {
    const url = `https://stream.psa-khmer.world/api/v1/jenkins/stream-log/${name}/${buildNumber}`;
    console.log(`Connecting to: ${url}`);

    eventSourceRef.current = new EventSource(url);

    // Set a timeout for the connection
    const connectionTimeout = setTimeout(() => {
      if (eventSourceRef.current?.readyState !== EventSource.OPEN) {
        setError("Connection timed out. Please try again later.");
        setIsDeploying(false);
        eventSourceRef.current?.close();
      }
    }, 10000); // 10 seconds timeout

    eventSourceRef.current.onopen = (event: Event) => {
      console.log("Connection opened:", event);
      setError(null);
      clearTimeout(connectionTimeout); // Clear the timeout if the connection is successful
    };

    eventSourceRef.current.onmessage = (event) => {
      console.log("Received message:", event.data);
      const newLogs = event.data.split("\n");

      // Check if the build is successful
      if (newLogs.some((log: string) => log.includes("Finished: SUCCESS"))) {
        setIsDeploying(false);
        setProgress(100);
        eventSourceRef.current?.close(); // Close the connection on success
      }

      setLogs((prevLogs) => [...prevLogs, ...newLogs]);
      setProgress((prev) => Math.min(prev + 2, 100)); // Increment progress
    };

    eventSourceRef.current.onerror = () => {
      if (eventSourceRef.current?.readyState === EventSource.CLOSED) {
        console.log("Stream ended normally");
        setIsDeploying(false);
        setProgress(100);
      } else {
        console.log("Connection failed. Retrying in 5 seconds...");
        setError("Connection failed. Retrying...");
        setIsDeploying(true);

        // Retry the connection after 5 seconds
        retryTimeoutRef.current = setTimeout(() => {
          connectToEventSource();
        }, 5000);
      }

      eventSourceRef.current?.close();
    };
  };

  useEffect(() => {
    connectToEventSource();

    return () => {
      console.log("Closing connection");
      eventSourceRef.current?.close();
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, [name, buildNumber]);

  useEffect(() => {
    if (autoScroll && logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  const toggleAutoScroll = () => setAutoScroll(!autoScroll);

  const getLogLevel = (log: string) => {
    if (log.includes("ERROR")) return "error";
    if (log.includes("WARN")) return "warn";
    return "info";
  };

  const getLogIcon = (log: string) => {
    const level = getLogLevel(log);
    switch (level) {
      case "error":
        return <span>❌</span>;
      case "warn":
        return <span>⚠️</span>;
      default:
        return <span>ℹ️</span>;
    }
  };

  const logStats = useMemo(() => {
    const errorCount = logs.filter((log) =>
      log.toLowerCase().includes("error"),
    ).length;
    const warningCount = logs.filter((log) =>
      log.toLowerCase().includes("warning"),
    ).length;
    const infoCount = logs.filter((log) =>
      log.toLowerCase().includes("info"),
    ).length;
    return { errorCount, warningCount, infoCount };
  }, [logs]);

  const getLogClass = (log: string) => {
    if (log.toLowerCase().includes("error"))
      return "text-red-500 dark:text-red-400";
    if (log.toLowerCase().includes("warning"))
      return "text-yellow-500 dark:text-yellow-400";
    if (log.toLowerCase().includes("info"))
      return "text-blue-500 dark:text-blue-400";
    return "text-gray-700 dark:text-gray-300";
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div
        className={`mb-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-500 ${
          isDeploying
            ? "border-2 border-purple-500 animate-glow" // Glowing border when deploying
            : "border border-gray-200 dark:border-gray-700" // Default border when not deploying
        }`}
      >
        <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">
          <span className="text-purple-500 font-semibold">{name}</span> Logs
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Build: <span className="font-semibold">{name}</span> | Number:{" "}
          <span className="font-semibold">#{buildNumber}</span>
        </p>
        <div className="mt-4 relative">
          <Progress
            value={progress}
            className="bg-gray-200 dark:bg-gray-700 transition-all duration-500 ease-in-out"
          />
          {/* Gradient overlay for the progress bar */}
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${progress}%` }}
          />
          {/* Pulsating effect when progress reaches 100% */}
          {progress === 100 && (
            <div className="absolute top-0 left-0 w-full h-full animate-pulse bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-50" />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between">
          <div className="flex items-center">
            <Terminal className="h-6 w-6 text-gray-500 mr-2 dark:text-gray-300" />
            <span className="font-semibold">Total Logs</span>
          </div>
          <span className="text-2xl font-bold">{logs.length}</span>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between">
          <div className="flex items-center">
            <AlertCircle className="h-6 w-6 text-red-500 mr-2 dark:text-red-400" />
            <span className="font-semibold">Errors</span>
          </div>
          <span className="text-2xl font-bold text-red-500 dark:text-red-400">
            {logStats.errorCount}
          </span>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between">
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 text-yellow-500 mr-2 dark:text-yellow-400" />
            <span className="font-semibold">Warnings</span>
          </div>
          <span className="text-2xl font-bold text-yellow-500 dark:text-yellow-400">
            {logStats.warningCount}
          </span>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between">
          <div className="flex items-center">
            <Info className="h-6 w-6 text-blue-500 mr-2 dark:text-blue-400" />
            <span className="font-semibold">Info</span>
          </div>
          <span className="text-2xl font-bold text-blue-500 dark:text-blue-400">
            {logStats.infoCount}
          </span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="auto-scroll"
              checked={autoScroll}
              onCheckedChange={toggleAutoScroll}
            />
            <label
              htmlFor="auto-scroll"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Auto-scroll
            </label>
          </div>
          {isDeploying && (
            <div className="flex items-center text-blue-600 dark:text-blue-400">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {error ? "Reconnecting..." : "Deploying..."}
            </div>
          )}
          {!isDeploying && !error && (
            <div className="flex items-center text-green-600 dark:text-green-400">
              <CheckCircle className="mr-2 h-4 w-4" />
              Deployment Complete
            </div>
          )}
        </div>

        {/* {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )} */}

        <div
          ref={logContainerRef}
          className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-auto h-[600px] font-mono text-sm border-2 border-gray-200 dark:border-gray-800 shadow-[0_0_15px_5px_rgba(59,130,246,0.1)] dark:shadow-[0_0_15px_5px_rgba(59,130,246,0.2)] relative"
        >
          {/* Glowing overlay for the container */}
          <div className="absolute inset-0 rounded-lg pointer-events-none shadow-[0_0_20px_10px_rgba(59,130,246,0.1)] dark:shadow-[0_0_20px_10px_rgba(59,130,246,0.3)] animate-pulse" />

          {/* Search and Filter Bar */}
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Search logs..."
              className="flex-1 p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="ml-2 p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFilterLevel(e.target.value)}
            >
              <option value="all">All</option>
              <option value="info">Info</option>
              <option value="warn">Warn</option>
              <option value="error">Error</option>
            </select>
          </div>

          {/* Log lines with smoother typewriter animation */}
          {logs
            .filter((log) => {
              const matchesSearch = log
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
              const matchesFilter =
                filterLevel === "all" || getLogLevel(log) === filterLevel;
              return matchesSearch && matchesFilter;
            })
            .map((log, index) => (
              <div
                key={index}
                className={`py-1 ${getLogClass(log)} animate-typing overflow-hidden whitespace-nowrap border-l-2 border-gray-300 dark:border-gray-700 pl-2`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Log icon based on log content */}
                <span className="mr-2">{getLogIcon(log)}</span>

                <span className="text-gray-500 dark:text-gray-400 mr-2">
                  {String(index + 1).padStart(4, "0")}
                </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400">
                  {log}
                </span>
              </div>
            ))}

          {/* Blinking cursor at the end of the last log line */}
          {logs.length > 0 && (
            <div className="inline-block h-4 w-1 bg-blue-500 dark:bg-blue-400 animate-blink ml-2" />
          )}

          {/* Custom scrollbar styling */}
          <style jsx>{`
            @keyframes fade-in {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
            .animate-typing {
              animation:
                typing 1s linear forwards,
                fade-in 0.5s ease-in-out;
            }

            .animate-typing {
              animation: typing 1s linear forwards; /* Smoother typewriter effect */
              white-space: nowrap;
              overflow: hidden;
            }

            @keyframes typing {
              from {
                width: 0;
              }
              to {
                width: 100%;
              }
            }

            /* Blinking cursor animation */
            @keyframes blink {
              0%,
              50% {
                opacity: 1;
              }
              51%,
              100% {
                opacity: 0;
              }
            }
            .animate-blink {
              animation: blink 1s infinite;
            }

            /* Custom scrollbar */
            ::-webkit-scrollbar {
              width: 8px;
            }

            ::-webkit-scrollbar-track {
              background: rgba(209, 213, 219, 0.1); /* Light mode track */
              border-radius: 4px;
            }

            .dark ::-webkit-scrollbar-track {
              background: rgba(75, 85, 99, 0.1); /* Dark mode track */
            }

            ::-webkit-scrollbar-thumb {
              background: rgba(59, 130, 246, 0.4); /* Light mode thumb */
              border-radius: 4px;
            }

            .dark ::-webkit-scrollbar-thumb {
              background: rgba(59, 130, 246, 0.6); /* Dark mode thumb */
            }

            ::-webkit-scrollbar-thumb:hover {
              background: rgba(59, 130, 246, 0.6); /* Light mode hover */
            }

            .dark ::-webkit-scrollbar-thumb:hover {
              background: rgba(59, 130, 246, 0.8); /* Dark mode hover */
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};
