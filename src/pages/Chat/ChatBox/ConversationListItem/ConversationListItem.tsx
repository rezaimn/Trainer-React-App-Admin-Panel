import React, {Component} from 'react';
import {Card,} from "reactstrap";
import './ConversationListItem.css';
import {AccountState, initialAccountState, ListChat} from 'logic';

export interface IProps {
    conversation: ListChat,
    userData: AccountState,
    onClickConversation: (conversation: any) => void;
    currentRoomId: string;
}

export interface IState {

}


export const initialState: IState = {}

class ConversationListItem extends Component<IProps, IState> {
    userProfile = JSON.parse(localStorage.getItem('userData') || initialAccountState);

    constructor(props) {
        super(props);

    }

    // useEffect(() => {
    //   shave('.conversation-snippet', 20);
    // })

    // const { date, name, message , avatar} = props.data;
    render() {
        const {conversation, userData, onClickConversation} = this.props;
        const chat = conversation.from === userData.id ? conversation.withUser : conversation.fromUser;
        return (
            <div>
                {
                    <Card
                        className={"ml-2 mr-2 mt-2 mb-0 chat-card" + (this.props.currentRoomId === conversation.room ? ' active-conversation' : '')}
                        onClick={() => onClickConversation(conversation)}
                    >
                        <div className="conversation-list-item">
                            <img className="conversation-photo" src={chat.avatar} alt="conversation"/>
                            <div className="conversation-info">
                                <h1 className="conversation-title">{chat.firstname}</h1>
                                <p className="conversation-snippet">{chat.created_at}</p>
                            </div>
                        </div>
                    </Card>

                }


            </div>

        );
    }

}

export default ConversationListItem;
