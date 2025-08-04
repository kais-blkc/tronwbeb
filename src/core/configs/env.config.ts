import { get } from 'env-var';
import 'dotenv/config';

export const envConfig = {
  PORT: get('PORT').default(3000).asInt(),
  TRON_NODE_URL: get('TRON_NODE_URL')
    .default('https://api.shasta.trongrid.io')
    .asString(),
  TRON_PRIVATE_KEY: get('TRON_PRIVATE_KEY').required().asString(),
  TRON_PRO_API_KEY: get('TRON_PRO_API_KEY').required().asString(),
  USDT_CONTRACT: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
};
