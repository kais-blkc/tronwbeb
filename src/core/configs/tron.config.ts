import { envConfig } from './env.config';
import { TronWeb } from 'tronweb';

export const tronWeb = new TronWeb({
  fullHost: envConfig.TRON_NODE_URL,
  headers: {
    'TRON-PRO-API-KEY': envConfig.TRON_PRO_API_KEY,
  },
  privateKey: envConfig.TRON_PRIVATE_KEY,
});
