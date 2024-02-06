import React, { FC, PropsWithChildren } from 'react';
import { motion } from "framer-motion";

interface DropDownArrowIconProps {
    className?: string;
    rotate: number;
}

export const DropDownArrowIcon: FC<PropsWithChildren<DropDownArrowIconProps>> = (
    {
        className,
        rotate,
    },
) => (
    <motion.svg
        animate={{ rotate }}
        style={{marginLeft: "5px"}}
        className={className}
        width="14"
        height="10"
        viewBox="0 0 10 6"
        rotate="90"
    >
        <path d="M5 6L0.669872 0L9.33013 0L5 6Z" fill="white" />
    </motion.svg>
);