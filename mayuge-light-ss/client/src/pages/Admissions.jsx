import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  FiCheckCircle,
  FiDownload,
  FiFileText,
  FiUser,
  FiMail,
  FiPhone,
  FiSend,
} from "react-icons/fi";
import api, { getErrorMessage } from "../api/client.js";
import SEO from "../components/SEO.jsx";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";
import { CLASS_OPTIONS } from "../data/school.js";

const requirements = [
  "Completed application form (available at school office or online)",
  "Original report card / result slip from previous school",
  "Photocopy of birth certificate or national ID",
  "Two recent passport-size photographs",
  "A signed letter of recommendation from previous headteacher",
  "Medical / health report for boarding students",
];

const fees = [
  {
    level: "O-Level (S.1 – S.4)",
    boarding: "UGX 450,000",
    day: "UGX 250,000",
    note: "Per term — inclusive of tuition. Boarding includes meals & accommodation.",
  },
  {
    level: "A-Level (S.5 – S.6)",
    boarding: "UGX 550,000",
    day: "UGX 300,000",
    note: "Per term — inclusive of tuition. Boarding includes meals & accommodation.",
  },
  {
    level: "Development (One-time)",
    boarding: "UGX 100,000",
    day: "UGX 50,000",
    note: "Payable once on first enrolment to support school infrastructure.",
  },
];

const steps = [
  { num: "1", title: "Submit Application", text: "Complete the online form below or collect a form from the school office." },
  { num: "2", title: "Provide Documents", text: "Attach report cards, birth certificate, photos and recommendation letter." },
  { num: "3", title: "Entrance Interview", text: "Attend a short interview / assessment with our admissions team." },
  { num: "4", title: "Receive Admission", text: "Successful applicants receive an admission letter and reporting details." },
];

const emptyForm = {
  studentName: "",
  dateOfBirth: "",
  gender: "",
  classApplying: "",
  previousSchool: "",
  parentName: "",
  parentRelationship: "",
  email: "",
  phone: "",
  address: "",
  message: "",
};

