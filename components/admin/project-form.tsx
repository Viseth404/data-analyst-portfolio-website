'use client'

import { useState } from 'react'
import type { Project } from '@/lib/supabase-client'
import { supabase } from '@/lib/supabase-client'
import { useAdmin } from '@/lib/admin-context'
import { ImagePlus, Trash2, X } from 'lucide-react'

interface ProjectFormProps {
  project?: Project | null
  onSuccess: () => void
  onCancel: () => void
}

const categories = [
  'Financial Analysis',
  'Data Analysis',
  'Dashboard',
  'Business Intelligence',
  'Report',
  'Web Application',
  'Website',
  'Web Development',
  'Frontend Project',
  'Full Stack Project',
  'Tool',
  'Automation Tool',
  'AI Tool',
  'SaaS',
  'API Project',
  'Database Project',
  'Finance Tool',
  'Portfolio Project',
  'Other',
]

export function ProjectForm({
  project,
  onSuccess,
  onCancel,
}: ProjectFormProps) {
  const { user } = useAdmin()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [tags, setTags] = useState<string[]>(project?.tags || [])
  const [tagInput, setTagInput] = useState('')

  const [formData, setFormData] = useState({
    title: project?.title || '',
    slug: project?.slug || '',
    description: project?.description || '',
    content: project?.content || '',
    cover_image: project?.cover_image || '',
    category: project?.category || '',
    live_demo_url: project?.live_demo_url || '',
    github_url: project?.github_url || '',
    case_study_url: project?.case_study_url || '',
    is_published: project?.is_published || false,
    is_featured: project?.is_featured || false,
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target

    setFormData({
      ...formData,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    })
  }

  const handleUploadCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

    if (!allowedTypes.includes(file.type)) {
      setError('Only JPG, PNG, and WEBP images are allowed.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be smaller than 5MB.')
      return
    }

    try {
      setError('')
      setUploading(true)

      const fileExt = file.name.split('.').pop()
      const fileName = `${user?.id}/${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true,
        })

      if (uploadError) throw uploadError

      const { data } = supabase.storage
        .from('project-images')
        .getPublicUrl(fileName)

      setFormData({
        ...formData,
        cover_image: data.publicUrl,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Image upload failed.')
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveCover = () => {
    setFormData({
      ...formData,
      cover_image: '',
    })
  }

  const handleAddTag = () => {
    if (tagInput.trim()) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = {
        ...formData,
        tags,
        user_id: user?.id,
      }

      if (project?.id) {
        const { error: err } = await supabase
          .from('projects')
          .update(data)
          .eq('id', project.id)
          .eq('user_id', user?.id)

        if (err) throw err
      } else {
        const { error: err } = await supabase.from('projects').insert([data])

        if (err) throw err
      }

      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save project.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-500 bg-red-500/10 p-4 text-sm font-medium text-red-500">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Slug *</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={3}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Content</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows={5}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Cover Image</label>

          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-background px-3 py-2 text-sm text-muted-foreground transition hover:bg-secondary">
            <ImagePlus className="h-4 w-4" />
            {uploading ? 'Uploading...' : 'Upload image'}
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleUploadCover}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {formData.cover_image && (
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium">Cover Preview</p>
            <button
              type="button"
              onClick={handleRemoveCover}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1 text-sm transition hover:bg-secondary"
            >
              <Trash2 className="h-4 w-4" />
              Remove
            </button>
          </div>

          <img
            src={formData.cover_image}
            alt="Cover preview"
            className="h-56 w-full rounded-lg object-cover"
          />
        </div>
      )}

      <div>
        <label className="mb-2 block text-sm font-medium">Tags</label>
        <div className="mb-2 flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleAddTag()
              }
            }}
            placeholder="Add a tag..."
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="rounded-lg bg-primary px-3 py-2 text-primary-foreground transition hover:bg-primary/90"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(index)}
                className="transition hover:text-red-500"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">
            Live Demo URL
          </label>
          <input
            type="url"
            name="live_demo_url"
            value={formData.live_demo_url}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">GitHub URL</label>
          <input
            type="url"
            name="github_url"
            value={formData.github_url}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="https://..."
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Case Study URL</label>
        <input
          type="url"
          name="case_study_url"
          value={formData.case_study_url}
          onChange={handleChange}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="https://..."
        />
      </div>

      <div className="flex gap-4">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            name="is_published"
            checked={formData.is_published}
            onChange={handleChange}
            className="h-4 w-4"
          />
          <span className="text-sm">Published</span>
        </label>

        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            name="is_featured"
            checked={formData.is_featured}
            onChange={handleChange}
            className="h-4 w-4"
          />
          <span className="text-sm">Featured on homepage</span>
        </label>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading || uploading}
          className="flex-1 rounded-lg bg-primary py-2 font-medium text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-lg border border-border py-2 font-medium transition hover:bg-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}