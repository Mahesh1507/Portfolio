import React from 'react';

export function FallbackContent() {
  return (
    <div className="flex items-center justify-center h-full w-full bg-gray-800 rounded-lg p-8">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-white mb-2">Content Loading</h3>
        <p className="text-gray-300">
          If this message persists, please refresh the page.
        </p>
      </div>
    </div>
  );
} 