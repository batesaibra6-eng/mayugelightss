import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHome, FiArrowLeft } from "react-icons/fi";
import SEO from "../components/SEO.jsx";

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found" description="The page you are looking for could not be found." />
      <section className="flex min-h-[80vh] items-center justify-center bg-navy-50 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="relative mx-auto mb-8 w-fit">
            <span className="block bg-gold-gradient bg-clip-text text-[10rem] font-bold leading-none text-transparent sm:text-[14rem]">
              404
            </span>
          </div>
          <h1 className="text-2xl font-bold text-navy-900 sm:text-3xl">
            Oops! Page Not Found
          </h1>
          <p className="mx-auto mt-4 max-w-md text-navy-500">
            The page you are looking for may have been moved, deleted, or perhaps
            never existed. Let's get you back on track.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/" className="btn-primary">
              <FiHome /> Back to Home
            </Link>
            <button onClick={() => window.history.back()} className="btn-secondary">
              <FiArrowLeft /> Go Back
            </button>
          </div>
        </motion.div>
      </section>
    </>
  );
}
