import { describe, expect, it } from 'vitest'
import { User } from './user'

describe('[Entity] User', () => {
  it('should create a valid user', () => {
    const props = {
      id: 'user-id',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      rawPassword: '123456',
    }

    const user = new User(props)

    expect(user.getId()).toBe(props.id)
    expect(user.getName()).toBe(props.name)
    expect(user.getEmail()).toBe(props.email)
    expect(user.getPassword()).toBeTruthy()
    expect(user.verifyRawPassword(props.rawPassword)).toBe(true)
  })
})
