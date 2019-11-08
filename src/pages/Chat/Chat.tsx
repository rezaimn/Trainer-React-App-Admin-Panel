import React from 'react';


import {IProps, IState} from "./ChatContainer.js";
import Messenger from "./ChatBox/Messenger/MessengerContainer";


class Chat extends React.Component<IProps, IState> {
    userId = this.props.match && this.props.match.params && this.props.match.params.userId || 0

    constructor(props) {
        super(props);

    }


    render() {
        const {} = this.props;
        return (
            <div>
                <Messenger userId={this.userId}/>

            </div>


        )
    }
}

export default Chat;
