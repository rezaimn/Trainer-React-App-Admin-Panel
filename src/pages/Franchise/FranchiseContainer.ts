import Franchise from "./Franchise";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    addFranchiseAction,
    AppState,
    cityListAction,
    clearGeoDataAction,
    countryListAction,
    deleteFranchiseAction,
    editFranchiseAction,
    franchiseListAction,
    franchiseResetAction,
    getFranchiseByIdAction,
    getListUserAction,
    getUserFranchisesBaseOnRoleAction,
    stateListAction,
    UserFilters
} from "logic";
import {AccountState, CityGeoState, CountryState, FranchiseState, StateGeoState} from "logic/src/models";

export interface IProps {
    // geo
    countryListAction: typeof countryListAction;
    stateListAction: typeof stateListAction;
    cityListAction: typeof cityListAction;
    deleteFranchiseAction: typeof deleteFranchiseAction;
    countries: CountryState[];
    clearGeoDataAction: typeof clearGeoDataAction;
    states: StateGeoState[];
    cities: CityGeoState[];
    isLoadingGeoCountry: boolean;
    isLoadingGeoState: boolean;
    isLoadingGeoCity: boolean;
    
    // users
    getListUserAction: typeof getListUserAction;
    users: AccountState[];
    
    // franchise
    addFranchiseAction: typeof addFranchiseAction;
    franchiseListAction: typeof franchiseListAction;
    getFranchiseByIdAction: typeof getFranchiseByIdAction;
    franchiseResetAction: typeof franchiseResetAction;
    editFranchiseAction: typeof editFranchiseAction;
    getUserFranchisesBaseOnRoleAction: typeof getUserFranchisesBaseOnRoleAction;

    //franchise data
    franchise: FranchiseState[];
    current: FranchiseState;
    
    // errorFranchise: IError;
    // isSuccessAddedFranchise: SuccessState;
    isLoadingFranchise: boolean;

    // react router
    history: any;
    match: any;
}

export interface IState {
    name: string;
    query: string;
    country_id: number;
    state_id: number;
    city_id: number;
    filters: UserFilters;
}

export interface IGeo {
    country_id: number;
    state_id: number;
    city_id: number;
}

export enum TypeRoute {
    fromEdit = "/admin/franchise/edit",
    fromCreate = "/admin/franchise/create",
    fromList = "/admin/franchise/list"
}

const mapStateToProps = (state: AppState) => {
    const {
        geo: {
            countries,
            states,
            cities,
            isLoadingGeoCountry,
            isLoadingGeoState,
            isLoadingGeoCity
        },

        account: { users },

        franchise: { data: franchise, isLoading: isLoadingFranchise, current  }
    } = state;
    return {
        // geo
        countries,
        states,
        cities,
        isLoadingGeoCountry,
        isLoadingGeoState,
        isLoadingGeoCity,

        // users
        users,

        // franchise
        // errorFranchise,
        // isSuccessAddedFranchise,
        isLoadingFranchise,
        franchise,
        current
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            countryListAction,
            stateListAction,
            cityListAction,
            getListUserAction,
            addFranchiseAction,
            franchiseListAction,
            deleteFranchiseAction,
            getFranchiseByIdAction,
            franchiseResetAction,
            editFranchiseAction,
            getUserFranchisesBaseOnRoleAction,
            clearGeoDataAction,
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Franchise);
