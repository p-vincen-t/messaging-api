import { Sequelize, Model, Table, Column, BelongsTo, ForeignKey, DataType, HasOne } from 'sequelize-typescript';
import User from 'app/models/User';
import { Group } from '.';

/**
 *
 *
 * @class UserGroup
 * @extends {Model<UserGroup>}
 */
@Table({
    timestamps: true,
    tableName: "usergroups",
})
class UserGroup extends Model<UserGroup> {
    /**
     *
     *
     * @type {number}
     * @memberof UserGroup
     */
    @ForeignKey(() => User)
    @Column
    userId: number;
    /**
     *
     *
     * @type {number}
     * @memberof UserGroup
     */
    @ForeignKey(() => Group)
    @Column
    groupId: number;

}

export default UserGroup;