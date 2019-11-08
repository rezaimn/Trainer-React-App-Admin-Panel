import SessionEarnings from './SessionEarnings'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    AppState,
    clearEarningSessions,
    earningFilterModel,
    earningUpdateModel,
    getAllSessionEarningAction,
    updateSessionEarningAction
} from "logic";
import {EarningList} from "logic/src/models";


// getListUserAction

export interface IProps {
    getAllSessionEarningAction: typeof getAllSessionEarningAction;
    updateSessionEarningAction: typeof updateSessionEarningAction;
    clearEarningSessions: typeof clearEarningSessions;
    sessionEarnings: EarningList,
    trainerId: number;
    match?: any;
}

export interface IState {
    isShowUpdateModal: boolean;
    filters: earningFilterModel;
    item: earningUpdateModel;
}


export const initialState: IState = {
    isShowUpdateModal: false,
    filters: {
        status: '',
        page: 1,
        trainerId: '',
    },
    item: null
}

const mapStateToProps = (state: AppState) => {

    const {
        sessions: {
            sessionEarning: sessionEarnings
        }
    } = state;
    return {
        sessionEarnings,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getAllSessionEarningAction,
            updateSessionEarningAction,
            clearEarningSessions
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SessionEarnings);






