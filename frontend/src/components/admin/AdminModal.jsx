// Admin modal wrapper.
import { Modal } from '../common/Modal.jsx';

export function AdminModal({ open, onClose, title, children, wide = false }) {
  return (
    <Modal open={open} onClose={onClose} title={title} wide={wide}>
      {children}
    </Modal>
  );
}
