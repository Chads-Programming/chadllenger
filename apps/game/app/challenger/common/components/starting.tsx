import ChallengeStrings from '../strings/challenge'

export const Starting = () => {
  return (
    <article className="flex flex-col items-center justify-center p-4 gap-4">
      <h1 className="text-4xl font-bold">
        {ChallengeStrings.challenge.starting.title}
      </h1>
      <p className="text-lg text-pretty">
        {ChallengeStrings.challenge.starting.subtTitle}
      </p>
      <p className="text-lg text-pretty">
        {ChallengeStrings.challenge.starting.description}
      </p>
    </article>
  )
}
