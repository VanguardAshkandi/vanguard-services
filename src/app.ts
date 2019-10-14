import * as express from "express";
import * as bodyParser from  "body-parser";
import {Request, Response} from "express";

import services from './services';

const app = express();
app.use(bodyParser.json());

// Configure services
services(app);

// Health check
app.get('/__health', (req: Request, res: Response) => {
  return res.sendStatus(200);
});

app.listen(3000);
