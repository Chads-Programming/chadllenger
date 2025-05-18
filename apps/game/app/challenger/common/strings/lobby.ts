import { ChallengeType } from '@repo/schemas'

export type ChallengeStrings = {
  banner: string
  description: string
  createChallenge: {
    title: string
    description: string
    banner: string
    button: string
  }
  joinChallenge: {
    title: string
    description: string
    banner: string
    button: string
  }
  playerCard: {
    placeholder: string
  }
}

type LobbyStrings = {
  title: string
  backToMainMenu: string
  chooseOption: string
  challengeType: {
    [key in ChallengeType]: ChallengeStrings
  }
  onlinePlayers: {
    title: string
  }
}

export const LobbyStrings: LobbyStrings = {
  title: 'Elige tu próximo desafío',
  backToMainMenu: 'Volver al menú principal',
  chooseOption: 'Elige una opción para comenzar a jugar',
  challengeType: {
    [ChallengeType.Quiz]: {
      banner: '/images/chad-quest.png',
      description: 'Desafía a tus amigos a un juego de preguntas y respuestas',
      createChallenge: {
        title: 'Crear un Quiz',
        description:
          'Crea y configura tu propio desafío para jugar con tus amigos',
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
      description: 'Compite en desafíos de codificación en tiempo real',
      banner: '/images/clash-of-code.png',
      createChallenge: {
        title: 'Crear un clash of code',
        description:
          'Crea y configura tu propio desafío para jugar con tus amigos',
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
  },
  onlinePlayers: {
    title: 'En línea',
  },
}
