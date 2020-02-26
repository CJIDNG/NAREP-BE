import express from 'express';
import Debug from 'debug';
import logger from 'morgan';

const debug = Debug('dev');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.get('/', (req, res) => res.status(200).send({ message: 'Hello World' }));

const server = app.listen(process.env.PORT || 3000, () => {
  debug(`Listening on port ${server.address().port}`);
});

// export default app;
