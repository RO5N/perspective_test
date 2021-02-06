import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import path from 'path';
import passport from 'passport';
import cors from 'cors';
import ping from './routes/ping';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare();
const server = express();

// Express config
server.set('port', process.env.PORT || 3000);
server.use(cors());
server.use(compression());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(passport.initialize());
server.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
server.get('/_next/*', (req, res) => handle(req, res));
// Primary server routes
server.use('/api/ping', ping);
server.get('/:page/:id?', (req, res) => {
  return handle(req, res);
});
server.get('/', (_, res) => {
  res.redirect('/index');
});

export default server;
