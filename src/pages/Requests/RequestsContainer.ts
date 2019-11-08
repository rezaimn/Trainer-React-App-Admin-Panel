import Requests from './Requests'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {AppState, currentRequestAction, getAllRequestAction, getUserRequestAction, deleteRequestAction} from "logic";
import {currentRequestState, RequestState} from 'logic/src/models'

// getListUserAction

export interface IProps {
    getAllRequestAction: typeof getAllRequestAction;
    getUserRequestAction: typeof getUserRequestAction;
    currentRequestAction: typeof currentRequestAction;
    deleteRequestAction: typeof deleteRequestAction;
    requestList: RequestState;
    userId: number;
    type?: 'all' | 'user'
}

export interface IState {
    item: currentRequestState | null;
    isShowModalDelete: boolean;
    currentPage: number;
}

export const initialState: IState = {
    item: null,
    isShowModalDelete: false,
    currentPage: 1,
}

const mapStateToProps = (state: AppState) => {

    const {
        requests: {data: requestList}
    } = state;
    return {
        requestList,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getAllRequestAction,
            getUserRequestAction,
            currentRequestAction,
            deleteRequestAction
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Requests);






