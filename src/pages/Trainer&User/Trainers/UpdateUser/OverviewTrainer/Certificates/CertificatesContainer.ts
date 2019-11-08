import Certificates from './Certificates'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {AppState} from "logic";
import {AccountState} from 'logic/src/models'

// getListUserAction

export interface IProps {
}

export interface IState {
    item: AccountState | null;
    isShowDeleteModal: boolean;
}

export const initialState: IState = {
    item: null,
    isShowDeleteModal: false,
}

const mapStateToProps = (state: AppState) => {
    // const {
    //     account: {
    //         users
    //     },
    //
    // } = state;
    // return {
    //     users
    // };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {},
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Certificates);



