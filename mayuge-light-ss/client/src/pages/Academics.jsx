import { motion } from "framer-motion";
import {
  FiBookOpen,
  FiCalculator,
  FiGlobe,
  FiTrendingUp,
  FiCheckCircle,
  FiDownload,
  FiClock,
} from "react-icons/fi";
import SEO from "../components/SEO.jsx";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";

const departments = [
  {
    icon: FiHash,
    name: "Mathematics & Sciences",
    subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "Agriculture"],
    text: "A strong STEM foundation supported by well-equipped laboratories and practical, hands-on learning.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: FiGlobe,
    name: "Languages & Humanities",
    subjects: ["English", "Literature", "Kiswahili", "History", "Geography", "CRE"],
    text: "Developing communication, critical thinking and a deep understanding of our world and heritage.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: FiTrendingUp,
    name: "Business & ICT",
    subjects: ["Commerce", "Accounts", "Economics", "Computer Studies", "Entrepreneurship"],
    text: "Equipping students with the practical, financial and digital skills needed in the modern world.",
    color: "from-gold-500 to-orange-600",
  },
];

const oLevel = [
  "English Language", "Mathematics", "Biology", "Chemistry", "Physics",
  "Geography", "History", "Christian Religious Education", "Literature in English",
  "Kiswahili", "Commerce", "Accounts", "Agriculture", "Computer Studies",
  "Entrepreneurship", "Fine Art",
];

const aLevel = [
  "Mathematics (M)", "Physics (P)", "Chemistry (C)", "Biology (B)", "Economics (E)",
  "Geography (G)", "History (H)", "Literature in English (L)", "Christian Religious Education",
  "Kiswahili", "Entrepreneurship (Sub-ICT)", "General Paper (GP)", "Sub-ICT",
];

const calendar = [
  { term: "Term One", dates: "February – May", events: "Opening, Begin-of-term exams, Sports Day" },
  { term: "Term Two", dates: "May – August", events: "Mid-year exams, Music & Drama Festival, Visitation" },
  { term: "Term Three", dates: "September – December", events: "Mock exams, UCE & UACE, Speech Day, Closing" },
];

export default function Academics() {
  return (
    <>
      <SEO
        title="Academics"
        description="Explore the subjects, departments, academic calendar and outstanding performance of Mayuge Light Secondary School."
      />

      <PageHero
        title="Academics"
        subtitle="A rigorous, well-rounded curriculum delivered by passionate educators — built to help every learner excel."
        breadcrumb="Academics"
        image="/images/students/o-level-girls.jpg"
      />

      {/* ===================== INTRO + DEPARTMENTS ===================== */}
      <section className="py-20 lg:py-28">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Our Curriculum"
            title="Subjects & Departments"
            subtitle="We follow the Uganda national curriculum, offering a broad and balanced selection of subjects at both O-Level and A-Level."
          />

          <div className="mt-14 grid gap-7 lg:grid-cols-3">
            {departments.map((dept, i) => (
              <Reveal key={dept.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group h-full overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-navy-100"
                >
                  <div className={`bg-gradient-to-r ${dept.color} p-6`}>
                    <dept.icon size={34} className="text-white" />
                    <h3 className="mt-4 text-xl font-bold text-white">{dept.name}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-sm leading-relaxed text-navy-500">{dept.text}</p>
                    <ul className="mt-4 space-y-2">
                      {dept.subjects.map((s) => (
                        <li key={s} className="flex items-center gap-2 text-sm text-navy-700">
                          <FiCheckCircle className="shrink-0 text-gold-500" /> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SUBJECTS GRID ===================== */}
      <section className="bg-navy-50 py-20 lg:py-28">
        <div className="container-custom grid gap-10 lg:grid-cols-2">
          {/* O-Level */}
          <Reveal>
            <div className="rounded-3xl bg-white p-8 shadow-soft ring-1 ring-navy-100">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-gold-400">
                  <FiBookOpen size={24} />
                </div>
                <h3 className="text-2xl font-bold text-navy-900">O-Level Subjects (S.1 – S.4)</h3>
              </div>
              <p className="mt-4 text-sm text-navy-500">
                A broad foundation that prepares students for the Uganda Certificate of Education (UCE) examinations.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-2">
                {oLevel.map((subject) => (
                  <span
                    key={subject}
                    className="rounded-lg bg-navy-50 px-3 py-2 text-sm font-medium text-navy-700"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* A-Level */}
          <Reveal delay={0.15}>
            <div className="rounded-3xl bg-white p-8 shadow-soft ring-1 ring-navy-100">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500 text-navy-950">
                  <FiTrendingUp size={24} />
                </div>
                <h3 className="text-2xl font-bold text-navy-900">A-Level Subjects (S.5 – S.6)</h3>
              </div>
              <p className="mt-4 text-sm text-navy-500">
                Specialised combinations preparing students for the Uganda Advanced Certificate of Education (UACE) and university.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-2">
                {aLevel.map((subject) => (
                  <span
                    key={subject}
                    className="rounded-lg bg-gold-50 px-3 py-2 text-sm font-medium text-navy-700"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== ACADEMIC CALENDAR ===================== */}
      <section id="calendar" className="py-20 lg:py-28">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Important Dates"
            title="Academic Calendar"
            subtitle="Our academic year follows the standard three-term Ugandan school calendar."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {calendar.map((term, i) => (
              <Reveal key={term.term} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="card h-full"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-navy-900 px-4 py-1.5 text-sm font-semibold text-white">
                      {term.term}
                    </span>
                    <FiClock className="text-gold-500" />
                  </div>
                  <p className="mt-4 text-lg font-bold text-navy-900">{term.dates}</p>
                  <p className="mt-2 text-sm text-navy-500">{term.events}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <button className="btn-secondary" onClick={() => window.print()}>
              <FiDownload /> Print Full Calendar
            </button>
          </div>
        </div>
      </section>

      {/* ===================== PERFORMANCE HIGHLIGHTS ===================== */}
      <section id="performance" className="relative overflow-hidden bg-navy-900 py-20 text-white lg:py-28">
        <div className="absolute -left-20 top-10 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="container-custom relative z-10">
          <SectionHeading
            light
            eyebrow="Our Results"
            title="Performance Highlights"
            subtitle="A proud tradition of academic excellence, reflected in our national examination results year after year."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "98%", label: "UCE Pass Rate" },
              { value: "95%", label: "UACE Pass Rate" },
              { value: "85%+", label: "First Grades" },
              { value: "100+", label: "University Joiners / Year" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1}>
                <div className="rounded-2xl bg-white/5 p-8 text-center ring-1 ring-white/10 backdrop-blur">
                  <div className="text-5xl font-bold text-gradient-gold">{stat.value}</div>
                  <p className="mt-3 text-sm text-navy-200">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <p className="mx-auto mt-12 max-w-3xl text-center text-lg italic text-navy-200">
              "We celebrate every learner's progress. Behind these numbers are stories of hard work,
              dedicated teachers, and the unwavering support of parents."
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
