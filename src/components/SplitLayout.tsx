import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProfileSection from "./ProfileSection";
import Navigation from "./Navigation";

type ActiveNavType = "left" | "right" | null;

const SplitLayout: React.FC = () => {
    const [activeNav, setActiveNav] = useState<ActiveNavType>(null);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [showToast, setShowToast] = useState<boolean>(true);

    // Check if device is mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Initial check
        checkMobile();

        // Add event listener for window resize
        window.addEventListener('resize', checkMobile);

        // Cleanup
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Hide toast when a section is selected
    useEffect(() => {
        if (activeNav) {
            setShowToast(false);
        } else {
            // Show toast again when returning to the main view
            const timer = setTimeout(() => setShowToast(true), 1000);
            return () => clearTimeout(timer);
        }
    }, [activeNav]);

    const handleNavToggle = (side: "left" | "right"): void => {
        if (activeNav === side) {
            setActiveNav(null);
        } else {
            setActiveNav(side);
        }
    };

    // Determine which navigation to show
    const showAntonNav = activeNav === "left";
    const showKikiNav = activeNav === "right";

    return (
        <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-gradient-to-b from-white to-gray-50 relative">
            {/* Enhanced background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                {/* Yellow elements for Anton's side */}
                <motion.div
                    className="absolute top-10 left-10 w-64 h-64 rounded-full bg-yellow-100 opacity-20 blur-3xl"
                    animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.2, 0.25, 0.2]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                ></motion.div>
                <motion.div
                    className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-yellow-100 opacity-10 blur-2xl"
                    animate={{
                        scale: [1, 1.1, 1],
                        x: [0, 10, 0],
                        opacity: [0.1, 0.15, 0.1]
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                ></motion.div>
                <motion.div
                    className="absolute top-2/3 left-1/3 w-32 h-32 rounded-full bg-amber-100 opacity-10 blur-xl"
                    animate={{
                        y: [0, -15, 0],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                ></motion.div>

                {/* Red elements for Kiki's side */}
                <motion.div
                    className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-red-100 opacity-20 blur-3xl"
                    animate={{
                        scale: [1, 1.08, 1],
                        opacity: [0.2, 0.28, 0.2]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                ></motion.div>
                <motion.div
                    className="absolute bottom-1/3 left-1/4 w-40 h-40 rounded-full bg-red-100 opacity-10 blur-2xl"
                    animate={{
                        scale: [1, 1.15, 1],
                        x: [0, -15, 0],
                        opacity: [0.1, 0.18, 0.1]
                    }}
                    transition={{
                        duration: 14,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                ></motion.div>
                <motion.div
                    className="absolute top-1/4 right-20 w-36 h-36 rounded-full bg-rose-100 opacity-10 blur-xl"
                    animate={{
                        y: [0, 20, 0],
                        opacity: [0.1, 0.22, 0.1]
                    }}
                    transition={{
                        duration: 9,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                ></motion.div>

                {/* Additional colorful elements */}
                <motion.div
                    className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full bg-purple-100 opacity-10 blur-2xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.15, 0.1]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                ></motion.div>
                <motion.div
                    className="absolute bottom-1/4 right-1/3 w-24 h-24 rounded-full bg-orange-100 opacity-10 blur-xl"
                    animate={{
                        x: [0, 15, 0],
                        y: [0, -10, 0],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{
                        duration: 11,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                ></motion.div>
                <motion.div
                    className="absolute top-20 left-20 w-20 h-20 rounded-full bg-blue-100 opacity-10 blur-lg"
                    animate={{
                        x: [0, -10, 0],
                        y: [0, 10, 0],
                        opacity: [0.1, 0.15, 0.1]
                    }}
                    transition={{
                        duration: 13,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                ></motion.div>
            </div>

            {/* Toast notification */}
            <AnimatePresence>
                {showToast && !activeNav && (
                    <motion.div
                        className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-lg z-50 flex items-center"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <span className="text-gray-700 font-medium">Choose a person to view their journey ✨</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Anton's section */}
            <ProfileSection
                name="Anton"
                side="left"
                isActive={activeNav === "left"}
                onToggleNav={() => handleNavToggle("left")}
                showNav={showAntonNav}
                otherSideActive={activeNav === "right"}
                isMobile={isMobile}
            />

            {/* Kiki's section */}
            <ProfileSection
                name="Kiki"
                side="right"
                isActive={activeNav === "right"}
                onToggleNav={() => handleNavToggle("right")}
                showNav={showKikiNav}
                otherSideActive={activeNav === "left"}
                isMobile={isMobile}
            />

            {/* Navigation panels - rendered at the top level for better control */}
            {showAntonNav && (
                <motion.div
                    className={`absolute ${isMobile ? 'top-1/2 left-0' : 'top-0 right-0'} ${isMobile ? 'w-full h-1/2' : 'w-1/2 h-full'} z-40`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <Navigation side="left" isVisible={true} person="Anton" isMobile={isMobile} />
                </motion.div>
            )}

            {showKikiNav && (
                <motion.div
                    className={`absolute ${isMobile ? 'top-0 left-0' : 'top-0 left-0'} ${isMobile ? 'w-full h-1/2' : 'w-1/2 h-full'} z-40`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <Navigation side="right" isVisible={true} person="Kiki" isMobile={isMobile} />
                </motion.div>
            )}

            {/* Mobile back button */}
            {isMobile && activeNav && (
                <motion.button
                    className="absolute bottom-4 right-4 z-50 bg-white p-3 rounded-full shadow-md"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => setActiveNav(null)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </motion.button>
            )}
        </div>
    );
};

export default SplitLayout; 