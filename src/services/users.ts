// Roles, signup, etc
import {Request, Response} from "express";

function getUser(req: Request, res: Response) {

}

function createUser(req: Request, res: Response) {

}

function updateUser(req: Request, res: Response) {
  
}

function deleteUser(req: Request, res: Response) {
  
}

export default function(app) {
  app.get('/api/users', getUser);
  app.post('/api/users', createUser);
  app.put('/api/users', updateUser);
  app.delete('/api/users', deleteUser);
};