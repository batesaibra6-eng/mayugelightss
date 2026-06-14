import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiInbox } from "react-icons/fi";
import api from "../api/client.js";
import SEO from "../components/SEO.jsx";
import PageHero from "../components/PageHero.jsx";
import NewsCard from "../components/NewsCard.jsx";
import Loader from "../components/Loader.jsx";

const CATEGORIES = ["All", "Achievement", "Academics", "Event", "Sports", "Announcement", "General"];

export default function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 9 };
      if (category !== "All") params.category = category;
      if (search) params.search = search;

      const { data } = await api.get("/news", { params });
      setArticles(data.data.news);
      setPages(data.pages);
    } catch {
      setArticles([]);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, category, search]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleCategory = (cat) => {
    setCategory(cat);
    setPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput.trim());
    setPage(1);
  };

  return (
    <>
      <SEO
        title="News & Events"
        description="The latest news, announcements and events from Mayuge Light Secondary School."
      />

      <PageHero
        title="News & Events"
        subtitle="Stay up to date with the latest happenings, achievements and announcements at Mayuge Light SS."
        breadcrumb="News"
        image="/images/choir/choir-family.jpg"
      />

      <section className="py-16 lg:py-24">
        <div className="container-custom">
          {/* Toolbar */}
          <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Category filter */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    category === cat
                      ? "bg-navy-900 text-white shadow-soft"
                      : "bg-navy-50 text-navy-600 hover:bg-navy-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <form onSubmit={handleSearch} className="relative w-full lg:w-72">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400" />
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search articles…"
                className="w-full rounded-full border border-navy-200 bg-white py-2.5 pl-11 pr-4 text-sm outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-200"
              />
            </form>
          </div>

          {/* Grid */}
          {loading ? (
            <Loader full />
          ) : articles.length ? (
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, i) => (
                <NewsCard key={article._id} article={article} index={i} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <FiInbox size={48} className="text-navy-300" />
              <h3 className="mt-4 text-lg font-semibold text-navy-700">No articles found</h3>
              <p className="mt-1 text-sm text-navy-400">
                Try a different category or search term.
              </p>
            </div>
          )}

          {/* Pagination */}
          {!loading && pages > 1 && (
            <div className="mt-14 flex justify-center gap-2">
              <PageBtn onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
                ← Prev
              </PageBtn>
              {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                <PageBtn key={p} onClick={() => setPage(p)} active={p === page}>
                  {p}
                </PageBtn>
              ))}
              <PageBtn onClick={() => setPage((p) => Math.min(pages, p + 1))} disabled={page === pages}>
                Next →
              </PageBtn>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function PageBtn({ children, onClick, active, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`h-10 min-w-10 rounded-lg px-3 text-sm font-medium transition-all ${
        active
          ? "bg-navy-900 text-white"
          : "bg-white text-navy-600 ring-1 ring-navy-200 hover:bg-navy-50"
      } disabled:cursor-not-allowed disabled:opacity-40`}
    >
      {children}
    </button>
  );
}
