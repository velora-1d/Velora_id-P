'use client';

import { motion } from 'framer-motion';

const MotionDiv = motion.div;

const ScrollReveal = ({ children, width = "100%", delay = 0, direction = "up", className = "" }) => {
    const variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
            x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
            scale: direction === "zoom" ? 0.9 : 1
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                delay: delay,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    return (
        <div style={{ position: "relative", width }} className={className}>
            <MotionDiv
                variants={variants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-80px" }}
            >
                {children}
            </MotionDiv>
        </div>
    );
};

export default ScrollReveal;
