import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {AppState, toggleNewMessage} from "logic";
import Admin from "./index";

type History = {
    push: (param: any) => void;
}

export interface IProps {
    history?: History,
    newMessage: boolean,
    toggleNewMessage: typeof toggleNewMessage;
    currenrRoomId: string;
}

export interface IState {

}

export const initialState: IState = {}

const mapStateToProps = (state: AppState) => {
    const {
        chat: {
            isNewMessage: newMessage,
            currenrRoomId
        }
    } = state;
    return {
        newMessage,
        currenrRoomId
    };
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
)(Admin);
