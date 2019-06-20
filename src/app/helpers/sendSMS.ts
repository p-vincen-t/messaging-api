import axios from 'axios';
import querystring from 'querystring';

const sendSMS = async (phoneNumbers: any[], message: string)=>{
    const smsData = {
        'user' : process.env.SMS_USER,
        'password' : process.env.SMS_PASSWORD,
        'mobiles' : phoneNumbers,
        'clientsmsid' : process.env.SMS_CLIENT_ID,
        'senderid' : process.env.SMS_SENDER_ID,
        'sms' : message
    }

    return axios.get(`http://messaging.advantasms.com/bulksms/sendsms.jsp?${querystring.stringify(smsData)}`)
}

export default sendSMS;