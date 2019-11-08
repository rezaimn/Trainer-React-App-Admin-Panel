import React, {Component} from 'react';
import MessageList from '../MessageList/MessageListContainer';
import './Messenger.css';
import Toolbar from "../Toolbar/Toolbar";
import ConversationListItem from "../ConversationListItem/ConversationListItem";

import {AccountState} from "logic/src/models/app/account";
import {initialAccountState} from "logic"
import UserSearchModal from "./UserSearchModal/UserSearchModalContainer";
import {initialState, IProps, IState} from "./MessengerContainer";


class Messenger extends Component<IProps, IState> {
    state = {
        ...initialState
    }
    userData = JSON.parse(localStorage.getItem('userData') || initialAccountState);

    constructor(props) {
        super(props);
    }

    componentDidMount(): void {
        this.props.getChatListyAction(this.userData.id);
        if (this.props.userId > 0) {
            this.props.getChatWithAction(this.props.userId);
            this.setState({currentChatWithId: this.props.userId});
        }
    }

    onChangeTextInput = evt => {
        evt.preventDefault();
        const {
            target: {name, value}
        } = evt;
        this.setState({searchInput: value});
    };
    setChatWith = (conversation) => {
        this.setState({
            currentConversation: conversation
        })
        const chatWith = conversation.from === this.userData.id ? conversation.with : conversation.from;
        this.props.toggleCurrentRoomId(conversation.room);
        this.setState({currentChatWithId: chatWith});
    }
    onLoadSearchUser = () => {
        this.setState({isShowSelectUserModal: true});
    }
    onToggleUserSearchModal = () => {
        this.setState(prevState => ({isShowSelectUserModal: !prevState.isShowSelectUserModal}));
    }
    startChat = (item: AccountState) => {
        // this.props.getChatWithAction(item.id);
        this.setState({currentChatWithId: item.id});
        this.onToggleUserSearchModal()
    }

    componentWillUnmount(): void {
        this.props.toggleCurrentRoomId(0);
    }

    render() {
        const {isShowSelectUserModal, searchInput, currentChatWithId, currentConversation} = this.state;
        const {myChatList, currenrRoomId, getChatWithAction} = this.props;
        return (
            <div className="chat-box">
                <div className="messenger">
                    <div className="scrollable chat-sidebar">
                        <div className="conversation-list">
                            <i onClick={this.onLoadSearchUser}
                               className="fa fa-3x fa-plus-circle primary-color new-conversation"></i>
                            <Toolbar
                                title="Messenger"

                            />
                            <div className="conversation-search">
                                <input
                                    type="search"
                                    className="conversation-search-input"
                                    placeholder="Search Messages"
                                />
                            </div>
                            {
                                myChatList && myChatList.map(conversation =>
                                    <ConversationListItem
                                        currentRoomId={currenrRoomId}
                                        onClickConversation={() => {
                                            this.setChatWith(conversation)
                                        }}
                                        key={conversation.id}
                                        userData={this.userData}
                                        conversation={conversation}
                                    />
                                )
                            }
                        </div>
                    </div>
                    <div className="scrollable content">
                        <MessageList
                            getChatWithAction={getChatWithAction}
                            currentConversation={currentConversation}
                            withUserId={currentChatWithId}
                        />
                    </div>
                    {
                        isShowSelectUserModal && (<UserSearchModal
                            onToggleModal={this.onToggleUserSearchModal}
                            isShowModal={isShowSelectUserModal}
                            onClickAlert={this.startChat}/>)
                    }
                </div>
            </div>
        );
    }

}

export default Messenger;
