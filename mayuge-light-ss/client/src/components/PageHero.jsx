import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

/**
 * Reusable inner-page hero banner with breadcrumb.
 * Uses a campus image with a navy gradient overlay.
 */
export default function PageHero({ title, subtitle, breadcrumb, image }) {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={image || "/images/campus/campus-3.jpg"}
          alt={title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/85 to-navy-900/70" />
      </div>

      <div className="container-custom relative z-10 py-20 text-center md:py-28">
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex items-center justify-center gap-2 text-sm text-navy-200"
        >
          <Link to="/" className="hover:text-gold-400">
            Home
          </Link>
          <FiChevronRight className="text-gold-400" />
          <span className="text-gold-400">{breadcrumb || title}</span>
        </motion.nav>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-navy-200"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Decorative bottom wave */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
      >
        <path
          fill="#ffffff"
          d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,60L0,60Z"
        />
      </svg>
    </section>
  );
}
