"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

type FormState = {
  name: string;
  email: string;
  path: string;
  message: string;
};

const initial: FormState = {
  name: "",
  email: "",
  path: "companies",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(values: FormState) {
    const next: Partial<FormState> = {};
    if (!values.name.trim()) next.name = "Name is required";
    if (!values.email.trim()) {
      next.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "Enter a valid email";
    }
    if (!values.message.trim()) next.message = "Message is required";
    return next;
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        className="uw-neu"
        style={{ borderRadius: 24, padding: "36px 32px" }}
      >
        <h2 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 12px" }}>
          Message received
        </h2>
        <p style={{ fontSize: 15, opacity: 0.75, lineHeight: 1.6 }}>
          Thanks for reaching out. This is a demo form—no email was sent. In
          production, your message would go to our team.
        </p>
        <button
          type="button"
          className="uw-pill uw-btn-coral"
          style={{ marginTop: 24, padding: "12px 24px", fontSize: 14 }}
          onClick={() => {
            setForm(initial);
            setSubmitted(false);
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="uw-neu"
      style={{ borderRadius: 24, padding: "36px 32px" }}
      noValidate
    >
      <div className="grid gap-6">
        <Field label="Name" error={errors.name} htmlFor="name">
          <input
            id="name"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className={inputClass(Boolean(errors.name))}
          />
        </Field>

        <Field label="Email" error={errors.email} htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className={inputClass(Boolean(errors.email))}
          />
        </Field>

        <fieldset>
          <legend className="text-sm font-medium text-text">
            I am looking to
          </legend>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            {[
              { value: "companies", label: "Hire talent" },
              { value: "seekers", label: "Find a role" },
            ].map((option) => (
              <label
                key={option.value}
                className={cn(
                  "flex flex-1 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-all",
                  form.path === option.value
                    ? "border-accent/40 bg-accent/10 text-text font-bold"
                    : "border-border text-text-muted hover:border-border-hover",
                )}
              >
                <input
                  type="radio"
                  name="path"
                  value={option.value}
                  checked={form.path === option.value}
                  onChange={() =>
                    setForm((f) => ({ ...f, path: option.value }))
                  }
                  className="accent-accent"
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>

        <Field label="Message" error={errors.message} htmlFor="message">
          <textarea
            id="message"
            name="message"
            rows={5}
            value={form.message}
            onChange={(e) =>
              setForm((f) => ({ ...f, message: e.target.value }))
            }
            className={cn(inputClass(Boolean(errors.message)), "resize-y")}
          />
        </Field>

        <div>
          <button
            type="submit"
            className="uw-pill uw-btn-coral"
            style={{
              padding: "14px 32px",
              fontSize: 15,
              fontWeight: 800,
              width: "auto",
            }}
          >
            Send message
          </button>
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-sm font-medium text-text">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error ? <p className="mt-1.5 text-sm text-red-400">{error}</p> : null}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-xl border bg-bg-surface px-4 py-3.5 text-sm text-text outline-none transition-all placeholder:text-text-subtle focus:border-accent/50 focus:ring-1 focus:ring-accent/20 focus:bg-bg-card",
    hasError ? "border-red-500/50" : "border-border",
  );
}
