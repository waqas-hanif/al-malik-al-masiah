import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import LanguageToggle from "../../components/LanguageToggle";
import Logo from "../../components/Logo";

const API_BASE =
  (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(
    /\/$/,
    "",
  );

export default function AdminLogin() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            t("admin.login.invalid"),
        );
      }

      const token =
        data?.data?.token ||
        data?.token ||
        "";

      const admin =
        data?.data?.admin ||
        data?.admin ||
        data?.data?.user ||
        data?.user ||
        null;

      if (!token) {
        throw new Error(
          "Authentication token was not received.",
        );
      }

      localStorage.setItem("adminToken", token);
      localStorage.setItem("token", token);

      if (admin) {
        localStorage.setItem(
          "adminUser",
          JSON.stringify(admin),
        );
      }

      navigate("/admin", {
        replace: true,
      });
    } catch (requestError) {
      setError(
        requestError.message ||
          t("admin.login.invalid"),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050706] text-white">
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-[#d4af37]/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-[#d4af37]/8 blur-[140px]" />

      <div className="absolute right-5 top-5 z-20 sm:right-8 sm:top-8">
        <LanguageToggle />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex justify-center">
            <Logo compact />
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 shadow-2xl backdrop-blur-2xl sm:p-9">
            <div className="mb-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d4af37]/30 bg-[#d4af37]/10">
                <ShieldCheck
                  size={25}
                  className="text-[#d4af37]"
                />
              </div>

              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37]">
                {t("admin.login.eyebrow")}
              </p>

              <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                {t("admin.login.title")}
                <span className="block text-[#d4af37]">
                  {t("admin.login.titleAccent")}
                </span>
              </h1>

              <p className="mt-4 text-sm leading-7 text-slate-500">
                {t("admin.login.description")}
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  {t("admin.login.email")}
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t(
                    "admin.login.emailPlaceholder",
                  )}
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none placeholder:text-slate-700 transition focus:border-[#d4af37]/50"
                />
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  {t("admin.login.password")}
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={17}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-700 rtl:left-auto rtl:right-4"
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder={t(
                      "admin.login.passwordPlaceholder",
                    )}
                    autoComplete="current-password"
                    required
                    className="w-full rounded-xl border border-white/10 bg-black/20 py-3.5 pl-11 pr-12 text-sm text-white outline-none placeholder:text-slate-700 transition focus:border-[#d4af37]/50 rtl:pl-12 rtl:pr-11"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (previous) => !previous,
                      )
                    }
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-600 transition hover:text-[#d4af37] rtl:right-auto rtl:left-3"
                    aria-label={
                      showPassword
                        ? t("admin.settings.hide")
                        : t("admin.settings.show")
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-xl bg-[#d4af37] px-5 py-4 text-sm font-bold text-[#070907] transition hover:bg-[#f0d477] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? t("admin.login.signingIn")
                  : t("admin.login.signIn")}
              </button>
            </form>

            <div className="mt-7 flex items-center justify-center gap-2 border-t border-white/5 pt-5">
              <ShieldCheck
                size={14}
                className="text-[#d4af37]"
              />

              <p className="text-[10px] text-slate-700">
                {t("admin.login.secure")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}