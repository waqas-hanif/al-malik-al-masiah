import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import Navbar from "../components/Navbar";
import Logo from "../components/Logo";

const services = [
  {
    id: "01",
    key: "building",
    icon: Building2,
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=90",
    titleKey: "buildingTitle",
    subtitleKey: "buildingSubtitle",
    descriptionKey: "buildingDescription",
    featuresKey: "buildingFeatures",
  },
  {
    id: "02",
    key: "equipment",
    icon: Truck,
    image:
      "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?auto=format&fit=crop&w=1600&q=90",
    titleKey: "equipmentTitle",
    subtitleKey: "equipmentSubtitle",
    descriptionKey: "equipmentDescription",
    featuresKey: "equipmentFeatures",
  },
  {
    id: "03",
    key: "backfilling",
    icon: ShieldCheck,
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=90",
    titleKey: "backfillingTitle",
    subtitleKey: "backfillingSubtitle",
    descriptionKey: "backfillingDescription",
    featuresKey: "backfillingFeatures",
  },
];

const Services = () => {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen overflow-hidden bg-[#050706] text-white">
      <Navbar />

      {/* HERO */}

      <section className="relative overflow-hidden border-b border-white/5 pt-36 sm:pt-40">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2200&q=90"
            alt={t("servicesPage.title")}
            className="h-full w-full object-cover opacity-20"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-[#050706]/70 via-[#050706]/90 to-[#050706]" />

        <div className="pointer-events-none absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-[#d4af37]/10 blur-[120px]" />

        <div className="container-premium relative z-10 py-24 sm:py-28">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <Logo compact />

            <div className="mt-10 flex items-center gap-3">
              <div className="h-px w-12 bg-[#d4af37]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37]">
                {t("servicesPage.eyebrow")}
              </span>
            </div>

            <h1 className="mt-6 text-5xl font-semibold tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              {t("servicesPage.title")}

              <span className="block text-[#d4af37]">
                {t("servicesPage.titleAccent")}
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              {t("servicesPage.description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}

      <section className="py-20 sm:py-28">
        <div className="container-premium space-y-20 lg:space-y-28">
          {services.map((service, index) => {
            const Icon = service.icon;
            const reversed = index % 2 !== 0;

            const title = t(
              `servicesPage.${service.titleKey}`
            );

            const subtitle = t(
              `servicesPage.${service.subtitleKey}`
            );

            const description = t(
              `servicesPage.${service.descriptionKey}`
            );

            const features = t(
              `servicesPage.${service.featuresKey}`,
              {
                returnObjects: true,
              }
            );

            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.7,
                }}
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                  reversed
                    ? "lg:[&>div:first-child]:order-2"
                    : ""
                }`}
              >
                {/* IMAGE */}

                <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0d0b]">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={service.image}
                      alt={title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" />

                  <div className="absolute left-6 top-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d4af37]/30 bg-black/60 backdrop-blur-xl">
                    <Icon
                      size={25}
                      className="text-[#d4af37]"
                    />
                  </div>

                  <span className="absolute bottom-6 right-6 font-mono text-5xl font-bold text-white/10">
                    {service.id}
                  </span>

                  <div className="absolute bottom-6 left-6">
                    <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#d4af37]">
                      {subtitle}
                    </p>
                  </div>
                </div>

                {/* CONTENT */}

                <div>
                  <p className="font-mono text-sm text-[#d4af37]">
                    / {service.id}
                  </p>

                  <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                    {title}
                  </h2>

                  <p className="mt-6 text-base leading-8 text-slate-400">
                    {description}
                  </p>

                  <div className="mt-8 space-y-4">
                    {Array.isArray(features) &&
                      features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-3 text-sm text-slate-300"
                        >
                          <CheckCircle2
                            size={17}
                            className="shrink-0 text-[#d4af37]"
                          />

                          {feature}
                        </div>
                      ))}
                  </div>

                  <a
                    href="https://wa.me/96893377626"
                    target="_blank"
                    rel="noreferrer"
                    className="group mt-9 inline-flex items-center gap-3 rounded-xl border border-[#d4af37]/30 bg-[#d4af37]/5 px-5 py-3.5 text-sm font-semibold text-[#e6c65d] transition hover:border-[#d4af37]/60 hover:bg-[#d4af37]/10"
                  >
                    {t("servicesPage.discussService")}

                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* CTA */}

      <section className="border-t border-white/5 bg-[#080b09] py-20">
        <div className="container-premium">
          <div className="relative overflow-hidden rounded-[2rem] border border-[#d4af37]/20 bg-gradient-to-br from-[#15150d] to-[#070907] p-8 sm:p-12">
            <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-[#d4af37]/10 blur-[100px]" />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#d4af37]">
                  {t("servicesPage.quotationTitle")}
                </p>

                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                  {t("servicesPage.quotationHeading")}
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500">
                  {t("servicesPage.quotationDescription")}
                </p>
              </div>

              <a
                href="https://wa.me/96893377626"
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-6 py-4 text-sm font-bold text-[#070a07] transition hover:bg-[#f0d477]"
              >
                <MessageCircle size={18} />

                {t("common.whatsapp")}
              </a>
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

export default Services;