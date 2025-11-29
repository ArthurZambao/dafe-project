'use client';

import { ConfirmModalProps } from '@/types/confirmModal';
import React from 'react';

export function ConfirmModal({
  isOpen,
  title = 'Confirmar ação',
  message = 'Você tem certeza disso?',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
        <h2 className="text-lg font-semibold mb-4 text-azure-primary">{title}</h2>

        <p className="text-sm text-gray-700 mb-6">{message}</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition cursor-pointer"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition cursor-pointer"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
