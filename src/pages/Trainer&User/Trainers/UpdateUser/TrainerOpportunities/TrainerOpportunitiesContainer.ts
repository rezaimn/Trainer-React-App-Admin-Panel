import TrainerOpportunities from './TrainerOpportunities'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {AppState, getUserOpportunitiesAction} from "logic";
import {opportunity} from 'logic/src/models'
import "./TrainerOpportunities.scss"

// getListUserAction

export interface IProps {
    getUserOpportunitiesAction: typeof getUserOpportunitiesAction;
    userOpportunityList: opportunity[];
    userId: number;
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
            userOpportunityList: userOpportunityList,

        }

    } = state;
    return {
        userOpportunityList,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getUserOpportunitiesAction
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TrainerOpportunities);



