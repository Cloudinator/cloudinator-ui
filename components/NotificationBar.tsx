import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const NotificationBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [shouldHide, setShouldHide] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setShouldHide(prevScrollPos < currentScrollPos && currentScrollPos > 0);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="notification-bar"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: shouldHide ? -100 : 0, opacity: shouldHide ? 0 : 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="sticky top-0 left-0 right-0 z-50"
        >
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 shadow-lg">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="flex-1">
                <Link href="/service" className="flex-1 group">
                  <span className="text-sm md:text-base lg:text-lg font-medium group-hover:underline shimmer-text relative block w-full">
                    <span className="relative z-10 sm:text-sm text-center ">
                      {typeof window !== "undefined" && window.innerWidth < 768 ? (
                        <span className="block sm:hidden">New Feature is available!</span>
                      ) : (
                        <span className="hidden sm:block">🚀 New Feature is available! Click here now for more info</span>
                      )}
                    </span>
                  </span>
                </Link>
              </div>
              <div className="flex-1 flex justify-end">
                <button
                  onClick={handleClose}
                  className="text-white hover:text-gray-200 transition-colors duration-200"
                  aria-label="Close notification"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

        </motion.div>
      )}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0);
          }
          50% {
            text-shadow:
              0 0 20px rgba(255, 255, 255, 0.5),
              0 0 30px rgba(255, 255, 255, 0.3);
          }
          100% {
            background-position: 200% 0;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0);
          }
        }
        .shimmer-text {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 1) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 3s infinite linear;
          background-repeat: no-repeat;
          background-color: white;
          -webkit-text-fill-color: white;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </AnimatePresence>
  );
};

export default NotificationBar;
