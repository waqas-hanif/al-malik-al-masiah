import { randomUUID } from "crypto";

import AssistantLog from "../models/AssistantLog.js";

const getLanguage = (language) => {
  return language === "ar" ? "ar" : "en";
};

const getSessionId = (sessionId) => {
  if (
    typeof sessionId === "string" &&
    sessionId.trim()
  ) {
    return sessionId.trim();
  }

  return randomUUID();
};

const getEnglishReply = (message) => {
  const text = message
    .toLowerCase()
    .trim();

  if (
    text.includes("hello") ||
    text.includes("hi") ||
    text.includes("hey")
  ) {
    return "Hello! Welcome to AL MALIK AL MASIAH Trading & Contracting L.L.C. How can we help you today?";
  }

  if (
    text.includes("service") ||
    text.includes("services")
  ) {
    return "We provide Building & Roads, Heavy Equipment Supply, and Backfilling support. You can also submit your project details through our Request Quote page.";
  }

  if (
    text.includes("quote") ||
    text.includes("quotation") ||
    text.includes("price") ||
    text.includes("cost")
  ) {
    return "You can request a quotation by visiting our Request Quote page and submitting your project details. Our team will review your requirements and contact you.";
  }

  if (
    text.includes("whatsapp") ||
    text.includes("contact") ||
    text.includes("phone") ||
    text.includes("call")
  ) {
    return "You can contact us on WhatsApp or phone at +968 93377626. You can also email us at malik@malikalmasiah.com.";
  }

  if (
    text.includes("email") ||
    text.includes("mail")
  ) {
    return "Our official email is malik@malikalmasiah.com.";
  }

  if (
    text.includes("location") ||
    text.includes("where") ||
    text.includes("oman")
  ) {
    return "AL MALIK AL MASIAH Trading & Contracting L.L.C is based in Seeb–Muscat, Sultanate of Oman.";
  }

  if (
    text.includes("building") ||
    text.includes("road") ||
    text.includes("construction")
  ) {
    return "Our Building & Roads service supports construction and infrastructure requirements.";
  }

  if (
    text.includes("equipment") ||
    text.includes("machine") ||
    text.includes("heavy equipment")
  ) {
    return "We provide support for heavy equipment supply requirements for construction projects.";
  }

  if (
    text.includes("backfilling") ||
    text.includes("earthwork") ||
    text.includes("site work")
  ) {
    return "We provide backfilling and site-development support for construction requirements.";
  }

  if (
    text.includes("company") ||
    text.includes("about")
  ) {
    return "AL MALIK AL MASIAH Trading & Contracting L.L.C provides construction, heavy equipment, and backfilling services in Oman.";
  }

  return "Thanks for contacting AL MALIK AL MASIAH. For detailed project assistance or a quotation, please use our Request Quote page or contact us on WhatsApp at +968 93377626.";
};

const getArabicReply = (message) => {
  const text = message.trim();

  if (
    text.includes("مرحبا") ||
    text.includes("مرحباً") ||
    text.includes("اهلا") ||
    text.includes("أهلا")
  ) {
    return "مرحباً! أهلاً بك في AL MALIK AL MASIAH Trading & Contracting L.L.C. كيف يمكننا مساعدتك اليوم؟";
  }

  if (
    text.includes("خدمات") ||
    text.includes("خدمة")
  ) {
    return "نقدم خدمات المباني والطرق، توريد المعدات الثقيلة، وأعمال الردم ودعم تطوير المواقع.";
  }

  if (
    text.includes("سعر") ||
    text.includes("عرض سعر") ||
    text.includes("اقتباس") ||
    text.includes("quotation")
  ) {
    return "يمكنك طلب عرض سعر من خلال صفحة طلب عرض السعر وإرسال تفاصيل مشروعك، وسيقوم فريقنا بمراجعة الطلب والتواصل معك.";
  }

  if (
    text.includes("واتساب") ||
    text.includes("اتصال") ||
    text.includes("هاتف") ||
    text.includes("تواصل")
  ) {
    return "يمكنك التواصل معنا عبر واتساب أو الهاتف على الرقم +968 93377626، أو عبر البريد الإلكتروني malik@malikalmasiah.com.";
  }

  if (
    text.includes("بريد") ||
    text.includes("إيميل") ||
    text.includes("ايميل")
  ) {
    return "البريد الإلكتروني الرسمي للشركة هو malik@malikalmasiah.com.";
  }

  if (
    text.includes("موقع") ||
    text.includes("أين") ||
    text.includes("اين") ||
    text.includes("عمان")
  ) {
    return "تقع AL MALIK AL MASIAH Trading & Contracting L.L.C في السيب – مسقط، سلطنة عُمان.";
  }

  if (
    text.includes("بناء") ||
    text.includes("طرق") ||
    text.includes("إنشاءات")
  ) {
    return "نقدم خدمات المباني والطرق ودعم متطلبات مشاريع الإنشاء والبنية التحتية.";
  }

  if (
    text.includes("معدات") ||
    text.includes("معدات ثقيلة")
  ) {
    return "نقدم الدعم في توريد المعدات الثقيلة لمشاريع الإنشاء.";
  }

  if (
    text.includes("ردم") ||
    text.includes("أعمال ترابية")
  ) {
    return "نقدم خدمات الردم ودعم تطوير وتجهيز المواقع للمشاريع الإنشائية.";
  }

  return "شكراً لتواصلك مع AL MALIK AL MASIAH. للحصول على مساعدة تفصيلية أو عرض سعر، يمكنك استخدام صفحة طلب عرض السعر أو التواصل معنا عبر واتساب على +968 93377626.";
};

// ==================================================
// PUBLIC CHAT
// ==================================================

export const chatAssistant = async (
  req,
  res,
  next
) => {
  try {
    const body = req.body || {};

    const message =
      typeof body.message === "string"
        ? body.message.trim()
        : "";

    const language = getLanguage(
      body.language
    );

    const sessionId = getSessionId(
      body.sessionId
    );

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    if (message.length > 1500) {
      return res.status(400).json({
        success: false,
        message:
          "Message cannot exceed 1500 characters.",
      });
    }

    const reply =
      language === "ar"
        ? getArabicReply(message)
        : getEnglishReply(message);

    const log = await AssistantLog.create({
      sessionId,
      language,
      userMessage: message,
      assistantMessage: reply,
      source: "website",
    });

    return res.status(200).json({
      success: true,
      message: "Assistant response generated.",
      data: {
        reply,
        sessionId,
        logId: log._id,
        createdAt: log.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ==================================================
// ADMIN ACTIVITY
// ==================================================

export const getAssistantActivity = async (
  req,
  res,
  next
) => {
  try {
    const requestedLimit = Number(
      req.query.limit
    );

    const limit =
      Number.isFinite(requestedLimit) &&
      requestedLimit > 0
        ? Math.min(requestedLimit, 100)
        : 50;

    const logs = await AssistantLog.find()
      .sort({
        createdAt: -1,
      })
      .limit(limit)
      .lean();

    return res.status(200).json({
      success: true,
      data: {
        logs,
        total: logs.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ==================================================
// HEALTH CHECK
// ==================================================

export const assistantHealth = async (
  _req,
  res
) => {
  res.status(200).json({
    success: true,
    message: "AI Assistant API is working.",
    service: "assistant",
    timestamp: new Date().toISOString(),
  });
};