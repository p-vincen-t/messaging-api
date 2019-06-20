import { User, Group } from "app/models";

export interface SenderService {
    send(from: User, to: User, content): Promise<any>
    sendToUser(from: Group, to: User, content): Promise<any>
    sendToMany(from: User, to: Group, content): Promise<any>
}