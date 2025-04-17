import { useCallback } from 'react'

interface Props {
  modalId: string
  children: React.ReactNode
}

export const useModalTrigger = () => {
  const openModal = useCallback((modalId: string) => {
    const documentRef = document?.getElementById(modalId) as HTMLDialogElement
    if (documentRef) {
      documentRef.showModal()
    }
  }, [])

  const closeModal = useCallback((modalId: string) => {
    const documentRef = document?.getElementById(modalId) as HTMLDialogElement
    if (documentRef) {
      documentRef.close()
    }
  }, [])

  return { openModal, closeModal }
}
