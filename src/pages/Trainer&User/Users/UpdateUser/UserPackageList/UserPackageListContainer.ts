import UserPackageList from './UserPackageList'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {AppState, deletePackageAction, getPackageAction, getUserPackageAction} from "logic";
import {UserPackageState} from "logic/src/models";

export interface IProps {
    getUserPackageAction: typeof getUserPackageAction;
    // Package data
    userPackageList: UserPackageState[];
    userId: number;

}

const currentUserPackage: UserPackageState = {
    id: 0,
    package: {
        month: 0,
        package_category: 0,
        quantity: 0,
        quantity_free: 0,
        discount_pay: 0,
        payment_periodicity: 'one',
        package_type: "custom",
        max_additional_person: 0,
        coupon: 0,
        session_time: 0,
        description: '',
        price_amount: 0,
        price_currency_code: '',
        additional_person_amount: 0,
        additional_person_currency_code: '',
        promo: '',
        status: false,
    },
    status: '',
    description: '',
    expire_time: ''
}

export interface IState {
    item: UserPackageState;
    isShowModal: boolean;
}

export const initialState: IState = {
    item: currentUserPackage,
    isShowModal: false
}


const mapStateToProps = (state: AppState) => {
    const {
        packages: {
            userPackage: userPackageList
        }
    } = state;
    return {
        userPackageList
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getPackageAction,
            deletePackageAction,
            getUserPackageAction
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserPackageList);
