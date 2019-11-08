import SessionEarningUpdateModal from "./SessionEarningUpdateModal";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {AppState, currentSessionParams, earningUpdateModel, updateSessionEarningAction} from "logic";
import "./SessionEarningUpdateModal.scss";

export interface IProps {
    isShowModal: boolean;
    updateSessionEarningAction: typeof updateSessionEarningAction;
    item: currentSessionParams;
    onToggleModal: () => void;

}


export interface IState {
    sessionEarningForm: earningUpdateModel
    formInvalid: boolean;
}

export const initialState: IState = {
    sessionEarningForm: {
        status: '',
        trainer_amount: 0,
        franchise_amount: 0
    },
    formInvalid: false,
};

const mapStateToProps = (state: AppState) => {
    const {} = state;
    return {};
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            updateSessionEarningAction
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SessionEarningUpdateModal);
