import { ForeignKey, BelongsToMany, Model, Table, Column, UpdatedAt, CreatedAt, HasMany, BelongsTo } from 'sequelize-typescript';
import Group from './Group';
import UserGroup from './UserGroup';
import Client from './Client';

/**
 * the users table that contain users information
 *
 * @class User
 * @extends {Model<User>}
 */
@Table({
    timestamps: true,
    tableName: "users",
})
class User extends Model<User> {
    /**
     * the names of this user
     *
     * @type {string}
     * @memberof User
     */
    @Column({ allowNull: false })
    names: string
    /**
     * the sat id, system id, for this user
     *
     * @type {string}
     * @memberof User
     */
    @Column({ allowNull: false, unique: false })
    sat_id: string
    /**
     * the client id of the client to which this user belongs to
     *
     * @type {string}
     * @memberof User
     */
    @Column({ allowNull: true })
    client_id: string
    /**
     * the phone number of this user to be used when sending sms
     *
     * @type {string}
     * @memberof User
     */
    @Column({ allowNull: true })
    phone_number: string
    /**
     * the firebase token of this user to be used in firebase notifications
     *
     * @type {string}
     * @memberof User
     */
    @Column({ allowNull: true })
    fcm_token: string
    /**
     * the socket id of this user to be used to communicate through sockets
     *
     * @type {string}
     * @memberof User
     */
    @Column({ allowNull: true })
    skt_id: string
    /**
     * the emai of this user to be used to communicate through email
     *
     * @type {string}
     * @memberof User
     */
    @Column({ allowNull: true })
    email: string
    /**
     * the groups that this user belongs to
     *
     * @type {Group[]}
     * @memberof User
     */
    @BelongsToMany(() => User, () => UserGroup)
    groups: Group[];

}

export default User;