export default function Admissions() {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!form.studentName || !form.classApplying || !form.parentName || !form.email || !form.phone) {
      return toast.error("Please fill in all required fields marked with *.");
    }
    const emailOk = /^\S+@\S+\.\S+$/.test(form.email);
    if (!emailOk) return toast.error("Please enter a valid email address.");

    setSubmitting(true);
    try {
      const { data } = await api.post("/applications", form);
      toast.success(data.message || "Application submitted successfully!");
      setForm(emptyForm);
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to submit application. Please try again."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Admissions"
        description="Admission requirements, fees structure and online application form for Mayuge Light Secondary School."
      />

      <PageHero
        title="Admissions"
        subtitle="Begin your journey with Mayuge Light SS. Admissions are open for O-Level and A-Level."
        breadcrumb="Admissions"
        image="/images/campus/gate.jpg"
      />

      {/* ===================== ADMISSION STEPS ===================== */}
      <section className="py-20 lg:py-28">
        <div className="container-custom">
          <SectionHeading
            eyebrow="How to Join"
            title="Admission Process"
            subtitle="Becoming part of the Mayuge Light family is simple. Follow these four steps."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.1}>
                <div className="relative h-full rounded-2xl bg-white p-7 text-center shadow-soft ring-1 ring-navy-100">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-navy-900 text-2xl font-bold text-gold-400">
                    {step.num}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-navy-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-navy-500">{step.text}</p>
                  {i < steps.length - 1 && (
                    <span className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 text-3xl text-gold-300 lg:block">
                      →
                    </span>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== REQUIREMENTS + FEES ===================== */}
      <section className="bg-navy-50 py-20 lg:py-28">
        <div className="container-custom grid gap-12 lg:grid-cols-2">
          {/* Requirements */}
          <Reveal>
            <h2 className="section-title">Admission Requirements</h2>
            <p className="mt-4 text-navy-600">
              Please ensure you have the following documents when applying for a place at Mayuge Light SS.
            </p>
            <ul className="mt-6 space-y-3">
              {requirements.map((req) => (
                <li
                  key={req}
                  className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-soft ring-1 ring-navy-100"
                >
                  <FiCheckCircle className="mt-0.5 shrink-0 text-gold-500" size={20} />
                  <span className="text-sm text-navy-700">{req}</span>
                </li>
              ))}
            </ul>
            <button
              className="btn-dark mt-8"
              onClick={() => toast.info("The prospectus will be available for download soon.")}
            >
              <FiDownload /> Download Prospectus
            </button>
          </Reveal>

          {/* Fees */}
          <Reveal delay={0.15}>
            <h2 className="section-title">Fees Structure</h2>
            <p className="mt-4 text-navy-600">
              Affordable, transparent fees for both day and boarding scholars. Fees are payable per term.
            </p>
            <div className="mt-6 space-y-4">
              {fees.map((fee) => (
                <motion.div
                  key={fee.level}
                  whileHover={{ scale: 1.02 }}
                  className="overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-navy-100"
                >
                  <div className="bg-navy-900 px-5 py-3">
                    <h3 className="font-semibold text-white">{fee.level}</h3>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-navy-100 p-5">
                    <div className="pr-3">
                      <p className="text-xs uppercase tracking-wide text-navy-400">Boarding</p>
                      <p className="text-lg font-bold text-navy-900">{fee.boarding}</p>
                    </div>
                    <div className="pl-3">
                      <p className="text-xs uppercase tracking-wide text-navy-400">Day Scholar</p>
                      <p className="text-lg font-bold text-navy-900">{fee.day}</p>
                    </div>
                  </div>
                  <p className="px-5 pb-4 text-xs text-navy-400">{fee.note}</p>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== APPLICATION FORM ===================== */}
      <section id="apply" className="py-20 lg:py-28">
        <div className="container-custom max-w-4xl">
          <SectionHeading
            eyebrow="Apply Online"
            title="Application Form"
            subtitle="Complete the form below and our admissions team will contact you within two working days."
          />

          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="mt-12 space-y-8 rounded-3xl bg-white p-6 shadow-card ring-1 ring-navy-100 sm:p-10"
            >
              {/* Student details */}
              <fieldset className="space-y-5">
                <legend className="flex items-center gap-2 text-lg font-bold text-navy-900">
                  <FiUser className="text-gold-500" /> Student Details
                </legend>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Student Full Name *" name="studentName" value={form.studentName} onChange={handleChange} placeholder="e.g. John Mukasa" required />
                  <Field label="Date of Birth" name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} />
                  <SelectField label="Gender" name="gender" value={form.gender} onChange={handleChange} options={["Male", "Female"]} />
                  <SelectField label="Class Applying For *" name="classApplying" value={form.classApplying} onChange={handleChange} options={CLASS_OPTIONS} required />
                  <Field label="Previous School" name="previousSchool" value={form.previousSchool} onChange={handleChange} placeholder="e.g. ABC Primary School" className="sm:col-span-2" />
                </div>
              </fieldset>

              {/* Parent details */}
              <fieldset className="space-y-5">
                <legend className="flex items-center gap-2 text-lg font-bold text-navy-900">
                  <FiFileText className="text-gold-500" /> Parent / Guardian Details
                </legend>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Parent / Guardian Name *" name="parentName" value={form.parentName} onChange={handleChange} placeholder="e.g. Mr. Mukasa James" required />
                  <Field label="Relationship to Student" name="parentRelationship" value={form.parentRelationship} onChange={handleChange} placeholder="e.g. Father" />
                  <Field label="Email *" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required icon={<FiMail />} />
                  <Field label="Phone *" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+256 7XX XXX XXX" required icon={<FiPhone />} />
                  <Field label="Home Address" name="address" value={form.address} onChange={handleChange} placeholder="Town, District" className="sm:col-span-2" />
                </div>
              </fieldset>

              {/* Message */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-navy-700">
                  Additional Information
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Anything else you'd like us to know? Special needs, medical conditions, etc."
                  className="w-full rounded-xl border border-navy-200 px-4 py-3 text-sm outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-200"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-navy-900 border-t-transparent" />
                    Submitting…
                  </>
                ) : (
                  <>
                    <FiSend /> Submit Application
                  </>
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ---------- Reusable input sub-components ---------- */

function Field({ label, name, value, onChange, type = "text", placeholder, required, className = "", icon }) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm font-medium text-navy-700">
        {label}
      </label>
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
          required={required}
          className={`w-full rounded-xl border border-navy-200 py-3 text-sm outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-200 ${
            icon ? "pl-10 pr-4" : "px-4"
          }`}
        />
      </div>
    </div>
  );
}

function SelectField({ label, name, value, onChange, options, required, className = "" }) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm font-medium text-navy-700">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-200"
      >
        <option value="">Select…</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
