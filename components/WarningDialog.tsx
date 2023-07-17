'use client';

import { Dialog } from '@headlessui/react';

interface WarningDialogProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const WarningDialog = ({ isOpen, onClose, message }: WarningDialogProps) => {
  return (
    <Dialog as="div" open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <Dialog.Panel className="fixed inset-0 flex items-center justify-center">
        <div className="rounded-lg bg-red-500 p-8 text-white">
          <h2 className="text-2xl font-bold">{message}</h2>
          <div className="mt-8 flex justify-end">
            <button
              className="rounded-md bg-red-500 px-4 py-2 font-bold text-white"
              onClick={onClose}
            >
              OK
            </button>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default WarningDialog;
