import CouponsList from "./CouponsList";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { AppState, getCouponsAction, deleteCouponsAction } from "logic";
// import { CouponsListState } from "logic/src/models";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {AppState, deleteCouponsAction, getCouponsAction} from "logic";
import {CouponsParams} from "logic/src/models";

export interface IProps {
    getCouponsAction: typeof getCouponsAction;
    deleteCouponsAction: typeof deleteCouponsAction;
    // coupons: CouponsListState
    coupons: CouponsParams
}

export const initialFrom = {};

const mapStateToProps = (state: AppState) => {
    const {
        coupons: { data: coupons }
    } = state;

    return {
        coupons
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getCouponsAction,
            deleteCouponsAction
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CouponsList);

// export default (Coupons);
