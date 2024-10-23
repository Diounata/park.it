import { Timestamp } from '../value-objects/timestamp';
import { Account } from './account';

describe('[Entity] Account', () => {
  it('should create a valid account', () => {
    const props = {
      id: 'account-id',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      rawPassword: '123456',
    };

    const account = new Account(props);

    expect(account.getId()).toBe(props.id);
    expect(account.getName()).toBe(props.name);
    expect(account.getEmail()).toBe(props.email);
    expect(account.getPassword()).toBeTruthy();
    expect(account.verifyRawPassword(props.rawPassword)).toBe(true);
    expect(account.getTimestamp()).toBeInstanceOf(Timestamp);
  });
});
