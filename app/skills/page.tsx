'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const skillCategories = [
  {
    name: 'Financial Analysis & Reporting',
    skills: [
      'Financial Reporting',
      'Budget Analysis',
      'Financial Reconciliation',
      'Financial Data Analysis',
      'Decision Support',
    ],
    level: 90,
  },
  {
    name: 'Microsoft Excel for Data Analysis',
    skills: [
      'Pivot Tables',
      'Lookup Functions',
      'Data Validation',
      'Conditional Formatting',
      'Charts & Reports',
    ],
    level: 95,
  },
  {
    name: 'Database & SQL',
    skills: ['PostgreSQL', 'SQL Queries', 'Joins', 'Views', 'Data Extraction'],
    level: 80,
  },
  {
    name: 'Programming & Development',
    skills: ['Python', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js'],
    level: 80,
  },
{
  name: 'Tools & Technologies',
  skills: [
    'Microsoft Office',
    'Microsoft Excel',
    'Microsoft Word',
    'Microsoft PowerPoint',
    'Google Workspace',
    'Notion',
    'Trello',
    'Git',
    'GitHub',
    'Docker',
    'Supabase',
    'VS Code',
    'Tableau',
    'Vercel',
    'railway',
  ],
  level: 90,
},
{
  name: 'Professional Skills',
  skills: [
    'Problem Solving',
    'Critical Thinking',
    'Research',
    'Documentation',
    'Communication',
    'Team Collaboration',
    'Task Management',
    'Time Management',
    'Attention to Detail',
    'Business Process Improvement',
  ],
  level: 90,
},
]

export default function SkillsPage() {
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
            <Link href="/skills" className="text-sm font-bold text-foreground">
              Skills
            </Link>
            <Link href="/about" className="text-sm transition hover:text-primary">
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

          <h1 className="text-3xl font-bold text-foreground">
            Skills & Expertise
          </h1>
        </div>

        <div className="grid gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.name}
              className="rounded-lg border border-border bg-card p-6 transition hover:bg-secondary"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">
                  {category.name}
                </h2>
                <span className="text-sm font-semibold text-foreground">
                  {category.level}%
                </span>
              </div>

              <div className="mb-6 h-2 w-full rounded-full bg-secondary">
                <div
                  className="h-2 rounded-full bg-primary transition-all"
                  style={{ width: `${category.level}%` }}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border bg-background px-3 py-1 text-sm font-medium text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-border bg-card p-6">
          <h3 className="mb-3 text-lg font-bold text-foreground">
            Core Competencies
          </h3>

          <div className="grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
            <div>✓ Financial Reporting & Analysis</div>
            <div>✓ Budget Monitoring</div>
            <div>✓ Advanced Microsoft Excel</div>
            <div>✓ PostgreSQL & SQL</div>
            <div>✓ Data Cleaning & Reconciliation</div>
            <div>✓ Business Process Improvement</div>
            <div>✓ Git & GitHub</div>
            <div>✓ React & Next.js Development</div>
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