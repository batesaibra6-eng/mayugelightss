import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiAward,
  FiUsers,
  FiBookOpen,
  FiCheckCircle,
  FiShield,
  FiHeart,
  FiTarget,
  FiTrendingUp,
  FiCalendar,
} from "react-icons/fi";
import api, { getErrorMessage } from "../api/client.js";
import { SCHOOL, STATS } from "../data/school.js";
import SEO from "../components/SEO.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";
import NewsCard from "../components/NewsCard.jsx";

const features = [
  {
    icon: FiAward,
    title: "Academic Excellence",
    text: "Consistently excellent UCE and UACE results with a dedicated team of qualified, experienced teachers.",
  },
  {
    icon: FiShield,
    title: "Discipline & Values",
    text: "We nurture God-fearing, respectful and responsible citizens through strong moral guidance.",
  },
  {
    icon: FiBookOpen,
    title: "Modern Facilities",
    text: "Well-equipped science laboratories, library, computer lab and spacious classrooms.",
  },
  {
    icon: FiHeart,
    title: "Holistic Education",
    text: "A balanced blend of academics, sports, music, drama and leadership development.",
  },
  {
    icon: FiUsers,
    title: "Caring Community",
    text: "A safe, supportive boarding environment where every learner is known and valued.",
  },
  {
    icon: FiTrendingUp,
    title: "Future Ready",
    text: "Career guidance and ICT skills that prepare students for university and beyond.",
  },
];

