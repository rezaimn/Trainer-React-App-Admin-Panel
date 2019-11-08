import Trainers from './Trainers'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {AppState, deleteUserAction, getListUserAction, setUserStatusAction, UserFilters} from "logic";
import {AccountState} from 'logic/src/models'

// getListUserAction

export interface IProps {
    getListUserAction: typeof getListUserAction;
    setUserStatusAction: typeof setUserStatusAction;
    deleteUserAction: typeof deleteUserAction;
    users: AccountState[];
}

export interface IState {
    item: AccountState | null;
    isShowDeleteModal: boolean;
    filters: UserFilters
}

export const initialState: IState = {
    item: null,
    isShowDeleteModal: false,
    filters: {
        role: 'TR',
        status: null,
        email: '',
        fullname: '',
        zipcode: '',
        searchable: null,
        userPackage: '',
        registerDate: '',
    },
}

const mapStateToProps = (state:AppState) => {
    const {
        account: {
            users
        },

    } = state;
    return {
        users
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getListUserAction,
            setUserStatusAction,
            deleteUserAction
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Trainers);



