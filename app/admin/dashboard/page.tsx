'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Edit,
  Eye,
  EyeOff,
  LogOut,
  Mail,
  Plus,
  Star,
  Trash2,
} from 'lucide-react'
import { useAdmin } from '@/lib/admin-context'
import { supabase } from '@/lib/supabase-client'
import type { Project } from '@/lib/supabase-client'

export default function AdminDashboard() {
  const { user, signOut, loading: authLoading } = useAdmin()
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [messageCount, setMessageCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/admin/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user) {
      fetchProjects()
      fetchMessages()
    }
  }, [user])

  const fetchProjects = async () => {
    try {
      setLoading(true)

      const { data, error: err } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })

      if (err) throw err

      setProjects(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load projects.')
    } finally {
      setLoading(false)
    }
  }

  const fetchMessages = async () => {
    const { count } = await supabase
      .from('contact_messages')
      .select('*', { count: 'exact', head: true })

    setMessageCount(count || 0)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      const { error: err } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id)

      if (err) throw err

      setProjects(projects.filter((project) => project.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete project.')
    }
  }

  const handleTogglePublished = async (project: Project) => {
    try {
      const { error: err } = await supabase
        .from('projects')
        .update({ is_published: !project.is_published })
        .eq('id', project.id)
        .eq('user_id', user?.id)

      if (err) throw err

      setProjects(
        projects.map((item) =>
          item.id === project.id
            ? { ...item, is_published: !item.is_published }
            : item
        )
      )
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to update project status.'
      )
    }
  }

  const handleToggleFeatured = async (project: Project) => {
    try {
      const { error: err } = await supabase
        .from('projects')
        .update({ is_featured: !project.is_featured })
        .eq('id', project.id)
        .eq('user_id', user?.id)

      if (err) throw err

      setProjects(
        projects.map((item) =>
          item.id === project.id
            ? { ...item, is_featured: !item.is_featured }
            : item
        )
      )
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to update featured status.'
      )
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/admin/login')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign out.')
    }
  }

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
        Loading...
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage portfolio projects and contact messages.
            </p>
          </div>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:bg-secondary"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl p-6">
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="text-sm text-muted-foreground">Total Projects</div>
            <div className="text-3xl font-bold text-foreground">
              {projects.length}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <div className="text-sm text-muted-foreground">Published</div>
            <div className="text-3xl font-bold text-foreground">
              {projects.filter((project) => project.is_published).length}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <div className="text-sm text-muted-foreground">Featured</div>
            <div className="text-3xl font-bold text-foreground">
              {projects.filter((project) => project.is_featured).length}
            </div>
          </div>

          <Link
            href="/admin/messages"
            className="rounded-lg border border-border bg-card p-4 transition hover:bg-secondary"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Messages</div>
                <div className="text-3xl font-bold text-foreground">
                  {messageCount}
                </div>
              </div>
              <Mail className="h-6 w-6 text-primary" />
            </div>
          </Link>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-500 bg-red-500/10 p-4 text-sm font-medium text-red-500">
            {error}
          </div>
        )}

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Add New Project
          </Link>

          <Link
            href="/"
            className="inline-flex items-center rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:bg-secondary"
          >
            View Website
          </Link>
        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-card">
          {loading ? (
            <div className="p-6 text-center text-muted-foreground">
              Loading projects...
            </div>
          ) : projects.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              No projects yet. Create one to get started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border bg-secondary">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {projects.map((project) => (
                    <tr key={project.id} className="transition hover:bg-secondary/50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-foreground">
                            {project.title}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {project.slug}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {project.category || '-'}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-wrap items-center gap-2">
                          {project.is_published ? (
                            <span className="rounded-full border border-border bg-background px-2 py-1 text-xs text-foreground">
                              Published
                            </span>
                          ) : (
                            <span className="rounded-full border border-border bg-background px-2 py-1 text-xs text-muted-foreground">
                              Draft
                            </span>
                          )}

                          {project.is_featured && (
                            <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2 py-1 text-xs text-foreground">
                              <Star className="h-3 w-3" />
                              Featured
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleTogglePublished(project)}
                            className="rounded-lg border border-border p-2 transition hover:bg-secondary"
                            title={project.is_published ? 'Unpublish' : 'Publish'}
                          >
                            {project.is_published ? (
                              <Eye className="h-4 w-4 text-foreground" />
                            ) : (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            )}
                          </button>

                          <button
                            onClick={() => handleToggleFeatured(project)}
                            className="rounded-lg border border-border p-2 transition hover:bg-secondary"
                            title={project.is_featured ? 'Unfeature' : 'Feature'}
                          >
                            <Star
                              className={`h-4 w-4 ${
                                project.is_featured
                                  ? 'fill-current text-foreground'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          </button>

                          <Link
                            href={`/admin/projects/edit/${project.id}`}
                            className="rounded-lg border border-border p-2 transition hover:bg-secondary"
                          >
                            <Edit className="h-4 w-4 text-foreground" />
                          </Link>

                          <button
                            onClick={() => handleDelete(project.id)}
                            className="rounded-lg border border-border p-2 transition hover:bg-secondary"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}