const statIcons = {
  calendar: FiCalendar,
  students: FiUsers,
  teacher: FiBookOpen,
  award: FiAward,
};

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/news/featured")
      .then(({ data }) => setFeatured(data.data?.news || []))
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SEO />

      {/* ===================== HERO ===================== */}
      <section className="relative flex min-h-[88vh] items-center overflow-hidden">
        {/* Background image + gradient */}
        <div className="absolute inset-0">
          <img
            src="/images/campus/campus-1.jpg"
            alt="Mayuge Light Secondary School campus"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-900/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
        </div>

        {/* Floating decorative blobs */}
        <div className="absolute right-10 top-32 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-navy-400/10 blur-3xl" />

        <div className="container-custom relative z-10 py-20">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-gold-300 ring-1 ring-white/20 backdrop-blur"
            >
              <FiAward /> Welcome to Mayuge Light Secondary School
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              Nurturing Minds,{" "}
              <span className="text-gradient-gold">Building Character</span> &
              Shaping Futures
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 max-w-2xl text-lg text-navy-200"
            >
              A leading centre of academic excellence in Mayuge, Uganda —
              offering quality O-Level and A-Level education with a rich
              tradition of discipline, faith and achievement since {SCHOOL.founded}.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link to="/admissions" className="btn-primary">
                Apply for Admission <FiArrowRight />
              </Link>
              <Link to="/about" className="btn-outline">
                Discover Our Story
              </Link>
            </motion.div>

            {/* Motto badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-10 flex items-center gap-3 text-navy-200"
            >
              <span className="h-px w-12 bg-gold-500" />
              <span className="font-serif text-lg italic text-gold-300">
                "{SCHOOL.motto}"
              </span>
            </motion.div>
          </div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-navy-950/60 backdrop-blur"
        >
          <div className="container-custom grid grid-cols-2 gap-6 py-6 md:grid-cols-4">
            {STATS.map((stat) => {
              const Icon = statIcons[stat.icon] || FiAward;
              return (
                <div key={stat.label} className="text-center">
                  <Icon className="mx-auto mb-1 text-2xl text-gold-400" />
                  <div className="text-2xl font-bold text-white sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-wide text-navy-300">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ===================== INTRODUCTION ===================== */}
      <section className="py-20 lg:py-28">
        <div className="container-custom grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <img
                src="/images/students/students-group.jpg"
                alt="Students of Mayuge Light SS"
                className="aspect-[4/3] w-full rounded-3xl object-cover shadow-card"
              />
              {/* Floating card */}
              <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-navy-900 p-6 text-white shadow-card sm:block">
                <div className="text-4xl font-bold text-gold-400">20+</div>
                <div className="text-sm text-navy-200">
                  Years shaping
                  <br /> young leaders
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <span className="section-subtitle">Welcome to Mayuge Light SS</span>
            <h2 className="section-title mt-2">
              A Tradition of Excellence in Education
            </h2>
            <p className="mt-5 leading-relaxed text-navy-600">
              Founded in {SCHOOL.founded}, {SCHOOL.name} has grown into one of
              the most respected secondary schools in Mayuge District. We provide
              a nurturing, disciplined and stimulating environment where learners
              discover their potential and develop the knowledge, skills and
              values they need to thrive.
            </p>
            <p className="mt-4 leading-relaxed text-navy-600">
              From our well-equipped classrooms and laboratories to our vibrant
              sports and arts programmes, every aspect of school life is designed
              to educate the whole child — academically, morally and socially.
            </p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Qualified & caring teachers",
                "Strong academic results",
                "Safe boarding environment",
                "Rich co-curricular life",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm font-medium text-navy-700"
                >
                  <FiCheckCircle className="shrink-0 text-gold-500" /> {item}
                </li>
              ))}
            </ul>

            <Link to="/about" className="btn-dark mt-8">
              Learn More About Us <FiArrowRight />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ===================== ACADEMIC EXCELLENCE ===================== */}
      <section className="relative overflow-hidden bg-navy-50 py-20 lg:py-28">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Academic Excellence"
            title="Where Ambition Meets Achievement"
            subtitle="Our learners consistently excel in national examinations, supported by passionate teachers and a culture of high expectations."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                value: "98%",
                label: "Overall Pass Rate",
                text: "In recent UCE and UACE examinations.",
              },
              {
                value: "85%+",
                label: "First Grades",
                text: "Of candidates achieving Division One and principal passes.",
              },
              {
                value: "100+",
                label: "University Joiners",
                text: "Graduates advancing to tertiary education annually.",
              },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 0.1}>
                <div className="card h-full text-center">
                  <div className="text-5xl font-bold text-gradient-gold">
                    {item.value}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-navy-900">
                    {item.label}
                  </h3>
                  <p className="mt-2 text-sm text-navy-500">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/academics" className="btn-secondary">
              Explore Our Academics <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== WHY CHOOSE US ===================== */}
      <section className="py-20 lg:py-28">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="An Environment Where Students Thrive"
            subtitle="We combine rigorous academics with character formation, creativity and care — giving every learner the foundation for a bright future."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group h-full rounded-2xl bg-white p-7 shadow-soft ring-1 ring-navy-100 transition-shadow hover:shadow-card"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-900 text-gold-400 transition-colors group-hover:bg-gold-500 group-hover:text-navy-950">
                    <feature.icon size={26} />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-navy-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-500">
                    {feature.text}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== NEWS PREVIEW ===================== */}
      <section className="bg-navy-50 py-20 lg:py-28">
        <div className="container-custom">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <SectionHeading
              center={false}
              eyebrow="Latest News"
              title="News & Announcements"
            />
            <Link
              to="/news"
              className="btn-secondary shrink-0"
            >
              View All News <FiArrowRight />
            </Link>
          </div>

          <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <p className="col-span-full text-center text-navy-400">
                Loading latest news…
              </p>
            ) : featured.length ? (
              featured.map((article, i) => (
                <NewsCard key={article._id} article={article} index={i} />
              ))
            ) : (
              <p className="col-span-full text-center text-navy-400">
                No news articles yet. Please check back soon.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0">
          <img
            src="/images/students/students-evening.jpg"
            alt="Students"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-navy-950/85" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-gold-500/20 px-4 py-2 text-sm font-medium text-gold-300 ring-1 ring-gold-500/30">
              <FiTarget /> Admissions Open
            </span>
            <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Give Your Child the Gift of Excellence
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-navy-200">
              Join a community that believes in every learner. Applications for
              O-Level and A-Level are now open for the new academic year.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/admissions" className="btn-primary">
                Start Your Application <FiArrowRight />
              </Link>
              <Link to="/contact" className="btn-outline">
                Book a School Visit
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
