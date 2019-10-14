import * as express from "express";
import * as bodyParser from  "body-parser";
import {Request, Response} from "express";

import { init } from './db';
import * as swaggerUI from 'swagger-ui-express';
import services from './services';

const app = express();
app.use(bodyParser.json());

// Configure services
services(app);

// Health check
app.get('/__health', (req: Request, res: Response) => {
  return res.sendStatus(200);
});

// API docs
try {
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(require('./swagger.json')));
} catch(e) {
  console.error('Failed to create API docs route');
}

// Shit UI
app.use(express.static('static'));

// Wait for db init, then start
init().then(() => {
  console.log('Starting service on port 3000');
  app.listen(3000);
});

process.on('SIGINT', function() {
  console.log( "\nSIGINT (Ctrl-C)" );
  process.exit(1);
});