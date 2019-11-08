import Trainers from './Trainers'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {AppState, AssignTrainerToARequest, getListUserAction} from "logic";
import {AccountState, opportunitiesParams} from 'logic/src/models'

// getListUserAction

export interface IProps {
    opportunitiesList: opportunitiesParams,
    availableTrainerList: AccountState[];
    AssignTrainerToARequest?: typeof AssignTrainerToARequest;
}

export interface IState {

}

const mapStateToProps = (state: AppState) => {
    const {
        requests: {
            opportunitiesList: opportunitiesList,
            availableTrainerList: availableTrainerList
        }

    } = state;
    return {
        availableTrainerList,
        opportunitiesList
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getListUserAction,
            AssignTrainerToARequest
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Trainers);



