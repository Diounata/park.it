import { Timestamp } from './timestamp';

describe('[VO] Timestamp', () => {
  it('should create a valid timestamp', () => {
    const timestamp = new Timestamp(
      new Date('2024-01-01T00:00:00.000Z'),
      new Date('2024-01-02T00:00:00.000Z'),
    );

    const createdAtISOString = timestamp.getCreatedAt().toISOString();
    const updatedAtISOString = timestamp.getUpdatedAt().toISOString();

    expect(createdAtISOString).toBe('2024-01-01T00:00:00.000Z');
    expect(updatedAtISOString).toBe('2024-01-02T00:00:00.000Z');
  });

  it('should throws an error when creating an createdAt greater than updatedAt', () => {
    expect(
      () =>
        new Timestamp(
          new Date('2024-01-02T00:00:00.000Z'),
          new Date('2024-01-01T00:00:00.000Z'),
        ),
    ).toThrow(new Error('createdAt should be less than updatedAt'));
  });
});
