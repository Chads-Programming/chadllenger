import { useModalTrigger } from './modal-trigger'

interface ModalHeaderProps {
  title?: string
  description?: string
  children?: React.ReactNode
}

interface ModalContainerProps {
  id: string
  onCloseModal?: () => void
  children: React.ReactNode
}

interface ModalContentProps {
  children: React.ReactNode
}

interface ModalCompositionProps {
  Header: React.FC<ModalHeaderProps>
  Content: React.FC<ModalContentProps>
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <>
      {title && <h3 className="font-bold text-lg">{title}</h3>}
      {description && <p className="py-4">{description}</p>}
      {children}
    </>
  )
}

export const ModalContent: React.FC<ModalContentProps> = ({ children }) => {
  return <div className="modal-action">{children}</div>
}

export const ModalContainer: React.FC<ModalContainerProps> &
  ModalCompositionProps = ({ id, children, onCloseModal }) => {
  const { closeModal } = useModalTrigger()

  const handleCloseModal = () => {
    if (onCloseModal) {
      onCloseModal()
    }
    closeModal(id)
  }

  return (
    <>
      <dialog id={id} className="modal">
        <div className="modal-box">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleCloseModal}
          >
            ✕
          </button>
          {children}
        </div>
      </dialog>
    </>
  )
}

ModalContainer.Header = ModalHeader
ModalContainer.Content = ModalContent
ModalContainer.displayName = 'ModalContainer'
