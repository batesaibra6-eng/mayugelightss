import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMusic,
  FiUsers,
  FiTrophy,
  FiPenTool,
  FiCamera,
  FiSmile,
  FiBookOpen,
  FiZap,
  FiX,
} from "react-icons/fi";
import SEO from "../components/SEO.jsx";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";

const clubs = [
  { icon: FiMusic, name: "Music & Choir", text: "Vocal training, instrumental music and vibrant choir performances." },
  { icon: FiUsers, name: "Debate & Drama", text: "Public speaking, debating competitions and stage drama productions." },
  { icon: FiCamera, name: "Journalism Club", text: "School newsletter writing, photography and media skills." },
  { icon: FiPenTool, name: "Art & Craft", text: "Drawing, painting and creative crafts that nurture imagination." },
  { icon: FiZap, name: "Science Club", text: "Experiments, science fairs and innovation challenges." },
  { icon: FiSmile, name: "Scripture Union", text: "Fellowship, worship and spiritual growth for all students." },
];

const sports = [
  { name: "Football", emoji: "⚽", text: "Inter-house and inter-school football leagues." },
  { name: "Netball", emoji: "🏐", text: "Our girls' netball team are regional champions." },
  { name: "Athletics", emoji: "🏃", text: "Track and field events at the annual sports day." },
  { name: "Volleyball", emoji: "🏐", text: "Energetic volleyball matches and tournaments." },
  { name: "Basketball", emoji: "🏀", text: "Growing basketball programme for boys and girls." },
  { name: "Table Tennis", emoji: "🏓", text: "Indoor table tennis for all skill levels." },
];

const events = [
  { title: "Annual Sports Day", date: "Term Two", text: "A full day of athletics, colour and house rivalry.", image: "/images/students/students-red.jpg" },
  { title: "Music & Drama Festival", date: "Term Two", text: "Showcasing our students' creative and performing talents.", image: "/images/choir/choir-red.jpg" },
  { title: "Speech & Prize Giving", date: "Term Three", text: "Celebrating academic and co-curricular achievements.", image: "/images/students/students-group.jpg" },
  { title: "Career Guidance Day", date: "Term One", text: "Mentorship from professionals across many fields.", image: "/images/students/a-level-blue.jpg" },
];

// Build gallery image list from the gallery folder naming convention
const galleryImages = Array.from({ length: 12 }, (_, i) => ({
  src: `/images/gallery/gallery-${String(i + 1).padStart(2, "0")}.jpg`,
  alt: `School life photo ${i + 1}`,
}));

export default function StudentLife() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <>
      <SEO
        title="Student Life"
        description="Discover the vibrant clubs, sports, events and gallery of student life at Mayuge Light Secondary School."
      />

      <PageHero
        title="Student Life"
        subtitle="Education extends far beyond the classroom. Discover the vibrant clubs, sports, and events that make school life memorable."
        breadcrumb="Student Life"
        image="/images/students/students-evening.jpg"
      />

      {/* ===================== CLUBS ===================== */}
      <section className="py-20 lg:py-28">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Co-curricular"
            title="Clubs & Societies"
            subtitle="With over a dozen active clubs, every student finds a space to explore their passions and talents."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {clubs.map((club, i) => (
              <Reveal key={club.name} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group flex h-full items-start gap-4 rounded-2xl bg-white p-6 shadow-soft ring-1 ring-navy-100 transition-shadow hover:shadow-card"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy-900 text-2xl text-gold-400 transition-colors group-hover:bg-gold-500 group-hover:text-navy-950">
                    <club.icon />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-navy-900">{club.name}</h3>
                    <p className="mt-1 text-sm text-navy-500">{club.text}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SPORTS ===================== */}
      <section id="sports" className="relative overflow-hidden bg-navy-900 py-20 text-white lg:py-28">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="container-custom relative z-10">
          <SectionHeading
            light
            eyebrow="Stay Active"
            title="Sports & Games"
            subtitle="Physical fitness and teamwork are essential parts of a Mayuge Light education."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sports.map((sport, i) => (
              <Reveal key={sport.name} delay={i * 0.08}>
                <div className="flex h-full items-center gap-4 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur transition-colors hover:bg-white/10">
                  <span className="text-4xl">{sport.emoji}</span>
                  <div>
                    <h3 className="text-lg font-bold text-white">{sport.name}</h3>
                    <p className="mt-1 text-sm text-navy-200">{sport.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== EVENTS ===================== */}
      <section className="py-20 lg:py-28">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Mark Your Calendar"
            title="Signature Events"
            subtitle="The highlights of our school year — moments students remember for a lifetime."
          />
          <div className="mt-14 grid gap-7 md:grid-cols-2">
            {events.map((event, i) => (
              <Reveal key={event.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group grid overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-navy-100 sm:grid-cols-2"
                >
                  <div className="relative aspect-video overflow-hidden sm:aspect-auto">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-6">
                    <span className="w-fit rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold text-gold-700">
                      {event.date}
                    </span>
                    <h3 className="mt-3 text-xl font-bold text-navy-900">{event.title}</h3>
                    <p className="mt-2 text-sm text-navy-500">{event.text}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== GALLERY ===================== */}
      <section id="gallery" className="bg-navy-50 py-20 lg:py-28">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Moments"
            title="Photo Gallery"
            subtitle="A glimpse into daily life at Mayuge Light Secondary School."
          />
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {galleryImages.map((img, i) => (
              <motion.button
                key={img.src}
                type="button"
                onClick={() => setLightbox(img.src)}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.04 }}
                className={`group relative overflow-hidden rounded-2xl shadow-soft ${
                  i % 5 === 0 ? "sm:col-span-2 sm:row-span-2" : ""
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-navy-950/0 transition-colors group-hover:bg-navy-950/30" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== LIGHTBOX ===================== */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-navy-950/90 p-4 backdrop-blur"
          >
            <button
              className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              onClick={() => setLightbox(null)}
            >
              <FiX size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={lightbox}
              alt="Gallery"
              className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-card"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
