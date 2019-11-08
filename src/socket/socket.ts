import Ws from "@adonisjs/websocket-client";

export class SocketConnection {
    ws: any;

    connect() {

        this.ws = Ws('wss://devapi.sendmeatrainer.com/', {reconnection: true}).connect();
        // this.ws = Ws('ws://50a4aa55.ngrok.io/', {reconnection: true}).connect();


        this.ws.on("open", () => {
            console.log("Index initialized");
        });

        this.ws.on("close", () => {
            console.log("Index closed");
        });

        this.ws.on("error", (e) => {
            console.log("erororro closed", e);
        });

        return this;
    }

    subscribe(channel, handler) {
        if (!this.ws) {
            setTimeout(() => this.subscribe(channel, handler), 1000);
        } else {
            if (!this.ws.getSubscription(channel)) {
                const result = this.ws.subscribe(channel);

                if (result) {
                    result.on("message", message => {
                        console.log("Incoming", message, "message");
                        if (handler) handler(message);
                    });

                    result.on("error", error => {
                        console.log(error);
                    });
                }
            }


        }
    }

    sendMessage(roomId, msg, withUserId, newCreatedRoom = false) {

        if (!this.ws) {
            //setTimeout(() => this.sendMessage(channel), 1000);
        } else {
            const resultWithRoom = this.ws.getSubscription(`room.${roomId}`);

            if (resultWithRoom) resultWithRoom.emit("message", msg);

            const resultWithBroadcast = this.ws.getSubscription(
                `chatList.${withUserId.toString()}`
            );
            console.log(resultWithBroadcast, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", withUserId)
            if (resultWithBroadcast)
                resultWithBroadcast.emit(
                    "newMessage",
                    {
                        state: 'Notification',
                        data: {
                            room_id: roomId,
                            // sender: room.fromUser
                        }
                    }
                );
        }
    }

    subscribeToBroadcast(channel, handler) {
        if (!this.ws) {
            setTimeout(() => this.subscribe(channel, handler), 1000);
        } else {
            const result = this.ws.subscribe(channel);

            if (result) {
                result.on("newMessage", message => {
                    console.log("Incoming", message, "newMessage");
                    handler(message);
                });
                result.on("error", error => {
                    console.log(error);
                });
            }
        }
    }

    readMessage(roomId, messageId, userId) {
        if (!this.ws) {
        } else {
            const result = this.ws.getSubscription(`room.${roomId}`);

            if (result) {
                result.emit("read", {
                    state: "Read",
                    data: {
                        _id: messageId,
                        roomId: roomId,
                        from: userId
                    }
                });
                result.on("error", error => {
                    console.log(error);
                });
            }

        }
    }

    unsubscribe(roomId) {
        if (!this.ws) {
        } else {
            const result = this.ws.getSubscription(`room.${roomId}`);
            if (result) {
                result.close()

                result.on("close", error => {
                    console.log("close the channel => roomId: =>", roomId);
                });

                result.on("error", error => {
                    console.log(error);
                });
            }
        }
    }
}

export default new SocketConnection();
