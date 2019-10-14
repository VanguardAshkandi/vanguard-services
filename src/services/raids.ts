import { Request, Response } from 'express';
import { getRepository } from "typeorm";

import { Raid } from '../entities/raid';
import { parseRaidDB } from '../util/lua_parse';

// Handle file upload
import * as multer from 'multer';
const upload = multer({ storage: multer.memoryStorage() })

async function batchUploadRaids(req: Request, res: Response) {
  const parseResult = parseRaidDB(req.file.buffer.toString());

  if(parseResult.exception) {
    // If we had an exception, send 500
    res.status(500).json({
      message: parseResult.exception.message,
      errors: parseResult.errors,
      exception: parseResult.exception
    });
  } else if(parseResult.errors.length) {
    // If we failed parsing, but did not crash, send 400
    res.status(400).json({
      message: 'Invalid raid data',
      errors: parseResult.errors
    });
  } else if(parseResult.result.length) {
    // We found some raids to parse
    const existingRaidIds = await getRepository(Raid).find({ select: ["raid_id"] });

    //TODO: Intersect new raid IDs with existing raid IDs
    res.json(parseResult);
  } else {
    // We found no raids in the data
    res.status(400).json({
      message: 'No raids found in upload data'
    })
  }
}

async function listRaids(req: Request, res: Response) {
  const raids = await getRepository(Raid).find();
  res.json(raids);
}

async function getRaid(req: Request, res: Response) {
  const id = req.params.id;

  // Allow the db-id or the wow-id to be a find param here
  const raids = await getRepository(Raid).findOne({
    where: [
      { id },
      { raid_id: id }
    ]
  });
  res.json(raids);
}

/**
 * @swagger
 * @param req 
 * @param res 
 */
function createRaid(req: Request, res: Response) {
  // TODO: Create
}

export default function(app) {
  app.get('/api/raids', listRaids);
  app.get('/api/raids/:id', getRaid);
  app.post('/api/raid/upload', upload.single('raids'), batchUploadRaids);
}