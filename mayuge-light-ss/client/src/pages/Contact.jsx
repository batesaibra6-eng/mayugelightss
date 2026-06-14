import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiSend,
  FiUser,
} from "react-icons/fi";
import api, { getErrorMessage } from "../api/client.js";
import SEO from "../components/SEO.jsx";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";
import { SCHOOL } from "../data/school.js";

const infoCards = [
  { icon: FiMapPin, title: "Visit Us", lines: [SCHOOL.address, SCHOOL.pobox] },
  { icon: FiPhone, title: "Call Us", lines: [SCHOOL.phone, SCHOOL.phone2] },
  { icon: FiMail, title: "Email Us", lines: [SCHOOL.email, SCHOOL.admissionsEmail] },
  { icon: FiClock, title: "Office Hours", lines: ["Mon – Fri: 8:00 AM – 5:00 PM", "Sat: 9:00 AM – 1:00 PM"] },
];

const emptyForm = { name: "", email: "", phone: "", subject: "General Enquiry", message: "" };

export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      return toast.error("Please fill in your name, email and message.");
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      return toast.error("Please enter a valid email address.");
    }

    setSubmitting(true);
    try {
      const { data } = await api.post("/contact", form);
      toast.success(data.message || "Message sent successfully!");
      setForm(emptyForm);
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to send message. Please try again."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with Mayuge Light Secondary School. Find our address, phone, email and send us a message."
      />

      <PageHero
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out with any questions about admissions, programmes or visiting our school."
        breadcrumb="Contact"
        image="/images/campus/campus-5.jpg"
      />

      {/* ===================== INFO CARDS ===================== */}
      <section className="py-16 lg:py-20">
        <div className="container-custom grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {infoCards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                className="card h-full text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-900 text-gold-400">
                  <card.icon size={24} />
                </div>
                <h3 className="mt-4 font-bold text-navy-900">{card.title}</h3>
                {card.lines.map((line) => (
                  <p key={line} className="mt-1 text-sm text-navy-500">{line}</p>
                ))}
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== FORM + MAP ===================== */}
      <section className="pb-20 lg:pb-28">
        <div className="container-custom grid gap-10 lg:grid-cols-2">
          {/* Form */}
          <Reveal>
            <div className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-navy-100 sm:p-10">
              <SectionHeading center={false} eyebrow="Send a Message" title="Get in Touch" />
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input label="Your Name *" name="name" value={form.name} onChange={handleChange} placeholder="Full name" icon={<FiUser />} />
                  <Input label="Email *" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" icon={<FiMail />} />
                  <Input label="Phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+256 7XX XXX XXX" icon={<FiPhone />} />
                  <Input label="Subject" name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy-700">Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    placeholder="How can we help you?"
                    className="w-full rounded-xl border border-navy-200 px-4 py-3 text-sm outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-200"
                  />
                </div>
                <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
                  {submitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-navy-900 border-t-transparent" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <FiSend /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </Reveal>

          {/* Map */}
          <Reveal delay={0.15}>
            <div className="flex h-full min-h-[400px] flex-col overflow-hidden rounded-3xl shadow-card ring-1 ring-navy-100">
              <iframe
                title="Mayuge Light SS Location"
                src={SCHOOL.mapEmbed}
                className="h-full min-h-[400px] w-full flex-1"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Input({ label, name, value, onChange, type = "text", placeholder, icon }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-navy-700">{label}</label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-navy-400">
            {icon}
          </span>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-xl border border-navy-200 py-3 text-sm outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-200 ${
            icon ? "pl-10 pr-4" : "px-4"
          }`}
        />
      </div>
    </div>
  );
}
