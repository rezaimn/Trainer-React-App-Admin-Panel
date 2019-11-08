import App from './App';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {AppState, setTokenAction} from "logic";
import {IError, ISuccess, IUnauthorized} from "logic/src/models";

export interface IProps {
    setTokenAction: typeof setTokenAction;
    errorUnauthorized: IUnauthorized;
    success: ISuccess;
    error: IError;
    isLoading: boolean;

}

const mapStateToProps = (state: AppState) => {
    const {
        account: { unauthorized: errorUnauthorized },
        alert: { success, error },
        loading: isLoading,

    } = state;
    return {
        errorUnauthorized,
        success,
        error,
        isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setTokenAction,
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
