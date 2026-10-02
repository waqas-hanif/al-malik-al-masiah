import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import Navbar from "../components/Navbar";
import Logo from "../components/Logo";
import AssistantButton from "../components/AI/AssistantButton";
const GOLD = "#d4af37";

const services = [
  {
    number: "01",
    key: "building",
    icon: Building2,
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1100&q=85",
  },
  {
    number: "02",
    key: "equipment",
    icon: Truck,
    image:
      "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?auto=format&fit=crop&w=1100&q=85",
  },
  {
    number: "03",
    key: "backfilling",
    icon: ShieldCheck,
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1100&q=85",
  },
];

function GoldLine() {
  return (
    <div className="h-px w-16 bg-gradient-to-r from-[#d4af37] to-transparent" />
  );
}

function ServiceCard({ service, index, t }) {
  const Icon = service.icon;

  const content = {
    building: {
      title: t("home.buildingRoads"),
      description: t("home.buildingDescription"),
      tag: t("home.constructionTag"),
    },
    equipment: {
      title: t("home.heavyEquipment"),
      description: t("home.equipmentDescription"),
      tag: t("home.equipmentTag"),
    },
    backfilling: {
      title: t("home.backfilling"),
      description: t("home.backfillingDescription"),
      tag: t("home.siteTag"),
    },
  }[service.key];

  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay: index * 0.12 }}
      whileHover={{ y: -9 }}
      className="group relative min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0b100d] transition-colors duration-500 hover:border-[#d4af37]/50"
      style={{ perspective: "1000px" }}
    >
      <div className="relative h-64 overflow-hidden sm:h-72">
        <motion.img
          src={service.image}
          alt={content.title}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.opacity = "0";
          }}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#070a08] via-black/15 to-black/10" />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <span className="absolute left-5 top-5 rounded-full border border-[#d4af37]/30 bg-black/55 px-3 py-1.5 text-[9px] font-bold tracking-[0.2em] text-[#ecd27a] backdrop-blur-md">
          {content.tag}
        </span>

        <span className="absolute right-5 top-5 font-mono text-sm text-white/70">
          {service.number}
        </span>

        <div className="absolute bottom-5 left-5 flex h-12 w-12 items-center justify-center rounded-xl border border-[#d4af37]/40 bg-black/60 text-[#e5c457] backdrop-blur-lg transition duration-500 group-hover:rotate-[-6deg] group-hover:bg-[#d4af37] group-hover:text-black">
          <Icon size={23} strokeWidth={1.6} />
        </div>
      </div>

      <div className="relative p-6 sm:p-7">
        <h3 className="text-xl font-semibold text-white transition-colors group-hover:text-[#e6c65d]">
          {content.title}
        </h3>

        <p className="mt-3 min-h-[48px] text-sm leading-6 text-slate-400">
          {content.description}
        </p>

        <a
          href="/services"
          className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#d4af37]"
        >
          {t("common.exploreService")}

          <ArrowRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
      </div>
    </motion.article>
  );
}

