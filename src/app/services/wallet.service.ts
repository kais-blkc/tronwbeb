import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { tronWeb } from 'src/core/configs/tron.config';
import { CONTAINER_TYPES } from 'src/core/inversify/types';

@injectable()
export class WalletService {
  constructor(
    @inject(CONTAINER_TYPES.Prisma)
    private readonly prisma: PrismaClient,
  ) {}

  async generateAddress(userId: string, ttlHours = 24): Promise<string> {
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

  async validateAddress(address: string): Promise<boolean> {
    const record = await this.prisma.tempAddress.findUnique({
      where: {
        address,
      },
    });

    const isValid = record !== null && record.expiresAt > new Date();
    return isValid;
  }
}
