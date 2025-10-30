const DashboardModal = ({ title, description, isOpen, onClose, children, footer }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8">
      <div className="relative w-full max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">
        <div className="flex items-start justify-between border-b border-zinc-800 px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Admin Panel</p>
            <h2 className="text-2xl font-semibold text-white">{title}</h2>
            {description && <p className="mt-2 text-sm text-zinc-400">{description}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-zinc-700 px-3 py-1 text-xs uppercase tracking-[0.3em] text-zinc-400 hover:border-zinc-500 hover:text-white"
          >
            Close
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-6 py-6">{children}</div>
        {footer && <div className="border-t border-zinc-800 px-6 py-4">{footer}</div>}
      </div>
    </div>
  );
};

export default DashboardModal;
