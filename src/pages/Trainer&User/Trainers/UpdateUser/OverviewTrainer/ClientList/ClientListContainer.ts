import ClientList from './ClientList'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {AppState, opportunity} from "logic";
import {AccountState} from 'logic/src/models'

// getListUserAction

export interface IProps {
    clientList: opportunity[];
    trainerId: number;
}

export interface IState {
    item: AccountState | null;
    isShowDeleteModal: boolean;
}

export const initialState: IState = {
    item: null,
    isShowDeleteModal: false
}
const mapStateToProps = (state: AppState) => {
    const {
        requests: {
            userOpportunityList: clientList,

        }
    } = state;
    return {
        clientList,
    };
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
)(ClientList);






