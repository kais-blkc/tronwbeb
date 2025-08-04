import express from 'express';
import dotenv from 'dotenv';
import { routes } from './app/routes/routes';
import { errorHandler } from './core/middlewares/error-hadler';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', routes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

  console.log(`
  ****      *      ****
  *        * *     *  *
  ****    *   *    ****
  *  *   *     *    * *
  ****  *       *  *  *


  *     *   *******
  *     *   *
  *     *   *
  *******   *****
  *     *   *
  *     *   *
  *     *   *******
  

  ******       *      *******   *******   *******      *      *******   *******
  *     *     * *     *         *     *      *        * *     *            *
  *     *    *   *    *         *     *      *       *   *    *            *
  ******    *******   *******   *     *      *      *******   *****        *
  *         *     *   *     *   *     *      *      *     *   *            *
  *         *     *   *     *   *     *      *      *     *   *            *
  *         *     *   *******   *******      *      *     *   *******      *
`);
});
