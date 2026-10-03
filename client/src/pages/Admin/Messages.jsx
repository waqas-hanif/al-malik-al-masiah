import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  LogOut,
  Mail,
  RefreshCw,
  Trash2,
} from "lucide-react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { useTranslation } from "react-i18next";

import LanguageToggle from "../../components/LanguageToggle";
import Logo from "../../components/Logo";

const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

const getToken = () =>
  localStorage.getItem("adminToken") ||
  localStorage.getItem("token") ||
  "";

const extractList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.messages)) {
    return payload.messages;
  }
  if (Array.isArray(payload?.contacts)) {
    return payload.contacts;
  }
  if (Array.isArray(payload?.data?.messages)) {
    return payload.data.messages;
  }
  if (Array.isArray(payload?.data?.contacts)) {
    return payload.data.contacts;
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

export default function Messages() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [messages, setMessages] =
    useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("all");
  const [loading, setLoading] = useState(true);

  const statuses = [
    "new",
    "read",
    "replied",
    "closed",
  ];

  const loadMessages = useCallback(async () => {
    const token = getToken();

    if (!token) {
      navigate("/admin/login", {
        replace: true,
      });
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE}/api/contact`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("token");
        localStorage.removeItem("adminUser");

        navigate("/admin/login", {
          replace: true,
        });

        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            t("admin.messages.error"),
        );
      }

      setMessages(extractList(data));
    } catch (error) {
      console.error(
        "Messages loading error:",
        error,
      );
    } finally {
      setLoading(false);
    }
  }, [navigate, t]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const filteredMessages = useMemo(() => {
    return messages.filter((message) => {
      const matchesStatus =
        statusFilter === "all" ||
        message.status === statusFilter;

      const haystack = [
        message.name,
        message.email,
        message.company,
        message.subject,
        message.message,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        haystack.includes(
          search.toLowerCase(),
        );

      return matchesStatus && matchesSearch;
    });
  }, [
    messages,
    search,
    statusFilter,
  ]);

  const updateStatus = async (
    id,
    status,
  ) => {
    try {
      const response = await fetch(
        `${API_BASE}/api/contact/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({
            status,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            t("admin.messages.error"),
        );
      }

      setMessages((previous) =>
        previous.map((item) =>
          item._id === id
            ? {
                ...item,
                status,
              }
            : item,
        ),
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteMessage = async (id) => {
    if (
      !window.confirm(
        t("admin.messages.deleteConfirm"),
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE}/api/contact/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            t("admin.messages.error"),
        );
      }

      setMessages((previous) =>
        previous.filter(
          (item) => item._id !== id,
        ),
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("token");
    localStorage.removeItem("adminUser");

    navigate("/admin/login", {
      replace: true,
    });
  };

  const statusLabel = (status) =>
    t(`admin.status.${status}`, {
      defaultValue: status || "—",
    });

  return (
    <main className="min-h-screen bg-[#050706] text-white">
      <header className="border-b border-white/5 bg-[#050706]/90 backdrop-blur-xl">
        <div className="container-premium flex min-h-20 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              to="/admin"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-500 transition hover:border-[#d4af37]/30 hover:text-[#d4af37]"
            >
              <ArrowLeft size={17} />
            </Link>

            <Logo compact />
          </div>

          <div className="flex items-center gap-2">
            <LanguageToggle />

            <button
              type="button"
              onClick={logout}
              className="flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 text-xs font-semibold text-slate-400 transition hover:text-red-300"
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
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37]">
                {t("admin.messages.eyebrow")}
              </p>

              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                {t("admin.messages.title")}
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                {t("admin.messages.subtitle")}
              </p>
            </div>

            <button
              type="button"
              onClick={loadMessages}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#d4af37]/20 bg-[#d4af37]/5 px-4 py-3 text-xs font-bold text-[#d4af37]"
            >
              <RefreshCw
                size={15}
                className={
                  loading
                    ? "animate-spin"
                    : ""
                }
              />
              {t("admin.messages.refresh")}
            </button>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-[1fr_auto]">
            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder={t(
                "admin.messages.searchPlaceholder",
              )}
              className="rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3.5 text-sm text-white outline-none placeholder:text-slate-700 focus:border-[#d4af37]/40"
            />

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              className="rounded-xl border border-white/10 bg-[#0b100d] px-4 py-3.5 text-sm text-slate-300 outline-none"
            >
              <option value="all">
                {t("admin.messages.all")}
              </option>

              {statuses.map((status) => (
                <option
                  key={status}
                  value={status}
                >
                  {statusLabel(status)}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02]">
            {loading ? (
              <div className="p-10 text-center text-sm text-slate-600">
                {t("admin.messages.loading")}
              </div>
            ) : filteredMessages.length ===
              0 ? (
              <div className="p-10 text-center text-sm text-slate-600">
                {t(
                  "admin.messages.noResults",
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-[1050px] w-full text-left">
                  <thead className="border-b border-white/5 bg-white/[0.02]">
                    <tr>
                      <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-600">
                        {t("admin.messages.name")}
                      </th>

                      <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-600">
                        {t("admin.messages.email")}
                      </th>

                      <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-600">
                        {t(
                          "admin.messages.company",
                        )}
                      </th>

                      <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-600">
                        {t(
                          "admin.messages.subject",
                        )}
                      </th>

                      <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-600">
                        {t(
                          "admin.messages.status",
                        )}
                      </th>

                      <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-600">
                        {t("admin.messages.date")}
                      </th>

                      <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-600">
                        {t(
                          "admin.messages.actions",
                        )}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredMessages.map(
                      (message) => (
                        <tr
                          key={message._id}
                          className="border-b border-white/5 last:border-0"
                        >
                          <td className="px-5 py-5">
                            <p className="font-semibold text-white">
                              {message.name ||
                                "—"}
                            </p>

                            <p className="mt-1 text-xs text-slate-600">
                              {message.phone ||
                                "—"}
                            </p>
                          </td>

                          <td className="px-5 py-5 text-sm text-slate-400">
                            {message.email ||
                              "—"}
                          </td>

                          <td className="px-5 py-5 text-sm text-slate-400">
                            {message.company ||
                              "—"}
                          </td>

                          <td className="max-w-[260px] px-5 py-5 text-sm text-slate-400">
                            <div className="truncate">
                              {message.subject ||
                                "—"}
                            </div>
                          </td>

                          <td className="px-5 py-5">
                            <select
                              value={
                                message.status ||
                                "new"
                              }
                              onChange={(
                                event,
                              ) =>
                                updateStatus(
                                  message._id,
                                  event.target
                                    .value,
                                )
                              }
                              className="rounded-lg border border-white/10 bg-[#0b100d] px-3 py-2 text-xs text-slate-300 outline-none"
                            >
                              {statuses.map(
                                (status) => (
                                  <option
                                    key={status}
                                    value={
                                      status
                                    }
                                  >
                                    {statusLabel(
                                      status,
                                    )}
                                  </option>
                                ),
                              )}
                            </select>
                          </td>

                          <td className="px-5 py-5 text-xs text-slate-600">
                            {formatDate(
                              message.createdAt,
                              i18n.language,
                            )}
                          </td>

                          <td className="px-5 py-5">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                title={t(
                                  "admin.messages.delete",
                                )}
                                onClick={() =>
                                  deleteMessage(
                                    message._id,
                                  )
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-600 transition hover:border-red-400/20 hover:text-red-300"
                              >
                                <Trash2
                                  size={15}
                                />
                              </button>

                              <Link
                                to={`/admin/messages#${message._id}`}
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-600 transition hover:border-[#d4af37]/30 hover:text-[#d4af37]"
                                title={t(
                                  "admin.messages.details",
                                )}
                              >
                                <ArrowUpRight
                                  size={15}
                                />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}