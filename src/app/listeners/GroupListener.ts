import { User, Client } from "app/models";
import { sendSMS } from "app/helpers";
import { UserService, FireBaseService, GroupService } from 'app/services';
import Http from "app/utils/HttpCaller";
import _ from 'lodash';
import { isString } from "app/utils/Validator";
/**
 *
 *
 * @class UserListener
 */
class GroupListener {
    static async register(user: User) {
        // const firstName = user.full_name.split(' ')[0];
        // const phoneNumber = user.phone_number;
        // let message = `Hi ${firstName}, we are glad you registered to ${process.env.APP_NAME}. We will use this phone number to contact you for verification.`;
        // await sendSMS([phoneNumber], message);
    }
    /**
     * Get a list of all users under this particular user and register them to a topic
     *
     * @static
     * @param {*} {user: User, Client: Client, type: string}
     * @memberof UserListener
     */
    static async registerWithType({ user, client, type }) {
        const http = new Http(client.api_url);
        try {
            const { payload } = await http.get(`/supervisor-users/${user.sat_id}`);
            const users = await new UserService().findUsersWithManyIds(client._id, payload);
            const group = await new GroupService().addUsers(client._id, `${user.names} supervisor`, type, users);
            const firebaseService = new FireBaseService(client)
            const subscribed = await firebaseService.subscribeToSubject(_.map(group.users, us => us.fcm_token), group._id)
            if (isString(subscribed)) await firebaseService.sendToMany(user, group, subscribed)
            else await firebaseService.sendToMany(user, group, 'You have joined supervisor group')
        } catch (err) {

        }

    }
}

export default GroupListener;