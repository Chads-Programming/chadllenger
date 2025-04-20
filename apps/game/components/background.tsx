'use client'

import { cn } from 'lib/utils'
import { AnimatedGridPattern } from './animated-grid-pattern'

export const ChallengeBackground = () => {
  return (
    <div className="absolute top-0 z-[-2] flex h-screen w-full items-center justify-center overflow-hidden bg-background p-10">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={15}
        repeatDelay={1}
        className={cn(
          '[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]',
          'inset-x-0 inset-y-[-30%] h-[200%] skew-y-12',
        )}
      />
    </div>
  )
}
