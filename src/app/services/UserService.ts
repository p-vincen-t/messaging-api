import { User } from 'app/models';
import { Op } from 'sequelize';
import _ from 'lodash';

export class UserService {
    /**
     *
     *
     * @memberof UserService
     */
    listUsers = (): Promise<any> => new Promise((resolve, reject) => {
        User.findAll()
            .then(clients => resolve(clients))
            .catch(err => reject(err));
    })
    /**
     *
     *
     * @memberof UserService
     */
    addUser = ({ names, sat_id, client_id, fcm_token, email, phone }): Promise<any> => new Promise((resolve, reject) => {
        User.findOne({
            where: {
                sat_id, client_id
            }
        }).then(user => {
            if (user) user.update({
                fcm_token, email, phone
            }).then(updated => resolve(updated))
                .catch(err => reject(err))
            else User.create({
                names,
                email,
                fcm_token,
                client_id,
                phone_number: phone,
                sat_id
            }).then(client => resolve(client))
                .catch(err => reject(err))

        }).catch(err => reject(err))
    })
    /**
     * find a user based on id, names, sat_id, client_id, email, phone_number of fcm token
     *
     * @memberof UserService
     */
    findUser = (_id: string): Promise<any> => new Promise((resolve, reject) => {
        User.findAll({
            where: {
                [Op.or]: [{ id: _id }, { names: _id }, { sat_id: _id }, { client_id: _id }, { email: _id }, { phone_number: _id }, { fcm_token: _id }]
            }
        }).then(client => resolve(client))
            .catch(err => reject(err))
    })
    /**
     *
     *
     * @memberof UserService
     */
    findUserWithIds = (client_id, sat_id): Promise<User> => new Promise((resolve, reject) => {
        User.findOne({
            where: {
                sat_id, client_id
            }
        }).then(user => {
            if (user) resolve(user)
            else reject()
        }).catch(err => reject(err))
    })
    /**
     * find users with many ids at once
     *
     * @memberof UserService
     */
    findUsersWithManyIds = (client_id, sat_ids: [number]): Promise<User[]> => new Promise((resolve, reject) => {
        User.findAll({
            where: {
                client_id,
                [Op.or] : _.map(sat_ids, id => {
                    _id: id
                })
            }
        }).then(user => {
            if (user) resolve(user)
            else reject()
        }).catch(err => reject(err))
    })
    /**
     *
     *
     * @memberof UserService
     */
    updateUser = ({ sat_id, client_id, payload: { names, phone, email } }): Promise<User> => new Promise((resolve, reject) => {
        User.findOne({
            where: {
                sat_id, client_id
            }
        }).then(client => {
            client.update({
                names, phone_number: phone, email
            }).then(updated => resolve(updated))
                .catch(err => reject(err))
        })
            .catch(err => reject(err))
    })
    /**
     *
     *
     * @memberof UserService
     */
    deleteUser = (sat_id: string, client_id: string): Promise<any> => new Promise((resolve, reject) => {
        User.findOne({
            where: {
                sat_id, client_id
            }
        }).then(client => {
            client.destroy().then(destroyed => resolve(destroyed))
                .catch(err => reject(err))
        })
            .catch(err => reject(err))
    })
}