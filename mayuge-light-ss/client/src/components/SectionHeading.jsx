import { motion } from "framer-motion";

/**
 * Reusable animated section heading with an eyebrow label, title, and
 * optional subtitle. Animates into view on scroll.
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
  light = false,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={`max-w-3xl ${center ? "mx-auto text-center" : "text-left"}`}
    >
      {eyebrow && (
        <span className="section-subtitle inline-block rounded-full bg-gold-100 px-4 py-1">
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-4 ${
          light ? "text-white" : "text-navy-900"
        } text-3xl font-bold sm:text-4xl lg:text-[2.6rem] lg:leading-tight`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base leading-relaxed ${
            light ? "text-navy-200" : "text-navy-500"
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
