import EventEmitter from 'event-emitter';
import { UserListener } from 'app/listeners';
import { UserEvents, GroupEvents } from './constants';


const event = EventEmitter();

event.on(UserEvents.NEW, UserListener.register);

event.on(UserEvents.NEW_WITH_TYPE, UserListener.registerWithType);

event.on(GroupEvents.NEW_WITH_CLIENT, UserListener.registerWithClient);

export function register(type: string, callback) {
    event.on(type, callback);
}

export default event;