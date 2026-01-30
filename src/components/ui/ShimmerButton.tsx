"use client";
import React, { type MouseEvent as ReactMouseEvent } from "react";
import { motion } from "framer-motion";
import "./ShimmerButton.css";

interface ShimmerButtonProps {
    children: React.ReactNode;
    href?: string;
    onClick?: (e: ReactMouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
    className?: string;
    /** Instagram gradient glow effect */
    variant?: "instagram" | "default";
    /** Size of the button */
    size?: "sm" | "md" | "lg";
}

/**
 * ShimmerButton - A premium animated button with shimmer effect
 * Features:
 * - Instagram-style gradient background
 * - Animated shimmer sweep on hover
 * - Subtle glow pulse effect
 * - Smooth scale micro-interaction
 */
const ShimmerButton: React.FC<ShimmerButtonProps> = ({
    children,
    href,
    onClick,
    className = "",
    variant = "instagram",
    size = "md",
}) => {
    const sizeClasses = {
        sm: "shimmer-btn--sm",
        md: "shimmer-btn--md",
        lg: "shimmer-btn--lg",
    };

    const variantClasses = {
        instagram: "shimmer-btn--instagram",
        default: "shimmer-btn--default",
    };

    const combinedClassName = `shimmer-btn ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

    const buttonContent = (
        <>
            {/* Shimmer sweep effect */}
            <span className="shimmer-btn__shimmer" aria-hidden="true" />
            {/* Glow pulse layer */}
            <span className="shimmer-btn__glow" aria-hidden="true" />
            {/* Content */}
            <span className="shimmer-btn__content">{children}</span>
        </>
    );

    if (href) {
        return (
            <motion.a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={combinedClassName}
                onClick={onClick}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
                {buttonContent}
            </motion.a>
        );
    }

    return (
        <motion.button
            type="button"
            className={combinedClassName}
            onClick={onClick}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
            {buttonContent}
        </motion.button>
    );
};

export default ShimmerButton;
