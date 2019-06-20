import { Client } from 'app/models';
import * as uuid from 'uuid';
import { Op } from 'sequelize'
/**
 *
 *
 * @export
 * @class ClientService
 */
export class ClientService {
    /**
     *
     *
     * @memberof ClientService
     */
    listClients = (): Promise<any> => new Promise((resolve, reject) => {
        Client.findAll()
            .then(clients => resolve(clients))
            .catch(err => reject(err));
    })
    /**
     *
     *
     * @memberof ClientService
     */
    addClient = (name: string, api_url: string): Promise<any> => new Promise((resolve, reject) => {
        Client.create({
            _id: uuid.v4(),
            name,
            api_url,
            status: '1'
        }).then(client => resolve(client))
            .catch(err => reject(err))
    })
    /**
     *
     *
     * @memberof ClientService
     */
    findClient = (_id: string): Promise<any> => new Promise((resolve, reject) => {
        Client.findAll({
            where: {
                [Op.or]: [{ name: _id }, { _id: _id }, { status: _id }]
            }
        }).then(client => resolve(client))
            .catch(err => reject(err))
    })
    /**
     *
     *
     * @memberof ClientService
     */
    updateClient = ({ _id, name }): Promise<Client> => new Promise((resolve, reject) => {
        Client.findOne({
            where: {
                _id: _id
            }
        }).then(client => {
            client.update({
                name: name
            }).then(updated => resolve(updated))
                .catch(err => reject(err))
        })
            .catch(err => reject(err))
    })
    /**
     *
     *
     * @memberof ClientService
     */
    deleteClient = (_id: string): Promise<any> => new Promise((resolve, reject) => {
        Client.findOne({
            where: {
                _id: _id
            }
        }).then(client => {
            client.destroy().then(destroyed => resolve(destroyed))
                .catch(err => reject(err))
        })
            .catch(err => reject(err))
    })
}