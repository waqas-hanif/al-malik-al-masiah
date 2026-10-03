import { useState } from "react";
import {
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import Logo from "./Logo";
import LanguageToggle from "./LanguageToggle";

export default function Navbar() {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] =
    useState(false);

  const links = [
    {
      label: t("nav.home"),
      href: "/",
    },
    {
      label: t("nav.services"),
      href: "/services",
    },
    {
      label: t("nav.projects"),
      href: "/projects",
    },
    {
      label: t("nav.contact"),
      href: "/contact",
    },
  ];

  const handleMobileLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-premium pt-4">
        <nav className="glass rounded-2xl px-4 py-3 sm:px-5">
          <div className="flex items-center justify-between gap-4">

            {/* ==================================================
                LOGO
            ================================================== */}

            <div
  className="shrink-0"
  onClick={handleMobileLinkClick}
>
  <Logo compact />
</div>

            {/* ==================================================
                DESKTOP NAV
            ================================================== */}

            <div className="hidden items-center gap-7 lg:flex">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs font-semibold text-slate-400 transition hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* ==================================================
                DESKTOP ACTIONS
            ================================================== */}

            <div className="hidden items-center gap-3 lg:flex">
              <LanguageToggle />

              {/* REQUEST QUOTE */}
              <a
                href="/quote"
                className="group inline-flex items-center gap-2 rounded-xl bg-[#d4af37] px-4 py-2.5 text-[11px] font-bold text-[#070907] transition hover:bg-[#f0d477]"
              >
                {t("nav.quote")}

                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>

            {/* ==================================================
                MOBILE ACTIONS
            ================================================== */}

            <div className="flex items-center gap-2 lg:hidden">
              <LanguageToggle />

              <button
                type="button"
                onClick={() =>
                  setMobileOpen(
                    (previous) => !previous
                  )
                }
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 transition hover:border-[#d4af37]/40 hover:text-[#d4af37]"
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? (
                  <X size={19} />
                ) : (
                  <Menu size={19} />
                )}
              </button>
            </div>
          </div>

          {/* ==================================================
              MOBILE MENU
          ================================================== */}

          {mobileOpen && (
            <div className="border-t border-white/10 pt-4 lg:hidden">
              <div className="flex flex-col gap-1">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleMobileLinkClick}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.04] hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* MOBILE REQUEST QUOTE */}
              <a
                href="/quote"
                onClick={handleMobileLinkClick}
                className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-4 py-3 text-xs font-bold text-[#070907] transition hover:bg-[#f0d477]"
              >
                {t("nav.quote")}

                <ArrowUpRight size={15} />
              </a>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}