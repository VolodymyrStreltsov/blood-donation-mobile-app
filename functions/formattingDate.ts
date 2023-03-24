export const formattingDate = (date: Date | number | string) =>
  new Date(date).toLocaleDateString().replaceAll('/', '.')
