"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";
const NotificationBar: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
    };

    return (
        isVisible && (
            <div className="bg-purple-500 text-white p-2 text-center flex justify-center items-center">
                <Link href="/service">
                    <span className="text-sm">
                    🚀 New Feature is here! Click now for info
                </span>
                </Link>

                <button
                    onClick={handleClose}
                    className="ml-4 text-white hover:text-gray-200"
                    aria-label="Close notification"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
        )
    );
};

export default NotificationBar;
