'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, GitBranch } from 'lucide-react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase-client'
import type { Project } from '@/lib/supabase-client'

export default function ProjectDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProject()
  }, [slug])

  const fetchProject = async () => {
    try {
      setLoading(true)

      const { data, error: err } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single()

      if (err) throw err
      if (!data) throw new Error('Project not found')

      setProject(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Project not found')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading project...</p>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <h1 className="mb-4 text-2xl font-bold text-foreground">
          Project not found
        </h1>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:bg-secondary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <nav className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-xl font-bold text-primary">
            DataAnalyst
          </Link>

          <div className="flex gap-6">
            <Link href="/projects" className="text-sm font-bold text-foreground">
              Projects
            </Link>
            <Link href="/skills" className="text-sm transition hover:text-primary">
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
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:bg-secondary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        <div className="mb-8">
          {project.category && (
            <div className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {project.category}
            </div>
          )}

          <h1 className="mb-4 text-4xl font-bold text-foreground">
            {project.title}
          </h1>

          <p className="mb-8 text-xl leading-8 text-muted-foreground">
            {project.description}
          </p>

          {project.cover_image && (
            <img
              src={project.cover_image}
              alt={project.title}
              className="mb-8 h-96 w-full rounded-lg object-cover"
            />
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-8 md:col-span-2">
            {project.content && (
              <section className="rounded-lg border border-border bg-card p-6">
                <h2 className="mb-4 text-2xl font-bold text-foreground">
                  Details
                </h2>
                <p className="whitespace-pre-wrap leading-7 text-muted-foreground">
                  {project.content}
                </p>
              </section>
            )}
          </div>

          <aside className="space-y-6">
            {project.tags && project.tags.length > 0 && (
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="mb-4 font-bold text-foreground">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-4 font-bold text-foreground">Project Links</h3>

              <div className="space-y-3">
                {project.live_demo_url && (
                  <a
                    href={project.live_demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-foreground transition hover:text-primary"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Live Demo
                  </a>
                )}

                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-foreground transition hover:text-primary"
                  >
                    <GitBranch className="h-4 w-4" />
                    View on GitHub
                  </a>
                )}

                {project.case_study_url && (
                  <a
                    href={project.case_study_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-foreground transition hover:text-primary"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Read Case Study
                  </a>
                )}

                {!project.live_demo_url &&
                  !project.github_url &&
                  !project.case_study_url && (
                    <p className="text-sm text-muted-foreground">
                      No links added yet.
                    </p>
                  )}
              </div>
            </div>
          </aside>
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