const adjectives = [
  'Happy',
  'Lucky',
  'Brave',
  'Clever',
  'Swift',
  'Mighty',
  'Noble',
  'Wise',
  'Chrispio',
  'Bright',
  'Wild',
  'Silent',
  'Mystic',
  'Golden',
  'Epic',
  'Fierce',
  'Grand',
  'Fow',
  'Ground',
  'Arturo',
  'Andres',
  'Mauro',
  'Kirbe',
]

const nouns = [
  'Panda',
  'Dragon',
  'Tiger',
  'Phoenix',
  'Wolf',
  'Eagle',
  'Lion',
  'Bear',
  'Falcon',
  'Hawk',
  'Knight',
  'Warrior',
  'Hero',
  'Legend',
  'Champion',
  'Master',
  'Mind',
  'Fox',
  'Display',
]

export function generateUsername(): string {
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)]
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]
  const randomNumber = Math.floor(Math.random() * 1000)

  return `${randomAdjective}${randomNoun}${randomNumber}`
}
