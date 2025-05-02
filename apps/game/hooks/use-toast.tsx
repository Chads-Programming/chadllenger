import {
  ToastActions,
  ToastBody,
  ToastLoading,
  ToastTemplate,
} from 'components/ui/toast-template'
import { useCallback } from 'react'
import { toast as sonnerToast } from 'sonner'

export type ToastType =
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'default'
  | 'loading'

type ToastOptions = { type: ToastType; dissmissAction?: true }

export const useToast = () => {
  const dismiss = useCallback(
    (id: string | number) => sonnerToast.dismiss(id),
    [],
  )

  const toast = useCallback(
    (message: string, options: ToastOptions = { type: 'default' }) => {
      return sonnerToast.custom(
        (id) => (
          <ToastTemplate
            message={message}
            type={options.type as Partial<ToastType>}
          >
            {options.type === 'loading' && <ToastLoading />}
            <ToastBody message={message} />
            {options.dissmissAction && (
              <ToastActions
                onClick={() => {
                  dismiss(id)
                }}
              />
            )}
          </ToastTemplate>
        ),
        {
          duration:
            options.type === 'loading' ? Number.POSITIVE_INFINITY : 3000,
        },
      )
    },
    [dismiss],
  )

  const showLoadingToast = useCallback((message: string) => {
    return sonnerToast.custom(
      () => <ToastTemplate message={message} type="loading" />,
      {
        duration: Number.POSITIVE_INFINITY,
      },
    )
  }, [])

  return {
    toast,
    dismiss,
  }
}
