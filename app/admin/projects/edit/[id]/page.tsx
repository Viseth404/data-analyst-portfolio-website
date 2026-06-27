"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAdmin } from "@/lib/admin-context";
import { supabase } from "@/lib/supabase-client";
import { ProjectForm } from "@/components/admin/project-form";
import type { Project } from "@/lib/supabase-client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EditProjectPage() {
  const { user, loading: authLoading } = useAdmin();
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/admin/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user && projectId) {
      fetchProject();
    }
  }, [user, projectId]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const { data, error: err } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .eq("user_id", user?.id)
        .single();

      if (err) throw err;
      if (!data) throw new Error("Project not found");
      setProject(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link
            href="/admin/dashboard"
            className="mb-4 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:bg-secondary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold">Edit Project</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        {error && (
          <div className="mb-4 p-4 bg-destructive/10 border border-destructive text-destructive rounded">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center text-muted-foreground">Loading...</div>
        ) : project ? (
          <div className="bg-card border border-border rounded-lg p-6">
            <ProjectForm
              project={project}
              onSuccess={() => router.push("/admin/dashboard")}
              onCancel={() => router.push("/admin/dashboard")}
            />
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            Project not found
          </div>
        )}
      </main>
    </div>
  );
}
