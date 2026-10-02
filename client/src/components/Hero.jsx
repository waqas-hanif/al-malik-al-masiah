import { ArrowRight, MessageCircle, Play, ShieldCheck } from "lucide-react";

function Hero({ navigate, language }) {
  const ar = language === "ar";

  return (
    <section className="hero">
      <div className="hero-image" />

      <div className="hero-overlay" />

      <div className="hero-grid" />

      <div className="hero-content">
        <div className="hero-badge">
          <span />
          {ar ? "شركة مقاولات في سلطنة عمان" : "Oman-based contracting company"}
        </div>

        <h1>
          {ar ? (
            <>
              نبني
              <span> البنية التحتية </span>
              التي تدوم
            </>
          ) : (
            <>
              Building
              <span> infrastructure </span>
              that lasts.
            </>
          )}
        </h1>

        <p>
          {ar
            ? "حلول متكاملة للإنشاءات والطرق والمعدات الثقيلة وأعمال الردم في سلطنة عمان."
            : "Integrated solutions for buildings, roads, heavy equipment supply and backfilling across Oman."}
        </p>

        <div className="hero-actions">
          <button className="primary-button" onClick={() => navigate("/quote")}>
            {ar ? "اطلب عرض سعر" : "Request a Quote"}
            <ArrowRight size={19} />
          </button>

          <a
            className="whatsapp-button"
            href="https://wa.me/96893377626?text=Hello%20AL%20MALIK%20AL%20MASIAH%2C%20I%20would%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={19} />
            WhatsApp
          </a>

          <button className="play-button" onClick={() => navigate("/services")}>
            <Play size={15} fill="currentColor" />
            {ar ? "استكشف الخدمات" : "Explore Services"}
          </button>
        </div>

        <div className="hero-trust">
          <div>
            <ShieldCheck size={20} />
            <span>{ar ? "حلول احترافية" : "Professional solutions"}</span>
          </div>
          <div>
            <ShieldCheck size={20} />
            <span>{ar ? "تركيز على الجودة" : "Quality focused"}</span>
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <span>SCROLL</span>
        <div />
      </div>
    </section>
  );
}

export default Hero;