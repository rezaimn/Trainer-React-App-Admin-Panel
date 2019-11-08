import socket from './index'
// import { ToastAndroid } from 'react-native'
// import { getData } from '../utils/storage'
//
import {initialAccountState} from 'logic'

// export const

export async function connectToSocket(handler) {

    try {
        socket.connection.connect()
        const userId = JSON.parse(localStorage.getItem('userData') || initialAccountState).id;

        socket.connection.subscribeToBroadcast(`chatList.${userId}`, handler);
    } catch (e) {
        console.log(e, "error in  connectToSocket")
        // ToastAndroid.show("error in  connectToSocket", ToastAndroid.LONG);
    }

}


export const getInfoUser = (id = 0, info) => {
    if (info) {
        const {fromUser, withUser} = info;
        if (fromUser.id === id) {
            return {
                name: fromUser.firstname + ' ' + fromUser.lastname,
                avatar: fromUser.avatar
            }
        } else if (withUser.id === id) {
            return {
                name: fromUser.firstname + ' ' + fromUser.lastname,
                avatar: fromUser.avatar
            }
        }
    }
}

export function getMapMessage(msg, res) {
    const info = getInfoUser(msg.data.sender, res)
    let body = msg.data.message.body
    if (msg.data.message.type === "button") {
        let message = msg.data.message.data.RequestOpportunityData.message || ""
        body = `You've been Hired!\nMessage:\n${message}`

    }
    return {
        _id: msg.data._id,
        text: body,
        createdAt: msg.data._id,
        user: {
            _id: msg.data.sender,
            name: info && info.name || 'NoName',
            avatar: info && info.avatar || '',
        }
    }
}

export function generatorMessage(text, myUserID, userId, myUserName) {
    return {
        data: {
            _id: new Date(),
            sender: parseInt(myUserID),
            receiver: userId,
            senderUserName: myUserName,
            message: {
                body: text,
                type: "text"
            }
        },
        state: "Message"
    }
}
