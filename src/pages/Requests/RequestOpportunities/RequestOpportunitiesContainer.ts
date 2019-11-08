import RequestOpportunities from './RequestOpportunities'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {AppState, deleteTrainerFromRequest, getAllOpportunitiesAction} from "logic";
import {opportunitiesState} from 'logic/src/models'
import "./RequestOpportunities.scss"

// getListUserAction

export interface IProps {
    getAllOpportunitiesAction: typeof getAllOpportunitiesAction;
    deleteTrainerFromRequest: typeof deleteTrainerFromRequest;
    opportunitiesList: opportunitiesState;
    match: any;
}

export const initialState: IState = {
    isShowModal: false,
    item: null,
};

export interface IState {
    isShowModal: boolean;
    item: any
}

const mapStateToProps = (state: AppState) => {
    const {
        requests: {
            opportunitiesList: opportunitiesList,

        }

    } = state;
    return {
        opportunitiesList,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getAllOpportunitiesAction,
            deleteTrainerFromRequest
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RequestOpportunities);



