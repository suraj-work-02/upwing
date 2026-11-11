"use client";

import { useEffect, useRef, useState } from "react";
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
  const confirmationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const confirmation = confirmationRef.current;
    if (submitted && confirmation) {
      confirmation.focus({ preventScroll: true });
      confirmation.scrollIntoView({ block: "center", behavior: "instant" });
    }
  }, [submitted]);

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
    const firstInvalidField = Object.keys(nextErrors)[0];
    if (firstInvalidField) {
      const field = event.currentTarget.elements.namedItem(firstInvalidField);
      if (field instanceof HTMLElement) {
        field.focus({ preventScroll: true });
        field.scrollIntoView({ block: "center", behavior: "instant" });
      }
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        ref={confirmationRef}
        className="uw-neu outline-none"
        role="status"
        tabIndex={-1}
        aria-labelledby="demo-complete-title"
        style={{ borderRadius: 24, padding: "36px 32px" }}
      >
        <h2
          id="demo-complete-title"
          style={{ fontSize: 28, fontWeight: 800, margin: "0 0 12px" }}
        >
          Demo complete
        </h2>
        <p style={{ fontSize: 15, opacity: 0.75, lineHeight: 1.6 }}>
          Thanks for trying the form. This was a preview only; no message was
          sent.
        </p>
        <button
          type="button"
          className="uw-pill uw-btn-coral"
          style={{ marginTop: 24, padding: "12px 24px", fontSize: 14 }}
          onClick={() => {
            setForm(initial);
            setErrors({});
            setSubmitted(false);
          }}
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="uw-neu"
      aria-labelledby="contact-form-title"
      aria-describedby="demo-form-note"
      style={{ borderRadius: 24, padding: "36px 32px" }}
      noValidate
    >
      <div className="grid gap-6">
        <div>
          <h2
            id="contact-form-title"
            style={{ fontSize: 24, fontWeight: 800, margin: "0 0 14px" }}
          >
            Try the contact form
          </h2>
          <p
            id="demo-form-note"
            className="rounded-xl border border-accent/20 bg-accent/10 px-4 py-3 text-sm leading-relaxed text-text-secondary"
          >
            <strong className="text-accent">Demo only.</strong> Use sample
            details to explore the form. No message will be sent.
          </p>
        </div>

        <Field label="Name" error={errors.name} htmlFor="name">
          <input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Alex Morgan"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
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
            placeholder="alex@example.com"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
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
            placeholder="Tell us about a sample hiring or career goal."
            required
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
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
            Submit demo
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
      {error ? (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="mt-1.5 text-sm text-red-400"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-xl border bg-bg-surface px-4 py-3.5 text-sm text-text outline-none transition-all placeholder:text-text-subtle focus:border-accent/50 focus:ring-1 focus:ring-accent/20 focus:bg-bg-card",
    hasError ? "border-red-500/50" : "border-border",
  );
}
