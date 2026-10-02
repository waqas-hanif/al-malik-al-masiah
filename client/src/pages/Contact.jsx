import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import Navbar from "../components/Navbar";
import Logo from "../components/Logo";

const API_URL = "http://localhost:5000";

const contactItems = [
  {
    icon: Phone,
    labelKey: "callUs",
    value: "+968 93377626",
    href: "tel:+96893377626",
    type: "phone",
  },
  {
    icon: Phone,
    labelKey: "alternative",
    value: "+968 91333032",
    href: "tel:+96891333032",
    type: "phone",
  },
  {
    icon: Mail,
    labelKey: "email",
    value: "malik@malikalmasiah.com",
    href: "mailto:malik@malikalmasiah.com",
    type: "email",
  },
  {
    icon: MapPin,
    labelKey: "location",
    value: "Seeb–Muscat, Sultanate of Oman",
    href: "https://www.google.com/maps/search/?api=1&query=Seeb%2C%20Muscat%2C%20Oman",
    type: "location",
  },
];

const Contact = () => {
  const { t, i18n } = useTranslation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    selectedService: "",
    message: "",
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
        `${API_URL}/api/contact`,
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
            subject:
              form.selectedService ||
              t("contactPage.generalEnquiry"),
            message: form.message.trim(),
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
            t("common.error")
        );
      }

      setSuccessMessage(
        t("contactPage.formNote")
      );

      setForm({
        name: "",
        email: "",
        phone: "",
        selectedService: "",
        message: "",
      });
    } catch (error) {
      setErrorMessage(
        error.message ||
          t("common.error")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#050706] text-white">
      <Navbar />

      {/* HERO */}

      <section className="relative overflow-hidden border-b border-white/5 pt-36 sm:pt-40">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=90"
            alt={t("contactPage.eyebrow")}
            className="h-full w-full object-cover opacity-15"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-[#050706]/75 via-[#050706]/95 to-[#050706]" />

        <div className="pointer-events-none absolute right-10 top-24 h-80 w-80 rounded-full bg-[#d4af37]/10 blur-[130px]" />

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
                {t("contactPage.eyebrow")}
              </span>
            </div>

            <h1 className="mt-6 text-5xl font-semibold tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              {t("contactPage.title")}

              <span className="block text-[#d4af37]">
                {t(
                  "contactPage.titleAccent"
                )}
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              {t(
                "contactPage.description"
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTENT */}

      <section className="py-20 sm:py-28">
        <div className="container-premium">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            {/* LEFT */}

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
            >
              <p className="font-mono text-xs text-[#d4af37]">
                / {t("contactPage.getInTouch")}
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                {t("contactPage.heading")}
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-slate-500">
                {t(
                  "contactPage.subheading"
                )}
              </p>

              <div className="mt-10 space-y-3">
                {contactItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.value}
                      href={item.href}
                      target={
                        item.href.startsWith(
                          "https://"
                        )
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        item.href.startsWith(
                          "https://"
                        )
                          ? "noreferrer"
                          : undefined
                      }
                      className="group flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.025] p-4 transition hover:border-[#d4af37]/30 hover:bg-[#d4af37]/[0.04]"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#d4af37]/20 bg-[#d4af37]/5">
                        <Icon
                          size={19}
                          className="text-[#d4af37]"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600">
                          {t(
                            `contactPage.${item.labelKey}`
                          )}
                        </p>

                        <p
                          className={`mt-1 text-sm text-slate-300 transition group-hover:text-white ${
                            item.type ===
                              "phone" ||
                            item.type ===
                              "email"
                              ? "phone-number"
                              : ""
                          }`}
                          dir={
                            item.type ===
                              "phone" ||
                            item.type ===
                              "email"
                              ? "ltr"
                              : undefined
                          }
                        >
                          {item.value}
                        </p>
                      </div>

                      <ArrowUpRight
                        size={17}
                        className="ml-auto shrink-0 text-slate-700 transition group-hover:text-[#d4af37]"
                      />
                    </a>
                  );
                })}
              </div>

              <a
                href="https://wa.me/96893377626"
                target="_blank"
                rel="noreferrer"
                className="mt-6 flex items-center justify-center gap-3 rounded-2xl bg-[#d4af37] px-6 py-4 text-sm font-bold text-[#070907] transition hover:bg-[#f0d477]"
              >
                <MessageCircle size={19} />

                {t(
                  "contactPage.chatWhatsapp"
                )}
              </a>
            </motion.div>

            {/* FORM */}

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
              <div className="mb-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#d4af37]">
                  {t(
                    "contactPage.projectEnquiry"
                  )}
                </p>

                <h3 className="mt-3 text-2xl font-semibold">
                  {t(
                    "contactPage.formHeading"
                  )}
                </h3>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                      {t(
                        "contactPage.name"
                      )}
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={
                        handleChange
                      }
                      placeholder={t(
                        "contactPage.namePlaceholder"
                      )}
                      required
                      className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none placeholder:text-slate-700 focus:border-[#d4af37]/50"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                      {t(
                        "contactPage.phone"
                      )}
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={
                        handleChange
                      }
                      placeholder={t(
                        "contactPage.phonePlaceholder"
                      )}
                      required
                      dir="ltr"
                      className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-left text-sm text-white outline-none placeholder:text-slate-700 focus:border-[#d4af37]/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                    {t(
                      "contactPage.email"
                    )}
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={
                      handleChange
                    }
                    placeholder={t(
                      "contactPage.emailPlaceholder"
                    )}
                    required
                    dir="ltr"
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-left text-sm text-white outline-none placeholder:text-slate-700 focus:border-[#d4af37]/50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                    {t(
                      "contactPage.service"
                    )}
                  </label>

                  <select
                    name="selectedService"
                    value={
                      form.selectedService
                    }
                    onChange={
                      handleChange
                    }
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#0c100d] px-4 py-3.5 text-sm text-slate-300 outline-none focus:border-[#d4af37]/50"
                  >
                    <option value="">
                      {t(
                        "contactPage.selectService"
                      )}
                    </option>

                    <option value={t(
                      "contactPage.company"
                    )}>
                      {t("home.buildingRoads")}
                    </option>

                    <option value={t(
                      "home.heavyEquipment"
                    )}>
                      {t("home.heavyEquipment")}
                    </option>

                    <option value={t(
                      "home.backfilling"
                    )}>
                      {t("home.backfilling")}
                    </option>

                    <option value={t(
                      "contactPage.generalEnquiry"
                    )}>
                      {t(
                        "contactPage.generalEnquiry"
                      )}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                    {t(
                      "contactPage.message"
                    )}
                  </label>

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={
                      handleChange
                    }
                    rows="6"
                    placeholder={t(
                      "contactPage.messagePlaceholder"
                    )}
                    required
                    className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none placeholder:text-slate-700 focus:border-[#d4af37]/50"
                  />
                </div>

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

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-6 py-4 text-sm font-bold text-[#070907] transition hover:bg-[#f0d477] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? t("common.sending")
                    : t(
                        "contactPage.sendEnquiry"
                      )}

                  <ArrowUpRight
                    size={17}
                  />
                </button>

                <p className="text-center text-[10px] leading-5 text-slate-700">
                  {t(
                    "contactPage.formNote"
                  )}
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* COMPANY DETAILS */}

      <section className="border-y border-white/5 bg-[#080b09] py-16">
        <div className="container-premium">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#d4af37]">
                {t("contactPage.company")}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                AL MALIK AL MASIAH Trading &
                Contracting L.L.C
              </p>
            </div>

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#d4af37]">
                {t(
                  "contactPage.managingDirector"
                )}
              </p>

              <p className="mt-3 text-sm text-slate-300">
                Malik Shaukat Hussain
              </p>
            </div>

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#d4af37]">
                {t(
                  "contactPage.crNumber"
                )}
              </p>

              <p
                className="phone-number mt-3 text-sm text-slate-300"
                dir="ltr"
              >
                1201835
              </p>
            </div>

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#d4af37]">
                {t(
                  "contactPage.poDetails"
                )}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                {t("contactPage.poBox")}
                <br />
                {t("contactPage.poCode")}
              </p>
            </div>
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

export default Contact;