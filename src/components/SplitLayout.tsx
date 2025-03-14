import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProfileSection from "./ProfileSection";
import Navigation from "./Navigation";

type ActiveNavType = "left" | "right" | null;

const SplitLayout: React.FC = () => {
    const [activeNav, setActiveNav] = useState<ActiveNavType>(null);
    const [isMobile, setIsMobile] = useState<boolean>(false);

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
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-indigo-100 opacity-20 blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-teal-100 opacity-20 blur-3xl"></div>
                <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-indigo-100 opacity-10 blur-2xl"></div>
                <div className="absolute bottom-1/3 left-1/4 w-40 h-40 rounded-full bg-teal-100 opacity-10 blur-2xl"></div>
            </div>

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

            {/* Vertical divider line - hidden on mobile */}
            <motion.div
                className="hidden md:block w-[1px] h-full bg-gradient-to-b from-transparent via-gray-300 to-transparent relative z-30"
                animate={{
                    x:
                        activeNav === "left"
                            ? "50vw"
                            : activeNav === "right"
                                ? "-50vw"
                                : 0,
                    width: activeNav ? "2px" : "1px",
                    boxShadow: activeNav === "left"
                        ? "0 0 15px rgba(79, 70, 229, 0.2)" // Indigo glow for Anton
                        : activeNav === "right"
                            ? "0 0 15px rgba(20, 184, 166, 0.2)" // Teal glow for Kiki
                            : "none",
                }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    duration: 0.2,
                }}
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