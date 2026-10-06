// Toast notification area. Pages push {id, message, kind} messages here;
// each toast auto-dismisses.
import { useEffect } from 'react';

export function Toast({ toast, onDismiss }) {
  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => onDismiss?.(toast.id), 4200);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;
  return (
    <div className={`toast toast-${toast.kind || 'info'}`} role="status">
      <span>{toast.message}</span>
      <button type="button" aria-label="Dismiss" onClick={() => onDismiss?.(toast.id)}>&times;</button>
    </div>
  );
}

export function ToastStack({ toasts, onDismiss }) {
  return (
    <div className="toast-stack" aria-live="polite">
      {toasts.map((toast) => <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />)}
    </div>
  );
}
