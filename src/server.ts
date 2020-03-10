import * as dotenv from 'dotenv';
import express from 'express';
import { usersRouter } from './domains/User/User.controller'; 

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use('/users', usersRouter);

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

