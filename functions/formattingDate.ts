export const formattingDate = (date: Date | string) =>
  new Date(date).toLocaleDateString().replaceAll('/', '.')
