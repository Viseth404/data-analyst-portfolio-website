'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { supabase } from '@/lib/supabase-client'
import type { Project } from '@/lib/supabase-client'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)

      const { data, error: err } = await supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false })

      if (err) throw err

      setProjects(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load projects.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12">
      <div className="mb-8 flex items-center gap-3">
        <Link
          href="/"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:bg-secondary"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>

        <h1 className="text-3xl font-bold text-foreground">Projects</h1>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-500 bg-red-500/10 p-4 text-sm font-medium text-red-500">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
          Loading projects...
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
          No projects published yet.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group overflow-hidden rounded-lg border border-border bg-card transition hover:-translate-y-1 hover:shadow-md"
            >
              {project.cover_image ? (
                <div className="h-40 overflow-hidden bg-secondary">
                  <img
                    src={project.cover_image}
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>
              ) : (
                <div className="flex h-40 items-center justify-center bg-secondary">
                  <span className="text-sm text-muted-foreground">No image</span>
                </div>
              )}

              <div className="p-4">
                {project.category && (
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {project.category}
                  </div>
                )}

                <h3 className="mb-2 font-bold text-foreground group-hover:text-primary">
                  {project.title}
                </h3>

                <p className="mb-3 text-sm leading-6 text-muted-foreground">
                  {project.description}
                </p>

                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-background px-2 py-1 text-xs text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
