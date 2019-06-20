import { Model, Table, Column, DataType, DeletedAt } from 'sequelize-typescript';

/**
 * A table containing all messages sent in the system
 *
 * @class Client
 * @extends {Model<Client>}
 */
@Table({
    timestamps: true,
    tableName: "messages",
})
class Message extends Model<Message> {
    /**
     * the unique id of this message
     * 
     * @type {string}
     * @memberof Message
     */
    @Column
    _id: string
    /**
     * the receiver address of this message to contain both client id and sat id of the sender
     *
     * @type {string}
     * @memberof Message
     */
    @Column({ allowNull: false, unique: false })
    address: string
    /**
     * the method by which this method is sent
     *
     * @type {string}
     * @memberof Message
     */
    @Column({ allowNull: false, type: DataType.ENUM('skt', 'fcm', 'email', 'phone') })
    method: string
    /**
     * the sender address of this message to contain both client id and sat id of the sender
     *
     * @type {string}
     * @memberof Message
     */
    @Column({ allowNull: false })
    sender: string
    /**
     * the content that was sent in the message
     *
     * @type {string}
     * @memberof Message
     */
    @Column({ allowNull: false, type: DataType.TEXT })
    content: string
    /**
     * a soft delete to denote if the message has been deleted in the server
     *
     * @type {Date}
     * @memberof Message
     */
    @DeletedAt
    deleted_at: Date
}

export default Message;