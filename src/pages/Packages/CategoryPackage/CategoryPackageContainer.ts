import CategoryPackage from './CategoryPackage'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    AppState,
    getCategoryPackageAction,
    addCategoryPackageAction,
    editCategoryPackageAction,
    deleteCategoryPackageAction,
    getByIdCategoryPackageAction,
    getUserFranchisesBaseOnRoleAction
} from "logic";
import {
    CategoryPackageState, FranchiseState
} from "logic/src/models";
export interface IProps {

    // categoty actions
    getCategoryPackageAction: typeof getCategoryPackageAction;
    addCategoryPackageAction: typeof addCategoryPackageAction;
    editCategoryPackageAction: typeof editCategoryPackageAction;
    deleteCategoryPackageAction: typeof deleteCategoryPackageAction;
    getByIdCategoryPackageAction: typeof getByIdCategoryPackageAction;

    // categoty data
    categoryPackage: CategoryPackageState[];

    // get franchises action
    getUserFranchisesBaseOnRoleAction: typeof getUserFranchisesBaseOnRoleAction;

    // franchise data
    franchises: FranchiseState[];
    isLoadingFranchises: boolean;

}

export type Action = 'edit' | 'delete' | 'add'

export interface IState {
    isShowModal: boolean;
    from: Action;
    item: CategoryPackageState | null;
    isShowModalDelete: boolean;
    franchises: FranchiseState[];
    isLoadingFranchises: boolean;
}

export const initialState: IState = {
    isShowModal: false,
    from: 'add',
    item: null,
    isShowModalDelete: false,
    franchises: [],
    isLoadingFranchises: false
}



const mapStateToProps = (state: AppState) => {
    const {
        category: {
            data: categoryPackage
        },
        franchise: {
            data: franchises, isLoading: isLoadingFranchises
        }
    } = state;
    return {
        categoryPackage,
        franchises,
        isLoadingFranchises
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getCategoryPackageAction,
            addCategoryPackageAction,
            editCategoryPackageAction,
            deleteCategoryPackageAction,
            getByIdCategoryPackageAction,
            getUserFranchisesBaseOnRoleAction
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryPackage);