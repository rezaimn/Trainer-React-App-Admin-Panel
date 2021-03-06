import UpdateUser from './UpdateUser'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {AppState, getUserProfileAction, setAvatarAction, userResetPassAction} from "logic";
import {AccountState} from 'logic/src/models'
import "./UpdateUser.scss"

// getListUserAction

export interface IProps {

    getUserProfileAction: typeof getUserProfileAction;
    userResetPassAction: typeof userResetPassAction;
    setAvatarAction: setAvatarAction;
    userProfile: AccountState;
    match: any;
}

export interface IState {

}

const mapStateToProps = (state: AppState) => {
    const {
        account: {
            userProfile
        },

    } = state;
    return {
        userProfile,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getUserProfileAction,
            userResetPassAction,
            setAvatarAction
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateUser);






