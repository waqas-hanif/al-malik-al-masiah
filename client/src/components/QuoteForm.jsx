import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

function QuoteForm({ language }) {
  const ar = language === "ar";

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    projectType: "",
    projectLocation: "",
    budget: "",
    expectedStartDate: "",
    description: "",
  });

  const [status, setStatus] = useState("idle");

  const update = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const API_URL = (
  import.meta.env.VITE_API_URL ||
  "https://al-malik-al-masiah-api.vercel.app"
).replace(/\/$/, "");

      const payload = {
        name: form.name,
        company: form.company,
        email: form.email,
        phone: form.phone,
        projectType: form.projectType,
        projectLocation: form.projectLocation,
        budget: form.budget,
        expectedStartDate: form.expectedStartDate || undefined,
        description: form.description,
        language: ar ? "ar" : "en",
        source: "website",
      };

      const response = await fetch(`${API_URL}/api/quotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const contentType =
        response.headers.get("content-type") || "";

      let data = null;

      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();

        if (!response.ok) {
          throw new Error(
            text || `Request failed with status ${response.status}`
          );
        }
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
            `Request failed with status ${response.status}`
        );
      }

      setStatus("success");

      setForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        projectType: "",
        projectLocation: "",
        budget: "",
        expectedStartDate: "",
        description: "",
      });
    } catch (error) {
      console.error("Quote submission error:", error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="form-success">
        <CheckCircle2 size={55} />

        <h2>
          {ar ? "تم إرسال طلبك" : "Request submitted"}
        </h2>

        <p>
          {ar
            ? "شكراً لتواصلك معنا. سيقوم فريقنا بالرد عليك."
            : "Thank you for contacting us. Our team will get back to you."}
        </p>

        <button
          type="button"
          onClick={() => setStatus("idle")}
        >
          {ar ? "إرسال طلب آخر" : "Send another request"}
        </button>
      </div>
    );
  }

  return (
    <form className="quote-form" onSubmit={submit}>
      <div className="form-intro">
        <span>PROJECT ENQUIRY</span>

        <h2>
          {ar
            ? "أخبرنا عن مشروعك"
            : "Tell us about your project"}
        </h2>

        <p>
          {ar
            ? "أرسل المعلومات الأساسية وسنتواصل معك."
            : "Share the basic details and our team will contact you."}
        </p>
      </div>

      <div className="form-grid">
        {/* NAME */}
        <label>
          {ar ? "الاسم" : "Full Name"}

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={update}
            required
            placeholder={ar ? "اسمك" : "Your name"}
          />
        </label>

        {/* COMPANY */}
        <label>
          {ar ? "الشركة" : "Company"}

          <input
            type="text"
            name="company"
            value={form.company}
            onChange={update}
            placeholder={
              ar ? "اسم الشركة" : "Company name"
            }
          />
        </label>

        {/* EMAIL */}
        <label>
          {ar ? "البريد الإلكتروني" : "Email"}

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={update}
            required
            placeholder="name@company.com"
          />
        </label>

        {/* PHONE */}
        <label>
          {ar ? "الهاتف" : "Phone"}

          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={update}
            required
            placeholder="+968"
          />
        </label>

        {/* PROJECT TYPE */}
        <label>
          {ar ? "نوع المشروع" : "Project Type"}

          <select
            name="projectType"
            value={form.projectType}
            onChange={update}
            required
          >
            <option value="">
              {ar
                ? "اختر نوع المشروع"
                : "Select project type"}
            </option>

            <option value="Construction of Buildings & Roads">
              Construction of Buildings & Roads
            </option>

            <option value="Supply of Heavy Equipment">
              Supply of Heavy Equipment
            </option>

            <option value="Backfilling">
              Backfilling
            </option>
          </select>
        </label>

        {/* PROJECT LOCATION */}
        <label>
          {ar ? "موقع المشروع" : "Project Location"}

          <input
            type="text"
            name="projectLocation"
            value={form.projectLocation}
            onChange={update}
            required
            placeholder={
              ar
                ? "موقع المشروع"
                : "Project location"
            }
          />
        </label>

        {/* BUDGET */}
        <label>
          {ar ? "الميزانية" : "Budget"}

          <input
            type="text"
            name="budget"
            value={form.budget}
            onChange={update}
            placeholder={
              ar
                ? "الميزانية المتوقعة"
                : "Estimated budget"
            }
          />
        </label>

        {/* EXPECTED START DATE */}
        <label>
          {ar
            ? "تاريخ البدء المتوقع"
            : "Expected Start Date"}

          <input
            type="date"
            name="expectedStartDate"
            value={form.expectedStartDate}
            onChange={update}
          />
        </label>

        {/* DESCRIPTION */}
        <label className="full-field">
          {ar
            ? "تفاصيل المشروع"
            : "Project Details"}

          <textarea
            name="description"
            value={form.description}
            onChange={update}
            required
            minLength={20}
            rows="6"
            placeholder={
              ar
                ? "اكتب تفاصيل مشروعك..."
                : "Tell us about your requirements..."
            }
          />
        </label>
      </div>

      {status === "error" && (
        <div className="form-error">
          {ar
            ? "تعذر إرسال الطلب. يرجى المحاولة مرة أخرى."
            : "Unable to submit the request. Please try again."}
        </div>
      )}

      <button
        type="submit"
        className="form-submit"
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <>
            <Loader2
              className="spin"
              size={19}
            />

            {ar ? "جار الإرسال..." : "Sending..."}
          </>
        ) : (
          <>
            <Send size={19} />

            {ar
              ? "إرسال الطلب"
              : "Submit Request"}
          </>
        )}
      </button>
    </form>
  );
}

export default QuoteForm;