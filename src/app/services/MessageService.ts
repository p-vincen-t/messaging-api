import { Message } from 'app/models';
import { Op } from 'sequelize'

export class MessageService {
    /**
     *
     *
     * @memberof UserService
     */
    listMessages = (): Promise<any> => new Promise((resolve, reject) => {
        Message.findAll()
            .then(clients => resolve(clients))
            .catch(err => reject(err));
    })
    /**
     *
     *
     * @memberof UserService
     */
    addMessage = ({ client_id, to, method, from, content }): Promise<any> => new Promise((resolve, reject) => {
        Message.create({
            address: client_id + '->' + to,
            method,
            sender: client_id + '->' + from,
            content
        }).then(client => resolve(client))
            .catch(err => reject(err))
    })
    /**
     * find a user based on id, names, sat_id, client_id, email, phone_number of fcm token
     *
     * @memberof UserService
     */
    findMessage = (_id: string): Promise<any> => new Promise((resolve, reject) => {
        Message.findAll({
            where: {
                [Op.or]: [{ id: _id }, { address: _id }, { method: _id }, { sender: _id }]
            }
        }).then(client => resolve(client))
            .catch(err => reject(err))
    })

    // updateUser = ({ sat_id, client_id, payload: { names, phone, email } }): Promise<User> => new Promise((resolve, reject) => {
    //     User.findOne({
    //         where: {
    //             sat_id, client_id
    //         }
    //     }).then(client => {
    //         client.update({
    //             names, phone_number: phone, email
    //         }).then(updated => resolve(updated))
    //             .catch(err => reject(err))
    //     })
    //         .catch(err => reject(err))
    // })

    // deleteUser = (sat_id: string, client_id: string): Promise<any> => new Promise((resolve, reject) => {
    //     User.findOne({
    //         where: {
    //             sat_id, client_id
    //         }
    //     }).then(client => {
    //         client.destroy().then(destroyed => resolve(destroyed))
    //             .catch(err => reject(err))
    //     })
    //         .catch(err => reject(err))
    // })
}