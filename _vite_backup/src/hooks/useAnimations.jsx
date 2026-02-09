import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll-triggered animations using IntersectionObserver
 * Performance-optimized: uses CSS transforms only (GPU accelerated)
 */
export const useScrollReveal = (options = {}) => {
    const elementRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(element); // Only animate once
                }
            },
            {
                threshold: options.threshold || 0.1,
                rootMargin: options.rootMargin || '0px 0px -50px 0px',
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [options.threshold, options.rootMargin]);

    return { ref: elementRef, isVisible };
};

/**
 * Scroll reveal animation variants (CSS classes)
 * Uses transform & opacity only for 60fps performance
 */
export const revealVariants = {
    fadeUp: {
        hidden: 'opacity-0 translate-y-6',
        visible: 'opacity-100 translate-y-0',
    },
    fadeDown: {
        hidden: 'opacity-0 -translate-y-6',
        visible: 'opacity-100 translate-y-0',
    },
    fadeLeft: {
        hidden: 'opacity-0 translate-x-6',
        visible: 'opacity-100 translate-x-0',
    },
    fadeRight: {
        hidden: 'opacity-0 -translate-x-6',
        visible: 'opacity-100 translate-x-0',
    },
    fadeIn: {
        hidden: 'opacity-0',
        visible: 'opacity-100',
    },
    scaleUp: {
        hidden: 'opacity-0 scale-95',
        visible: 'opacity-100 scale-100',
    },
};

/**
 * ScrollReveal component wrapper
 * @param {string} variant - Animation variant (fadeUp, fadeDown, etc.)
 * @param {number} delay - Delay in ms (for staggered animations)
 * @param {string} duration - Tailwind duration class (duration-300, duration-500, etc.)
 * @param {React.ReactNode} children - Child elements
 */
export const ScrollReveal = ({
    children,
    variant = 'fadeUp',
    delay = 0,
    duration = 'duration-500',
    className = '',
    as: Component = 'div',
    ...props
}) => {
    const { ref, isVisible } = useScrollReveal();
    const animation = revealVariants[variant] || revealVariants.fadeUp;

    return (
        <Component
            ref={ref}
            className={`
                transition-all ${duration} ease-out
                ${isVisible ? animation.visible : animation.hidden}
                ${className}
            `}
            style={{
                transitionDelay: isVisible ? `${delay}ms` : '0ms',
                willChange: isVisible ? 'auto' : 'transform, opacity'
            }}
            {...props}
        >
            {children}
        </Component>
    );
};

/**
 * Staggered children animation container
 * Automatically adds delays to child ScrollReveal components
 */
export const StaggerContainer = ({
    children,
    staggerDelay = 100,
    className = '',
    ...props
}) => {
    return (
        <div className={className} {...props}>
            {Array.isArray(children)
                ? children.map((child, index) => (
                    <ScrollReveal key={index} delay={index * staggerDelay}>
                        {child}
                    </ScrollReveal>
                ))
                : children
            }
        </div>
    );
};

export default ScrollReveal;
