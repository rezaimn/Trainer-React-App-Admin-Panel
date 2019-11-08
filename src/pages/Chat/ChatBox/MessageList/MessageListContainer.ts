import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {AppState, getChatWithAction, ListChat, toggleNewMessage} from "logic";
import MessageList from "./MessageList";


// getListUserAction

export interface IProps {
    withUserId: number;
    currentConversation: ListChat
    getChatWithAction: typeof getChatWithAction;
    toggleNewMessage: typeof toggleNewMessage;
}

export interface IState {
    message: string,
    messageList: any[]
}


export const initialState: IState = {
    message: '',
    messageList: []
}
const mapStateToProps = (state: AppState) => {
    const {} = state;
    return {};
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            toggleNewMessage
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageList);






