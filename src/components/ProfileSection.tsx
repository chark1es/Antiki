import React from "react";
import { motion } from "framer-motion";

interface ProfileSectionProps {
    name: string;
    side: "left" | "right";
    isActive: boolean;
    onToggleNav: () => void;
    showNav: boolean;
    otherSideActive: boolean;
    isMobile: boolean;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
    name,
    side,
    isActive,
    onToggleNav,
    showNav,
    otherSideActive,
    isMobile,
}) => {
    // Updated bio text with their actual interests
    const bioText = {
        Anton: "A passionate drummer with a rhythm that moves the soul. When not creating beats and exploring new sounds, Anton can be found perfecting his craft and finding inspiration in the world of music.",
        Kiki: "A creative soul who expresses herself through poetry and photography. Kiki captures the beauty of life both in carefully crafted words and stunning visual compositions that tell stories of their own."
    };

    // Determine background gradient based on side - different colors for Anton and Kiki
    const bgGradient = side === "left"
        ? "bg-gradient-to-r from-indigo-50 to-white" // Anton - indigo
        : "bg-gradient-to-l from-teal-50 to-white";  // Kiki - teal

    // Text colors for each person
    const textColor = side === "left" ? "text-indigo-900" : "text-teal-900";
    const textColorLight = side === "left" ? "text-indigo-800" : "text-teal-800";

    return (
        <motion.div
            className={`${isMobile ? 'h-1/2 w-full' : 'h-full w-1/2'} flex flex-col items-center justify-center ${side === "left" ? "md:pr-4" : "md:pl-4"
                } relative`}
            initial={{ width: isMobile ? "100%" : "50%", height: isMobile ? "50%" : "100%" }}
            animate={{
                width: isMobile ? "100%" : "50%",
                height: isMobile ? (otherSideActive ? "0%" : "50%") : "100%",
                opacity: otherSideActive ? (isMobile ? 0 : 0.3) : 1,
                filter: otherSideActive ? (isMobile ? "blur(0px)" : "blur(2px)") : "none",
                scale: otherSideActive ? (isMobile ? 1 : 0.95) : 1,
                zIndex: otherSideActive ? 0 : 1,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25, duration: 0.2 }}
        >
            <div
                className={`h-full w-full flex flex-col items-center justify-center cursor-pointer ${isActive ? bgGradient : `hover:${bgGradient}`
                    } transition-all duration-300`}
                onClick={onToggleNav}
            >
                <motion.div
                    className="flex flex-col items-center px-4"
                    initial={{ y: 0 }}
                    animate={{ y: showNav ? (isMobile ? 0 : -20) : 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25, duration: 0.2 }}
                >
                    <motion.h1
                        className={`${isMobile ? 'text-4xl' : 'text-6xl'} font-serif mb-4 ${textColor}`}
                        animate={{
                            scale: showNav ? 0.95 : 1,
                            opacity: showNav ? 0.8 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {name}
                    </motion.h1>

                    <motion.div
                        className={`w-24 h-0.5 mb-6 ${side === "left"
                            ? "bg-gradient-to-r from-transparent via-indigo-300 to-transparent"
                            : "bg-gradient-to-r from-transparent via-teal-300 to-transparent"
                            }`}
                        animate={{
                            width: showNav ? "3rem" : "5rem",
                            opacity: showNav ? 0.6 : 1,
                        }}
                        transition={{ duration: 0.2 }}
                    />

                    <motion.p
                        className={`text-center max-w-md px-4 ${isMobile ? 'text-sm' : 'text-base'} leading-relaxed ${textColorLight} font-light`}
                        animate={{
                            scale: showNav ? 0.95 : 1,
                            opacity: showNav ? 0.7 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {isMobile
                            ? (name === "Anton"
                                ? bioText.Anton.split('.')[0] + '.'
                                : bioText.Kiki.split('.')[0] + '.')
                            : (name === "Anton" ? bioText.Anton : bioText.Kiki)
                        }
                    </motion.p>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ProfileSection; 