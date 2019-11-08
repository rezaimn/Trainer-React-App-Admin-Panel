import UpdateFA from "./UpdateFA";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {AppState, getUserProfileAction, setAvatarAction, trainerUpdateDetailsInfo, userResetPassAction} from "logic";
import {AccountState} from 'logic/src/models'

import "./UpdateFA.scss"

// getListUserAction

export interface IProps {
    trainerUpdateDetailsInfo: typeof trainerUpdateDetailsInfo;
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
            trainerUpdateDetailsInfo,
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
)(UpdateFA);






