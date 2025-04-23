import { cn } from 'lib/utils'
import { useEffect, useState } from 'react'

interface Props {
  id: string
  name: string
  online?: boolean
}

const getRandomAvatarSource = (seed: string) => {
  return `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(seed)}`
}

const Avatar = ({ id, name, online }: Props) => {
  const [avatarUrl, setAvatarUrl] = useState('')

  useEffect(() => {
    setAvatarUrl(getRandomAvatarSource(id))
  }, [id])

  return (
    <div
      className={cn('avatar', {
        'avatar-online': online,
        'avatar-offline': !online,
      })}
    >
      <div className="w-24 rounded-full">
        <img draggable={false} src={avatarUrl} alt={`avatar_img_for_${name}`} />
      </div>
    </div>
  )
}

export default Avatar