export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen overflow-hidden bg-[#050706] text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative flex min-h-[850px] items-center overflow-hidden sm:min-h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2200&q=90"
            alt="Construction site and heavy machinery"
            fetchPriority="high"
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="absolute inset-0 bg-black/55" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#030504] via-[#030504]/90 to-black/20" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#050706] via-transparent to-black/35" />

        <div className="pointer-events-none absolute -left-40 top-1/4 h-[450px] w-[450px] rounded-full bg-[#d4af37]/10 blur-[140px]" />

        <div className="absolute left-[5%] top-1/2 hidden h-64 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-[#d4af37]/50 to-transparent xl:block" />

        <div className="container-premium relative z-10 pb-28 pt-36 sm:pb-32">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            {/* HERO CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85 }}
              className="max-w-3xl"
            >
              {/* DUPLICATE LOGO REMOVED HERE */}

              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#d4af37]/30 bg-black/40 px-4 py-2.5 backdrop-blur-xl">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d4af37] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d4af37]" />
                </span>

                <span className="text-[9px] font-semibold uppercase tracking-[0.23em] text-[#ead17a] sm:text-[11px]">
                  {t("home.eyebrow")}
                </span>
              </div>

              <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-6xl md:text-7xl xl:text-[82px]">
                {t("home.heroTitle")}

                <span className="block bg-gradient-to-r from-[#fff0a8] via-[#d4af37] to-[#a77c1b] bg-clip-text text-transparent">
                  {t("home.heroAccent")}
                </span>

                <span className="block text-white">
                  {t("home.heroEnd")}
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
                {t("home.heroDescription")}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/services"
                  className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#f0d477] via-[#d4af37] to-[#bd9228] px-7 py-4 text-sm font-bold text-[#080a06] shadow-lg shadow-[#d4af37]/10 transition duration-300 hover:-translate-y-1 hover:shadow-[#d4af37]/20"
                >
                  {t("home.servicesButton")}

                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>

                <a
                  href="https://wa.me/96893377626"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/20 bg-black/35 px-7 py-4 text-sm font-semibold text-white backdrop-blur-lg transition duration-300 hover:-translate-y-1 hover:border-[#d4af37]/60 hover:bg-[#d4af37]/10"
                >
                  <MessageCircle size={18} className="text-[#d4af37]" />
                  {t("home.requirementButton")}
                </a>
              </div>

              <div className="mt-9 flex flex-wrap gap-x-5 gap-y-3 text-xs text-slate-300 sm:gap-x-7">
                {[
                  t("home.buildingRoads"),
                  t("home.heavyEquipment"),
                  t("home.backfilling"),
                ].map((item) => (
                  <span key={item} className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-[#d4af37]" />
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* FLOATING COMPANY PANEL */}
            <motion.div
              initial={{ opacity: 0, x: 30, rotateY: -8 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative mx-auto hidden w-full max-w-[470px] lg:block"
              style={{ perspective: "1200px" }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative overflow-hidden rounded-[2rem] border border-[#d4af37]/30 bg-[#080b08]/75 p-7 shadow-2xl shadow-black/50 backdrop-blur-2xl"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e8ca63] to-transparent" />

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#d4af37]">
                      {t("home.company")}
                    </p>

                    <h2 className="mt-3 text-2xl font-semibold leading-tight">
                      {t("home.companyName")}

                      <span className="block text-[#d4af37]">
                        {t("home.companyNameAccent")}
                      </span>
                    </h2>

                    <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-slate-400">
                      {t("home.companyType")}
                    </p>
                  </div>

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#d4af37]/30 bg-[#d4af37]/10">
                    <Building2 size={23} className="text-[#d4af37]" />
                  </div>
                </div>

                <GoldLine />

                <div className="mt-6 space-y-5">
                  {[
                    {
                      icon: Building2,
                      title: t("home.buildingRoads"),
                      detail: t("home.constructionServices"),
                    },
                    {
                      icon: Truck,
                      title: t("home.heavyEquipment"),
                      detail: t("home.equipmentSupply"),
                    },
                    {
                      icon: ShieldCheck,
                      title: t("home.backfilling"),
                      detail: t("home.siteDevelopment"),
                    },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <div key={item.title} className="flex items-center gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035]">
                          <Icon size={20} className="text-[#d4af37]" />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-white">
                            {item.title}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {item.detail}
                          </p>
                        </div>

                        <ChevronRight
                          size={16}
                          className="ml-auto text-[#d4af37]/60"
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="mt-7 rounded-2xl border border-[#d4af37]/20 bg-[#d4af37]/[0.06] p-4">
                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-[#d4af37]" />

                    <div>
                      <p className="text-sm font-semibold">
                        {t("home.location")}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {t("home.oman")}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.a
                href="tel:+96893377626"
                animate={{ y: [0, 6, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-2xl border border-[#d4af37]/30 bg-[#0a100c]/95 p-4 shadow-xl backdrop-blur-xl"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d4af37]/10">
                  <Phone size={18} className="text-[#d4af37]" />
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-[0.15em] text-slate-500">
                    {t("home.callTeam")}
                  </p>

                  <p className="mt-1 text-xs font-semibold text-white">
                    +968 93377626
                  </p>
                </div>
              </motion.a>
            </motion.div>
          </div>
        </div>

        <a
          href="#services"
          className="absolute bottom-24 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-slate-400 transition hover:text-[#d4af37] md:flex"
        >
          <span className="text-[9px] uppercase tracking-[0.3em]">
            {t("home.scroll")}
          </span>

          <ArrowDown size={15} />
        </a>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        className="relative border-t border-white/5 bg-[#050706] py-24 sm:py-28"
      >
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[700px] -translate-x-1/2 rounded-full bg-[#d4af37]/[0.045] blur-[120px]" />

        <div className="container-premium relative">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <GoldLine />

                <span className="text-[10px] font-bold uppercase tracking-[0.27em] text-[#d4af37]">
                  {t("home.whatWeDo")}
                </span>
              </div>

              <h2 className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                {t("home.servicesTitle")}

                <span className="block text-[#d4af37]">
                  {t("home.servicesTitleAccent")}
                </span>
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-slate-400">
              {t("home.servicesDescription")}
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard
                key={service.number}
                service={service}
                index={index}
                t={t}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 bg-[#080b09] py-20 sm:py-24">
        <div className="container-premium">
          <div className="relative overflow-hidden rounded-[2rem] border border-[#d4af37]/25 bg-gradient-to-br from-[#15160e] via-[#0b100c] to-[#060807] p-7 sm:p-11 lg:p-14">
            <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[#d4af37]/10 blur-[100px]" />

            <div className="relative grid gap-9 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex items-center gap-3">
                  <GoldLine />

                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#d4af37]">
                    {t("home.workTogether")}
                  </span>
                </div>

                <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                  {t("home.requirementsTitle")}

                  <span className="text-[#d4af37]">
                    {t("home.requirementsAccent")}
                  </span>
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400">
                  {t("home.requirementsDescription")}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a
                  href="https://wa.me/96893377626"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-6 py-4 text-sm font-bold text-[#070a07] transition hover:-translate-y-0.5 hover:bg-[#efd16b]"
                >
                  <MessageCircle size={18} />
                  {t("common.whatsapp")}
                  <ArrowRight size={16} />
                </a>

                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-4 text-sm font-semibold text-white transition hover:border-[#d4af37]/50 hover:bg-white/[0.035]"
                >
                  {t("common.contactPage")}
                  <ChevronRight size={16} />
                </a>
              </div>
            </div>

            <div className="relative mt-9 grid gap-4 border-t border-white/10 pt-6 text-xs text-slate-400 sm:grid-cols-2">
              <a
                href="tel:+96893377626"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <Phone size={16} className="text-[#d4af37]" />
                +968 93377626
              </a>

              <a
                href="mailto:malik@malikalmasiah.com"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <Mail size={16} className="text-[#d4af37]" />
                malik@malikalmasiah.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-[#030504] py-10">
        <div className="container-premium">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Logo />

              <p className="mt-4 max-w-md text-xs leading-6 text-slate-500">
                {t("home.footerDescription")}
                <br />
                Seeb–Muscat, Sultanate of Oman.
              </p>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-slate-400">
              <a
                href="/"
                className="transition hover:text-[#d4af37]"
              >
                {t("nav.home")}
              </a>

              <a
                href="/services"
                className="transition hover:text-[#d4af37]"
              >
                {t("nav.services")}
              </a>

              <a
                href="/projects"
                className="transition hover:text-[#d4af37]"
              >
                {t("nav.projects")}
              </a>

              <a
                href="/contact"
                className="transition hover:text-[#d4af37]"
              >
                {t("nav.contact")}
              </a>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-2 border-t border-white/5 pt-6 text-[10px] leading-5 text-slate-600 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} AL MALIK AL MASIAH Trading &
              Contracting L.L.C. {t("home.allRights")}
            </p>

            <p>
              CR No. 1201835 · P.O. Box 1558 · P.O. Code 121
            </p>
          </div>
        </div>
      </footer>
      <AssistantButton />
    </main>
  );
}