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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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

  const connectToEventSource = () => {
    const url = `https://stream.psa-khmer.world/api/v1/jenkins/stream-log/${name}/${buildNumber}`;
    console.log(`Connecting to: ${url}`);

    eventSourceRef.current = new EventSource(url);

    // Set a timeout for the connection
    const connectionTimeout = setTimeout(() => {
      if (eventSourceRef.current?.readyState !== EventSource.OPEN) {
        // console.error("Connection timed out");
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
      setLogs((prevLogs) => [...prevLogs, ...newLogs]);
      setProgress((prev) => Math.min(prev + 2, 100));
    };

    eventSourceRef.current.onerror = (error: Event) => {
      console.error("Connection error:", error);

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
    if (log.toLowerCase().includes("error")) return "text-red-500";
    if (log.toLowerCase().includes("warning")) return "text-yellow-500";
    if (log.toLowerCase().includes("info")) return "text-blue-500";
    return "";
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">{name} Logs</h1>
        <p className="text-gray-600">
          Build: <span className="font-semibold">{name}</span> | Number:{" "}
          <span className="font-semibold">#{buildNumber}</span>
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
          <span className="text-2xl font-bold text-red-500">
            {logStats.errorCount}
          </span>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 text-yellow-500 mr-2" />
            <span className="font-semibold">Warnings</span>
          </div>
          <span className="text-2xl font-bold text-yellow-500">
            {logStats.warningCount}
          </span>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div className="flex items-center">
            <Info className="h-6 w-6 text-blue-500 mr-2" />
            <span className="font-semibold">Info</span>
          </div>
          <span className="text-2xl font-bold text-blue-500">
            {logStats.infoCount}
          </span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="auto-scroll"
              checked={autoScroll}
              onCheckedChange={toggleAutoScroll}
            />
            <label htmlFor="auto-scroll" className="text-sm font-medium">
              Auto-scroll
            </label>
          </div>
          {isDeploying && (
            <div className="flex items-center text-blue-600">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {error ? "Reconnecting..." : "Deploying..."}
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
              <span className="text-gray-500 mr-2">
                {String(index + 1).padStart(4, "0")}
              </span>
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
