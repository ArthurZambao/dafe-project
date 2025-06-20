'use client';

import { useState } from 'react';

export function RequiredToggle() {
  const [isRequired, setIsRequired] = useState(false);

  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={isRequired}
          onChange={() => setIsRequired(!isRequired)}
        />
        <div
          className={`w-10 h-5 rounded-full shadow-inner transition-colors duration-300 ${
            isRequired ? 'bg-blue-500' : 'bg-gray-300'
          }`}
        ></div>
        <div
          className={`dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform duration-300 ${
            isRequired ? 'translate-x-5' : ''
          }`}
        ></div>
      </div>
      <span className="text-sm font-medium">Obrigatória</span>
    </label>
  );
}
