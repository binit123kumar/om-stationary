// Admin status toast area.
import { ToastStack } from '../common/Toast.jsx';

export function AdminToast({ toasts = [], onDismiss }) {
  return <ToastStack toasts={toasts} onDismiss={onDismiss} />;
}
