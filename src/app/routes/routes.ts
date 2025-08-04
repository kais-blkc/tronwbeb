import { Router } from 'express';
import { container } from 'src/core/inversify/container';
import { CONTAINER_TYPES } from 'src/core/inversify/types';
import { PaymentService } from '../services/payment.service';
import { PaymentRequest } from 'src/core/types/payment.type';

const router = Router();
const paymentService = container.get<PaymentService>(
  CONTAINER_TYPES.PaymentService,
);

// Генерация адреса для депозита
router.post('/payments', async (req, res) => {
  const request: PaymentRequest = req.body;
  const address = await paymentService.createPayment(request);
  res.json({ address });
});

// Проверка статуса платежа
router.get('/payments/:address', async (req, res) => {
  const result = await paymentService.checkPayment(req.params.address);
  res.json(result);
});

export { router as routes };
