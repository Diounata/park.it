export class Timestamp {
  private createdAt: Date;
  private updatedAt: Date;

  constructor(createdAt?: Date, updatedAt?: Date) {
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();

    if (this.createdAt > this.updatedAt) {
      throw new Error('createdAt should be less than updatedAt');
    }
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
