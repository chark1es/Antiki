import React from "react";
import { motion } from "framer-motion";

interface NavigationItem {
    name: string;
    url: string;
    icon?: string;
}

interface NavigationProps {
    side: "left" | "right";
    isVisible: boolean;
    person: string;
    isMobile: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ side, isVisible, person, isMobile }) => {
    // Updated navigation items for Anton and Kiki with icons
    const getNavItems = (): NavigationItem[] => {
        if (person === "Anton") {
            return [
                { name: "Home", url: "#", icon: "🏠" },
                { name: "Drumming", url: "#", icon: "🥁" },
                { name: "Music", url: "#", icon: "🎵" },
                { name: "Performances", url: "#", icon: "🎪" },
                { name: "Contact", url: "#", icon: "📧" },
            ];
        } else if (person === "Kiki") {
            return [
                { name: "About", url: "#", icon: "💫" },
                { name: "Poetry", url: "#", icon: "📝" },
                { name: "Photography", url: "#", icon: "📸" },
                { name: "Gallery", url: "#", icon: "🖼️" },
                { name: "Contact", url: "#", icon: "✉️" },
            ];
        }
        return [];
    };

    const navItems = getNavItems();

    // Determine background and text colors based on person - updated for Kiki
    const bgColor = person === "Anton"
        ? "bg-gradient-to-r from-yellow-100 via-yellow-50 to-white"
        : "bg-gradient-to-l from-red-100 via-red-50 to-white";
    const textColor = person === "Anton" ? "text-yellow-900" : "text-red-900";
    const hoverColor = person === "Anton" ? "hover:text-yellow-600" : "hover:text-red-600";
    const borderColor = person === "Anton" ? "border-yellow-200" : "border-red-200";

    // Divider color
    const dividerColor = person === "Anton"
        ? "bg-gradient-to-r from-transparent via-yellow-300 to-transparent"
        : "bg-gradient-to-r from-transparent via-red-300 to-transparent";

    return (
        <motion.div
            className={`w-full h-full flex items-center justify-center ${bgColor}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            <div className={`w-full ${isMobile ? 'max-w-full px-6' : 'max-w-md px-8'}`}>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05, duration: 0.2 }}
                    className="text-center"
                >
                    <motion.h2
                        className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-serif mb-2 ${textColor}`}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.2 }}
                    >
                        {person}'s Journey
                    </motion.h2>

                    <motion.div
                        className={`w-32 h-0.5 mx-auto mb-6 ${dividerColor}`}
                        initial={{ width: 0 }}
                        animate={{ width: isMobile ? "6rem" : "8rem" }}
                        transition={{ delay: 0.15, duration: 0.2 }}
                    />

                    <ul className={`${isMobile ? 'space-y-3' : 'space-y-6'}`}>
                        {navItems.map((item, index) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.1 + index * 0.05,
                                    duration: 0.2,
                                }}
                                className={`${isMobile ? 'text-base' : 'text-lg'} ${borderColor} border-b pb-2`}
                            >
                                <a
                                    href={item.url}
                                    className={`flex items-center justify-center gap-3 ${textColor} ${hoverColor} transition-all duration-200`}
                                >
                                    <span className={`${isMobile ? 'text-lg' : 'text-xl'}`}>{item.icon}</span>
                                    <span>{item.name}</span>
                                </a>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Navigation; 