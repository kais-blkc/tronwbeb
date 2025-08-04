export interface PaymentRequest {
  userId: string;
  amount: number;
}

export interface PaymentResult {
  success: boolean;
  txHash?: string;
  error?: string;
}

export enum PaymentStatus {
  pending = 'pending',
  completed = 'completed',
  failed = 'failed',
}
