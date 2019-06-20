export default class AppFactory {
    static io;
    static server;
    static initSocket(server) {
        AppFactory.server = server;
        AppFactory.io = require('socket.io')(server, { path: '/ws' });
    }
}