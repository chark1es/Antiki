import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProfileSection from "./ProfileSection";
import Navigation from "./Navigation";

type ActiveNavType = "left" | "right" | "top" | "bottom" | null;

const SplitLayout: React.FC = () => {
    const [activeNav, setActiveNav] = useState<ActiveNavType>(null);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [showToast, setShowToast] = useState<boolean>(true);
    const navigationRef = useRef<HTMLDivElement>(null);

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

    // Handle escape key and click outside
    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && activeNav) {
                setActiveNav(null);
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (navigationRef.current && !navigationRef.current.contains(event.target as Node) && activeNav) {
                setActiveNav(null);
            }
        };

        if (activeNav) {
            document.addEventListener('keydown', handleEscapeKey);
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activeNav]);

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

    const handleNavToggle = (side: "left" | "right" | "top" | "bottom"): void => {
        if (activeNav === side) {
            setActiveNav(null);
        } else {
            setActiveNav(side);
        }
    };

    const handleCloseNav = () => {
        setActiveNav(null);
    };

    // Determine which navigation to show
    const showAntonNav = activeNav === "left" || activeNav === "top";
    const showKikiNav = activeNav === "right" || activeNav === "bottom";

    return (
        <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} h-screen w-full overflow-hidden bg-gradient-to-b from-white to-gray-50 relative`}>
            {/* Enhanced background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                {/* Yellow elements for Anton's section */}
                <div className={`absolute ${isMobile ? 'top-10 left-10' : 'top-10 left-10'} w-64 h-64 rounded-full bg-yellow-100 opacity-20 blur-3xl`} />
                <div className={`absolute ${isMobile ? 'top-1/4 right-1/4' : 'top-1/3 left-1/4'} w-40 h-40 rounded-full bg-yellow-100 opacity-10 blur-2xl`} />
                <div className={`absolute ${isMobile ? 'top-1/3 left-1/3' : 'bottom-1/3 left-1/3'} w-32 h-32 rounded-full bg-amber-100 opacity-10 blur-xl`} />

                {/* Red elements for Kiki's section */}
                <div className={`absolute ${isMobile ? 'bottom-10 right-10' : 'bottom-10 right-10'} w-80 h-80 rounded-full bg-red-100 opacity-20 blur-3xl`} />
                <div className={`absolute ${isMobile ? 'bottom-1/4 left-1/4' : 'bottom-1/3 right-1/4'} w-40 h-40 rounded-full bg-red-100 opacity-10 blur-2xl`} />
                <div className={`absolute ${isMobile ? 'bottom-1/3 right-20' : 'top-1/4 right-20'} w-36 h-36 rounded-full bg-rose-100 opacity-10 blur-xl`} />

                {/* Additional colorful elements */}
                <div className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full bg-purple-100 opacity-10 blur-2xl" />
                <div className={`absolute ${isMobile ? 'bottom-1/4 right-1/3' : 'bottom-1/4 right-1/3'} w-24 h-24 rounded-full bg-orange-100 opacity-10 blur-xl`} />
                <div className="absolute top-20 left-20 w-20 h-20 rounded-full bg-blue-100 opacity-10 blur-lg" />
            </div>

            {/* Toast notification */}
            <AnimatePresence>
                {showToast && !activeNav && (
                    <motion.div
                        className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-lg z-50 flex items-center"
                        initial={{ opacity: 0, y: -20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <span className="text-gray-700 font-medium">Choose a person to view their journey ✨</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Anton's section */}
            <ProfileSection
                name="Anton"
                side={isMobile ? "top" : "left"}
                isActive={activeNav === (isMobile ? "top" : "left")}
                onToggleNav={() => handleNavToggle(isMobile ? "top" : "left")}
                showNav={showAntonNav}
                otherSideActive={activeNav === (isMobile ? "bottom" : "right")}
                isMobile={isMobile}
            />

            {/* Kiki's section */}
            <ProfileSection
                name="Kiki"
                side={isMobile ? "bottom" : "right"}
                isActive={activeNav === (isMobile ? "bottom" : "right")}
                onToggleNav={() => handleNavToggle(isMobile ? "bottom" : "right")}
                showNav={showKikiNav}
                otherSideActive={activeNav === (isMobile ? "top" : "left")}
                isMobile={isMobile}
            />

            {/* Navigation panels - rendered at the top level for better control */}
            <AnimatePresence mode="wait">
                {showAntonNav && (
                    <motion.div
                        key="anton-nav"
                        ref={navigationRef}
                        className={`absolute inset-0 w-full h-full z-40 ${isMobile ? 'bg-white/95 backdrop-blur-md' : ''}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <Navigation
                            side={isMobile ? "top" : "left"}
                            isVisible={true}
                            person="Anton"
                            isMobile={isMobile}
                            onClose={handleCloseNav}
                        />
                    </motion.div>
                )}

                {showKikiNav && (
                    <motion.div
                        key="kiki-nav"
                        ref={navigationRef}
                        className={`absolute inset-0 w-full h-full z-40 ${isMobile ? 'bg-white/95 backdrop-blur-md' : ''}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <Navigation
                            side={isMobile ? "bottom" : "right"}
                            isVisible={true}
                            person="Kiki"
                            isMobile={isMobile}
                            onClose={handleCloseNav}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Enhanced mobile back button */}
            <AnimatePresence>
                {isMobile && activeNav && (
                    <motion.button
                        className="absolute top-4 right-4 z-50 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg border border-gray-200/50 hover:bg-white hover:shadow-xl transition-all duration-300"
                        onClick={handleCloseNav}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SplitLayout; 