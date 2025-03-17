import React, { useEffect, useState } from 'react';

export function ErrorLogger() {
  const [errors, setErrors] = useState<string[]>([]);
  
  useEffect(() => {
    const originalConsoleError = console.error;
    const errorHandler = (event: ErrorEvent) => {
      setErrors(prev => [...prev, `${event.message} (${event.filename})`]);
      event.preventDefault();
    };
    
    const unhandledRejectionHandler = (event: PromiseRejectionEvent) => {
      setErrors(prev => [...prev, `Promise rejection: ${event.reason}`]);
      event.preventDefault();
    };
    
    console.error = (...args) => {
      setErrors(prev => [...prev, args.join(' ')]);
      originalConsoleError.apply(console, args);
    };
    
    window.addEventListener('error', errorHandler);
    window.addEventListener('unhandledrejection', unhandledRejectionHandler);
    
    return () => {
      window.removeEventListener('error', errorHandler);
      window.removeEventListener('unhandledrejection', unhandledRejectionHandler);
      console.error = originalConsoleError;
    };
  }, []);
  
  if (errors.length === 0) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-red-900/90 text-white p-4 z-50 max-h-60 overflow-auto">
      <h3 className="font-bold mb-2">Resource Loading Errors:</h3>
      <ul className="text-xs">
        {errors.map((error, i) => (
          <li key={i} className="mb-1">{error}</li>
        ))}
      </ul>
      <button 
        onClick={() => setErrors([])} 
        className="absolute top-2 right-2 bg-red-700 px-2 py-1 rounded text-xs"
      >
        Clear
      </button>
    </div>
  );
} 