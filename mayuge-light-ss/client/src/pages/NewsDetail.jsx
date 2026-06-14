import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCalendar, FiUser, FiArrowLeft, FiTag } from "react-icons/fi";
import api, { getErrorMessage } from "../api/client.js";
import SEO from "../components/SEO.jsx";
import Loader from "../components/Loader.jsx";
import Reveal from "../components/Reveal.jsx";

export default function NewsDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    api
      .get(`/news/${slug}`)
      .then(({ data }) => setArticle(data.data.news))
      .catch((err) => setError(getErrorMessage(err, "Article not found")))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Loader full />;
  if (error || !article) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-navy-900">{error || "Article not found"}</h2>
        <Link to="/news" className="btn-primary mt-6">
          <FiArrowLeft /> Back to News
        </Link>
      </div>
    );
  }

  const date = new Date(article.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <SEO title={article.title} description={article.excerpt} image={article.image} />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img src={article.image} alt={article.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />
        <div className="container-custom absolute bottom-0 left-0 right-0 z-10 pb-12">
          <Link
            to="/news"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gold-300 hover:text-gold-200"
          >
            <FiArrowLeft /> Back to News
          </Link>
          <span className="inline-block rounded-full bg-gold-500 px-4 py-1 text-xs font-semibold text-navy-950">
            {article.category}
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 max-w-3xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
          >
            {article.title}
          </motion.h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-navy-200">
            <span className="flex items-center gap-1.5"><FiCalendar /> {date}</span>
            <span className="flex items-center gap-1.5"><FiUser /> {article.author}</span>
            <span className="flex items-center gap-1.5"><FiTag /> {article.category}</span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="py-16 lg:py-24">
        <article className="container-custom max-w-3xl">
          <Reveal>
            <p className="text-lg font-medium leading-relaxed text-navy-700">
              {article.excerpt}
            </p>
            <div className="mt-6 space-y-5">
              {article.content.split("\n").filter(Boolean).map((para, i) => (
                <p key={i} className="leading-relaxed text-navy-600">
                  {para}
                </p>
              ))}
            </div>
          </Reveal>

          {/* Share / CTA */}
          <div className="mt-12 rounded-2xl bg-navy-50 p-8 text-center">
            <h3 className="text-xl font-bold text-navy-900">Want to learn more?</h3>
            <p className="mt-2 text-sm text-navy-500">
              Contact us or explore what Mayuge Light SS has to offer.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="btn-primary">Contact Us</Link>
              <Link to="/admissions" className="btn-secondary">Apply Now</Link>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
