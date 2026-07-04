"use client";

export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="glass-card relative w-full max-w-md p-7">
        <h2 className="font-display mb-5 text-xl text-cream">{title}</h2>
        {children}
      </div>
    </div>
  );
}
