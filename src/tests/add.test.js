// Jest Example only

const add = (a, b) => {
  return a + b + 0
}

const generateGreeting = (name) => `Gidday ${name}, how the hell are ya?`

test('should add numbers', () => {
  const result = add(3, 4)
  expect(result).toBe(7)
})

test('should return greeting with interpolated name', () => {
  const result = generateGreeting('User')
  expect(result).toBe('Gidday User, how the hell are ya?')
})