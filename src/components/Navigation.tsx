import React from "react";
import { motion } from "framer-motion";

interface NavigationItem {
    name: string;
    url: string;
    icon?: string;
}

interface NavigationProps {
    side: "left" | "right" | "top" | "bottom";
    isVisible: boolean;
    person: string;
    isMobile: boolean;
    onClose: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ side, isVisible, person, isMobile, onClose }) => {
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

    // Enhanced color schemes with better contrast and modern aesthetics
    const bgColor = person === "Anton"
        ? "bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50" // Enhanced warm gradient for Anton
        : "bg-gradient-to-br from-rose-50 via-red-50 to-pink-50";  // Enhanced warm gradient for Kiki

    const textColor = person === "Anton" ? "text-amber-900" : "text-rose-900";
    const hoverColor = person === "Anton" ? "hover:text-amber-700 hover:bg-amber-100" : "hover:text-rose-700 hover:bg-rose-100";
    const borderColor = person === "Anton" ? "border-amber-200" : "border-rose-200";
    const accentColor = person === "Anton" ? "text-amber-600" : "text-rose-600";

    // Enhanced divider with gradient
    const dividerColor = person === "Anton"
        ? "bg-gradient-to-r from-transparent via-amber-400 to-transparent"
        : "bg-gradient-to-r from-transparent via-rose-400 to-transparent";

    return (
        <motion.div
            className={`w-full h-full flex items-center justify-center ${bgColor} backdrop-blur-sm relative`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            {/* Close button */}
            <motion.button
                onClick={onClose}
                className={`absolute top-4 right-4 z-10 p-2 rounded-full ${person === "Anton" ? "bg-amber-100 hover:bg-amber-200 text-amber-800" : "bg-rose-100 hover:bg-rose-200 text-rose-800"} transition-all duration-200 hover:scale-110`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.2 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </motion.button>

            <motion.div
                className={`w-full ${isMobile ? 'max-w-full px-4 py-6' : 'max-w-md px-8 py-12'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
            >
                <div className="text-center">
                    {/* Enhanced header with better typography */}
                    <motion.h2
                        className={`
                            ${isMobile ? 'text-2xl mb-1' : 'text-4xl mb-2'} 
                            font-serif font-semibold tracking-wide ${textColor}
                            drop-shadow-sm
                        `}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                    >
                        {person}'s Journey
                    </motion.h2>

                    {/* Subtitle for better context */}
                    <motion.p
                        className={`
                            ${isMobile ? 'text-sm mb-4' : 'text-base mb-6'} 
                            font-light ${accentColor} tracking-wide
                        `}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                    >
                        Explore the creative world
                    </motion.p>

                    {/* Enhanced decorative divider */}
                    <motion.div
                        className={`${isMobile ? 'w-20 h-0.5' : 'w-24 h-0.5'} mx-auto ${isMobile ? 'mb-6' : 'mb-8'} ${dividerColor} rounded-full`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.4, duration: 0.4, ease: "easeOut" }}
                    />

                    {/* Enhanced navigation list */}
                    <nav className={`${isMobile ? 'space-y-2' : 'space-y-4'}`}>
                        {navItems.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    delay: 0.5 + (index * 0.1),
                                    duration: 0.3,
                                    ease: "easeOut"
                                }}
                            >
                                <motion.a
                                    href={item.url}
                                    className={`
                                        group flex items-center justify-center gap-3 
                                        ${isMobile ? 'py-3 px-4 text-base' : 'py-4 px-6 text-lg'} 
                                        ${textColor} ${hoverColor} 
                                        transition-all duration-300 ease-out
                                        rounded-xl border border-transparent hover:border-current/20
                                        hover:shadow-md hover:scale-105
                                        font-medium tracking-wide
                                        relative overflow-hidden
                                    `}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {/* Subtle background hover effect */}
                                    <span className="absolute inset-0 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

                                    {/* Icon with enhanced styling */}
                                    <motion.span
                                        className={`
                                            ${isMobile ? 'text-xl' : 'text-2xl'} 
                                            group-hover:scale-110 transition-transform duration-300
                                            relative z-10
                                        `}
                                        whileHover={{ scale: 1.2, rotate: 5 }}
                                    >
                                        {item.icon}
                                    </motion.span>

                                    {/* Text with relative positioning */}
                                    <span className="relative z-10 font-sans">
                                        {item.name}
                                    </span>
                                </motion.a>
                            </motion.div>
                        ))}
                    </nav>

                    {/* Footer with enhanced styling */}
                    <motion.div
                        className={`${isMobile ? 'mt-6 pt-4' : 'mt-8 pt-6'} border-t ${borderColor}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.3 }}
                    >
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} ${accentColor} font-light tracking-wide`}>
                            Discover more about {person}
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Navigation; 