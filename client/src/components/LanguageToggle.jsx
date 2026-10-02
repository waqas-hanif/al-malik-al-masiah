import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { setLanguage } from "../redux/store";

export default function LanguageToggle() {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.app.language);

  const { i18n } = useTranslation();

  const changeLanguage = async (nextLanguage) => {
    await i18n.changeLanguage(nextLanguage);

    dispatch(setLanguage(nextLanguage));

    document.documentElement.lang = nextLanguage;
    document.documentElement.dir =
      nextLanguage === "ar" ? "rtl" : "ltr";
  };

  const isArabic = language === "ar";

  return (
    <button
      type="button"
      onClick={() => changeLanguage(isArabic ? "en" : "ar")}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-300 transition hover:border-[#d4af37]/50 hover:text-[#d4af37]"
      aria-label="Change language"
    >
      <Languages size={14} />

      <span>{isArabic ? "EN" : "AR"}</span>
    </button>
  );
}