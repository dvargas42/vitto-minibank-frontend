export function validBankNotes(value: string) {
  const parseValue = Number(value)

  const notes100 = Math.floor(parseValue / 100)
  const notes50 = Math.floor((parseValue % 100) / 50)
  const notes20 = Math.floor(((parseValue % 100) % 50) / 20)
  const notes10 = Math.floor((((parseValue % 100) % 50) % 20) / 10)
  const notes05 = Math.floor(((((parseValue % 100) % 50) % 20) % 10) / 5)
  const notes02 = Math.floor((((((parseValue % 100) % 50) % 20) % 10) % 5) / 2)

  const total = notes100 * 100 + notes50 * 50 + notes20 * 20 + notes10 * 10 + notes05 * 5 + notes02 * 2

  return total
}