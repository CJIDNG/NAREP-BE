import express from 'express';
import Debug from 'debug';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import docs from './docs';
import router from './routes';
import { serverErrorResponse } from './helpers/serverResponse';

const debug = Debug('dev');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(docs));
app.use(serverErrorResponse);

const server = app.listen(process.env.PORT || 3000, () => {
  debug(`Listening on port ${server.address().port}`);
});

export default app;
