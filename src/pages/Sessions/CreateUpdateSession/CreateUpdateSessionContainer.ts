import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {addSessionAction, AppState, currentSessionParams, updateSessionAction} from "logic";
import {sessionParams} from "logic/src/models"
import "./CreateUpdateSession.scss";
import CreateUpdateSession from "./CreateUpdateSession";

export interface IProps {
    isShowModal?: boolean;
    item?: currentSessionParams;
    onToggleModal?: () => void;
    addSessionAction: typeof addSessionAction;
    updateSessionAction: typeof updateSessionAction;
    isUpdate: boolean;
    request_opportunity_id?: number;
}


export interface IState {
    sessionForm: sessionParams
    formInvalid: boolean;
    lat: number;
    lng: number;
}

export const initialState: IState = {
    sessionForm: {
        session_date: '',
        message: '',
        location: '0,0',
        late_cancel: false,
        status: '',
        request_opportunity_id: 0
    },
    lat: 36.778259,
    lng: -119.417931,
    formInvalid: false,
};

const mapStateToProps = (state: AppState) => {
    const {} = state;
    return {};
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            updateSessionAction,
            addSessionAction
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateUpdateSession);
