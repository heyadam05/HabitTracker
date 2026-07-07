import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import './Modal.css';

export function Modal({
  title,
  children,
  onClose,
  small,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  small?: boolean;
}) {
  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={onClose}
    >
      <motion.section
        className={`modal ${small ? 'modal--small' : ''}`}
        initial={{ y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="modal__header">
          <h2>{title}</h2>
          <button onClick={onClose} aria-label="Close modal">
            <X />
          </button>
        </header>
        {children}
      </motion.section>
    </motion.div>
  );
}
