import UpdateTrainer from "./UpdateTrainer";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {AppState, clearEarningSessions, getUserProfileAction, setAvatarAction, userResetPassAction} from "logic";
import {AccountState} from 'logic/src/models'

import "./UpdateTrainer.scss"

// getListUserAction

export interface IProps {
    getUserProfileAction: typeof getUserProfileAction;
    userResetPassAction: typeof userResetPassAction;
    clearEarningSessions: typeof clearEarningSessions;
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
            setAvatarAction,
            clearEarningSessions
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateTrainer);






