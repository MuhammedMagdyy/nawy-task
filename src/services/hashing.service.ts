import { hash, compare } from 'bcryptjs';

export class HashingService {
  private static readonly bcryptSaltRounds = 12;

  static async hash(text: string): Promise<string> {
    return await hash(text, this.bcryptSaltRounds);
  }
  static compare(text: string, hashedText: string): Promise<boolean> {
    return compare(text, hashedText);
  }
}
