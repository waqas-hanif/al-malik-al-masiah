import { useEffect, useState } from "react";
import {
  Activity,
  ArrowLeft,
  Bot,
  RefreshCw,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const AssistantActivity = () => {
  const navigate = useNavigate();

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] =
    useState(true);
  const [refreshing, setRefreshing] =
    useState(false);
  const [errorMessage, setErrorMessage] =
    useState("");

  const fetchActivity = async (
    showLoader = false
  ) => {
    const token =
      localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login", {
        replace: true,
      });
      return;
    }

    if (showLoader) {
      setRefreshing(true);
    }

    try {
      setErrorMessage("");

      const response = await fetch(
        `${API_URL}/api/assistant/activity?limit=50`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem(
          "adminUser"
        );

        navigate("/admin/login", {
          replace: true,
        });

        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to load assistant activity."
        );
      }

      setLogs(data?.data?.logs || []);
    } catch (error) {
      setErrorMessage(
        error.message ||
          "Unable to load assistant activity."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchActivity();

    const interval = setInterval(() => {
      fetchActivity();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#040605] text-white">
      <div className="mx-auto max-w-[1400px] px-4 py-7 sm:px-6 lg:px-8">
        {/* HEADER */}

        <header className="mb-7 rounded-[1.75rem] border border-white/8 bg-white/[0.025] p-6 backdrop-blur-2xl sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <button
                type="button"
                onClick={() =>
                  navigate("/admin")
                }
                className="mb-5 inline-flex cursor-pointer items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-[#d4af37]"
              >
                <ArrowLeft size={15} />
                Back to Dashboard
              </button>

              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#d4af37]">
                Admin Control Center
              </p>

              <h1 className="mt-2 text-3xl font-semibold">
                AI Assistant Activity
              </h1>

              <p className="mt-2 text-sm text-slate-600">
                Monitor conversations handled by
                the website assistant.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.04] px-3 py-2">
                <Activity
                  size={14}
                  className="text-emerald-300"
                />

                <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-emerald-300">
                  Live Monitoring
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  fetchActivity(true)
                }
                disabled={refreshing}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs font-semibold text-slate-300 transition hover:border-[#d4af37]/30 hover:text-white disabled:opacity-50"
              >
                <RefreshCw
                  size={15}
                  className={
                    refreshing
                      ? "animate-spin"
                      : ""
                  }
                />

                Refresh
              </button>
            </div>
          </div>
        </header>

        {/* ERROR */}

        {errorMessage && (
          <div className="mb-6 rounded-xl border border-red-400/15 bg-red-400/[0.04] p-4 text-sm text-red-300">
            {errorMessage}
          </div>
        )}

        {/* STATS */}

        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-5">
            <Bot
              size={20}
              className="text-[#d4af37]"
            />

            <p className="mt-4 text-[9px] uppercase tracking-[0.15em] text-slate-600">
              Conversations
            </p>

            <strong className="mt-1 block text-3xl">
              {logs.length}
            </strong>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-5">
            <User
              size={20}
              className="text-[#d4af37]"
            />

            <p className="mt-4 text-[9px] uppercase tracking-[0.15em] text-slate-600">
              User Messages
            </p>

            <strong className="mt-1 block text-3xl">
              {logs.length}
            </strong>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-5">
            <Activity
              size={20}
              className="text-emerald-300"
            />

            <p className="mt-4 text-[9px] uppercase tracking-[0.15em] text-slate-600">
              Status
            </p>

            <strong className="mt-1 block text-2xl text-emerald-300">
              Operational
            </strong>
          </div>
        </div>

        {/* LOGS */}

        <section className="overflow-hidden rounded-[1.75rem] border border-white/8 bg-white/[0.025] backdrop-blur-2xl">
          <div className="border-b border-white/6 p-5 sm:p-6">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#d4af37]">
              Conversation Log
            </p>

            <h2 className="mt-2 text-lg font-semibold">
              Recent Assistant Activity
            </h2>
          </div>

          {loading ? (
            <div className="p-8 text-sm text-slate-600">
              Loading assistant activity...
            </div>
          ) : logs.length === 0 ? (
            <div className="p-10 text-center">
              <Bot
                size={30}
                className="mx-auto text-[#d4af37]/60"
              />

              <h3 className="mt-4 text-sm font-semibold">
                No conversations yet
              </h3>

              <p className="mt-2 text-xs text-slate-600">
                Assistant conversations will
                appear here automatically.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {logs.map((log) => (
                <article
                  key={log._id}
                  className="p-5 sm:p-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full border border-[#d4af37]/15 bg-[#d4af37]/[0.04] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-[#d4af37]">
                        {log.language}
                      </span>

                      <span className="text-[10px] text-slate-700">
                        {log.createdAt
                          ? new Date(
                              log.createdAt
                            ).toLocaleString()
                          : "—"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 lg:grid-cols-2">
                    {/* USER */}

                    <div className="rounded-2xl border border-white/7 bg-black/10 p-4">
                      <div className="flex items-center gap-2">
                        <User
                          size={15}
                          className="text-slate-500"
                        />

                        <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-600">
                          Visitor
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-7 text-slate-300">
                        {log.userMessage}
                      </p>
                    </div>

                    {/* ASSISTANT */}

                    <div className="rounded-2xl border border-[#d4af37]/10 bg-[#d4af37]/[0.025] p-4">
                      <div className="flex items-center gap-2">
                        <Bot
                          size={15}
                          className="text-[#d4af37]"
                        />

                        <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#d4af37]/70">
                          Assistant
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-7 text-slate-300">
                        {log.assistantMessage}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default AssistantActivity;