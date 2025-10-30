import { useEffect, useState } from 'react';
import DashboardModal from './DashboardModal';

const DEFAULT_FORM = {
  name: '',
  description: '',
  slug: '',
  is_active: true,
};

const CategoryFormModal = ({
  mode,
  isOpen,
  onClose,
  onSubmit,
  onDelete,
  isSubmitting,
  initialData,
  disableDelete,
  errorMessage,
}) => {
  const [form, setForm] = useState(DEFAULT_FORM);
  const isEdit = mode === 'edit';

  useEffect(() => {
    if (isOpen) {
      setForm(
        initialData
          ? {
              name: initialData.name ?? '',
              description: initialData.description ?? '',
              slug: initialData.slug ?? '',
              is_active: initialData.is_active ?? true,
            }
          : DEFAULT_FORM,
      );
    }
  }, [initialData, isOpen]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  const handleDelete = () => {
    if (!initialData || disableDelete) return;
    const confirmDelete = window.confirm(
      `Delete category "${initialData.name}"? This cannot be undone.`,
    );
    if (confirmDelete) {
      onDelete(initialData);
    }
  };

  return (
    <DashboardModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Category' : 'New Category'}
      description={
        isEdit ? 'Update category details and availability.' : 'Create a new filter category.'
      }
      footer={
        <div className="flex items-center justify-between">
          {isEdit ? (
            <button
              type="button"
              onClick={handleDelete}
              disabled={disableDelete || isSubmitting}
              className="rounded-md border border-red-500/60 px-4 py-2 text-xs uppercase tracking-[0.2em] text-red-400 hover:border-red-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Delete Category
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
              form="category-form"
              disabled={isSubmitting}
              className="rounded-md bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:bg-zinc-500/40"
            >
              {isSubmitting ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Category'}
            </button>
          </div>
        </div>
      }
    >
      <form id="category-form" onSubmit={handleSubmit} className="space-y-5 text-white">
        <label className="block text-xs uppercase tracking-[0.3em] text-zinc-500">
          Name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="e.g. Web Application"
            className="mt-2 w-full rounded-md border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
          />
        </label>

        <label className="block text-xs uppercase tracking-[0.3em] text-zinc-500">
          Slug
          <input
            type="text"
            name="slug"
            value={form.slug}
            onChange={handleChange}
            placeholder="auto-generated if left empty"
            className="mt-2 w-full rounded-md border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
          />
        </label>

        <label className="block text-xs uppercase tracking-[0.3em] text-zinc-500">
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            placeholder="Optional helper text"
            className="mt-2 w-full rounded-md border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
          />
        </label>

        <label className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-zinc-500">
          <input
            type="checkbox"
            name="is_active"
            checked={form.is_active}
            onChange={handleChange}
            className="accent-white"
          />
          Active
        </label>

        {errorMessage && <p className="text-xs text-red-400">{errorMessage}</p>}
      </form>
    </DashboardModal>
  );
};

export default CategoryFormModal;
