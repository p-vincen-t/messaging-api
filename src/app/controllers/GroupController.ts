import { Request, Response } from 'express';
import { GroupService } from 'app/services/GroupService';
/**
 *
 *
 * @export
 * @class GroupController
 */
export class GroupController {
    /**
     *
     *
     * @static
     * @param {Request} req
     * @param {Response} res
     * @param {*} next
     * @memberof GroupController
     */
    static async index(req: Request, res: Response, next) {
        new GroupService().listGroups(res.locals.client._id).then(clients => {
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
     * @memberof GroupController
     */
    static async show(req: Request, res: Response, next) {
        new GroupService().findGroup(res.locals.client._id, req.params._id).then(client => {
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
     * @memberof GroupController
     */
    static async store(req: Request, res: Response, next) {
        const { name, type } = req.body;
        new GroupService().addGroup(res.locals.client._id, name, type).then(client => {
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
     * @memberof GroupController
     */
    static async update(req: Request, res: Response, next) {
        const { name, type, status } = req.body;
        new GroupService().updateGroup({ client_id: res.locals.client._id, _id: req.params._id, name: name, type, status }).then(client => {
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
     * @memberof GroupController
     */
    static async destroy(req: Request, res: Response, next) {
        new GroupService().deleteGroup(res.locals.client_id, req.params._id).then(client => {
            res.status(201).send({
                "payload": client
            })
        }).catch(err => next(err));
    }

}