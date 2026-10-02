import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  MessageCircle,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import Navbar from "../components/Navbar";
import Logo from "../components/Logo";

const API_URL = "http://localhost:5000";

const Quote = () => {
  const { t, i18n } = useTranslation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    projectLocation: "",
    budget: "",
    expectedStartDate: "",
    description: "",
  });

  const [loading, setLoading] =
    useState(false);

  const [successMessage, setSuccessMessage] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(
        `${API_URL}/api/quotes`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            company: form.company.trim(),
            projectType:
              form.projectType,
            projectLocation:
              form.projectLocation.trim(),
            budget: form.budget.trim(),
            expectedStartDate:
              form.expectedStartDate ||
              undefined,
            description:
              form.description.trim(),
            language:
              i18n.language === "ar"
                ? "ar"
                : "en",
            source: "website",
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            t("quotePage.errorTitle")
        );
      }

      setSuccessMessage(
        t("quotePage.successMessage")
      );

      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        projectType: "",
        projectLocation: "",
        budget: "",
        expectedStartDate: "",
        description: "",
      });
    } catch (error) {
      setErrorMessage(
        error.message ||
          t("quotePage.errorTitle")
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none placeholder:text-slate-700 focus:border-[#d4af37]/50 focus:bg-black/30";

  return (
    <main className="min-h-screen overflow-hidden bg-[#050706] text-white">
      <Navbar />

      {/* HERO */}

      <section className="relative overflow-hidden border-b border-white/5 pt-36 sm:pt-40">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#15150d] via-[#080b09] to-[#050706]" />
        </div>

        <div className="pointer-events-none absolute left-1/4 top-20 h-72 w-72 rounded-full bg-[#d4af37]/10 blur-[130px]" />

        <div className="pointer-events-none absolute right-10 top-24 h-80 w-80 rounded-full bg-emerald-400/[0.025] blur-[140px]" />

        <div className="container-premium relative z-10 py-24 sm:py-28">
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className="max-w-4xl"
          >
            <Logo compact />

            <div className="mt-10 flex items-center gap-3">
              <div className="h-px w-12 bg-[#d4af37]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37]">
                {t("quotePage.eyebrow")}
              </span>
            </div>

            <h1 className="mt-6 text-5xl font-semibold tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              {t("quotePage.title")}

              <span className="block text-[#d4af37]">
                {t("quotePage.titleAccent")}
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              {t(
                "quotePage.description"
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* FORM */}

      <section className="py-20 sm:py-28">
        <div className="container-premium">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            {/* LEFT INFO */}

            <motion.div
              initial={{
                opacity: 0,
                x: -25,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
              }}
              className="h-fit"
            >
              <div className="rounded-[2rem] border border-[#d4af37]/15 bg-gradient-to-br from-[#15150d] via-[#0b100c] to-[#070907] p-6 sm:p-7"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d4af37]/25 bg-[#d4af37]/10">
                  <FileText
                    size={26}
                    className="text-[#d4af37]"
                  />
                </div>

                <h2 className="mt-6 text-2xl font-semibold">
                  {t(
                    "quotePage.formTitle"
                  )}
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {t(
                    "quotePage.formDescription"
                  )}
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    t(
                      "home.buildingRoads"
                    ),
                    t(
                      "home.heavyEquipment"
                    ),
                    t("home.backfilling"),
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-sm text-slate-300"
                    >
                      <CheckCircle2
                        size={17}
                        className="shrink-0 text-[#d4af37]"
                      />

                      {item}
                    </div>
                  ))}
                </div>

                <a
                  href="https://wa.me/96893377626"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 flex items-center justify-center gap-2 rounded-xl border border-[#d4af37]/25 bg-[#d4af37]/5 px-5 py-3.5 text-sm font-semibold text-[#d4af37] transition hover:border-[#d4af37]/50 hover:bg-[#d4af37]/10"
                >
                  <MessageCircle
                    size={18}
                  />

                  {t(
                    "common.whatsapp"
                  )}
                </a>
              </div>
            </motion.div>

            {/* RIGHT FORM */}

            <motion.div
              initial={{
                opacity: 0,
                x: 25,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
              }}
              className="rounded-[2rem] border border-white/10 bg-[#090c0a] p-6 sm:p-8"
            >
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* NAME + EMAIL */}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                      {t(
                        "quotePage.name"
                      )}
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={
                        handleChange
                      }
                      required
                      placeholder={t(
                        "quotePage.namePlaceholder"
                      )}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                      {t(
                        "quotePage.email"
                      )}
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={
                        handleChange
                      }
                      required
                      dir="ltr"
                      placeholder={t(
                        "quotePage.emailPlaceholder"
                      )}
                      className={`${inputClass} text-left`}
                    />
                  </div>
                </div>

                {/* PHONE + COMPANY */}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                      {t(
                        "quotePage.phone"
                      )}
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={
                        handleChange
                      }
                      required
                      dir="ltr"
                      placeholder={t(
                        "quotePage.phonePlaceholder"
                      )}
                      className={`${inputClass} text-left`}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                      {t(
                        "quotePage.company"
                      )}
                    </label>

                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={
                        handleChange
                      }
                      placeholder={t(
                        "quotePage.companyPlaceholder"
                      )}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* PROJECT TYPE */}

                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                    {t(
                      "quotePage.projectType"
                    )}
                  </label>

                  <select
                    name="projectType"
                    value={
                      form.projectType
                    }
                    onChange={
                      handleChange
                    }
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#0c100d] px-4 py-3.5 text-sm text-slate-300 outline-none focus:border-[#d4af37]/50"
                  >
                    <option value="">
                      {t(
                        "quotePage.selectProjectType"
                      )}
                    </option>

                    <option
                      value={t(
                        "quotePage.building"
                      )}
                    >
                      {t(
                        "quotePage.building"
                      )}
                    </option>

                    <option
                      value={t(
                        "quotePage.equipment"
                      )}
                    >
                      {t(
                        "quotePage.equipment"
                      )}
                    </option>

                    <option
                      value={t(
                        "quotePage.backfilling"
                      )}
                    >
                      {t(
                        "quotePage.backfilling"
                      )}
                    </option>

                    <option
                      value={t(
                        "quotePage.other"
                      )}
                    >
                      {t(
                        "quotePage.other"
                      )}
                    </option>
                  </select>
                </div>

                {/* LOCATION */}

                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                    {t(
                      "quotePage.projectLocation"
                    )}
                  </label>

                  <input
                    type="text"
                    name="projectLocation"
                    value={
                      form.projectLocation
                    }
                    onChange={
                      handleChange
                    }
                    required
                    placeholder={t(
                      "quotePage.projectLocationPlaceholder"
                    )}
                    className={inputClass}
                  />
                </div>

                {/* BUDGET + DATE */}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                      {t(
                        "quotePage.budget"
                      )}
                    </label>

                    <input
                      type="text"
                      name="budget"
                      value={form.budget}
                      onChange={
                        handleChange
                      }
                      placeholder={t(
                        "quotePage.budgetPlaceholder"
                      )}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                      {t(
                        "quotePage.expectedStartDate"
                      )}
                    </label>

                    <input
                      type="date"
                      name="expectedStartDate"
                      value={
                        form.expectedStartDate
                      }
                      onChange={
                        handleChange
                      }
                      dir="ltr"
                      className={`${inputClass} text-left`}
                    />
                  </div>
                </div>

                {/* DESCRIPTION */}

                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                    {t(
                      "quotePage.projectDescription"
                    )}
                  </label>

                  <textarea
                    name="description"
                    value={
                      form.description
                    }
                    onChange={
                      handleChange
                    }
                    required
                    minLength={20}
                    rows="7"
                    placeholder={t(
                      "quotePage.descriptionPlaceholder"
                    )}
                    className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm leading-7 text-white outline-none placeholder:text-slate-700 focus:border-[#d4af37]/50"
                  />
                </div>

                {/* MESSAGES */}

                {successMessage && (
                  <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/[0.05] p-4 text-sm leading-6 text-emerald-300">
                    {successMessage}
                  </div>
                )}

                {errorMessage && (
                  <div className="rounded-xl border border-red-400/20 bg-red-400/[0.05] p-4 text-sm leading-6 text-red-300">
                    {errorMessage}
                  </div>
                )}

                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-6 py-4 text-sm font-bold text-[#070907] transition hover:bg-[#f0d477] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? t(
                        "quotePage.submitting"
                      )
                    : t(
                        "quotePage.submit"
                      )}

                  <ArrowRight
                    size={17}
                  />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="border-t border-white/5 bg-[#030504] py-10">
        <div className="container-premium flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Logo compact />

            <p className="mt-3 text-xs text-slate-600">
              {t("home.location")},{" "}
              {t("home.oman")}
            </p>
          </div>

          <p className="text-[10px] text-slate-700">
            © {new Date().getFullYear()} AL MALIK AL MASIAH Trading &
            Contracting L.L.C
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Quote;