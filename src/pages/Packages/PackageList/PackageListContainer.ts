import PackageList from './PackageList'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    AppState,
    deletePackageAction,
    getCategoryPackageAction,
    getPackageAction,
    updatePackageModeAction
} from "logic";
import {
    CategoryPackageState,
    PackageState,
    PackageListState
} from "logic/src/models";
export interface IProps {

    // Package actions
    getPackageAction: typeof getPackageAction;
    deletePackageAction: typeof deletePackageAction;
    updatePackageModeAction: typeof updatePackageModeAction;
    // Package data
    packagesList: PackageListState;

    // categoty data
    categoryPackage: CategoryPackageState[];
    // category
    getCategoryPackageAction: typeof getCategoryPackageAction;
}


export interface IState {
    item: PackageState | null;
    isShowModalDelete: boolean;
    filterKey: string;
    currentPage: number
}

export const initialState: IState = {
    item: null,
    isShowModalDelete: false,
    filterKey: '',
    currentPage: 1,
}

const mapStateToProps = (state: AppState) => {
    const {
        packages: {data: packagesList},
        category: { data: categoryPackage },
    } = state;
    return {
        packagesList,
        categoryPackage
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getPackageAction,
            deletePackageAction,
            getCategoryPackageAction,
            updatePackageModeAction
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PackageList);
