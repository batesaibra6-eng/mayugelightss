import { motion, useScroll, useSpring } from "framer-motion";

/**
 * A thin gold progress bar at the very top of the page that fills as the
 * user scrolls — adds a premium, polished feel.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-gold-gradient"
    />
  );
}
