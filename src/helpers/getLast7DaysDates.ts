export default function getLast7DaysDates(): string[] {
  const currentDate: Date = new Date()
  const output: string[] = []

  for (let i: number = 0; i < 7; i++) {
    const date: Date = new Date(currentDate)
    date.setDate(currentDate.getDate() - i)
    output.push(date.toISOString().slice(0, 10))
  }

  return output
}
