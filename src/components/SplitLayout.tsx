import React, { useState } from "react";
import { motion } from "framer-motion";
import ProfileSection from "./ProfileSection";
import Navigation from "./Navigation";

type ActiveNavType = "left" | "right" | null;

const SplitLayout: React.FC = () => {
    const [activeNav, setActiveNav] = useState<ActiveNavType>(null);

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
        <div className="flex h-screen w-full overflow-hidden bg-white relative">
            {/* Anton's section */}
            <ProfileSection
                name="Anton"
                side="left"
                isActive={activeNav === "left"}
                onToggleNav={() => handleNavToggle("left")}
                showNav={showAntonNav}
                otherSideActive={activeNav === "right"}
            />

            {/* Vertical divider line */}
            <motion.div
                className="w-[2px] h-full bg-gray-300 relative z-30"
                animate={{
                    x:
                        activeNav === "left"
                            ? "50vw"
                            : activeNav === "right"
                                ? "-50vw"
                                : 0,
                    backgroundColor: activeNav ? "#e5e7eb" : "#d1d5db",
                    width: activeNav ? "2px" : "1px",
                    boxShadow: activeNav ? "0 0 10px rgba(0,0,0,0.1)" : "none",
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    backgroundColor: { duration: 0.3 },
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
            />

            {/* Navigation panels - rendered at the top level for better control */}
            {showAntonNav && (
                <div className="absolute top-0 right-0 w-1/2 h-full z-40">
                    <Navigation side="left" isVisible={true} person="Anton" />
                </div>
            )}

            {showKikiNav && (
                <div className="absolute top-0 left-0 w-1/2 h-full z-40">
                    <Navigation side="right" isVisible={true} person="Kiki" />
                </div>
            )}
        </div>
    );
};

export default SplitLayout; 