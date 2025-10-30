import { useEffect, useMemo, useState } from 'react';
import DashboardModal from './DashboardModal';

const DEFAULT_FORM = {
  title: '',
  summary: '',
  body: '',
  image_url: '',
  accent_color: 'bg-neutral-200',
  project_url: '',
  roles: '',
  categoryIds: [],
  is_featured: false,
  is_published: true,
};

const ProjectFormModal = ({
  mode,
  isOpen,
  onClose,
  onSubmit,
  onDelete,
  isSubmitting,
  initialData,
  categories,
  errorMessage,
}) => {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [validationError, setValidationError] = useState('');
  const isEdit = mode === 'edit';

  useEffect(() => {
    if (isOpen) {
      setValidationError('');
      setImageFile(null);
      setForm(
        initialData
          ? {
              title: initialData.title ?? '',
              summary: initialData.summary ?? '',
              body: initialData.body ?? '',
              image_url: initialData.image_url ?? '',
              accent_color: initialData.accent_color ?? 'bg-neutral-200',
              project_url: initialData.project_url ?? '',
              roles: (initialData.roles ?? []).join(', '),
              categoryIds: initialData.categories?.map((cat) => cat.id) ?? [],
              is_featured: Boolean(initialData.is_featured),
              is_published: Boolean(initialData.is_published),
            }
          : DEFAULT_FORM,
      );
    }
  }, [initialData, isOpen]);

  const selectedCategoryCount = form.categoryIds.length;

  const categoryLookup = useMemo(
    () =>
      new Map(
        categories.map((category) => [
          category.id,
          {
            name: category.name,
            is_active: category.is_active,
          },
        ]),
      ),
    [categories],
  );

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (name === 'categoryIds') {
      const optionId = value;
      setForm((prev) => {
        const exists = prev.categoryIds.includes(optionId);
        const nextCategories = exists
          ? prev.categoryIds.filter((id) => id !== optionId)
          : [...prev.categoryIds, optionId];
        return { ...prev, categoryIds: nextCategories };
      });
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const maxSizeMB = 5;
      if (file.size > maxSizeMB * 1024 * 1024) {
        setValidationError(`Image must be smaller than ${maxSizeMB}MB.`);
        return;
      }
      setValidationError('');
      setImageFile(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.summary.trim()) {
      setValidationError('Summary is required.');
      return;
    }

    onSubmit({
      ...form,
      roles: form.roles
        .split(',')
        .map((role) => role.trim())
        .filter(Boolean),
      imageFile,
    });
  };

  const handleDelete = () => {
    if (!initialData) return;
    const confirmed = window.confirm(
      `Delete project "${initialData.title}"? This will remove it from the landing page.`,
    );
    if (confirmed) {
      onDelete(initialData);
    }
  };

  return (
    <DashboardModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Project' : 'New Project'}
      description={
        isEdit
          ? 'Revise project details, categories, and publication status.'
          : 'Publish a new project to showcase on the landing page.'
      }
      footer={
        <div className="flex items-center justify-between">
          {isEdit ? (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isSubmitting}
              className="rounded-md border border-red-500/60 px-4 py-2 text-xs uppercase tracking-[0.2em] text-red-400 hover:border-red-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Delete Project
            </button>
          ) : (
            <span />
          )}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-md border border-zinc-700 px-4 py-2 text-xs uppercase tracking-[0.2em] text-zinc-400 hover:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="project-form"
              disabled={isSubmitting}
              className="rounded-md bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:bg-zinc-500/40"
            >
              {isSubmitting ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Project'}
            </button>
          </div>
        </div>
      }
    >
      <form id="project-form" onSubmit={handleSubmit} className="space-y-5 text-white">
        <label className="block text-xs uppercase tracking-[0.3em] text-zinc-500">
          Title
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleInputChange}
            required
            placeholder="Project title"
            className="mt-2 w-full rounded-md border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
          />
        </label>

        <label className="block text-xs uppercase tracking-[0.3em] text-zinc-500">
          Summary
          <textarea
            name="summary"
            value={form.summary}
            onChange={handleInputChange}
            rows={3}
            required
            placeholder="Short description that appears on the landing page"
            className="mt-2 w-full rounded-md border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
          />
        </label>

        <label className="block text-xs uppercase tracking-[0.3em] text-zinc-500">
          Detail Body
          <textarea
            name="body"
            value={form.body}
            onChange={handleInputChange}
            rows={4}
            placeholder="Optional longer description or notes"
            className="mt-2 w-full rounded-md border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block text-xs uppercase tracking-[0.3em] text-zinc-500">
            Project URL
            <input
              type="url"
              name="project_url"
              value={form.project_url}
              onChange={handleInputChange}
              placeholder="https://"
              className="mt-2 w-full rounded-md border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
            />
          </label>

          <label className="block text-xs uppercase tracking-[0.3em] text-zinc-500">
            Accent Color (Tailwind class)
            <input
              type="text"
              name="accent_color"
              value={form.accent_color}
              onChange={handleInputChange}
              placeholder="bg-neutral-200"
              className="mt-2 w-full rounded-md border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block text-xs uppercase tracking-[0.3em] text-zinc-500">
            Roles (comma separated)
            <input
              type="text"
              name="roles"
              value={form.roles}
              onChange={handleInputChange}
              placeholder="Designer, Developer"
              className="mt-2 w-full rounded-md border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
            />
          </label>

          <label className="block text-xs uppercase tracking-[0.3em] text-zinc-500">
            Upload Preview Image
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2 w-full text-xs text-zinc-400 file:mr-4 file:rounded-md file:border-0 file:bg-zinc-800 file:px-4 file:py-2 file:text-xs file:uppercase file:tracking-[0.3em] file:text-white hover:file:bg-zinc-700"
            />
            {form.image_url && !imageFile && (
              <p className="mt-2 text-xs text-zinc-500">
                Current preview:{' '}
                <a href={form.image_url} target="_blank" rel="noopener noreferrer" className="underline">
                  Open image
                </a>
              </p>
            )}
            {imageFile && (
              <p className="mt-2 text-xs text-zinc-500">
                Selected: <span className="text-zinc-300">{imageFile.name}</span>
              </p>
            )}
          </label>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-2">
            Categories{' '}
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
              ({selectedCategoryCount} selected)
            </span>
          </p>

          <div className="flex flex-wrap gap-2">
            {categories.length === 0 && (
              <p className="text-xs text-zinc-500">Create a category before assigning projects.</p>
            )}
            {categories.map((category) => (
              <label
                key={category.id}
                className="flex items-center gap-2 rounded-full border border-zinc-700 px-3 py-2 text-xs uppercase tracking-[0.2em]"
              >
                <input
                  type="checkbox"
                  name="categoryIds"
                  value={category.id}
                  checked={form.categoryIds.includes(category.id)}
                  onChange={handleInputChange}
                  className="accent-white"
                />
                <span>
                  {category.name}
                  {!category.is_active && (
                    <span className="ml-2 text-[10px] uppercase tracking-[0.3em] text-red-400">
                      inactive
                    </span>
                  )}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-zinc-500">
            <input
              type="checkbox"
              name="is_featured"
              checked={form.is_featured}
              onChange={handleInputChange}
              className="accent-white"
            />
            Featured
          </label>

          <label className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-zinc-500">
            <input
              type="checkbox"
              name="is_published"
              checked={form.is_published}
              onChange={handleInputChange}
              className="accent-white"
            />
            Published
          </label>
        </div>

        {(validationError || errorMessage) && (
          <p className="text-xs text-red-400">{validationError || errorMessage}</p>
        )}
      </form>
    </DashboardModal>
  );
};

export default ProjectFormModal;
