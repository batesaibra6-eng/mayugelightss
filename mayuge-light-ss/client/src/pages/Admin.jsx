import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  FiLogOut,
  FiTrash2,
  FiPlus,
  FiMail,
  FiUsers,
  FiFileText,
  FiInbox,
  FiEye,
  FiCheck,
  FiX,
} from "react-icons/fi";
import api, { getErrorMessage } from "../api/client.js";
import SEO from "../components/SEO.jsx";
import Loader from "../components/Loader.jsx";

/**
 * Lightweight admin dashboard.
 * - Login with admin credentials to receive a JWT.
 * - Create / delete news posts.
 * - View and manage admission applications.
 * - View and manage contact messages.
 *
 * In production you can extend this with role-based access and richer CRUD.
 */
export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem("mlss_token"));
  const [tab, setTab] = useState("news");
  const [loading, setLoading] = useState(false);

  // Auth state
  const [creds, setCreds] = useState({ email: "", password: "" });

  // Data state
  const [news, setNews] = useState([]);
  const [applications, setApplications] = useState([]);
  const [messages, setMessages] = useState([]);

  // New article form
  const [draft, setDraft] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "General",
    image: "",
    featured: false,
  });

  const logout = () => {
    localStorage.removeItem("mlss_token");
    setToken(null);
    toast.info("Logged out");
  };

  /* ---------------- AUTH ---------------- */
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", creds);
      localStorage.setItem("mlss_token", data.data.token);
      setToken(data.data.token);
      toast.success("Welcome back, " + data.data.user.name);
    } catch (err) {
      toast.error(getErrorMessage(err, "Login failed"));
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- DATA FETCHING ---------------- */
  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [newsRes, appRes, msgRes] = await Promise.all([
        api.get("/news?limit=50"),
        api.get("/applications?limit=50"),
        api.get("/contact?limit=50"),
      ]);
      setNews(newsRes.data.data.news);
      setApplications(appRes.data.data.applications);
      setMessages(msgRes.data.data.messages);
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load data"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) fetchAll();
  }, [token, fetchAll]);

  /* ---------------- NEWS CRUD ---------------- */
  const createNews = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/news", draft);
      toast.success("Article published!");
      setNews((n) => [data.data.news, ...n]);
      setDraft({ title: "", excerpt: "", content: "", category: "General", image: "", featured: false });
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const deleteNews = async (id) => {
    if (!confirm("Delete this article permanently?")) return;
    try {
      await api.delete(`/news/${id}`);
      setNews((n) => n.filter((x) => x._id !== id));
      toast.success("Article deleted");
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  /* ---------------- APPLICATION STATUS ---------------- */
  const updateApplicationStatus = async (id, status) => {
    try {
      const { data } = await api.patch(`/applications/${id}`, { status });
      setApplications((apps) =>
        apps.map((a) => (a._id === id ? data.data.application : a))
      );
      toast.success(`Marked as ${status}`);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const deleteApplication = async (id) => {
    if (!confirm("Delete this application?")) return;
    try {
      await api.delete(`/applications/${id}`);
      setApplications((apps) => apps.filter((a) => a._id !== id));
      toast.success("Application deleted");
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  /* ---------------- MESSAGE STATUS ---------------- */
  const toggleRead = async (msg) => {
    try {
      const { data } = await api.patch(`/contact/${msg._id}`, { isRead: !msg.isRead });
      setMessages((m) => m.map((x) => (x._id === msg._id ? data.data.contact : x)));
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const deleteMessage = async (id) => {
    if (!confirm("Delete this message?")) return;
    try {
      await api.delete(`/contact/${id}`);
      setMessages((m) => m.filter((x) => x._id !== id));
      toast.success("Message deleted");
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  /* ---------------- LOGIN VIEW ---------------- */
  if (!token) {
    return (
      <section className="flex min-h-[80vh] items-center justify-center bg-navy-50 px-4 py-20">
        <SEO title="Admin Login" />
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-3xl bg-white p-8 shadow-card ring-1 ring-navy-100"
        >
          <div className="mb-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-900 text-gold-400">
              <FiUsers size={26} />
            </div>
            <h1 className="mt-4 text-2xl font-bold text-navy-900">Admin Login</h1>
            <p className="mt-1 text-sm text-navy-500">Sign in to manage the school website.</p>
          </div>
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              required
              value={creds.email}
              onChange={(e) => setCreds((c) => ({ ...c, email: e.target.value }))}
              className="w-full rounded-xl border border-navy-200 px-4 py-3 text-sm outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-200"
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={creds.password}
              onChange={(e) => setCreds((c) => ({ ...c, password: e.target.value }))}
              className="w-full rounded-xl border border-navy-200 px-4 py-3 text-sm outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-200"
            />
            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </div>
          <p className="mt-5 text-center text-xs text-navy-400">
            Use the credentials created via <code className="rounded bg-navy-100 px-1">npm run seed</code> on the server.
          </p>
        </motion.form>
      </section>
    );
  }

  /* ---------------- DASHBOARD VIEW ---------------- */
  const tabs = [
    { id: "news", label: "News", icon: FiFileText, count: news.length },
    { id: "applications", label: "Applications", icon: FiUsers, count: applications.length },
    { id: "messages", label: "Messages", icon: FiInbox, count: messages.filter((m) => !m.isRead).length },
  ];

  return (
    <section className="min-h-screen bg-navy-50 py-10">
      <SEO title="Admin Dashboard" />

      <div className="container-custom">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-navy-900">Admin Dashboard</h1>
            <p className="text-sm text-navy-500">Manage content, applications and messages.</p>
          </div>
          <button onClick={logout} className="btn-secondary">
            <FiLogOut /> Logout
          </button>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <StatCard icon={FiFileText} label="News Articles" value={news.length} />
          <StatCard icon={FiUsers} label="Applications" value={applications.length} />
          <StatCard icon={FiInbox} label="Unread Messages" value={messages.filter((m) => !m.isRead).length} />
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 border-b border-navy-200">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                tab === t.id
                  ? "border-gold-500 text-navy-900"
                  : "border-transparent text-navy-500 hover:text-navy-700"
              }`}
            >
              <t.icon /> {t.label}
              <span className="rounded-full bg-navy-100 px-2 py-0.5 text-xs">{t.count}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <Loader full />
        ) : (
          <>
            {/* ---------- NEWS TAB ---------- */}
            {tab === "news" && (
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Create form */}
                <form onSubmit={createNews} className="rounded-2xl bg-white p-6 shadow-soft ring-1 ring-navy-100 lg:col-span-1">
                  <h3 className="mb-4 flex items-center gap-2 font-bold text-navy-900">
                    <FiPlus /> New Article
                  </h3>
                  <div className="space-y-3">
                    <AdminInput label="Title" value={draft.title} onChange={(v) => setDraft((d) => ({ ...d, title: v }))} required />
                    <AdminInput label="Excerpt" value={draft.excerpt} onChange={(v) => setDraft((d) => ({ ...d, excerpt: v }))} required />
                    <AdminTextarea label="Content" value={draft.content} onChange={(v) => setDraft((d) => ({ ...d, content: v }))} required />
                    <div>
                      <label className="mb-1 block text-xs font-medium text-navy-600">Category</label>
                      <select
                        value={draft.category}
                        onChange={(e) => setDraft((d) => ({ ...d, category: e.target.value }))}
                        className="w-full rounded-lg border border-navy-200 px-3 py-2 text-sm outline-none focus:border-gold-400"
                      >
                        {["General", "Achievement", "Academics", "Event", "Sports", "Announcement"].map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <AdminInput label="Image URL" value={draft.image} onChange={(v) => setDraft((d) => ({ ...d, image: v }))} placeholder="/images/…" />
                    <label className="flex items-center gap-2 text-sm text-navy-700">
                      <input type="checkbox" checked={draft.featured} onChange={(e) => setDraft((d) => ({ ...d, featured: e.target.checked }))} />
                      Featured article
                    </label>
                    <button type="submit" className="btn-primary w-full"><FiPlus /> Publish</button>
                  </div>
                </form>

                {/* List */}
                <div className="space-y-3 lg:col-span-2">
                  {news.map((item) => (
                    <div key={item._id} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-soft ring-1 ring-navy-100">
                      {item.image && <img src={item.image} alt="" className="h-14 w-14 shrink-0 rounded-lg object-cover" />}
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate font-semibold text-navy-900">{item.title}</h4>
                        <p className="truncate text-xs text-navy-400">{item.category} · {new Date(item.createdAt).toLocaleDateString()}</p>
                      </div>
                      <button onClick={() => deleteNews(item._id)} className="rounded-lg p-2 text-red-500 transition hover:bg-red-50">
                        <FiTrash2 />
                      </button>
                    </div>
                  ))}
                  {news.length === 0 && <p className="text-center text-navy-400">No articles yet.</p>}
                </div>
              </div>
            )}

            {/* ---------- APPLICATIONS TAB ---------- */}
            {tab === "applications" && (
              <div className="space-y-3">
                {applications.map((app) => (
                  <div key={app._id} className="rounded-2xl bg-white p-5 shadow-soft ring-1 ring-navy-100">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h4 className="font-bold text-navy-900">{app.studentName}</h4>
                        <p className="text-sm text-navy-500">
                          Applying for <span className="font-medium text-navy-700">{app.classApplying}</span>
                        </p>
                        <p className="mt-1 text-xs text-navy-400">
                          Parent: {app.parentName} · {app.phone} · {app.email}
                        </p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2 border-t border-navy-100 pt-3">
                      {["Pending", "Reviewing", "Accepted", "Rejected"].map((s) => (
                        <button
                          key={s}
                          onClick={() => updateApplicationStatus(app._id, s)}
                          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                            app.status === s ? "bg-navy-900 text-white" : "bg-navy-50 text-navy-600 hover:bg-navy-100"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                      <button onClick={() => deleteApplication(app._id)} className="ml-auto rounded-lg px-3 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50">
                        <FiTrash2 className="inline" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
                {applications.length === 0 && <p className="text-center text-navy-400">No applications yet.</p>}
              </div>
            )}

            {/* ---------- MESSAGES TAB ---------- */}
            {tab === "messages" && (
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div key={msg._id} className={`rounded-2xl bg-white p-5 shadow-soft ring-1 ring-navy-100 ${msg.isRead ? "opacity-70" : "ring-gold-200"}`}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h4 className="flex items-center gap-2 font-bold text-navy-900">
                          {!msg.isRead && <span className="h-2 w-2 rounded-full bg-gold-500" />}
                          {msg.name}
                        </h4>
                        <p className="text-xs text-navy-400">{msg.email} · {msg.phone || "No phone"}</p>
                        <p className="text-sm text-navy-500">Re: {msg.subject}</p>
                      </div>
                      <span className="text-xs text-navy-400">{new Date(msg.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="mt-3 rounded-lg bg-navy-50 p-3 text-sm text-navy-700">{msg.message}</p>
                    <div className="mt-3 flex gap-2">
                      <button onClick={() => toggleRead(msg)} className="rounded-lg px-3 py-1.5 text-xs font-medium text-navy-600 transition hover:bg-navy-100">
                        {msg.isRead ? <><FiEye className="inline" /> Mark unread</> : <><FiCheck className="inline" /> Mark read</>}
                      </button>
                      <button onClick={() => deleteMessage(msg._id)} className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50">
                        <FiX className="inline" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
                {messages.length === 0 && <p className="text-center text-navy-400">No messages yet.</p>}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

/* ---------- helpers ---------- */
function statusColor(status) {
  const map = {
    Pending: "bg-gold-100 text-gold-700",
    Reviewing: "bg-blue-100 text-blue-700",
    Accepted: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };
  return map[status] || "bg-navy-100 text-navy-700";
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-navy-100">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-gold-400">
        <Icon />
      </div>
      <div>
        <div className="text-2xl font-bold text-navy-900">{value}</div>
        <div className="text-xs text-navy-500">{label}</div>
      </div>
    </div>
  );
}

function AdminInput({ label, value, onChange, required, placeholder }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-navy-600">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-navy-200 px-3 py-2 text-sm outline-none focus:border-gold-400"
      />
    </div>
  );
}

function AdminTextarea({ label, value, onChange, required }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-navy-600">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        rows={4}
        className="w-full rounded-lg border border-navy-200 px-3 py-2 text-sm outline-none focus:border-gold-400"
      />
    </div>
  );
}
