import { motion } from "framer-motion";

/**
 * Tiny wrapper that fades + slides its children into view on scroll.
 * Reduces repetition across pages.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 30,
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
