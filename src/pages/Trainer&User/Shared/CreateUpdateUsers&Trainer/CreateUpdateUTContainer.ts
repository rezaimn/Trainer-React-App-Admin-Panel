import CreateUpdateUT from "./CreateUpdateUT";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    addToNotAssignedFranchiseListAction,
    AppState,
    BankData,
    cityListAction,
    clearGeoDataAction,
    countryListAction,
    franchiseListAction,
    initialTrainerDetailsState,
    notAssignedFranchiseListAction,
    stateListAction,
    updateAdminFranchiseAction,
    updateAdminFranchiseList,
    userSignUpAction,
    userUpdateProfile
} from "logic";
import {AccountState, CityGeoState, CountryState, FranchiseState, StateGeoState} from "logic/src/models";

export const initialBankAccount: BankData = {
    country: "us",
    currency: "usd",
    account_holder_name: "",
    account_holder_type: "individual",
    account_number: "",
    routing_number: ""
}
export interface IProps {
    userSignUpAction: typeof userSignUpAction;
    countryListAction: typeof countryListAction;
    franchiseListAction: typeof franchiseListAction;
    userUpdateProfile: typeof userUpdateProfile;
    clearGeoDataAction: typeof clearGeoDataAction;
    notAssignedFranchiseListAction: typeof notAssignedFranchiseListAction;
    addToNotAssignedFranchiseListAction: typeof addToNotAssignedFranchiseListAction;
    updateAdminFranchiseAction: typeof updateAdminFranchiseAction;
    countries: CountryState[];
    states: StateGeoState[];
    cities: CityGeoState[];
    franchise: FranchiseState[];
    notAssignedFranchiseList: FranchiseState[];
    isLoadingGeoCountry: boolean;
    isLoadingGeoState: boolean;
    isLoadingGeoCity: boolean;
    isLoadingGeoFranchise: boolean;
    stateListAction: typeof stateListAction;
    cityListAction: typeof cityListAction;
    role: string;
    userProfile?: AccountState | null;

}

export interface IState {
    selectedFranchise: updateAdminFranchiseList
    createForm: AccountState;
    formInvalid: boolean;
    bankDisabled: boolean
}

export const initialAccountState: AccountState = {
    id: 0,
    email: "",
    firstname: "",
    lastname: "",
    avatar: "",
    reference: "",
    status: false,
    dob: "",
    zipcode: "",
    created_at: "",
    country_id: 0,
    state_id: 0,
    city_id: 0,
    Franchise: [],
    gender: "male",
    password: "",
    confirmPassword: "",
    description: '',
    phone: "",
    role: "",
    bankData: {
        country: "us",
        currency: "usd",
        account_holder_name: "",
        account_holder_type: "individual",
        account_number: "",
        routing_number: ""
    },
    bankAccounts: {},
    bankDataChanged: false,
    TrainerDetails: {
        ...initialTrainerDetailsState
    }
};
export const initialState: IState = {
    createForm: {
        ...initialAccountState
    },
    selectedFranchise: {
        franchise: [],
        admin: 0
    },
    formInvalid: false,
    bankDisabled: true
};

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
        franchise: {
            data: franchise,
            isLoading: isLoadingGeoFranchise,
            notAssigned: notAssignedFranchiseList
        }
    } = state;
    return {
        // error,
        countries,
        states,
        cities,
        // isLoading,
        isLoadingGeoCountry,
        isLoadingGeoState,
        isLoadingGeoCity,
        // successData,
        isLoadingGeoFranchise,
        franchise,
        notAssignedFranchiseList
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            userSignUpAction,
            countryListAction,
            stateListAction,
            cityListAction,
            franchiseListAction,
            userUpdateProfile,
            clearGeoDataAction,
            notAssignedFranchiseListAction,
            addToNotAssignedFranchiseListAction,
            updateAdminFranchiseAction
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateUpdateUT);
