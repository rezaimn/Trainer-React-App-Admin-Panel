import React, {Component} from 'react';
import Toolbar from '../Toolbar/Toolbar';
import ToolbarButton from '../ToolbarButton/ToolbarButton';
import Connection from '../../../../socket/index'
import Message from '../Message/Message';
import {initialAccountState} from 'logic';
import './MessageList.css';

import {generatorMessage} from "../../../../socket/initialSocket";
import {initialState, IProps, IState} from "./MessageListContainer";


class MessageList extends Component<IProps, IState> {
    conversation = null;
    state = {
        ...initialState
    }
    myProfile = JSON.parse(localStorage.getItem('userData') || initialAccountState);
    el: any = null;

    constructor(props) {
        super(props);
    }

    scrollToBottom = () => {
        this.el.scrollIntoView({behavior: 'smooth'});
    }
    onKeyPressHandler = (event) => {
        if (event.key === "Enter") {
            this.sendMessage();
        }

    }
    onChangeTextInput = evt => {
        const {
            target: {name, value}
        } = evt;
        this.setState({
            message: value,
        });
    };

    async componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
        this.props.toggleNewMessage(false);
        if (prevProps.withUserId !== this.props.withUserId) {
            if (this.conversation) {
                Connection.connection.unsubscribe(this.conversation.room);

            }
            this.conversation = await this.props.getChatWithAction(this.props.withUserId);
            this.setState({
                messageList: this.conversation.messages.map(message => {
                    return message.message.data;
                })
            })
            Connection.connection.subscribe(`room.${this.conversation.room}`, (msg: any) => {
                this.setState({
                    messageList: [...this.state.messageList, msg.data]
                })
                // window.scrollTo(0,document.getElementById('scroll-to').scrollHeight);

                // let mapMessage = getMapMessage(msg, res)
                // setMessages(listmessages => [mapMessage,...listmessages]);

                // read each message
                // socket.connection.readMessage(res.room, msg.data._id, res.from)
            });

            Connection.connection.subscribe(`chatList.${this.props.withUserId}`, null);
        }
    }


    componentWillUnmount(): void {
        if (this.conversation) {
            Connection.connection.unsubscribe(this.conversation.room)
        }
    }

    sendMessage = () => {
        const msg = generatorMessage(this.state.message || '', this.myProfile.id, this.props.withUserId, this.myProfile.firstname || '' + ' ' + this.myProfile.lastname || '');
        Connection.connection.sendMessage(this.conversation.room, msg, this.props.withUserId);
        this.setState({
            message: ''
        })
    }

    render() {
        const {message, messageList} = this.state;

        return (

            <div className="message-list">
                <Toolbar
                    title="Conversation Title"
                    rightItems={[
                        <ToolbarButton key="info" icon="ion-ios-information-circle-outline"/>,
                        <ToolbarButton key="video" icon="ion-ios-videocam"/>,
                        <ToolbarButton key="phone" icon="ion-ios-call"/>
                    ]}
                />

                <div className="message-list-container">
                    {
                        messageList && messageList.map(message =>
                            <Message myProfile={this.myProfile} key={message._id} message={message}/>
                        )
                    }
                </div>
                <div id={"scroll-to"}></div>
                {/*///////////////////compose*/}
                <div className="compose">
                    <input
                        onKeyPress={this.onKeyPressHandler}
                        onChange={this.onChangeTextInput}
                        value={message}
                        type="text"
                        className="compose-input"
                        placeholder="Type a message, @name"
                    />
                    <i className="fa fa-2x fa-send-o send-icon" onClick={this.sendMessage}></i>
                </div>

            </div>
        );
    }
}

export default MessageList;
