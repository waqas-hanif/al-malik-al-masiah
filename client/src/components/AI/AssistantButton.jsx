import { useEffect, useState } from "react";
import {
  Bot,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const API_URL = "http://localhost:5000";

const AssistantButton = () => {
  const { i18n } = useTranslation();

  const isArabic = i18n.language === "ar";

  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        text: isArabic
          ? "مرحباً! أهلاً بك في AL MALIK AL MASIAH. كيف يمكنني مساعدتك اليوم؟"
          : "Hello! Welcome to AL MALIK AL MASIAH. How can I help you today?",
      },
    ]);
  }, [isArabic]);

  const getSessionId = () => {
    let sessionId =
      localStorage.getItem(
        "assistantSessionId"
      );

    if (!sessionId) {
      sessionId = crypto.randomUUID();

      localStorage.setItem(
        "assistantSessionId",
        sessionId
      );
    }

    return sessionId;
  };

  const sendMessage = async (messageText) => {
    const value = messageText.trim();

    if (!value || loading) {
      return;
    }

    setMessages((previous) => [
      ...previous,
      {
        id: `${Date.now()}-user`,
        role: "user",
        text: value,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const sessionId = getSessionId();

      const response = await fetch(
        `${API_URL}/api/assistant/chat`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            message: value,
            language: isArabic
              ? "ar"
              : "en",
            sessionId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Assistant is currently unavailable."
        );
      }

      if (data?.data?.sessionId) {
        localStorage.setItem(
          "assistantSessionId",
          data.data.sessionId
        );
      }

      setMessages((previous) => [
        ...previous,
        {
          id: `${Date.now()}-assistant`,
          role: "assistant",
          text:
            data?.data?.reply ||
            (isArabic
              ? "عذراً، لم أتمكن من إعداد رد."
              : "Sorry, I could not prepare a response."),
        },
      ]);
    } catch (error) {
      console.error(
        "Assistant error:",
        error
      );

      setMessages((previous) => [
        ...previous,
        {
          id: `${Date.now()}-error`,
          role: "assistant",
          text: isArabic
            ? "عذراً، المساعد غير متاح حالياً. يمكنك التواصل معنا عبر واتساب على +968 93377626."
            : "Sorry, the assistant is temporarily unavailable. You can contact us on WhatsApp at +968 93377626.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    sendMessage(input);
  };

  const quickQuestions = isArabic
    ? [
        "ما هي خدماتكم؟",
        "كيف يمكنني طلب عرض سعر؟",
        "كيف يمكنني التواصل معكم؟",
      ]
    : [
        "What services do you provide?",
        "How can I request a quote?",
        "How can I contact you?",
      ];

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="fixed bottom-5 right-5 z-[9999] sm:bottom-6 sm:right-6"
    >
      {/* CHAT PANEL */}

      {open && (
        <div className="mb-4 flex h-[min(620px,calc(100vh-100px))] w-[calc(100vw-30px)] max-w-[390px] flex-col overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#070907]/[0.98] shadow-[0_30px_90px_rgba(0,0,0,0.65)] backdrop-blur-2xl">
          {/* HEADER */}

          <div className="relative overflow-hidden border-b border-white/8 bg-gradient-to-br from-[#17160d] via-[#0c110d] to-[#070907] p-4">
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#d4af37]/10 blur-3xl" />

            <div className="relative flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#d4af37]/25 bg-[#d4af37]/10">
                  <Bot
                    size={20}
                    className="text-[#d4af37]"
                  />

                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#0a0d0a] bg-emerald-400" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white">
                      AI Assistant
                    </h3>

                    <Sparkles
                      size={12}
                      className="text-[#d4af37]"
                    />
                  </div>

                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                    <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-emerald-300">
                      Online
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-white/8 bg-white/[0.03] text-slate-500 transition hover:border-white/15 hover:text-white"
                aria-label="Close AI Assistant"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* CHAT MESSAGES */}

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-3">
              {messages.map((message) => {
                const isUser =
                  message.role === "user";

                return (
                  <div
                    key={message.id}
                    className={`flex ${
                      isUser
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[88%] px-4 py-3 text-sm leading-6 ${
                        isUser
                          ? "rounded-2xl rounded-br-md bg-[#d4af37] text-[#070907]"
                          : "rounded-2xl rounded-bl-md border border-white/8 bg-white/[0.04] text-slate-300"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md border border-white/8 bg-white/[0.04] px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#d4af37]" />

                      <span
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#d4af37]"
                        style={{
                          animationDelay:
                            "120ms",
                        }}
                      />

                      <span
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#d4af37]"
                        style={{
                          animationDelay:
                            "240ms",
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* QUICK QUESTIONS */}

          {!loading &&
            messages.length === 1 && (
              <div className="border-t border-white/6 px-4 pb-3 pt-3">
                <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.14em] text-slate-600">
                  {isArabic
                    ? "أسئلة سريعة"
                    : "Quick questions"}
                </p>

                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map(
                    (question) => (
                      <button
                        type="button"
                        key={question}
                        onClick={() =>
                          sendMessage(
                            question
                          )
                        }
                        className="cursor-pointer rounded-lg border border-white/8 bg-white/[0.025] px-3 py-2 text-left text-[10px] leading-4 text-slate-500 transition hover:border-[#d4af37]/25 hover:bg-[#d4af37]/[0.04] hover:text-[#d4af37]"
                      >
                        {question}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

          {/* INPUT */}

          <form
            onSubmit={handleSubmit}
            className="border-t border-white/8 bg-[#070907] p-3"
          >
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/25 p-1.5 transition focus-within:border-[#d4af37]/30">
              <input
                type="text"
                value={input}
                onChange={(event) =>
                  setInput(event.target.value)
                }
                disabled={loading}
                maxLength={1500}
                placeholder={
                  isArabic
                    ? "اكتب رسالتك..."
                    : "Ask us anything..."
                }
                className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-700 disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={
                  loading ||
                  !input.trim()
                }
                className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-[#d4af37] text-[#070907] transition hover:bg-[#f0d477] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </div>

            <p className="mt-2 px-1 text-[8px] leading-4 text-slate-700">
              {isArabic
                ? "للمساعدة التفصيلية، يرجى التواصل مع فريقنا."
                : "For detailed assistance, please contact our team."}
            </p>
          </form>
        </div>
      )}

      {/* FLOATING ASSISTANT BUTTON */}

      <div className="relative">
        {!open && (
          <div className="pointer-events-none absolute bottom-full right-0 mb-3 hidden whitespace-nowrap rounded-xl border border-white/10 bg-[#0a0e0b]/95 px-3 py-2 shadow-xl backdrop-blur-xl sm:block">
            <p className="text-[10px] font-semibold text-slate-300">
              {isArabic
                ? "كيف يمكننا مساعدتك؟"
                : "Need help? Ask our AI"}
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={() =>
            setOpen((previous) => !previous)
          }
          className="group relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-2xl border border-[#d4af37]/30 bg-[#0b100c] text-[#d4af37] shadow-2xl shadow-black/50 transition duration-300 hover:-translate-y-1 hover:border-[#d4af37]/60 hover:bg-[#d4af37] hover:text-[#070907] sm:h-16 sm:w-16"
          aria-label={
            open
              ? "Close AI Assistant"
              : "Open AI Assistant"
          }
          aria-expanded={open}
        >
          <span className="absolute inset-0 rounded-2xl bg-[#d4af37]/10 blur-xl transition group-hover:bg-[#d4af37]/20" />

          {open ? (
            <X
              size={23}
              className="relative"
            />
          ) : (
            <>
              <Bot
                size={24}
                className="relative"
              />

              <Sparkles
                size={11}
                className="absolute right-3 top-3"
              />
            </>
          )}

          {!open && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-[#040605] bg-emerald-400 px-1 text-[7px] font-black text-[#061006]">
              AI
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default AssistantButton;