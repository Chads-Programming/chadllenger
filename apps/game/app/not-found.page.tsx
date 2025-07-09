import { Home } from 'lucide-react'
import { Link } from 'react-router'

import RootStrings from './strings'

const ChallengeNotFoundPage = () => {
  return (
    <article className="h-full flex flex-col items-center justify-center gap-4">
      <img
        src="/images/not-found.webp"
        alt="Recurso no encontrado"
        draggable="false"
        className="w-1/2 max-w-md rounded-4xl"
      />

      <h1 className="text-5xl font-semibold w-full text-center mt-4">
        {RootStrings.notFound.title}
      </h1>

      <p className="mt-5 max-w-2xl text-pretty text-lg text-center text-neutral-400 bg-linear-to-r from-primary/10 to-primary/5 shadow-2xl backdrop-blur-sm p-5 rounded-2xl">
        {RootStrings.notFound.description.partOne}
        <span className="text-primary font-medium mx-1">G.O.A.T</span>
        {RootStrings.notFound.description.partTwo}
      </p>

      <div className="flex flex-wrap gap-2 items-center justify-center mt-8">
        <Link to="/" className="btn btn-primary btn-lg">
          <Home /> <span>{RootStrings.notFound.actions.backToHome}</span>
        </Link>
      </div>
    </article>
  )
}

export default ChallengeNotFoundPage
