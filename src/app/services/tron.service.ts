import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { tronWeb } from 'src/core/configs/tron.config';
import { CONTAINER_TYPES } from 'src/core/inversify/types';

@injectable()
export class TronService {
  private USDT_CONTRACT = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';

  constructor(
    @inject(CONTAINER_TYPES.Prisma)
    private readonly prisma: PrismaClient,
  ) {}

  // Генерация нового адреса
  async generateAddress(
    userId: string,
    ttlHours: number = 24,
  ): Promise<string> {
    const account = await tronWeb.createAccount();
    const address = account.address.base58;

    await this.prisma.tempAddress.create({
      data: {
        address,
        userId,
        expiresAt: new Date(Date.now() + ttlHours * 60 * 60 * 1000),
      },
    });

    return address;
  }

  // Проверка баланса USDT
  async getUSDTBalance(address: string): Promise<string> {
    const contract = await tronWeb.contract().at(this.USDT_CONTRACT);
    const balance = await contract.balanceOf(address).call();
    return tronWeb.fromSun(balance).toString();
  }

  // Проверка подтверждения транзакции
  async isTxConfirmed(txHash: string, minConfirmations = 3): Promise<boolean> {
    const txInfo = await tronWeb.trx.getTransactionInfo(txHash);
    return txInfo.internal_transactions.length >= minConfirmations;
  }
}
