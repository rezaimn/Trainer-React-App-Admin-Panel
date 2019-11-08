import SignIn from "./SignIn";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {AccountState, AppState, userSigninAction} from "logic";
import "./SingIn.scss"

export interface IProps {
    userSigninAction: typeof userSigninAction;
    // isLoading: boolean;
    // error: IError;
    token?: string;
    userData: AccountState
}

export interface IState {
    loginFormData: {
        email: string;
        password: string
    }
    formInvalid: boolean;
}

const mapStateToProps = (state:AppState) => {
    const {
        account: {
            data: userData,
            tokenData: {
                token
            }
        }

    } = state;
    return {
        token,
        userData
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            userSigninAction
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);
