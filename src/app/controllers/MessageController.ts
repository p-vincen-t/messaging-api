import { Request, Response } from 'express';
import { MessageService } from 'app/services/MessageService';
import { SenderService } from 'app/services/SenderService';
import { UserService } from 'app/services/UserService';
import FireBaseService from 'app/services/FireBaseService';
import { SocketService } from 'app/services/SocketService';
/**
 * this controller is used for sending , retrieving of messages
 *
 * @export
 * @class MessageController
 */
export class MessageController {
    /**
     * list all the messages in the system
     *
     * @static
     * @param {Request} req
     * @param {Response} res
     * @param {*} next
     * @memberof MessageController
     */
    static async index(req: Request, res: Response, next) {
        new MessageService().listMessages().then(users => {
            res.status(200).send({
                payload: users
            })
        }).catch(err => next(err));
    }

    // ({ address, method, sender, content })
    /**
     * store and send a message without mode specified, it tries with socket and if failes, sends with firebase, afterwards
     * if failed sends with sms and if failed sends with email
     *
     * @static
     * @param {Request} req
     * @param {Response} res
     * @param {*} next
     * @memberof MessageController
            if (typeof content !== 'string') content = JSON.stringify(content);   
     */
    static async store(req: Request, res: Response, next) {
        var { to, from, content } = req.body;
        const userService: UserService = new UserService();
        const client = res.locals.client
        try {
            const userFrom = await userService.findUserWithIds(client._id, from)
            const userTo = await userService.findUserWithIds(client._id, to)
            new SocketService(client).send(userFrom, userTo, content)
                .then(response =>
                    new MessageService().addMessage({
                        client_id: client._id, to, from, content, method: 'skt'
                    }).then(message => {
                        return res.status(200).json({
                            payload: message
                        })
                    }).catch(err => next(err))
                )
                .catch(err => {
                    console.log(err)
                    new FireBaseService(client).send(userFrom, userTo, content)
                        .then(response =>
                            new MessageService().addMessage({
                                client_id: res.locals.client._id, to, from, content, method: 'fcm'
                            }).then(message => {
                                return res.status(200).json({
                                    payload: message
                                })
                            }).catch(err => next(err))
                        )
                        .catch(err => {
                            next(err)
                        })
                })

        } catch (e) {
            next(e)
        }
    }
    /**
     * sends a message through a predefined mechanism
     *
     * @static
     * @param {Request} req
     * @param {Response} res
     * @param {*} next
     * @memberof MessageController
     */
    static async storeWithType(req: Request, res: Response, next) {
        var { to, from, content } = req.body;
        const type = req.params.type;
        var senderService: SenderService;
        switch (type) {
            case 'fcm': {
                senderService = new FireBaseService(res.locals.client)
                break;
            }
            case 'skt': {
                senderService = new SocketService(res.locals.client)
                break;
            }
            case 'email': {
                break;
            }
            case 'phone': {
                break;
            }
            default: {
                next(new Error('a must specify type of message to use'))
                return;
            }
        }
        const userService: UserService = new UserService();
        const client = res.locals.client
        try {
            const userFrom = await userService.findUserWithIds(client._id, from)
            const userTo = await userService.findUserWithIds(client._id, to)
            const sent = await senderService.send(userFrom, userTo, content)
            new MessageService().addMessage({
                client_id: res.locals.client._id, to, from, content, method: type
            }).then(message => {
                return res.status(200).json({
                    payload: message,
                    success: sent
                })
            }).catch(err => next(err));
        } catch (e) {
            next(e)

        }
    }
    /**
     *  sends to a group of users attached to the user specified
     *
     * @static
     * @param {Request} req
     * @param {Response} res
     * @param {*} next
     * @returns
     * @memberof MessageController
     */
    static async storeWithTypeForUser(req: Request, res: Response, next) {
        var { to, from, content } = req.body;
        const { type, user } = req.params;
        var senderService: SenderService;
        switch (type) {
            case 'fcm': {
                senderService = new FireBaseService(res.locals.client)
                break;
            }
            case 'skt': {
                senderService = new SocketService(res.locals.client)
                break;
            }
            case 'email': {
                break;
            }
            case 'phone': {
                break;
            }
            default: {
                next(new Error('a must specify type of message to use'))
                return;
            }
        }
        const userService: UserService = new UserService();
        const client = res.locals.client
        try {
            const userFrom = await userService.findUserWithIds(client._id, from)
            const userTo = await userService.findUserWithIds(client._id, to)
            const sent = await senderService.send(userFrom, userTo, content)
            new MessageService().addMessage({
                client_id: res.locals.client._id, to, from, content, method: type
            }).then(message => {
                return res.status(200).json({
                    payload: message,
                    success: sent
                })
            }).catch(err => next(err));
        } catch (e) {
            next(e)

        }
    }
    /**
     *
     *
     * @static
     * @param {Request} req
     * @param {Response} res
     * @param {*} next
     * @memberof MessageController
     */
    static async show(req: Request, res: Response, next) {
        new MessageService().findMessage(req.params.id).then(user => {
            if (user) {
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
}