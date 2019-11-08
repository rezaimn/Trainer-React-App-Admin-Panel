import SignUp from "./SignUp";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {AppState, userSignUpAction, countryListAction, stateListAction, cityListAction} from "logic";
import {Role, CountryState, StateGeoState, CityGeoState} from 'logic/src/models'
import "./SignUp.scss"
export interface IProps {
    userSignUpAction: typeof userSignUpAction;
    countryListAction: typeof countryListAction;
    countries: CountryState[];
    states: StateGeoState[];
    cities: CityGeoState[];
    isLoadingGeoCountry: boolean;
    isLoadingGeoState: boolean;
    isLoadingGeoCity: boolean;
    stateListAction: typeof stateListAction;
    cityListAction: typeof cityListAction;
    history: any;
}

export interface IState {
    signUpForm: {
        role: string;
        email: string;
        firstname: string;
        lastname: string;
        zipcode: string;
        dob: string;
        gender: string;
        phone: string;
        password: string;
    };
    dropDown: {
        selectedCountry: string;
        selectedState: string;
        selectedCity: string;
    },
    formInvalid: boolean; 
}

export const signUpForm = {
    role: "FA",
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    zipcode: "",
    dob: "",
    gender: "male",
    phone: ""
}

export const dropDown = {
    selectedCountry: "",
    selectedState: "",
    selectedCity: ""
}


const mapStateToProps = (state: AppState) => {
    const {
        geo: {
            countries,
            states,
            cities
        },

        UI: {
            isLoadingGeoCountry,
            isLoadingGeoState,
            isLoadingGeoCity
        },

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
        // successData
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            userSignUpAction,
            countryListAction,
            stateListAction,
            cityListAction
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp);
