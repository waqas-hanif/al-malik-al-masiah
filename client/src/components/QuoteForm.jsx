import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

function QuoteForm({ language }) {
  const ar = language === "ar";

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");

  const update = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch(/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");

      setForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="form-success">
        <CheckCircle2 size={55} />
        <h2>{ar ? "تم إرسال طلبك" : "Request submitted"}</h2>
        <p>
          {ar
            ? "شكراً لتواصلك معنا. سيقوم فريقنا بالرد عليك."
            : "Thank you for contacting us. Our team will get back to you."}
        </p>
        <button onClick={() => setStatus("idle")}>
          {ar ? "إرسال طلب آخر" : "Send another request"}
        </button>
      </div>
    );
  }

  return (
    <form className="quote-form" onSubmit={submit}>
      <div className="form-intro">
        <span>PROJECT ENQUIRY</span>
        <h2>{ar ? "أخبرنا عن مشروعك" : "Tell us about your project"}</h2>
        <p>
          {ar
            ? "أرسل المعلومات الأساسية وسنتواصل معك."
            : "Share the basic details and our team will contact you."}
        </p>
      </div>

      <div className="form-grid">
        <label>
          {ar ? "الاسم" : "Full Name"}
          <input
            name="name"
            value={form.name}
            onChange={update}
            required
            placeholder={ar ? "اسمك" : "Your name"}
          />
        </label>

        <label>
          {ar ? "الشركة" : "Company"}
          <input
            name="company"
            value={form.company}
            onChange={update}
            placeholder={ar ? "اسم الشركة" : "Company name"}
          />
        </label>

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

        <label>
          {ar ? "الهاتف" : "Phone"}
          <input
            name="phone"
            value={form.phone}
            onChange={update}
            required
            placeholder="+968"
          />
        </label>

        <label className="full-field">
          {ar ? "الخدمة" : "Service"}
          <select
            name="service"
            value={form.service}
            onChange={update}
            required
          >
            <option value="">
              {ar ? "اختر الخدمة" : "Select a service"}
            </option>
            <option value="Construction">
              Construction of Buildings & Roads
            </option>
            <option value="Heavy Equipment">
              Supply of Heavy Equipment
            </option>
            <option value="Backfilling">Backfilling</option>
          </select>
        </label>

        <label className="full-field">
          {ar ? "تفاصيل المشروع" : "Project Details"}
          <textarea
            name="message"
            value={form.message}
            onChange={update}
            required
            rows="6"
            placeholder={
              ar ? "اكتب تفاصيل مشروعك..." : "Tell us about your requirements..."
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

      <button className="form-submit" disabled={status === "loading"}>
        {status === "loading" ? (
          <>
            <Loader2 className="spin" size={19} />
            {ar ? "جار الإرسال..." : "Sending..."}
          </>
        ) : (
          <>
            <Send size={19} />
            {ar ? "إرسال الطلب" : "Submit Request"}
          </>
        )}
      </button>
    </form>
  );
}

export default QuoteForm;