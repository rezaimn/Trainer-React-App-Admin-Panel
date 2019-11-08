import UserSearchModal from "./UserSearchModal";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {AppState, getListUserAction} from "logic";
import {AccountState} from "logic/src/models"
import "./UserSearchModal.scss";

export interface IProps {
    isShowModal: boolean;
    onToggleModal: () => void;
    onClickAlert: (item: any) => void;
    getListUserAction: typeof getListUserAction;
    users: AccountState[];
}

export interface IState {
    filters: {
        role: string,
        fullname: string
    }
}

export const initialState: IState = {
    filters: {
        role: '',
        fullname: ''
    }
};

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
            getListUserAction
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserSearchModal);
