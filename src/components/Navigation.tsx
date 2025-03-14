import React from "react";
import { motion } from "framer-motion";

interface NavigationItem {
    name: string;
    url: string;
}

interface NavigationProps {
    side: "left" | "right";
    isVisible: boolean;
    person: string;
}

const Navigation: React.FC<NavigationProps> = ({ side, isVisible, person }) => {
    // Different navigation items for Anton and Kiki
    const getNavItems = (): NavigationItem[] => {
        if (person === "Anton") {
            return [
                { name: "Home", url: "#" },
                { name: "Portfolio", url: "#" },
                { name: "Photography", url: "#" },
                { name: "Travel", url: "#" },
                { name: "Contact", url: "#" },
            ];
        } else if (person === "Kiki") {
            return [
                { name: "About", url: "#" },
                { name: "Artwork", url: "#" },
                { name: "Gallery", url: "#" },
                { name: "Events", url: "#" },
                { name: "Shop", url: "#" },
            ];
        }
        return [];
    };

    const navItems = getNavItems();

    return (
        <motion.div
            className="w-full h-full flex items-center justify-center bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="w-full max-w-md px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="text-center"
                >
                    <h2 className="text-3xl font-bold mb-10 text-gray-800">
                        {person}'s Navigation
                    </h2>
                    <ul className="space-y-6">
                        {navItems.map((item, index) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.2 + index * 0.1,
                                    duration: 0.3,
                                }}
                                className="text-lg"
                            >
                                <a
                                    href={item.url}
                                    className="hover:text-blue-500 transition-colors duration-200"
                                >
                                    {item.name}
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