import Avatar from 'components/ui/avatar'
import { Check, Edit, X } from 'lucide-react'
import { useUser } from 'providers/user-provider'
import { useState } from 'react'
import { useLobby } from '../providers/lobby.provider'

type UpdateCaller = (value: { username: string }) => void

interface EditableProps {
  editable: true
  onChange: UpdateCaller
}

interface BaseProps {
  editable?: boolean
}

type Props = BaseProps | EditableProps

const PlayerCard = ({ editable, ...rest }: Props) => {
  const { userID, username, changeUsername } = useUser()
  const { challengeType, lobbyTexts } = useLobby()
  
  const [text, setText] = useState(username)
  const [editedText, setEditedText] = useState(username)

  const [isEditing, setIsEditing] = useState(false)

  const handleEdit = () => {
    setIsEditing(true)
    setEditedText(text)
  }

  const handleAccept = () => {
    const { onChange } = rest as EditableProps

    setText(editedText)
    setIsEditing(false)
    changeUsername(editedText)

    if (onChange) {
      onChange({ username: editedText })
    }
  }

  const handleReject = () => {
    setEditedText(text)
    setIsEditing(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedText(e.target.value)
  }

  return (
    <div className="card card-side bg-base-100 shadow-sm overflow-hidden">
      <Avatar id={userID} name={username} />
      <div className="card-body relative">
        <div className="relative flex items-center gap-2">
          {isEditing ? (
            <>
              <input
                type="text"
                value={editedText}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder={
                  lobbyTexts.playerCard
                    .placeholder
                }
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleAccept}
                  className="btn btn-sm btn-success text-base-100"
                  aria-label="Accept changes"
                >
                  <Check size={16} />
                </button>
                <button
                  type="button"
                  onClick={handleReject}
                  className="btn btn-sm btn-error text-base-100"
                  aria-label="Reject changes"
                >
                  <X size={16} />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex-1 py-2">
                {text || (
                  <span className="text-secondary text-sm">
                    {lobbyTexts.playerCard.placeholder}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={handleEdit}
                className="btn btn-sm btn-primary"
                aria-label="Edit text"
              >
                <Edit size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default PlayerCard
