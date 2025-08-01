import { cn } from 'lib/utils'
import type React from 'react'

interface Props {
  title: string
  banner: string
  description: string
  onClick?: () => void
  children?: React.ReactNode
}

export const LobbyCard = ({
  title,
  banner,
  description,
  children,
  onClick,
}: Props) => {
  return (
    <article
      onClick={onClick}
      onKeyDown={onClick}
      className={cn(
        'lobby-card card bg-base-100 w-96 shadow-sm group overflow-hidden border border-base-300 dark:border-base-700 transition-transform duration-300 hover:scale-105',
        {
          'cursor-pointer': onClick,
        },
      )}
    >
      <figure className="group-hover:scale-105 transition-transform duration-300">
        <img
          className="w-full h-full object-cover"
          src={banner}
          alt={description}
          draggable="false"
        />
      </figure>
      <div className="card-body opacity-100 group-hover:opacity-80 transition-opacity duration-300">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions mt-4">{children}</div>
      </div>
    </article>
  )
}
