import express from 'express';
import Debug from 'debug';
import cors from 'cors';
import logger from 'morgan';
import bodyParser from 'body-parser';
import router from './routes';
import ServerResponse from './helpers/serverResponse';

const isProduction = process.env.NODE_ENV === 'production';
const { developmentServerErrorResponse, serverErrorResponse } = ServerResponse;
const debug = Debug('dev');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);
app.use(cors());
app.use(logger('dev'));
app.use(express.json());

if (!isProduction) {
  app.use(developmentServerErrorResponse);
}
app.use(serverErrorResponse);

const server = app.listen(process.env.PORT || 3000, () => {
  debug(`Listening on port ${server.address().port}`);
});

export default app;
