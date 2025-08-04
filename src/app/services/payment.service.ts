import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { CONTAINER_TYPES } from 'src/core/inversify/types';
import { PaymentRequest, PaymentResult } from 'src/core/types/payment.type';
import { TronService } from './tron.service';

@injectable()
export class PaymentService {
  constructor(
    @inject(CONTAINER_TYPES.Prisma)
    private readonly prisma: PrismaClient,
    @inject(CONTAINER_TYPES.TronService)
    private readonly tronService: TronService,
  ) {}

  async createPayment(request: PaymentRequest): Promise<string> {
    return this.tronService.generateAddress(request.userId);
  }

  async checkPayment(address: string): Promise<PaymentResult> {
    const balance = await this.tronService
      .getUSDTBalance(address)
      .then((tronBalance) => Number(tronBalance));

    if (balance <= 0) {
      return { success: false, error: 'No payment detected' };
    }

    const txHash = await this.findLastTx(address); // (Реализуйте запрос к TronGrid API)
    const isConfirmed =
      txHash && (await this.tronService.isTxConfirmed(txHash));

    if (isConfirmed) {
      await this.prisma.tempAddress.delete({ where: { address } });
      return { success: true, txHash };
    }

    return { success: false, error: 'Payment not confirmed' };
  }

  private async findLastTx(address: string): Promise<string | null> {
    return 'tx_hash_here';
  }
}
