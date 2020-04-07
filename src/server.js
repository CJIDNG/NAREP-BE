import express from 'express';
import Debug from 'debug';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import docs from './docs';
import router from './routes';
import { serverErrorResponse } from './helpers/serverResponse';

dotenv.config();
const debug = Debug(process.env.DEBUG);
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(logger(':method :url :status :res[content-length] - :response-time ms'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);
app.use(express.json());
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(docs));
app.use(serverErrorResponse);

process.on('uncaughtException', (err) => {
  debug(err.stack);
  process.exit(1);
});
const server = app.listen(process.env.PORT || 5000, () => {
  debug(`Listening on port ${server.address().port}`);
});

export default app;
