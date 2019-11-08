import Sessions from './Sessions'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    AppState,
    deleteSessionAction,
    getAllSessionsAction,
    getOpportunitySessionsAction,
    initialTrainerDetailsState
} from "logic";
import {AccountState, currentSessionParams, sessionList} from "logic/src/models";


// getListUserAction

export interface IProps {
    getOpportunitySessionsAction: typeof getOpportunitySessionsAction;
    getAllSessionsAction: typeof getAllSessionsAction;
    deleteSessionAction: typeof deleteSessionAction;
    sessionList: sessionList;
    oppId: number;
    match: any;
}

export interface IState {
    item: currentSessionParams;
    isShowUpdateModal: boolean;
    isShowDeleteModal: boolean;
    sessionId: number;
    isUpdate: boolean;
}

const initialAccountState: AccountState = {
    id: 0,
    email: "",
    firstname: "",
    lastname: "",
    avatar: "",
    reference: "",
    status: false,
    dob: '',
    zipcode: '',
    created_at: '',
    country_id: 0,
    state_id: 0,
    city_id: 0,
    Franchise: [],
    gender: 'male',
    password: '',
    confirmPassword: '',
    description: '',
    phone: '',
    role: '',
    TrainerDetails: {
        ...initialTrainerDetailsState
    }

};

export const initialCurrentSession: currentSessionParams = {
    id: 0,
    request_opportunity_id: 0,
    package_id: 0,
    location: '',
    session_date: '',
    message: '',
    late_cancel: false,
    status: '',
    created_at: '',
    updated_at: '',
    requestOpportunity: {
        id: 0,
        client_id: 0,
        trainer_id: 0,
        request_id: 0,
        franchise_id: 0,
        status: '',
        type: '',
        request_info: {
            id: 0,
            place: '',
            user_id: 0,
            created_at: '',
            prefer_sex: '',
            updated_at: '',
            periodicity: '',
            addition_info: '',
        },
        message: '',
        created_at: '',
        updated_at: '',
        trainerInfo: initialAccountState,
        customerInfo: initialAccountState
    }

}
export const initialState: IState = {
    item: initialCurrentSession,
    isShowUpdateModal: false,
    isShowDeleteModal: false,
    sessionId: 0,
    isUpdate: false
}

const mapStateToProps = (state: AppState) => {

    const {
        sessions: {
            data: sessionList
        }
    } = state;
    return {
        sessionList,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getOpportunitySessionsAction,
            getAllSessionsAction,
            deleteSessionAction,

        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sessions);






