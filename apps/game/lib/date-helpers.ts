const DateStrings = {
  dayAgo: {
    single: 'hace un $1 día atras',
    plural: 'hace $1 días atras',
  },
  hourAgo: {
    single: 'hace una $1 hora atras',
    plural: 'hace $1 horas atras',
  },
  minuteAgo: {
    single: 'hace un $1 minuto atras',
    plural: 'hace $1 minutos atras',
  },
  justNow: 'justo ahora',
}

const diffDates = (date1: Date, date2: Date) => {
  const diff = Math.abs(date2.getTime() - date1.getTime())
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  return {
    minutes,
    hours,
    days,
  }
}

const diffDatesToStringFromCurrentTime = (date: Date | string): string => {
  const { minutes, hours, days } = diffDates(new Date(date), new Date())

  if (days > 0) {
    return days === 1
      ? DateStrings.dayAgo.single.replace('$1', days.toString())
      : DateStrings.dayAgo.plural.replace('$1', days.toString())
  }
  if (hours > 0) {
    return hours === 1
      ? DateStrings.hourAgo.single.replace('$1', hours.toString())
      : DateStrings.hourAgo.plural.replace('$1', hours.toString())
  }
  if (minutes > 0) {
    return minutes === 1
      ? DateStrings.minuteAgo.single.replace('$1', minutes.toString())
      : DateStrings.minuteAgo.plural.replace('$1', minutes.toString())
  }

  return DateStrings.justNow
}

export default { diffDates, diffDatesToStringFromCurrentTime }
