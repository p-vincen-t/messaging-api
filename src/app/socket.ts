import { SocketController } from './controllers';
/**
 *
 *
 * @export
 * @class Ws
 */
export default class SocketRouter {
    /**Ws
     *
     *
     * @memberof Ws
     */
    io;
    /**
     *
     *
     * @type {ChatController}
     * @memberof Ws
     */
    socketController: SocketController;
    /**
     *Creates an instance of Ws.
     * @param {*} server
     * @memberof Ws
     */
    constructor(server) {
        this.io = require('socket.io')(server, { path: '/ws' });
    }
    /**
     *
     *
     * @memberof Ws
     */
    public init() {
        this.io.on('connection', socket => {            
            this.socketController = new SocketController(socket)
            socket.on('user_mounted', user => this.socketController.onMountUser(user))            
        });
    }
}



