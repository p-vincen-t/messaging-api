import { Model, Table, Column, DataType, IsUrl } from 'sequelize-typescript';

/**
 * A table containing all client information
 *
 * @class Client
 * @extends {Model<Client>}
 */
@Table({
    timestamps: true,
    tableName: "clients",
})
class Client extends Model<Client> {
    /**
     * the unique id of each client, to be sent in 
     * client protected endpoints
     * @type {string}
     * @memberof Client
     */
    @Column({ allowNull: false, primaryKey: true, unique: true })
    _id: string
    /**
     * the name of the client being stored
     *
     * @type {string}
     * @memberof Client
     */
    @Column({ allowNull: false, unique: true })
    name: string
    /**
     * the link to the api of the client
     *
     * @type {string}
     * @memberof Client
     */
    @IsUrl
    @Column({ allowNull: true })
    api_url: string
    /**
     *
     * the status of this client
     * @type {string}
     * @memberof Client
     */
    @Column({ allowNull: false, type: DataType.ENUM('1', '0') })
    status: string
}

export default Client;