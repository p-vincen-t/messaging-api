import { Request, Response } from 'express';
import { UserService } from 'app/services/UserService';
import event from 'app/events';
import { UserEvents, GroupEvents } from 'app/constants';
/**
 *
 *
 * @export
 * @class UserController
 */
export class UserController {
    /**
     *
     *
     * @static
     * @param {Request} req
     * @param {Response} res
     * @param {*} next
     * @memberof UserController
     */
    static async index(req: Request, res: Response, next) {
        new UserService().listUsers().then(users => {
            res.status(200).send({
                payload: users
            })
        }).catch(err => next(err));
    }
    /**
     *
     *
     * @static
     * @param {Request} req
     * @param {Response} res
     * @param {*} next
     * @memberof UserController
     */
    // {fcm=erQDYWIP4gM:APA91bHL5udhsIEUQ7xsGbZXuxxU6jwQm2wqHdt_DN0KUlcCnYe2KXUarvy0eHR5dKO8i2fDNUKH7EYtWs9tgbGBz5iC7Vkc-cLp0lBtqlyuPQWbAGgIeNlDnq95qSSdtG0BgtsKt1Q6, 
    //     email=rayyidh@gmail.com,
    //      names=Test User,
    //       phone=0725010747, 
    //       satID=2}
    static async store(req: Request, res: Response, next) {
        const { names, fcm, phone, satID, email } = req.body;
        new UserService().addUser({
            names, fcm_token: fcm, client_id: res.locals.client._id, email, phone, sat_id: satID
        }).then(user => {
            return res.status(200).json({
                payload: user
            })
        }).catch(err => next(err));
    }
    /** add a user and subscribes them to the client group
     *
     *
     * @static
     * @param {Request} req
     * @param {Response} res
     * @param {*} next
     * @memberof UserController
     */
    static async storeV2(req: Request, res: Response, next) {
        const { names, fcm, phone, satID, email } = req.body;
        new UserService().addUser({
            names, fcm_token: fcm, client_id: res.locals.client._id, email, phone, sat_id: satID
        }).then(user => {
            const client = res.locals.client;
            res.status(200).json({
                payload: user
            })
            event.emit(GroupEvents.NEW_WITH_CLIENT, { user, client })
        }).catch(err => next(err));
    }
    /**
     *
     * example store a supervisor user and add group supervisor-users
     * @static
     * @param {Request} req
     * @param {Response} res
     * @param {*} next
     * @memberof UserController
     */
    static async storeWithType(req: Request, res: Response, next) {
        const { names, fcm, phone, satID, email } = req.body;
        const { type } = req.params;
        new UserService().addUser({
            names, fcm_token: fcm, client_id: res.locals.client._id, email, phone, sat_id: satID
        }).then(user => {
            const client = res.locals.client;
            res.status(200).json({
                payload: user
            })
            event.emit(UserEvents.NEW_WITH_TYPE, { user, client, type })
        }).catch(err => next(err));

    }
    /**
     *
     *
     * @static
     * @param {Request} req
     * @param {Response} res
     * @param {*} next
     * @memberof UserController
     */
    static async show(req: Request, res: Response, next) {
        new UserService().findUser(req.params.id).then(user => {
            if (user) {
                res.status(200).json({
                    payload: user
                })
            } else {
                return res.status(404).json({
                    message: "Users not found"
                })
            }

        }).catch(err => next(err));

    }
    /**
     *
     *
     * @static
     * @param {Request} req
     * @param {Response} res
     * @memberof UserController
     */
    static async update(req: Request, res: Response) {
        const { user } = res.locals;
        const { name, password } = req.body;
        user.update({
            name: name,
            password: password
        })
        res.status(200).json({
            message: "User updated successfuly"
        })
    }
    /**
     *
     *
     * @static
     * @param {Request} req
     * @param {Response} res
     * @memberof UserController
     */
    static async destroy(req: Request, res: Response) {
        //const { user } = res.locals;
        res.status(200).json({
            message: "User deleted successfuly"
        })
    }

}