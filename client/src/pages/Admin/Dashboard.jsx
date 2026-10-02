import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  FileText,
  LayoutDashboard,
  LogOut,
  Mail,
  MessageSquare,
  RefreshCw,
  Settings,
  Sparkles,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import LanguageToggle from "../../components/LanguageToggle";
import Logo from "../../components/Logo";

const API_BASE =
  (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(
    /\/$/,
    "",
  );

const getToken = () =>
  localStorage.getItem("adminToken") ||
  localStorage.getItem("token") ||
  "";

const extractList = (payload, keys = []) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  for (const key of keys) {
    if (Array.isArray(payload?.[key])) {
      return payload[key];
    }

    if (Array.isArray(payload?.data?.[key])) {
      return payload.data[key];
    }
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  return [];
};

const formatDate = (value, locale) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat(
    locale === "ar" ? "ar-OM" : "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  ).format(date);
};

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [quotes, setQuotes] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboard = useCallback(async () => {
    const token = getToken();

    if (!token) {
      navigate("/admin/login", {
        replace: true,
      });
      return;
    }

    try {
      setLoading(true);

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [quotesResponse, messagesResponse] =
        await Promise.all([
          fetch(`${API_BASE}/api/quotes`, {
            headers,
          }),
          fetch(`${API_BASE}/api/contact`, {
            headers,
          }),
        ]);

      if (
        quotesResponse.status === 401 ||
        messagesResponse.status === 401
      ) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("token");
        localStorage.removeItem("adminUser");

        navigate("/admin/login", {
          replace: true,
        });

        return;
      }

      const [quotesData, messagesData] =
        await Promise.all([
          quotesResponse.json(),
          messagesResponse.json(),
        ]);

      setQuotes(
        extractList(quotesData, [
          "quotes",
        ]),
      );

      setMessages(
        extractList(messagesData, [
          "messages",
          "contacts",
        ]),
      );
    } catch (error) {
      console.error(
        "Dashboard loading error:",
        error,
      );
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadDashboard();

    const interval = setInterval(
      loadDashboard,
      10000,
    );

    return () => clearInterval(interval);
  }, [loadDashboard]);

  const recentQuotes = useMemo(
    () =>
      [...quotes]
        .sort(
          (a, b) =>
            new Date(b.createdAt || 0) -
            new Date(a.createdAt || 0),
        )
        .slice(0, 5),
    [quotes],
  );

  const recentMessages = useMemo(
    () =>
      [...messages]
        .sort(
          (a, b) =>
            new Date(b.createdAt || 0) -
            new Date(a.createdAt || 0),
        )
        .slice(0, 5),
    [messages],
  );

  const newQuotes = quotes.filter(
    (item) => item.status === "new",
  ).length;

  const newMessages = messages.filter(
    (item) => item.status === "new",
  ).length;

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("token");
    localStorage.removeItem("adminUser");

    navigate("/admin/login", {
      replace: true,
    });
  };

  const adminUser = (() => {
    try {
      return JSON.parse(
        localStorage.getItem("adminUser") || "null",
      );
    } catch {
      return null;
    }
  })();

  const statusLabel = (status) =>
    t(`admin.status.${status}`, {
      defaultValue: status || "—",
    });

  const statusClass = (status) => {
    const classes = {
      new: "border-[#d4af37]/30 bg-[#d4af37]/10 text-[#e6c65d]",
      read: "border-sky-400/20 bg-sky-400/5 text-sky-300",
      replied:
        "border-emerald-400/20 bg-emerald-400/5 text-emerald-300",
      closed:
        "border-slate-400/20 bg-slate-400/5 text-slate-400",
      reviewing:
        "border-sky-400/20 bg-sky-400/5 text-sky-300",
      quoted:
        "border-violet-400/20 bg-violet-400/5 text-violet-300",
      approved:
        "border-emerald-400/20 bg-emerald-400/5 text-emerald-300",
      rejected:
        "border-red-400/20 bg-red-400/5 text-red-300",
    };

    return (
      classes[status] ||
      "border-white/10 bg-white/5 text-slate-400"
    );
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#050706] text-white">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#050706]/80 backdrop-blur-xl">
        <div className="container-premium flex min-h-20 items-center justify-between gap-4">
          <Link to="/admin">
            <Logo compact />
          </Link>

          <div className="flex items-center gap-2">
            <LanguageToggle />

            <Link
              to="/admin/settings"
              className="hidden h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 text-xs font-semibold text-slate-400 transition hover:border-[#d4af37]/30 hover:text-[#d4af37] sm:flex"
            >
              <Settings size={15} />
              {t("admin.nav.settings")}
            </Link>

            <button
              type="button"
              onClick={logout}
              className="flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 text-xs font-semibold text-slate-400 transition hover:border-red-400/20 hover:text-red-300"
            >
              <LogOut size={15} />
              <span className="hidden sm:inline">
                {t("admin.nav.logout")}
              </span>
            </button>
          </div>
        </div>
      </header>

      <section className="py-10 sm:py-14">
        <div className="container-premium">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-[#d4af37]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37]">
                  {t("admin.dashboard.eyebrow")}
                </span>
              </div>

              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                {t("admin.dashboard.title")}
              </h1>

              <p className="mt-3 text-sm text-slate-500">
                {t("admin.dashboard.welcome")}
                {adminUser?.name
                  ? `, ${adminUser.name}`
                  : ""}
                .
              </p>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">
                {t("admin.dashboard.subtitle")}
              </p>
            </div>

            <button
              type="button"
              onClick={loadDashboard}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#d4af37]/20 bg-[#d4af37]/5 px-4 py-3 text-xs font-bold text-[#d4af37] transition hover:border-[#d4af37]/40 hover:bg-[#d4af37]/10 disabled:opacity-50"
            >
              <RefreshCw
                size={15}
                className={
                  loading
                    ? "animate-spin"
                    : ""
                }
              />
              {t("admin.dashboard.refresh")}
            </button>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={FileText}
              label={t("admin.dashboard.totalQuotes")}
              value={quotes.length}
            />

            <StatCard
              icon={Activity}
              label={t("admin.dashboard.newQuotes")}
              value={newQuotes}
            />

            <StatCard
              icon={Mail}
              label={t("admin.dashboard.totalMessages")}
              value={messages.length}
            />

            <StatCard
              icon={MessageSquare}
              label={t("admin.dashboard.newMessages")}
              value={newMessages}
            />
          </div>

          <div className="mt-10 grid gap-6 xl:grid-cols-2">
            <Panel
              title={t("admin.dashboard.recentQuotes")}
              icon={FileText}
              action={
                <Link
                  to="/admin/quotes"
                  className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#d4af37]"
                >
                  {t("admin.dashboard.viewAll")}
                </Link>
              }
            >
              {recentQuotes.length === 0 ? (
                <EmptyState
                  icon={FileText}
                  text={t(
                    "admin.dashboard.noQuotes",
                  )}
                />
              ) : (
                <div className="space-y-3">
                  {recentQuotes.map((quote) => (
                    <div
                      key={quote._id}
                      className="rounded-2xl border border-white/5 bg-white/[0.02] p-4"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-white">
                            {quote.name ||
                              "—"}
                          </p>

                          <p className="mt-1 truncate text-xs text-slate-600">
                            {quote.email ||
                              "—"}
                          </p>

                          <p className="mt-2 text-xs text-slate-400">
                            {quote.projectType ||
                              "—"}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] ${statusClass(
                              quote.status,
                            )}`}
                          >
                            {statusLabel(
                              quote.status,
                            )}
                          </span>

                          <span className="text-[10px] text-slate-700">
                            {formatDate(
                              quote.createdAt,
                              i18n.language,
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Panel>

            <Panel
              title={t(
                "admin.dashboard.recentMessages",
              )}
              icon={Mail}
              action={
                <Link
                  to="/admin/messages"
                  className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#d4af37]"
                >
                  {t("admin.dashboard.viewAll")}
                </Link>
              }
            >
              {recentMessages.length === 0 ? (
                <EmptyState
                  icon={Mail}
                  text={t(
                    "admin.dashboard.noMessages",
                  )}
                />
              ) : (
                <div className="space-y-3">
                  {recentMessages.map((message) => (
                    <div
                      key={message._id}
                      className="rounded-2xl border border-white/5 bg-white/[0.02] p-4"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-white">
                            {message.name ||
                              "—"}
                          </p>

                          <p className="mt-1 truncate text-xs text-slate-600">
                            {message.email ||
                              "—"}
                          </p>

                          <p className="mt-2 truncate text-xs text-slate-400">
                            {message.subject ||
                              "—"}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] ${statusClass(
                              message.status,
                            )}`}
                          >
                            {statusLabel(
                              message.status,
                            )}
                          </span>

                          <span className="text-[10px] text-slate-700">
                            {formatDate(
                              message.createdAt,
                              i18n.language,
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Panel>
          </div>

          <section className="mt-10">
            <div className="flex items-center gap-3">
              <LayoutDashboard
                size={17}
                className="text-[#d4af37]"
              />

              <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-[#d4af37]">
                {t("admin.dashboard.quickAccess")}
              </h2>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <QuickCard
                icon={FileText}
                title={t(
                  "admin.dashboard.manageQuotes",
                )}
                text={t(
                  "admin.dashboard.manageQuotesText",
                )}
                href="/admin/quotes"
              />

              <QuickCard
                icon={Mail}
                title={t(
                  "admin.dashboard.manageMessages",
                )}
                text={t(
                  "admin.dashboard.manageMessagesText",
                )}
                href="/admin/messages"
              />

              <QuickCard
                icon={Settings}
                title={t(
                  "admin.dashboard.settings",
                )}
                text={t(
                  "admin.dashboard.settingsText",
                )}
                href="/admin/settings"
              />
            </div>
          </section>

          <section className="mt-6 overflow-hidden rounded-[2rem] border border-[#d4af37]/15 bg-gradient-to-br from-[#15150d] via-[#0b100c] to-[#060807] p-7 sm:p-9">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#d4af37]/25 bg-[#d4af37]/10">
                <Sparkles
                  size={21}
                  className="text-[#d4af37]"
                />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-semibold">
                    {t("admin.dashboard.aiTitle")}
                  </h2>

                  <span className="rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#d4af37]">
                    {t(
                      "admin.dashboard.comingSoon",
                    )}
                  </span>
                </div>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">
                  {t("admin.dashboard.aiText")}
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#d4af37]/20 bg-[#d4af37]/5">
          <Icon
            size={19}
            className="text-[#d4af37]"
          />
        </div>

        <span className="font-mono text-2xl font-bold text-white">
          {value}
        </span>
      </div>

      <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">
        {label}
      </p>
    </div>
  );
}

function Panel({
  title,
  icon: Icon,
  action,
  children,
}) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Icon
            size={18}
            className="text-[#d4af37]"
          />

          <h2 className="text-sm font-semibold">
            {title}
          </h2>
        </div>

        {action}
      </div>

      <div className="mt-5">
        {children}
      </div>
    </section>
  );
}

function EmptyState({
  icon: Icon,
  text,
}) {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 text-center">
      <Icon
        size={21}
        className="text-slate-700"
      />

      <p className="mt-3 text-xs text-slate-600">
        {text}
      </p>
    </div>
  );
}

function QuickCard({
  icon: Icon,
  title,
  text,
  href,
}) {
  return (
    <Link
      to={href}
      className="group rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:-translate-y-1 hover:border-[#d4af37]/30 hover:bg-[#d4af37]/[0.03]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#d4af37]/20 bg-[#d4af37]/5">
          <Icon
            size={18}
            className="text-[#d4af37]"
          />
        </div>

        <ArrowUpRight
          size={17}
          className="text-slate-700 transition group-hover:text-[#d4af37]"
        />
      </div>

      <h3 className="mt-5 text-sm font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-6 text-slate-600">
        {text}
      </p>
    </Link>
  );
}