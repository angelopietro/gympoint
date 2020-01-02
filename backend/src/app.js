import './bootstrap';

import helmet from 'helmet';
import cors from 'cors';
import Youch from 'youch';
import express from 'express';
import 'express-async-errors';

import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    // Helmet é uma coleção de funções de middlewares menores que configuram cabeçalhos HTTP relacionados à segurança
    this.server.use(helmet());
    // O CORS é um pacote node.js para fornecer um middleware do Connect / Express
    this.server.use(
      cors({
        origin: process.env.FRONT_CORE_URL, // Habilitando o acesso da aplicação front-end
      })
    );
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
