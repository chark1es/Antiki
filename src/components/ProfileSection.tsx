import React from "react";

interface ProfileSectionProps {
    name: string;
    side: "left" | "right" | "top" | "bottom";
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

    // Determine background gradient based on side and device
    const bgGradient = (() => {
        if (isMobile) {
            return side === "top"
                ? "bg-gradient-to-b from-yellow-100 via-yellow-50 to-white"
                : "bg-gradient-to-t from-red-100 via-red-50 to-white";
        } else {
            return side === "left"
                ? "bg-gradient-to-r from-yellow-100 via-yellow-50 to-white"
                : "bg-gradient-to-l from-red-100 via-red-50 to-white";
        }
    })();

    // Text colors for each person (Anton = yellow/amber, Kiki = red/rose)
    const isAnton = side === "left" || side === "top";
    const textColor = isAnton ? "text-yellow-900" : "text-red-900";
    const textColorLight = isAnton ? "text-yellow-800" : "text-red-800";
    const dividerColor = isAnton
        ? "bg-gradient-to-r from-transparent via-yellow-300 to-transparent"
        : "bg-gradient-to-r from-transparent via-red-300 to-transparent";

    // Responsive sizing
    const containerClass = isMobile ? "h-1/2 w-full" : "h-full w-1/2";

    return (
        <div
            className={`${containerClass} flex flex-col items-center justify-center relative ${otherSideActive && !isMobile ? 'opacity-30 blur-sm scale-95' : 'opacity-100'}`}
            style={{
                zIndex: otherSideActive ? 0 : 1,
            }}
        >
            <div
                className={`h-full w-full flex flex-col items-center justify-center cursor-pointer ${bgGradient} relative`}
                onClick={onToggleNav}
            >
                <div className="flex flex-col items-center px-4">
                    <h1 className={`${isMobile ? 'text-4xl' : 'text-6xl'} font-serif mb-4 ${textColor} ${showNav ? 'opacity-80 scale-95' : ''}`}>
                        {name}
                    </h1>

                    <div
                        className={`${showNav ? 'w-12' : 'w-20'} h-0.5 mb-6 ${dividerColor} ${showNav ? 'opacity-60' : ''}`}
                    />

                    <p
                        className={`text-center max-w-md px-4 ${isMobile ? 'text-sm' : 'text-base'} leading-relaxed ${textColorLight} font-light ${showNav ? 'opacity-70 scale-95' : ''}`}
                    >
                        {isMobile
                            ? (name === "Anton"
                                ? bioText.Anton.split('.')[0] + '.'
                                : bioText.Kiki.split('.')[0] + '.')
                            : (name === "Anton" ? bioText.Anton : bioText.Kiki)
                        }
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileSection; 