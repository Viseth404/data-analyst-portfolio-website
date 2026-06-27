"use client";

import Link from "next/link";
import { ArrowLeft, Code, Mail, Share2 } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setErrorMessage(result.error || "Failed to send message.");
      return;
    }

    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      message: "",
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <nav className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-xl font-bold text-primary">
            Portfolio
          </Link>

          <div className="flex gap-6">
            <Link
              href="/projects"
              className="text-sm transition hover:text-primary"
            >
              Projects
            </Link>
            <Link
              href="/skills"
              className="text-sm transition hover:text-primary"
            >
              Skills
            </Link>
            <Link
              href="/about"
              className="text-sm transition hover:text-primary"
            >
              About
            </Link>
            <Link href="/contact" className="text-sm font-bold text-accent">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-12">
        <div className="mb-8 flex items-center gap-3">
          <Link
            href="/"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:bg-accent hover:text-accent-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>

          <h1 className="text-3xl font-bold">Contact Me</h1>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-xl font-bold">Let&apos;s Connect</h2>

            <p className="mb-8 text-muted-foreground">
              I&apos;m open to discussing new opportunities, financial analysis,
              data analytics projects, and software development work. Feel free
              to reach out through email or connect with me on GitHub.
            </p>

            <div className="space-y-4">
              <a
                href="mailto:rithkeoviseth404@gmail.com"
                className="group flex items-center gap-3 rounded-lg border border-border p-4 transition hover:bg-secondary"
              >
                <Mail className="h-5 w-5 text-accent transition group-hover:text-primary" />
                <div>
                  <div className="text-sm font-medium">Email</div>
                  <div className="text-xs text-muted-foreground">
                    rithkeoviseth404@gmail.com
                  </div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/rith-keo-viseth-8ba157391/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-lg border border-border p-4 transition hover:bg-secondary"
              >
                <Share2 className="h-5 w-5 text-accent transition group-hover:text-primary" />
                <div>
                  <div className="text-sm font-medium">LinkedIn</div>
                  <div className="text-xs text-muted-foreground">
                    linkedin.com/in/rith-keo-viseth-8ba157391
                  </div>
                </div>
              </a>

              <a
                href="https://github.com/Viseth404"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-lg border border-border p-4 transition hover:bg-secondary"
              >
                <Code className="h-5 w-5 text-accent transition group-hover:text-primary" />
                <div>
                  <div className="text-sm font-medium">GitHub</div>
                  <div className="text-xs text-muted-foreground">
                    github.com/Viseth404
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div>
            <h2 className="mb-6 text-xl font-bold">Send a Message</h2>

            {submitted && (
              <div className="mb-6 rounded-lg bg-primary p-4 text-sm font-medium text-primary-foreground">
                Thank you for your message! I&apos;ll respond as soon as
                possible.
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 rounded-lg border border-red-500 bg-red-500/10 p-4 text-sm font-medium text-red-500">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full resize-none rounded-lg border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </main>

      <footer className="mt-12 border-t border-border bg-card">
        <div className="mx-auto max-w-4xl px-4 py-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 Keo Viseth. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
