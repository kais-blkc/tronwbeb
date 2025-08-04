import { Request, Response } from 'express';
import { inject } from 'inversify';
import { CONTAINER_TYPES } from 'src/core/inversify/types';
import { PaymentRequest } from 'src/core/types/payment.type';
import { PaymentService } from '../services/payment.service';

class PaymentController {
  constructor(
    @inject(CONTAINER_TYPES.PaymentService)
    private readonly paymentService: PaymentService,
  ) {}

  // Генерация адреса для депозита
  async createPayment(req: Request, res: Response) {
    try {
      const request: PaymentRequest = req.body;

      if (!request.userId || !request.amount) {
        return res
          .status(400)
          .json({ error: 'userId and amount are required' });
      }

      const address = await PaymentService.createPayment(request);
      res.status(201).json({ address });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create payment address' });
    }
  }

  // Проверка статуса платежа
  async checkPayment(req: Request, res: Response) {
    try {
      const { address } = req.params;

      if (!address) {
        return res.status(400).json({ error: 'Address is required' });
      }

      const result = await PaymentService.checkPayment(address);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to check payment status' });
    }
  }
}

export default new PaymentController();
