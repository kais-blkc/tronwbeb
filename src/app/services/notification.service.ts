import { injectable } from 'inversify';

@injectable()
export class NotificationService {
  async sendPaymentSuccess(userId: string, amount: number) {
    // For example send email
    console.log(`Notification: User ${userId} received ${amount} TRX`);
  }
}
