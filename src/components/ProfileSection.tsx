import React from "react";
import { motion } from "framer-motion";

interface ProfileSectionProps {
    name: string;
    side: "left" | "right";
    isActive: boolean;
    onToggleNav: () => void;
    showNav: boolean;
    otherSideActive: boolean;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
    name,
    side,
    isActive,
    onToggleNav,
    showNav,
    otherSideActive,
}) => {
    // Dummy bio text
    const bioText =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel tincidunt lobortis, nunc nisl aliquam nisl, eget aliquet nunc nisl eu nunc. Sed vitae eros vitae nisl tincidunt lobortis.";

    return (
        <motion.div
            className={`h-full flex flex-col items-center justify-center ${side === "left" ? "pr-4" : "pl-4"
                } relative`}
            initial={{ width: "50%" }}
            animate={{
                width: "50%",
                opacity: otherSideActive ? 0.3 : 1,
                filter: otherSideActive ? "blur(2px)" : "none",
                scale: otherSideActive ? 0.95 : 1,
                zIndex: otherSideActive ? 0 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            <div
                className={`h-full w-full flex flex-col items-center justify-center cursor-pointer ${isActive ? "bg-gray-50" : "hover:bg-gray-50"
                    } transition-all duration-300`}
                onClick={onToggleNav}
            >
                <motion.h1
                    className="text-6xl font-bold mb-6"
                    animate={{
                        scale: showNav ? 0.9 : 1,
                        opacity: showNav ? 0.7 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                >
                    {name}
                </motion.h1>

                <motion.p
                    className="text-center max-w-md px-8"
                    animate={{
                        scale: showNav ? 0.9 : 1,
                        opacity: showNav ? 0.7 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                >
                    {bioText}
                </motion.p>
            </div>
        </motion.div>
    );
};

export default ProfileSection; 