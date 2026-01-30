import React, { useEffect } from "react";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";

const toastStyles = {
  success: {
    bg: "bg-green-50",
    border: "border-green-200",
    icon: CheckCircle,
    iconColor: "text-green-500",
    textColor: "text-green-800",
  },
  error: {
    bg: "bg-red-50",
    border: "border-red-200",
    icon: XCircle,
    iconColor: "text-red-500",
    textColor: "text-red-800",
  },
  warning: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    icon: AlertCircle,
    iconColor: "text-amber-500",
    textColor: "text-amber-800",
  },
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: Info,
    iconColor: "text-blue-500",
    textColor: "text-blue-800",
  },
};

// Single toast component
export function Toast({
  id,
  type = "info",
  title,
  message,
  onClose,
  duration = 5000,
}) {
  const style = toastStyles[type];
  const Icon = style.icon;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  return (
    <div
      className={`${style.bg} ${style.border} border rounded-xl p-4 shadow-lg flex items-start gap-3 min-w-[320px] max-w-md animate-slide-in`}
    >
      <Icon className={`${style.iconColor} shrink-0 mt-0.5`} size={20} />
      <div className="flex-1">
        {title && <p className={`font-semibold ${style.textColor}`}>{title}</p>}
        {message && (
          <p className={`text-sm ${style.textColor} opacity-90`}>{message}</p>
        )}
      </div>
      <button
        onClick={() => onClose(id)}
        className={`${style.textColor} opacity-60 hover:opacity-100 transition-opacity`}
      >
        <X size={18} />
      </button>
    </div>
  );
}

// Toast container - renders at top-right
export function ToastContainer({ toasts, onClose }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={onClose} />
      ))}
    </div>
  );
}

export default Toast;
