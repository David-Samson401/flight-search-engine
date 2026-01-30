import { useState } from "react";

// Custom hook for managing toasts
export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { ...toast, id }]);
    return id;
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const success = (title, message) =>
    addToast({ type: "success", title, message });
  const error = (title, message) => addToast({ type: "error", title, message });
  const warning = (title, message) =>
    addToast({ type: "warning", title, message });
  const info = (title, message) => addToast({ type: "info", title, message });

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
  };
}

export default useToast;
