import { useEffect, useState } from 'react'

interface Props {
  id: string
  name: string
}

const getRandomAvatarSource = (seed: string) => {
  return `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(seed)}`
}

const Avatar = ({ id, name }: Props) => {
  const [avatarUrl, setAvatarUrl] = useState('')

  useEffect(() => {
    setAvatarUrl(getRandomAvatarSource(id))
  }, [id])

  return (
    <div className="avatar">
      <div className="w-12 rounded-full">
        <img
          className="w-full h-auto"
          draggable={false}
          src={avatarUrl}
          alt={`avatar_img_for_${name}`}
        />
      </div>
    </div>
  )
}

export default Avatar
