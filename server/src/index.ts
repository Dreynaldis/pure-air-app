import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import router from './routes';
import sequelize from './db/config';
import { VercelRequest, VercelResponse } from '@vercel/node';

require('dotenv').config()

const {neon} = require('@neondatabase/serverless')

const app = express().disable('x-powered-by');
app.use(cors());
app.use(helmet());
app.use(compression({threshold: 0}));
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({extended: true, limit: '100mb'}));

app.use('/api/v1', router);
app.get('/', async (_, res) => {
  const sql = neon(`${process.env.DATABASE_URL}`)
  const response = await sql`SELECT version()`
  const { version } = response[0]
  
  res.json({ version })
})
// Check database connection
try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}


const port = process.env.PORT || 3000;
app.listen(port);
console.log(`${process.env.APP_NAME} running on port ${port}`);

export default (req: VercelRequest, res: VercelResponse) => {
  app(req,res)
}