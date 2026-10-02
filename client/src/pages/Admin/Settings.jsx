import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  KeyRound,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
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

export default function Settings() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] =
    useState(true);

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrent, setShowCurrent] =
    useState(false);
  const [showNew, setShowNew] =
    useState(false);
  const [showConfirm, setShowConfirm] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [success, setSuccess] =
    useState("");
  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadAdmin = async () => {
      const token = getToken();

      if (!token) {
        navigate("/admin/login", {
          replace: true,
        });
        return;
      }

      try {
        const response = await fetch(
          `${API_BASE}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status === 401) {
          localStorage.removeItem(
            "adminToken",
          );
          localStorage.removeItem("token");
          localStorage.removeItem(
            "adminUser",
          );

          navigate("/admin/login", {
            replace: true,
          });

          return;
        }

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message ||
              t(
                "admin.settings.accountError",
              ),
          );
        }

        const user =
          data?.data?.admin ||
          data?.admin ||
          data?.data?.user ||
          data?.user ||
          data?.data ||
          data;

        setAdmin(user);

        if (user) {
          localStorage.setItem(
            "adminUser",
            JSON.stringify(user),
          );
        }
      } catch (requestError) {
        setError(
          requestError.message ||
            t(
              "admin.settings.accountError",
            ),
        );
      } finally {
        setLoading(false);
      }
    };

    loadAdmin();
  }, [navigate, t]);

  const handleChange = (event) => {
    setForm((previous) => ({
      ...previous,
      [event.target.name]:
        event.target.value,
    }));

    setSuccess("");
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (
      form.newPassword !==
      form.confirmPassword
    ) {
      setError(
        t(
          "admin.settings.passwordMismatch",
        ),
      );
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(
        `${API_BASE}/api/auth/password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({
            currentPassword:
              form.currentPassword,
            newPassword:
              form.newPassword,
          }),
        },
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            t(
              "admin.settings.passwordError",
            ),
        );
      }

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setSuccess(
        t(
          "admin.settings.passwordUpdated",
        ),
      );
    } catch (requestError) {
      setError(
        requestError.message ||
          t(
            "admin.settings.passwordError",
          ),
      );
    } finally {
      setSubmitting(false);
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
          <div className="mb-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37]">
              {t("admin.settings.eyebrow")}
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              {t("admin.settings.title")}
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
              {t("admin.settings.subtitle")}
            </p>
          </div>

          {loading ? (
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-10 text-center text-sm text-slate-600">
              {t(
                "admin.dashboard.loading",
              )}
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              <section className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#d4af37]/20 bg-[#d4af37]/5">
                    <ShieldCheck
                      size={19}
                      className="text-[#d4af37]"
                    />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4af37]">
                      {t(
                        "admin.settings.account",
                      )}
                    </p>
                  </div>
                </div>

                <div className="mt-7 space-y-5">
                  <InfoRow
                    label={t(
                      "admin.settings.name",
                    )}
                    value={
                      admin?.name || "—"
                    }
                  />

                  <InfoRow
                    label={t(
                      "admin.settings.email",
                    )}
                    value={
                      admin?.email || "—"
                    }
                  />

                  <InfoRow
                    label={t(
                      "admin.settings.role",
                    )}
                    value={
                      admin?.role || "—"
                    }
                  />

                  <InfoRow
                    label={t(
                      "admin.settings.status",
                    )}
                    value={
                      admin?.isActive
                        ? t(
                            "admin.settings.active",
                          )
                        : "Inactive"
                    }
                  />
                </div>
              </section>

              <section className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#d4af37]/20 bg-[#d4af37]/5">
                    <KeyRound
                      size={19}
                      className="text-[#d4af37]"
                    />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4af37]">
                      {t(
                        "admin.settings.security",
                      )}
                    </p>
                  </div>
                </div>

                {success && (
                  <div className="mt-6 rounded-xl border border-emerald-400/20 bg-emerald-400/5 px-4 py-3 text-sm text-emerald-300">
                    {success}
                  </div>
                )}

                {error && (
                  <div className="mt-6 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-300">
                    {error}
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  className="mt-6 space-y-5"
                >
                  <PasswordField
                    label={t(
                      "admin.settings.currentPassword",
                    )}
                    name="currentPassword"
                    value={
                      form.currentPassword
                    }
                    onChange={handleChange}
                    placeholder={t(
                      "admin.settings.currentPlaceholder",
                    )}
                    visible={showCurrent}
                    toggle={() =>
                      setShowCurrent(
                        (previous) =>
                          !previous,
                      )
                    }
                    t={t}
                  />

                  <PasswordField
                    label={t(
                      "admin.settings.newPassword",
                    )}
                    name="newPassword"
                    value={
                      form.newPassword
                    }
                    onChange={handleChange}
                    placeholder={t(
                      "admin.settings.newPlaceholder",
                    )}
                    visible={showNew}
                    toggle={() =>
                      setShowNew(
                        (previous) =>
                          !previous,
                      )
                    }
                    t={t}
                  />

                  <PasswordField
                    label={t(
                      "admin.settings.confirmPassword",
                    )}
                    name="confirmPassword"
                    value={
                      form.confirmPassword
                    }
                    onChange={handleChange}
                    placeholder={t(
                      "admin.settings.confirmPlaceholder",
                    )}
                    visible={showConfirm}
                    toggle={() =>
                      setShowConfirm(
                        (previous) =>
                          !previous,
                      )
                    }
                    t={t}
                  />

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex w-full items-center justify-center rounded-xl bg-[#d4af37] px-5 py-4 text-sm font-bold text-[#070907] transition hover:bg-[#f0d477] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting
                      ? t(
                          "admin.settings.changing",
                        )
                      : t(
                          "admin.settings.changePassword",
                        )}
                  </button>
                </form>
              </section>
            </div>
          )}

          <div className="mt-6">
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#d4af37]"
            >
              <ArrowLeft size={14} />
              {t(
                "admin.settings.backDashboard",
              )}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoRow({
  label,
  value,
}) {
  return (
    <div className="flex flex-col gap-2 border-b border-white/5 pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">
        {label}
      </span>

      <span className="text-sm text-slate-300">
        {value}
      </span>
    </div>
  );
}

function PasswordField({
  label,
  name,
  value,
  onChange,
  placeholder,
  visible,
  toggle,
  t,
}) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </label>

      <div className="relative">
        <input
          type={
            visible
              ? "text"
              : "password"
          }
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          minLength={8}
          required
          className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 pr-12 text-sm text-white outline-none placeholder:text-slate-700 focus:border-[#d4af37]/50 rtl:pl-12 rtl:pr-4"
        />

        <button
          type="button"
          onClick={toggle}
          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-600 transition hover:text-[#d4af37] rtl:right-auto rtl:left-3"
          aria-label={
            visible
              ? t("admin.settings.hide")
              : t("admin.settings.show")
          }
        >
          {visible ? (
            <EyeOff size={17} />
          ) : (
            <Eye size={17} />
          )}
        </button>
      </div>
    </div>
  );
}