'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <nav className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-xl font-bold text-primary">
            Portfolio
          </Link>

          <div className="flex gap-6">
            <Link href="/projects" className="text-sm transition hover:text-primary">
              Projects
            </Link>
            <Link href="/skills" className="text-sm transition hover:text-primary">
              Skills
            </Link>
            <Link href="/about" className="text-sm font-bold text-foreground">
              About
            </Link>
            <Link href="/contact" className="text-sm transition hover:text-primary">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-12">
        <div className="mb-8 flex items-center gap-3">
          <Link
            href="/"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:bg-secondary"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>

          <h1 className="text-3xl font-bold text-foreground">About Me</h1>
        </div>

        <div className="space-y-8">
          <p className="text-lg leading-8 text-muted-foreground">
            I&apos;m a detail-oriented Financial Analyst with experience in
            financial reporting, budgeting, data analysis, reconciliation, and
            business decision support. I use Excel, PostgreSQL, and BI tools to
            turn financial data into clear reports and useful insights.
          </p>

          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              Background
            </h2>
            <p className="leading-7 text-muted-foreground">
              I currently work as a Financial Analyst at Private Family Business
              – Digital Marketing & Tech Solution. My work includes analyzing
              financial data, preparing reports, monitoring budget utilization,
              reconciling financial records, and supporting business process
              improvements through accurate reporting.
            </p>
          </section>

          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="mb-4 text-2xl font-bold text-foreground">Skills</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Financial Analysis & Reporting</li>
              <li>
                • Advanced Excel: Pivot Tables, Lookup Functions, Data
                Validation, Conditional Formatting
              </li>
              <li>• Data Cleaning & Reconciliation</li>
              <li>• PostgreSQL: Queries, Joins, Analytical Views</li>
              <li>• Tableau / BI Reporting</li>
              <li>• Git & GitHub</li>
              <li>• Research & Documentation</li>
            </ul>
          </section>

          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              Approach
            </h2>
            <p className="leading-7 text-muted-foreground">
              My approach focuses on accuracy, clarity, and practical business
              value. I review financial data carefully, identify patterns or
              issues, build organized reports, and communicate insights that
              help management make better decisions.
            </p>
          </section>

          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              What I&apos;m Building
            </h2>
            <p className="leading-7 text-muted-foreground">
              I&apos;m developing my portfolio around finance, data analysis,
              reporting dashboards, and business intelligence projects. My goal
              is to combine financial knowledge with technical skills to create
              reports and tools that support real business operations.
            </p>
          </section>

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="mb-3 text-lg font-bold text-foreground">
              Let&apos;s Work Together
            </h3>
            <p className="mb-4 text-sm leading-6 text-muted-foreground">
              If you have a financial reporting challenge, data analysis task, or
              business dashboard idea, I&apos;d be happy to discuss how I can
              help.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center rounded-lg border border-border bg-background px-6 py-3 font-medium text-foreground transition hover:bg-secondary"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </main>

      <footer className="mt-12 border-t border-border bg-card">
        <div className="mx-auto max-w-4xl px-4 py-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 Keo Viseth. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}