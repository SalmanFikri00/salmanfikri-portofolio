import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { supabaseClient } from '../lib/supabaseClient';
import { useAdminSession } from '../context/AdminSessionContext';
import CategoryFormModal from '../components/dashboard/CategoryFormModal';
import ProjectFormModal from '../components/dashboard/ProjectFormModal';
import Cursor from '../components/Cursor';

const PROJECT_IMAGE_BUCKET = 'projects';

const slugify = (value = '') =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 120);

const uploadProjectImage = async (file) => {
  const fileExt = file.name?.split('.').pop();
  const uniqueSegment = Math.random().toString(36).slice(2);
  const filePath = `projects/${Date.now()}-${uniqueSegment}.${fileExt ?? 'jpg'}`;

  const { error: uploadError } = await supabaseClient.storage
    .from(PROJECT_IMAGE_BUCKET)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabaseClient.storage.from(PROJECT_IMAGE_BUCKET).getPublicUrl(filePath);
  return data.publicUrl;
};

const AdminDashboard = () => {
  const { user, isLoading, signOut } = useAdminSession();
  const navigate = useNavigate();

  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dashboardError, setDashboardError] = useState('');

  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);

  const [categoryModalState, setCategoryModalState] = useState({
    open: false,
    mode: 'create',
    data: null,
    error: '',
  });
  const [categorySubmitting, setCategorySubmitting] = useState(false);

  const [projectModalState, setProjectModalState] = useState({
    open: false,
    mode: 'create',
    data: null,
    error: '',
  });
  const [projectSubmitting, setProjectSubmitting] = useState(false);

  useEffect(() => {
    document.title = 'Admin Dashboard | Portfolio';
  }, []);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/admin/00/login', { replace: true });
    }
  }, [user, isLoading, navigate]);

  const fetchDashboardData = useCallback(async () => {
    if (!user) {
      setCategories([]);
      setProjects([]);
      setIsBootstrapping(false);
      return;
    }

    setIsBootstrapping(true);
    setDashboardError('');

    try {
      const [{ data: categoryRows, error: categoryError }, { data: projectRows, error: projectError }] =
        await Promise.all([
          supabaseClient
            .from('categories')
            .select('id, name, slug, description, is_active, created_at, updated_at')
            .order('created_at', { ascending: true }),
          supabaseClient
            .from('project_with_categories')
            .select(
              'id, title, slug, summary, body, image_url, accent_color, project_url, roles, is_featured, is_published, created_at, updated_at, categories',
            )
            .order('created_at', { ascending: false }),
        ]);

      if (categoryError) throw categoryError;
      if (projectError) throw projectError;

      setCategories(categoryRows ?? []);
      setProjects(projectRows ?? []);
    } catch (error) {
      console.error(error);
      setDashboardError(error.message ?? 'Failed to load dashboard.');
    } finally {
      setIsBootstrapping(false);
    }
  }, [user]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const refreshData = async () => {
    setIsRefreshing(true);
    await fetchDashboardData();
    setIsRefreshing(false);
  };

  const openCreateCategoryModal = () =>
    setCategoryModalState({ open: true, mode: 'create', data: null, error: '' });
  const openEditCategoryModal = (category) =>
    setCategoryModalState({ open: true, mode: 'edit', data: category, error: '' });
  const closeCategoryModal = () =>
    setCategoryModalState((prev) => ({
      ...prev,
      open: false,
      error: '',
    }));

  const openCreateProjectModal = () =>
    setProjectModalState({ open: true, mode: 'create', data: null, error: '' });
  const openEditProjectModal = (project) =>
    setProjectModalState({ open: true, mode: 'edit', data: project, error: '' });
  const closeProjectModal = () =>
    setProjectModalState((prev) => ({
      ...prev,
      open: false,
      error: '',
    }));

  const handleCategorySubmit = async (formData) => {
    if (!user?.id) {
      setCategoryModalState((prev) => ({
        ...prev,
        error: 'Missing user context. Please sign out and sign in again.',
      }));
      return;
    }

    setCategorySubmitting(true);
    const desiredSlug = formData.slug?.trim() || slugify(formData.name);

    const basePayload = {
      name: formData.name.trim(),
      slug: desiredSlug,
      description: formData.description?.trim() || null,
      is_active: formData.is_active,
      updated_by: user.id,
    };

    try {
      if (categoryModalState.mode === 'create') {
        const { error } = await supabaseClient.from('categories').insert({
          ...basePayload,
          created_by: user.id,
        });
        if (error) throw error;
      } else if (categoryModalState.data) {
        const { error } = await supabaseClient
          .from('categories')
          .update(basePayload)
          .eq('id', categoryModalState.data.id);
        if (error) throw error;
      }

      await refreshData();
      closeCategoryModal();
    } catch (error) {
      console.error(error);
      setCategoryModalState((prev) => ({
        ...prev,
        error: error.message ?? 'Unable to save category.',
      }));
    } finally {
      setCategorySubmitting(false);
    }
  };

  const handleCategoryDelete = async (category) => {
    if (!category?.id) return;
    setCategorySubmitting(true);

    try {
      const { count, error: countError } = await supabaseClient
        .from('project_categories')
        .select('*', { head: true, count: 'exact' })
        .eq('category_id', category.id);

      if (countError) throw countError;

      if (count && count > 0) {
        setCategoryModalState((prev) => ({
          ...prev,
          error: `Cannot delete category. It is referenced by ${count} project(s).`,
        }));
        setCategorySubmitting(false);
        return;
      }

      const { error: deleteError } = await supabaseClient
        .from('categories')
        .delete()
        .eq('id', category.id);

      if (deleteError) throw deleteError;

      await refreshData();
      closeCategoryModal();
    } catch (error) {
      console.error(error);
      setCategoryModalState((prev) => ({
        ...prev,
        error: error.message ?? 'Unable to delete category.',
      }));
    } finally {
      setCategorySubmitting(false);
    }
  };

  const handleProjectSubmit = async (formData) => {
    if (!user?.id) {
      setProjectModalState((prev) => ({
        ...prev,
        error: 'Missing user context. Please sign out and sign in again.',
      }));
      return;
    }

    setProjectSubmitting(true);

    const slug =
      projectModalState.mode === 'edit' && projectModalState.data?.slug
        ? projectModalState.data.slug
        : slugify(formData.title);

    let imageUrl = formData.image_url?.trim() || null;

    try {
      if (formData.imageFile) {
        imageUrl = await uploadProjectImage(formData.imageFile);
      }

      const basePayload = {
        title: formData.title.trim(),
        slug,
        summary: formData.summary.trim(),
        body: formData.body?.trim() || null,
        image_url: imageUrl,
        accent_color: formData.accent_color?.trim() || 'bg-neutral-200',
        project_url: formData.project_url?.trim() || null,
        roles: formData.roles,
        is_featured: formData.is_featured,
        is_published: formData.is_published,
        updated_by: user.id,
      };

      let projectId = projectModalState.data?.id;

      if (projectModalState.mode === 'create') {
        const { data, error } = await supabaseClient
          .from('projects')
          .insert({ ...basePayload, created_by: user.id })
          .select('id')
          .single();

        if (error) throw error;
        projectId = data.id;
      } else if (projectId) {
        const { error } = await supabaseClient.from('projects').update(basePayload).eq('id', projectId);
        if (error) throw error;

        const { error: linkDeleteError } = await supabaseClient
          .from('project_categories')
          .delete()
          .eq('project_id', projectId);
        if (linkDeleteError) throw linkDeleteError;
      }

      if (projectId && formData.categoryIds.length > 0) {
        const linkPayload = formData.categoryIds.map((categoryId) => ({
          project_id: projectId,
          category_id: categoryId,
        }));

        const { error: linkError } = await supabaseClient
          .from('project_categories')
          .insert(linkPayload);
        if (linkError) throw linkError;
      }

      await refreshData();
      closeProjectModal();
    } catch (error) {
      console.error(error);
      setProjectModalState((prev) => ({
        ...prev,
        error: error.message ?? 'Unable to save project.',
      }));
    } finally {
      setProjectSubmitting(false);
    }
  };

  const handleProjectDelete = async (project) => {
    if (!project?.id) return;

    setProjectSubmitting(true);
    try {
      const { error } = await supabaseClient.from('projects').delete().eq('id', project.id);
      if (error) throw error;
      await refreshData();
      closeProjectModal();
    } catch (error) {
      console.error(error);
      setProjectModalState((prev) => ({
        ...prev,
        error: error.message ?? 'Unable to delete project.',
      }));
    } finally {
      setProjectSubmitting(false);
    }
  };

  const categoryUsageCounts = useMemo(() => {
    const counts = new Map();
    projects.forEach((project) => {
      project.categories?.forEach((category) => {
        counts.set(category.id, (counts.get(category.id) ?? 0) + 1);
      });
    });
    return counts;
  }, [projects]);

  console.log('[AdminDashboard] Render state:', { isLoading, isBootstrapping, user: !!user });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Checking authentication...</p>
      </div>
    );
  }

  if (isBootstrapping) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Loading dashboard…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            No active session detected
          </p>
          <button
            onClick={() => navigate('/admin/00/login', { replace: true })}
            className="rounded-md border border-zinc-700 px-4 py-2 text-xs uppercase tracking-wide text-zinc-300 hover:border-white hover:text-white"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Control Room</p>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-sm font-medium">{user.email}</p>
            <p className="text-xs text-zinc-400">{user.email}</p>
          </div>
          <button
            onClick={async () => {
              await signOut();
              navigate('/admin/00/login', { replace: true });
            }}
            className="rounded-md border border-zinc-700 px-4 py-2 text-xs uppercase tracking-wide transition hover:border-red-400 hover:text-red-400"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="px-6 py-8 space-y-6">
        <section className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-wide uppercase text-zinc-400">Overview</h2>
            <p className="text-sm text-zinc-500">
              Manage showcased projects, categories, and media in one place.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={refreshData}
              disabled={isRefreshing}
              className="rounded-md border border-zinc-700 px-4 py-2 text-xs uppercase tracking-wide transition hover:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isRefreshing ? 'Refreshing…' : 'Refresh'}
            </button>
            <button
              onClick={openCreateCategoryModal}
              className="rounded-md border border-zinc-700 px-4 py-2 text-xs uppercase tracking-wide transition hover:border-white"
            >
              New Category
            </button>
            <button
              onClick={openCreateProjectModal}
              className="rounded-md bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-black transition hover:bg-zinc-200"
            >
              New Project
            </button>
          </div>
        </section>

        {dashboardError && (
          <div className="rounded-lg border border-red-500/60 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {dashboardError}
          </div>
        )}

        <section className="grid gap-6 lg:grid-cols-[360px,1fr]">
          <aside className="space-y-4">
            <DashboardPanel title="Quick Stats">
              <ul className="space-y-2 text-sm text-zinc-400">
                <li>
                  Total projects:{' '}
                  <span className="text-white">{projects.length}</span>
                </li>
                <li>
                  Active categories:{' '}
                  <span className="text-white">
                    {categories.filter((category) => category.is_active).length}
                  </span>
                </li>
                <li>
                  Draft projects:{' '}
                  <span className="text-white">
                    {projects.filter((project) => !project.is_published).length}
                  </span>
                </li>
              </ul>
            </DashboardPanel>

            <DashboardPanel title="Tips">
              <ul className="space-y-2 text-xs text-zinc-400">
                <li>Projects only appear publicly when marked as published.</li>
                <li>Inactive categories remain hidden from the landing page filter.</li>
                <li>Upload images under 5MB for the best experience.</li>
              </ul>
            </DashboardPanel>
          </aside>

          <section className="space-y-6">
            <DashboardPanel title="Projects">
              {projects.length === 0 ? (
                <p className="text-sm text-zinc-500">
                  No projects yet. Click &ldquo;New Project&rdquo; to create one.
                </p>
              ) : (
                <ul className="space-y-3 text-sm text-zinc-200">
                  {projects.map((project) => (
                    <li
                      key={project.id}
                      className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-5"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="text-base font-medium text-white">{project.title}</p>
                          <p className="text-xs text-zinc-500 mt-1">
                            {project.is_published ? 'Published' : 'Draft'} ·{' '}
                            {project.is_featured ? 'Featured' : 'Standard'}
                          </p>
                          <p className="mt-3 text-sm text-zinc-400">{project.summary}</p>
                          {project.roles?.length > 0 && (
                            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-zinc-500">
                              Roles: <span className="text-zinc-300">{project.roles.join(', ')}</span>
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-3 text-right">
                          <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                            {project.categories?.map((category) => category.name).join(', ') ||
                              'Uncategorized'}
                          </span>
                          <div className="flex items-center gap-2">
                            {project.project_url && (
                              <a
                                href={project.project_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-md border border-zinc-700 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-zinc-400 hover:border-white hover:text-white"
                              >
                                View
                              </a>
                            )}
                            <button
                              type="button"
                              onClick={() => openEditProjectModal(project)}
                              className="rounded-md border border-zinc-700 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-zinc-400 hover:border-white hover:text-white"
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </DashboardPanel>

            <DashboardPanel title="Categories">
              {categories.length === 0 ? (
                <p className="text-sm text-zinc-500">
                  No categories yet. Click &ldquo;New Category&rdquo; to create one.
                </p>
              ) : (
                <ul className="space-y-3 text-sm text-zinc-200">
                  {categories.map((category) => {
                    const usageCount = categoryUsageCounts.get(category.id) ?? 0;
                    return (
                      <li
                        key={category.id}
                        className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div>
                            <p className="text-base font-medium text-white">
                              {category.name}{' '}
                              {!category.is_active && (
                                <span className="ml-2 rounded-full border border-red-500/40 px-2 py-0.5 text-[10px] uppercase tracking-[0.3em] text-red-300">
                                  inactive
                                </span>
                              )}
                            </p>
                            <p className="text-xs text-zinc-500 mt-1">Slug: {category.slug}</p>
                            {category.description && (
                              <p className="mt-2 text-sm text-zinc-400">{category.description}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-zinc-500">
                            <span>Projects: {usageCount}</span>
                            <button
                              type="button"
                              onClick={() => openEditCategoryModal(category)}
                              className="rounded-md border border-zinc-700 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-zinc-400 hover:border-white hover:text-white"
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </DashboardPanel>
          </section>
        </section>
      </main>

      <CategoryFormModal
        mode={categoryModalState.mode}
        isOpen={categoryModalState.open}
        initialData={categoryModalState.data}
        onClose={closeCategoryModal}
        onSubmit={handleCategorySubmit}
        onDelete={handleCategoryDelete}
        isSubmitting={categorySubmitting}
        disableDelete={
          categoryModalState.mode === 'edit' &&
          Boolean(categoryUsageCounts.get(categoryModalState.data?.id ?? ''))
        }
        errorMessage={categoryModalState.error}
      />

      <ProjectFormModal
        mode={projectModalState.mode}
        isOpen={projectModalState.open}
        initialData={projectModalState.data}
        categories={categories}
        onClose={closeProjectModal}
        onSubmit={handleProjectSubmit}
        onDelete={handleProjectDelete}
        isSubmitting={projectSubmitting}
        errorMessage={projectModalState.error}
      />

      <Cursor />
    </div>
  );
};

const DashboardPanel = ({ title, children }) => (
  <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
    <header className="mb-4 flex items-center justify-between">
      <h2 className="text-sm uppercase tracking-[0.25em] text-zinc-500">{title}</h2>
    </header>
    {children}
  </div>
);

export default AdminDashboard;

DashboardPanel.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
