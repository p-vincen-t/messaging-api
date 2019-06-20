import { Group, User } from "app/models";
import * as uuid from "uuid";
import { Op } from "sequelize";
/**
 *
 *
 * @export
 * @class GroupService
 */
export class GroupService {
    /**
     *
     *
     * @memberof GroupService
     */
    listGroups = (client_id): Promise<any> =>
        new Promise((resolve, reject) => {
            Group.findAll({
                where: client_id
            })
                .then(clients => resolve(clients))
                .catch(err => reject(err));
        });
    /**
     *
     *
     * @memberof GroupService
     */
    addGroup = (client_id: string, name: string, type: string): Promise<any> =>
        new Promise((resolve, reject) => {
            Group.create({
                _id: uuid.v4(),
                name,
                type,
                client_id,
                status: "1"
            })
                .then(client => resolve(client))
                .catch(err => reject(err));
        });
    /**
     *
     *
     * @memberof GroupService
     */
    findGroup = (client_id, _id: string): Promise<any> =>
        new Promise((resolve, reject) => {
            Group.findAll({
                where: {
                    client_id,
                    [Op.or]: [
                        { id: _id },
                        { name: _id },
                        { _id: _id },
                        { status: _id },
                        { type: _id }
                    ]
                }
            })
                .then(client => resolve(client))
                .catch(err => reject(err));
        });
    /**
     * find a group with the given client id and _id
     * if the group exists, add the given users to the users in that group
     * if the groupo does not exist, create a new group and add the users to that group
     * finally return the group
     *
     * @memberof GroupService
     */
    addUsers = (
        client_id,
        name: string,
        type: string,
        users: User[] = [],
        _id: string = ""
    ): Promise<Group> =>
        new Promise((resolve, reject) => {
            Group.findOne({
                where: {
                    [Op.or]: [{_id}, {client_id}, {name}]
                }
            }).then(group => {
                    if (group) {
                        let oldUsers = group.users;
                        users.forEach(user => {
                            oldUsers.push(user);
                        });
                        group.users = oldUsers;
                        group.save().then(gr => resolve(gr));
                    } else {
                        const user = users[0]
                        Group.create({
                            _id: uuid.v4(),
                            client_id,
                            name,
                            type,
                            status: 1,
                        }).then(gr => {
                            gr.users
                            resolve(gr)
                        }
                            );
                    }
                })
                .catch(err => reject(err));
        });

    updateGroup = ({ client_id, _id, name, type, status }): Promise<Group> =>
        new Promise((resolve, reject) => {
            Group.findOne({
                where: {
                    client_id,
                    _id: _id
                }
            })
                .then(client => {
                    client
                        .update({
                            name: name,
                            type,
                            status
                        })
                        .then(updated => resolve(updated))
                        .catch(err => reject(err));
                })
                .catch(err => reject(err));
        });

    deleteGroup = (client_id, _id: string): Promise<any> =>
        new Promise((resolve, reject) => {
            Group.findOne({
                where: {
                    client_id,
                    _id: _id
                }
            })
                .then(client => {
                    client
                        .destroy()
                        .then(destroyed => resolve(destroyed))
                        .catch(err => reject(err));
                })
                .catch(err => reject(err));
        });
}
