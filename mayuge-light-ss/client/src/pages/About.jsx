import { motion } from "framer-motion";
import {
  FiEye,
  FiTarget,
  FiHeart,
  FiBookOpen,
  FiUsers,
  FiShield,
  FiAward,
  FiSun,
} from "react-icons/fi";
import SEO from "../components/SEO.jsx";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";
import { SCHOOL } from "../data/school.js";

const coreValues = [
  {
    icon: FiAward,
    title: "Excellence",
    text: "We strive for the highest standards in everything we do — academically and personally.",
  },
  {
    icon: FiShield,
    title: "Integrity",
    text: "Honesty, transparency and moral uprightness guide our actions and relationships.",
  },
  {
    icon: FiHeart,
    title: "Compassion",
    text: "We care for one another and serve our community with kindness and empathy.",
  },
  {
    icon: FiBookOpen,
    title: "Curiosity",
    text: "We foster a lifelong love of learning, critical thinking and innovation.",
  },
  {
    icon: FiUsers,
    title: "Teamwork",
    text: "We collaborate, respect diversity and build strong, supportive relationships.",
  },
  {
    icon: FiSun,
    title: "Faith",
    text: "We nurture God-fearing young people grounded in strong spiritual values.",
  },
];

export default function About() {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about the history, vision, mission and core values of Mayuge Light Secondary School — a leading centre of education in Mayuge, Uganda."
      />

      <PageHero
        title="About Our School"
        subtitle="Two decades of nurturing minds, building character and shaping futures in the heart of Mayuge."
        breadcrumb="About"
        image="/images/campus/campus-4.jpg"
      />

      {/* ===================== HISTORY ===================== */}
      <section className="py-20 lg:py-28">
        <div className="container-custom grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="section-subtitle">Our History</span>
            <h2 className="section-title mt-2">A Story of Growth & Dedication</h2>
            <p className="mt-5 leading-relaxed text-navy-600">
              {SCHOOL.name} was established in {SCHOOL.founded} with a simple but
              powerful vision: to bring quality secondary education within reach
              of every young person in Mayuge District and beyond. What began as
              a modest institution has flourished into a vibrant community of over
              1,200 learners and 60 dedicated staff.
            </p>
            <p className="mt-4 leading-relaxed text-navy-600">
              Over the years, we have invested continuously in infrastructure,
              teaching talent and co-curricular programmes. Our modern science
              laboratories, computer centre, library and boarding facilities
              reflect our unwavering commitment to providing a world-class learning
              environment for all our students.
            </p>

            {/* Timeline */}
            <div className="mt-8 space-y-5 border-l-2 border-gold-200 pl-6">
              {[
                {
                  year: "2005",
                  text: "Mayuge Light SS founded with a commitment to accessible, quality education.",
                },
                {
                  year: "2012",
                  text: "Expansion of facilities including new classrooms and science laboratories.",
                },
                {
                  year: "2018",
                  text: "Introduction of the A-Level programme and modern computer laboratory.",
                },
                {
                  year: "Today",
                  text: "Over 1,200 students thriving across O-Level and A-Level programmes.",
                },
              ].map((item) => (
                <div key={item.year} className="relative">
                  <span className="absolute -left-[31px] flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 ring-4 ring-gold-100" />
                  <h4 className="font-bold text-navy-900">{item.year}</h4>
                  <p className="text-sm text-navy-500">{item.text}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid gap-4">
              <img
                src="/images/campus/campus-2.jpg"
                alt="School compound"
                className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card"
              />
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/images/campus/gate.jpg"
                  alt="School gate"
                  className="aspect-square w-full rounded-2xl object-cover shadow-soft"
                />
                <img
                  src="/images/students/students-1.jpg"
                  alt="Students"
                  className="aspect-square w-full rounded-2xl object-cover shadow-soft"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== VISION & MISSION ===================== */}
      <section className="relative overflow-hidden bg-navy-900 py-20 text-white lg:py-28">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="container-custom relative z-10 grid gap-8 md:grid-cols-2">
          <Reveal>
            <div className="rounded-3xl bg-white/5 p-8 ring-1 ring-white/10 backdrop-blur">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-500 text-navy-950">
                <FiEye size={28} />
              </div>
              <h3 className="mt-5 text-2xl font-bold">Our Vision</h3>
              <p className="mt-3 text-lg leading-relaxed text-navy-200">
                To be a centre of academic excellence that produces well-rounded,
                God-fearing and self-reliant citizens who positively transform
                their communities and the nation.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="rounded-3xl bg-white/5 p-8 ring-1 ring-white/10 backdrop-blur">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-500 text-navy-950">
                <FiTarget size={28} />
              </div>
              <h3 className="mt-5 text-2xl font-bold">Our Mission</h3>
              <p className="mt-3 text-lg leading-relaxed text-navy-200">
                To provide quality, holistic secondary education in a safe,
                disciplined and nurturing environment that develops the academic,
                moral, physical and spiritual potential of every learner.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== CORE VALUES ===================== */}
      <section className="py-20 lg:py-28">
        <div className="container-custom">
          <SectionHeading
            eyebrow="What We Stand For"
            title="Our Core Values"
            subtitle="These principles guide everything we do — from the classroom to the playing field."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group h-full rounded-2xl bg-white p-7 text-center shadow-soft ring-1 ring-navy-100 transition-shadow hover:shadow-card"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-navy-50 text-3xl text-navy-900 transition-colors group-hover:bg-gold-500 group-hover:text-navy-950">
                    <value.icon />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-navy-900">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm text-navy-500">{value.text}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== HEADTEACHER MESSAGE ===================== */}
      <section className="bg-navy-50 py-20 lg:py-28">
        <div className="container-custom grid items-center gap-12 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="relative mx-auto max-w-sm">
              <img
                src="/images/students/a-level-student.jpg"
                alt="Headteacher"
                className="aspect-[4/5] w-full rounded-3xl object-cover shadow-card"
              />
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-navy-900 px-6 py-3 text-center text-white shadow-card">
                <span className="block text-sm font-semibold">Headteacher</span>
                <span className="block text-xs text-gold-400">Mayuge Light SS</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-3">
            <span className="section-subtitle">Headteacher's Message</span>
            <h2 className="section-title mt-2">A Word from Our Headteacher</h2>
            <div className="mt-6 space-y-4 text-navy-600">
              <p className="leading-relaxed">
                "Welcome to {SCHOOL.shortName} — a place where dreams take root and
                futures are forged. For over two decades, we have been privileged to
                walk alongside thousands of young people on their educational journey.
              </p>
              <p className="leading-relaxed">
                We believe every child is unique and full of potential. Our role is to
                create an environment where that potential can flourish — through excellent
                teaching, firm but loving discipline, and countless opportunities to grow
                in knowledge, character and faith.
              </p>
              <p className="leading-relaxed">
                I warmly invite you to join our school family. Together, we will nurture
                your child's mind, build their character, and shape a bright, promising future."
              </p>
              <p className="font-serif text-lg italic text-gold-600">
                — The Headteacher, {SCHOOL.shortName}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
