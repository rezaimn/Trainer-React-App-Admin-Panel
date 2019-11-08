import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {AppState, currentSessionParams, initialAccountState} from "logic";
import "./CreateSession.scss";
import CreateSession from "./CreateSession";

export interface IProps {
    item: currentSessionParams;
    isUpdate: boolean;
}

export const initialCurrentSession: currentSessionParams = {
    id: 0,
    request_opportunity_id: 0,
    package_id: 0,
    location: '0,0',
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
        customerInfo: initialAccountState,
    }

}

const mapStateToProps = (state: AppState) => {
    const {} = state;
    return {};
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
)(CreateSession);
