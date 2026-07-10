'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export const SmoothScroll = () => {
  useEffect(() => {
    // Respect users who've asked for reduced motion, and skip on touch
    // devices — native touch scrolling is already smooth and Lenis can
    // fight the OS's own momentum scrolling on phones.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if ('ontouchstart' in window) return;

    const lenis = new Lenis({
      duration: 1.0,        // lower = snappier, higher = floatier
      easing: (t) => 1 - Math.pow(1 - t, 3), // ease-out cubic
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
    });

    // Lenis drives its own animation loop via requestAnimationFrame and
    // moves the page using CSS transforms internally — it does NOT call
    // window.scrollTo() on every frame, so it doesn't spam native
    // `scroll` events or force constant repaints the way a hand-rolled
    // scrollTo loop does. This is what was causing the input lag.
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
};

export default SmoothScroll;