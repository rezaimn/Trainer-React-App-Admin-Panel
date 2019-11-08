import ForgotPassword from "./ForgotPassword";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {AppState, userForgotPassAction} from "logic";
import "./ForgotPassword.scss"

export interface IProps {
    userForgotPassAction: typeof userForgotPassAction;
    history: any;
}

export interface IState {
    ForgotPasswordFormData: {
        email: string;
    }
    formInvalid: boolean;
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            userForgotPassAction
        },
        dispatch
    );
};

export default connect(
    null,
    mapDispatchToProps
)(ForgotPassword);
