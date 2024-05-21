export function getDate(type: string) {
  const date = new Date()
  let year = date.getFullYear()
  const month = date.getMonth() + 1
  if (type === 'start')
    year = year - 60
  else if (type === 'end')
    year = year + 2
  return `${year}/${month > 9 ? month : `0${month}`}`
}
