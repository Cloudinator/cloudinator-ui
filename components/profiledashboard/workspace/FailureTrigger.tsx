import { useEffect, useState } from "react";

interface FailureTriggerProps {
    /**
     * Whether to automatically trigger the failure alert.
     * @default false
     */
    autoTrigger?: boolean;
    /**
     * Duration of the failure alert in seconds.
     * @default 3
     */
    duration?: number;
    /**
     * Callback function to execute after the failure alert ends.
     */
    onComplete?: () => void;
}

export function FailureTrigger({
                                   autoTrigger = false,
                                   duration = 3,
                                   onComplete,
                               }: FailureTriggerProps) {
    const [isVisible, setIsVisible] = useState(false);

    const triggerFailure = () => {
        setIsVisible(true); // Show the alert

        // Hide the alert after the specified duration
        setTimeout(() => {
            setIsVisible(false);
            if (onComplete) onComplete(); // Execute the callback function
        }, duration * 1000);
    };

    // Automatically trigger failure alert if `autoTrigger` is true
    useEffect(() => {
        if (autoTrigger) {
            triggerFailure();
        }
    }, [autoTrigger]);

    return (
        <>
            {isVisible && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        border: "10px solid rgba(255, 0, 0, 0.8)",
                        pointerEvents: "none", // Ensure the border doesn't block interactions
                        zIndex: 1000,
                        animation: "fadeInOut 3s ease-in-out",
                    }}
                >
                    <style>
                        {`
                        @keyframes fadeInOut {
                          0% {
                            opacity: 0;
                            border-width: 0;
                          }
                          10% {
                            opacity: 1;
                            border-width: 10px;
                          }
                          90% {
                            opacity: 1;
                            border-width: 10px;
                          }
                          100% {
                            opacity: 0;
                            border-width: 0;
                          }
                        }
                      `}
                    </style>
                </div>
            )}
        </>
    );
}