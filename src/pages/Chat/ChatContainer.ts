import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {AppState, deleteUserAction, getListUserAction, setUserStatusAction, toggleNewMessage} from "logic";
import Chat from "./Chat";

// getListUserAction

export interface IProps {
    toggleNewMessage: typeof toggleNewMessage;
    match: any;
}

export interface IState {
    isShowSelectUserModal: boolean;
}

export const initialState: IState = {
    isShowSelectUserModal: false
}
const mapStateToProps = (state: AppState) => {
    const {
        account: {
            users
        }

    } = state;
    return {
        users,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getListUserAction,
            setUserStatusAction,
            deleteUserAction,
            toggleNewMessage
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat);
