import { SenderService } from "./SenderService";
import { User, Client, Group } from "app/models";
import AppFactory from 'factory';
/**
 *
 *
 * @export
 * @class SocketService
 * @implements {SenderService}
 */
export class SocketService implements SenderService {
    sendToUser(from: Group, to: User, content: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    /**
     *Creates an instance of SocketService.
     * @param {*} socket
     * @param {Client} client
     * @memberof SocketService
     */
    constructor(private client: Client) { }
    /**
     *
     *
     * @param {User} from
     * @param {User} to
     * @param {*} content
     * @returns {Promise<any>}
     * @memberof SocketService
     */
    send = (from: User, to: User, content: any): Promise<any> => new Promise((resolve, reject) => {
        const io = AppFactory.io;
        if (to.skt_id) {
            io.sockets.to(to.skt_id).emit('data', {
                content,
                client: this.client.name
            });
            resolve(true)
        } else reject(new Error('receiving socket address not found'))
        
    })

    sendToMany(from: User, to: Group, content: any): Promise<any> {
        throw new Error("Method not implemented.");
      }

}