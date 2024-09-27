import { describe, expect, it } from 'vitest'
import { Email } from './email'

describe('[VO] Email', () => {
  it('should create a valid email', () => {
    const email = new Email('johndoe@email.com')
    expect(email.getValue()).toBe('johndoe@email.com')
  })

  it('should throws an error when creating an invalid email', () => {
    const email = 'invalid.email@email'

    expect(() => new Email(email)).toThrow(new Error('Invalid email'))
  })
})
