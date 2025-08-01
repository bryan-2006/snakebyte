"use client";

import React, { useState } from "react";
import { Mail, Loader2, CheckCircle2, XCircle } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // You must set up a backend API route or use a service like Formspree, EmailJS, or Resend.
  // This example uses Formspree for simplicity.
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xdkddjnv";
//   console.log("Formspree endpoint:", FORMSPREE_ENDPOINT);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      if (!FORMSPREE_ENDPOINT) {
        throw new Error("Form endpoint is not defined");
      }
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/10 py-20">
      <div className="bg-background rounded-lg shadow-lg p-8 w-full max-w-lg border border-green-400/20">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <Mail className="h-7 w-7 text-green-500" />
          Contact Us
        </h1>
        <p className="mb-6 text-muted-foreground">
          Have a question or want to get in touch? Fill out the form below and we&apos;ll get back to you!
        </p>
        <form onSubmit={handleSubmit} className="space-y-10">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full px-3 py-2 border rounded-md bg-background border-green-400/20 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={form.name}
              onChange={handleChange}
              disabled={status === "loading"}
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 border rounded-md bg-background border-green-400/20 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={form.email}
              onChange={handleChange}
              disabled={status === "loading"}
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-1 font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full px-3 py-2 border rounded-md bg-background border-green-400/20 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={form.message}
              onChange={handleChange}
              disabled={status === "loading"}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md flex items-center justify-center gap-2 transition-colors"
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" /> Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
        {status === "success" && (
          <div className="flex items-center gap-2 mt-4 text-green-600">
            <CheckCircle2 className="h-5 w-5" /> Message sent! We&apos;ll get back to you soon.
          </div>
        )}
        {status === "error" && (
          <div className="flex items-center gap-2 mt-4 text-red-600">
            <XCircle className="h-5 w-5" /> Something went wrong. Please try again.
          </div>
        )}
      </div>
    </div>
  );
}