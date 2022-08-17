const pad = num => num.toString().padStart(2, '0')

export const utcDateOnly = (time) => {
  const dateTime = new Date(time)
  const day = pad(dateTime.getDate())
  const month = pad(dateTime.getMonth() + 1)
  const year = pad(dateTime.getFullYear())
  return `${year}/${month}/${day}`
}

export const utcDateTime = (time) => {
  const dateTime = new Date(time)
  const day = pad(dateTime.getDate())
  const month = pad(dateTime.getMonth() + 1)
  const year = pad(dateTime.getFullYear())
  const hour = pad(dateTime.getHours())
  const mins = pad(dateTime.getMinutes())
  return `${year}/${month}/${day}T${hour}:${mins}`
}

export const startOfMonth = () => {
  const dateTime = new Date()
  const day = '01'
  const month = pad(dateTime.getMonth() + 1)
  const year = pad(dateTime.getFullYear())
  const startOfMonth = new Date(`${year}-${month}-${day}T00:00:00.000Z`)
  return startOfMonth.getTime()
}

export const endOfMonth = () => {
  const dateTime = new Date()
  const day = '01'
  const month = pad(dateTime.getMonth() + 2)
  const year = pad(dateTime.getFullYear())
  const endOfMonth = new Date(`${year}-${month}-${day}T00:00:00.000Z`)
  return endOfMonth.getTime()
}