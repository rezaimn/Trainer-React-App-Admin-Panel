import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {AppState, getChatListyAction, getChatWithAction, ListChat, toggleCurrentRoomId} from "logic";

import Messenger from "./Messenger";

// getListUserAction

export interface IProps {
    getChatWithAction: typeof getChatWithAction,
    getChatListyAction: typeof getChatListyAction,
    toggleCurrentRoomId: typeof toggleCurrentRoomId,
    myChatList: ListChat[],
    currenrRoomId: string;
    userId: number;
}

export interface IState {
    isShowSelectUserModal: boolean;
    conversations: any[];
    currentConversation: ListChat;
    searchInput: string;
    currentChatWithId: number
}

export const initialConversation: ListChat = {
    from: 0,
    with: 0,
    room: '',
    created_at: '',
    updated_at: '',
    id: 0,
    messages: []
}

export const initialState: IState = {
    isShowSelectUserModal: false,
    conversations: [],
    searchInput: '',
    currentChatWithId: 0,
    currentConversation: initialConversation
}
const mapStateToProps = (state: AppState) => {
    const {
        chat: {
            currenrRoomId: currenrRoomId,
            data: myChatList
        }

    } = state;
    return {
        myChatList,
        currenrRoomId
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getChatWithAction,
            getChatListyAction,
            toggleCurrentRoomId
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Messenger);






