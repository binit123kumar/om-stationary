// Admin destructive-action confirmation.
import { ConfirmDialog } from '../common/ConfirmDialog.jsx';

export function AdminConfirmDialog(props) {
  return <ConfirmDialog danger {...props} />;
}
