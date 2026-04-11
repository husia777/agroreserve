// Настройка react-hot-toast
import toast, { Toaster } from 'react-hot-toast'
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react'

// Настройки Toaster
export const ToasterConfig = () => (
  <Toaster
    position="top-right"
    gutter={8}
    toastOptions={{
      duration: 4000,
      style: {
        background: '#fff',
        color: '#111827',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        fontSize: '14px',
        maxWidth: '380px',
        padding: '12px 16px',
      },
      success: {
        duration: 3000,
        icon: undefined,
        style: {
          borderLeft: '4px solid #16A34A',
        },
      },
      error: {
        duration: 5000,
        icon: undefined,
        style: {
          borderLeft: '4px solid #EF4444',
        },
      },
    }}
  />
)

// Хелперы для показа уведомлений
export const showToast = {
  success: (message: string) =>
    toast.success(message, {
      icon: <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />,
    }),

  error: (message: string) =>
    toast.error(message, {
      icon: <XCircle className="h-5 w-5 flex-shrink-0 text-red-600" />,
    }),

  warning: (message: string) =>
    toast(message, {
      icon: <AlertTriangle className="h-5 w-5 flex-shrink-0 text-yellow-500" />,
      style: {
        borderLeft: '4px solid #F59E0B',
      },
    }),

  info: (message: string) =>
    toast(message, {
      icon: <Info className="h-5 w-5 flex-shrink-0 text-blue-500" />,
      style: {
        borderLeft: '4px solid #3B82F6',
      },
    }),

  loading: (message: string) => toast.loading(message),

  dismiss: (toastId?: string) => {
    if (toastId) {
      toast.dismiss(toastId)
    } else {
      toast.dismiss()
    }
  },
}

export { toast }
export default ToasterConfig
