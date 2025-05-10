import { ChallengeType } from '@repo/schemas'

export type ChallengeStrings = {
  createChallenge: {
    title: string
    description: string
    banner: string
    button: string
  },
  joinChallenge: {
    title: string
    description: string
    banner: string
    button: string
  },
  playerCard: {
    placeholder: string
  }
}

type LobbyStrings = {
  title: string
  challengeType: {
    [key in ChallengeType]: ChallengeStrings
  }
  onlinePlayers: {
    title: string
  }
}

export const LobbyStrings: LobbyStrings = {
  title: 'Elige tu próximo desafío',
  challengeType: {
    [ChallengeType.Quiz]: {
      createChallenge: {
        title: 'Crear un Quiz',
        description: 'Crea y configura tu propio desafío para jugar con tus amigos',
        banner: '/images/create-room.png',
        button: 'Crear sala',
      },
      joinChallenge: {
        title: 'Unirse a un desafío',
        description:
          'Únete a un desafío para jugar con tus amigos a través de un código de invitación',
        banner: '/images/join-room.png',
        button: 'Unirse a una sala',
      },
      playerCard: {
        placeholder: 'Escribe tu nombre',
      },
    },
    [ChallengeType.Clash]: {
      createChallenge: {
        title: 'Crear un clash of code',
        description: 'Crea y configura tu propio desafío para jugar con tus amigos',
        banner: '/images/create-room.png',
        button: 'Crear sala',
      },
      joinChallenge: {
        title: 'Unirse a un desafío',
        description:
          'Únete a un desafío para jugar con tus amigos a través de un código de invitación',
        banner: '/images/join-room.png',
        button: 'Unirse a una sala',
      },
      playerCard: {
        placeholder: 'Escribe tu nombre',
      },
    }
  },
  onlinePlayers: {
    title: 'En línea',
  }
}


