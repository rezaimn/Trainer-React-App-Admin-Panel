import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    AppState,
    deleteReviewAction,
    getAllReviewsAction,
    initialReview,
    ReviewsGetModel,
    setReviewAction,
    updateReviewAction
} from "logic";
import ReviewTrainer from "./ReviewTrainers";

// getListUserAction

export interface IProps {
    getAllReviewsAction: typeof getAllReviewsAction;
    setReviewAction: typeof setReviewAction;
    updateReviewAction: typeof updateReviewAction;
    deleteReviewAction: typeof deleteReviewAction;
    reviews: ReviewsGetModel[];
}

export interface IState {
    isShowDeleteModal: boolean;
    selectedReview: ReviewsGetModel
}

export const initialState: IState = {
    isShowDeleteModal: false,
    selectedReview: {
        ...initialReview
    }
}
const mapStateToProps = (state: AppState) => {
    const {
        reviews: {
            data: reviews
        }

    } = state;
    return {
        reviews,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getAllReviewsAction,
            setReviewAction,
            updateReviewAction,
            deleteReviewAction
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReviewTrainer);






