import { Request, Response, NextFunction } from 'express';
import { ClientService } from 'app/services/ClientService';

export const Client = async (req: Request, res: Response, next: NextFunction) => {
    const { client_key } = req.headers;
    if (client_key) new ClientService().findClient(client_key as string).then(clients => {
            if (clients && clients.length > 0) {
                res.locals.client = clients[0]
                next();
            }
            else next(new Error('client not found with that key'))            
        }).catch(err => next(err))        
     else return res.status(401).json({
            message: "Unauthorized client!"
        })    
}