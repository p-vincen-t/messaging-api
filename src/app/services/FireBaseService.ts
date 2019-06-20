
import * as admin from 'firebase-admin';
import { User, Client, Group } from 'app/models';
import { SenderService } from './SenderService';
import serviceAccount from "config/firebase";

admin.initializeApp({
  databaseURL: serviceAccount.database_uri,
  credential: admin.credential.cert(serviceAccount as object)
});
/**
 *
 *
 * @class FireBaseService
 * @implements {SenderService}
 */
class FireBaseService implements SenderService {

  /**
   *Creates an instance of FireBaseService.
   * @param {Client} client
   * @memberof FireBaseService
   */
  constructor(private client: Client) { }
  /**
   *
   *
   * @memberof FireBaseService
   */
  send = (from: User, to: User, content): Promise<any> => new Promise((resolve, reject) => {
    var registrationToken = to.fcm_token;
    // Send a message to the device corresponding to the provided
    // registration token.
    // { [key: string]: string; }'
    admin.messaging().send({
      data: {
        content: content,
        client: this.client.name
      },
      token: registrationToken
    }).then(response => resolve(response))
      .catch(error => reject(error));
  })
  /**
   * send message to a user that they have been added to a particular group
   *
   * @memberof FireBaseService
   */
  sendToUser = (from: Group, to: User, content: any): Promise<any> => new Promise((resolve, reject) => {
    this.subscribeToSubject([to.fcm_token], from._id).then(res => {
      admin.messaging().send({
        data: {
          content: content,
          client: this.client.name,
          group: from.name
        },
        token: to.fcm_token
      }).then(response => resolve(response))
        .catch(error => reject(error));
    }).catch(err => reject(err))    
  })

  sendToMany = (from: User, to: Group, content: any): Promise<any> => new Promise((resolve, reject) => {
    admin.messaging().send({
      data: {
        content: content,
        client: this.client.name
      },
      topic: to._id
    }).then(response => resolve(response))
      .catch(error => reject(error));
  })

  subscribeToSubject = (tokens: string[], subject: string): Promise<any> => new Promise((resolve, reject) => {
    admin.messaging().subscribeToTopic(tokens, subject)
      .then(res => resolve(res)).catch(err => reject(err))
  })

}

export default FireBaseService;