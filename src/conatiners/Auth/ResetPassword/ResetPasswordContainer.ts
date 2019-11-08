import ResetPassword from "./ResetPassword";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {AppState, userResetPassAction} from "logic";
import "./ResetPassword.scss"

export interface IProps {
    userResetPassAction: typeof userResetPassAction;
    history: any;
}

export interface IState {
    resetPasswordForm: {
        email: string;
        code: string,
        password: string,
        confirmPassword: string
    }
    formInvalid: boolean;
    isMatchPassword: boolean;
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            userResetPassAction
        },
        dispatch
    );
};

export default connect(
    null,
    mapDispatchToProps
)(ResetPassword);
