import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import errorMiddleware from './middlewares/errorMiddleware';
import userRoutes from './routes/userRoutes';
import authRotes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';

class App {
  server: any;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  async enableCors() {
    const options: cors.CorsOptions = {
      methods: 'GET,POST,PATCH,DELETE',
      origin: '*',
    };
    this.server.use(cors(options));
  }

  async middlewares() {
    await this.enableCors();
    this.server.use(express.json());
  }

  async routes() {
    this.server.use('/login', authRotes);
    this.server.use('/dashboard/user', userRoutes);
    this.server.use('/dashboard/task', taskRoutes);
    this.server.use(errorMiddleware);
  }
}

export default new App().server;
