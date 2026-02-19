'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

const CountUp = ({ to, from = 0, duration = 2, delay = 0, className = "" }) => {
    const ref = useRef(null);
    const motionValue = useMotionValue(from);
    const springValue = useSpring(motionValue, {
        damping: 30,
        stiffness: 100,
        duration: duration * 1000 // Spring duration is different, but this acts as a damper
    });
    const isInView = useInView(ref, { once: false, margin: "-50px" }); // Reversible
    const [displayValue, setDisplayValue] = useState(from);

    useEffect(() => {
        if (isInView) {
            const timeout = setTimeout(() => {
                motionValue.set(to);
            }, delay * 1000);
            return () => clearTimeout(timeout);
        } else {
            motionValue.set(from); // Reset when out of view
        }
    }, [isInView, motionValue, to, from, delay]);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            setDisplayValue(Math.floor(latest));
        });
        return unsubscribe;
    }, [springValue]);

    return <span ref={ref} className={className}>{displayValue}</span>;
};

export default CountUp;
