import UserPackageUpdateModal from "./UserPackageUpdateModal";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {AppState, updateUserPackageAction, UserPackage,} from "logic";

import "./package.scss";

export interface IProps {
    isShowModal: boolean;
    item: UserPackage;
    onToggleModal: () => void;
    updateUserPackageAction: typeof updateUserPackageAction;
}


export interface IState {
    packageForm: {
        id: 0,
        month: number;
        quantity: number;
        quantity_free: number;
        max_additional_person: number;
        description: string;
        expire_time: string;
        status: string;
    };
    formInvalid: boolean;
}

export const initialState: IState = {

    packageForm: {
        id: 0,
        month: 0,
        quantity: 0,
        quantity_free: 0,
        max_additional_person: 0,
        description: '',
        expire_time: '',
        status: ' DEACTIVE'
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
            updateUserPackageAction
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserPackageUpdateModal);
