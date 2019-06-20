import { Sequelize, Model, Table, Column, DataType, ForeignKey, BelongsToMany, HasOne, Scopes } from 'sequelize-typescript';
import User from 'app/models/User';
import UserGroup from './UserGroup';

/**
 *
 * Group model for grouping users into 
 * different notification channels
 * @class Group
 * @extends {Model<Group>}
 */
@Table({
    timestamps: true,
    tableName: "groups",
})
@Scopes({
    withUsers: {
      include: [{model: () => User}]
    }
  })
class Group extends Model<Group> {
    /**
     * the unique id of the group
     *
     * @type {string}
     * @memberof Group
     */
    @Column({ allowNull: false, unique: true })
    _id: string
    /**
     * the client id to denote this group belongs to which client
     *
     * @type {string}
     * @memberof Group
     */
    @Column({ allowNull: false, unique: false })
    client_id: string
     /**
     * the name of this group
     *
     * @type {string}
     * @memberof Group
     */
    @Column({ allowNull: false })
    name: string
    /**
     * the type of this group
     *
     * @type {string}
     * @memberof Group
     */
    @Column({ allowNull: false })
    type: string
    /**
     *
     * the status of this client
     * @tfind a group with the given client id and _id
     * if the group exists, add the given users to the users in that group
     * if the groupo does not exist, create a new group and add the users to that group
     * finally return the groupype {string}
     * @memberof Client
     */
    @Column({ allowNull: false, type: DataType.ENUM('1', '0') })
    status: string
    /**
     *
     * the users belonging to this group, the 
     * relationship is via a pivot model for 
     * many to many relationships
     * @type {User[]}
     * @memberof Group
     */
    @BelongsToMany(() => User, () => UserGroup)
    users: User[];

}

export default Group;