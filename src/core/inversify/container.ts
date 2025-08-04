import { Container } from 'inversify';
import { CONTAINER_TYPES } from './types';
import { prisma } from '../configs/prisma.config';
import { PrismaClient } from '@prisma/client';
import { NotificationService } from 'src/app/services/notification.service';
import { WalletService } from 'src/app/services/wallet.service';
import { PaymentService } from 'src/app/services/payment.service';
import tronService, { TronService } from 'src/app/services/tron.service';

const container = new Container();

container
  .bind<PrismaClient>(CONTAINER_TYPES.Prisma)
  .toConstantValue(prisma)
  .onDeactivation(async (db) => {
    console.log('Disconnecting Prisma');
    await db.$disconnect();
  });

container
  // for breaklines
  .bind<TronService>(CONTAINER_TYPES.TronService)
  .to(TronService);

container
  // for breaklines
  .bind<WalletService>(CONTAINER_TYPES.WalletService)
  .to(WalletService);

container
  .bind<PaymentService>(CONTAINER_TYPES.PaymentService)
  .to(PaymentService);

container
  .bind<NotificationService>(CONTAINER_TYPES.NotificationService)
  .to(NotificationService);

export { container };
