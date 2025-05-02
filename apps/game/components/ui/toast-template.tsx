import type { ToastType } from 'hooks/use-toast'
import { cn } from 'lib/utils'
import { Loader } from 'lucide-react'

interface Props {
  type?: Partial<ToastType>
  message: string
  children?: React.ReactNode
}

export const ToastTemplate = ({
  type = 'default',
  message,
  children,
}: Props) => {
  return (
    <div
      className={cn('alert min-w-2xs flex flex-col gap-2', {
        'alert-success': type === 'success',
        'alert-error': type === 'error',
        'alert-warning': type === 'warning',
        'alert-info': type === 'info',
        'alert-primary': type === 'default',
        'alert-secondary': type === 'loading',
      })}
    >
      <div className="flex flex-row items-center w-full gap-2">{children}</div>
    </div>
  )
}

export const ToastLoading = () => <Loader className="animate-spin-slow" />

export const ToastActions = ({ onClick }: { onClick: () => void }) => (
  <div className="flex flex-row items-center justify-end w-full gap-2">
    <button type="button" className="btn btn-active" onClick={onClick}>
      <span className="text-sm">Ok</span>
    </button>
  </div>
)

export const ToastBody = ({ message }: { message: string }) => (
  <span className="w-full">{message}</span>
)
