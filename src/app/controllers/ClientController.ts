import { Request, Response } from 'express';
import { ClientService } from 'app/services/ClientService';
/**
 *
 *
 * @export
 * @class ClientController
 */
export class ClientController {
    /**
     *
     *
     * @static
     * @param {Request} req
     * @param {Response} res
     * @param {*} next
     * @memberof ClientController
     */
    static async index(req: Request, res: Response, next) {
        new ClientService().listClients().then(clients => {
            res.status(200).send({
                "payload": clients
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
     * @memberof ClientController
     */
    static async show(req: Request, res: Response, next) {
        new ClientService().findClient(req.params._id).then(client => {
            res.status(200).send({
                "payload": client
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
     * @memberof ClientController
     */
    static async store(req: Request, res: Response, next) {
        const { name, api_url } = req.body;
        new ClientService().addClient(name, api_url).then(client => {
            res.status(201).send({
                "payload": client
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
     * @memberof ClientController
     */
    static async update(req: Request, res: Response, next) {
        const { name } = req.body;
        new ClientService().updateClient({ name: name, _id: req.params._id }).then(client => {
            res.status(201).send({
                "payload": client
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
     * @memberof ClientController
     */
    static async destroy(req: Request, res: Response, next) {
        new ClientService().deleteClient(req.params._id).then(client => {
            res.status(201).send({
                "payload": client
            })
        }).catch(err => next(err));
    }

}