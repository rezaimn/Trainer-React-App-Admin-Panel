import React, {Component, Fragment} from "react";
import {toast} from "react-toastify";
import {clearToken} from "../../utilities";
import {IProps} from '.'
import {Redirect, Route, Switch} from "react-router-dom";
import {PrivateRoute} from "../../components";
import {Spinner} from "reactstrap";

// Containers
const Admin = React.lazy(() => import("../../conatiners/Admin/indexContainer"));
const SignIn = React.lazy(() =>
    import("../../conatiners/Auth/SignIn/SignInContainer")
);
// const SignUp = React.lazy(() =>
//     import("../../conatiners/Auth/SignUp/SignUpContainer")
// );
// const ForgotPassword = React.lazy(() =>
//     import("../../conatiners/Auth/ForgotPassword/ForgotPasswordContainer")
// );
// const ResetPassword = React.lazy(() =>
//     import("../../conatiners/Auth/ResetPassword/ResetPasswordContainer")
// );


class App extends Component<IProps> {
    componentWillMount = () => {
        const token = localStorage.getItem("token");
        if (token) {
            this.props.setTokenAction({ type: "", token });
        }
    };


    componentWillReceiveProps = nextProps => {
        if (nextProps.errorUnauthorized !== this.props.errorUnauthorized) {
            toast.error(nextProps.errorUnauthorized.message);
            clearToken();
            window.location.pathname = "/login";
        }

        // show alert error in action
        if (nextProps.error !== null && nextProps.error !== this.props.error) {
            if (nextProps.error.message !== "") {
                toast.error(nextProps.error.message);
            }
        }

        // show alert success in action
        if (
            nextProps.success !== null &&
            nextProps.success !== this.props.success
        ) {
            if (nextProps.success.success) {
                toast.success(nextProps.success.message);
            }
        }
    };
    render() {
        return (
            <Fragment>
                <Switch>
                    <PrivateRoute
                        // exact
                        path="/admin"
                        name="Home"
                        component={Admin}
                    />
                    <Route path="/login" name="Login Page" component={SignIn} />
                    {/* <Route
                        path="/signup"
                        name="SignUp Page"
                        component={SignUp}
                    /> */}
                    {/* <Route
                        path="/forgot-password"
                        name="Forgot Password Page"
                        component={ForgotPassword}
                    />
                    <Route
                        path="/reset-password"
                        name="Reset Password Page"
                        component={ResetPassword}
                    /> */}
                    <Redirect from="/" to="/admin" />
                </Switch>
                {this.props.isLoading && (
                <div className="sweet-loading">
                    <Spinner style={{ width: '3rem', height: '3rem' }} color='primary'/>{' '}
                </div>)}
            </Fragment>
        );
    }
}

export default App;


