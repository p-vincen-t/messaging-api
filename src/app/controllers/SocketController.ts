import {Request, Response} from 'express';
import { UserService } from 'app/services/UserService';

export class SocketController {

    constructor(private socket) {}

    async onMountUser({sat_id, client_id, skt_id}) {
        
    }

    
    async index(req: Request, res: Response, next) {
        new UserService().listUsers().then(users => {
            res.status(200).send({
                payload: users
            })
        }).catch(err => next(err));       
    }
  
    static async store(req: Request, res: Response, next) {
        const { names, fcm, client, phone, satID, email } = req.body;
        new UserService().addUser({
            names, fcm_token: fcm, client_id: client, email, phone, sat_id: satID
        }).then(user => {
            return res.status(200).json({
                payload: user
            })
        }).catch(err => next(err));        
    }

    static async show(req: Request, res: Response, next) {
        new UserService().findUser(req.params.id).then(user => {
            if(user) {
                res.status(200).json({
                    success: true,
                    payload: user
                })
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Users not found"
                })
            }            

        }).catch(err => next(err));
        
    }

    static async update(req: Request, res: Response){
        const { user } = res.locals; 
        const { name, password } = req.body;
        user.update({
            name: name,
            password: password
        })
        res.status(200).json({
            success: true,
            message: "User updated successfuly"
        })
    }

    static async destroy(req: Request, res: Response){
        //const { user } = res.locals;
        res.status(200).json({
            success: true,
            message: "User deleted successfuly"
        })
    }
    
}