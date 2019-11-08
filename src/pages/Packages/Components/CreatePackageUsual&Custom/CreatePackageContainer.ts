import CreatePackage from "./CreatePackage";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
  addPackageAction,
  AppState,
  cityListAction,
  countryListAction,
  editPackageAction,
  getByIdPackageAction,
  getCategoryPackageAction,
  getUserFranchisesBaseOnRoleAction,
  resetCurrentPackage,
  stateListAction,
} from "logic";
import {CategoryPackageState, FranchiseState, PackageState} from "logic/src/models";
import "./package.scss";

export interface IProps {
  // Package actions
  addPackageAction: typeof addPackageAction;
  editPackageAction: typeof editPackageAction;
  getByIdPackageAction: typeof getByIdPackageAction;
  resetCurrentPackage: typeof resetCurrentPackage;

  // category
  getCategoryPackageAction: typeof getCategoryPackageAction;

  // categoty data
  categoryPackage: CategoryPackageState[];

  // franchise
  getUserFranchisesBaseOnRoleAction: typeof getUserFranchisesBaseOnRoleAction;

  // Package data
  currentPackage: PackageState;

  //franchises data
  franchises: FranchiseState[];
  isLoadingFranchises: boolean;

  // props
  title: string;
  type: "usual" | "custom";

  from: "edit" | "add";

  id: string;
}

export interface IState {
  currentPackage: {
    franchise_id: number;
    package_category: number;
    month: number;
    quantity: number;
    quantity_free: number;
    discount_pay: number;
    payment_periodicity: "monthly" | "one";
    package_type: "custom" | "usual";
    max_additional_person: number;
    session_time: number;
    description: string;
    price_amount: number;
    price_currency_code: "usd";
    additional_person_amount: number;
    additional_person_currency_code: "usd";
    promo: string;
    status: false;
  };
  formInvalid: boolean;
}

export const initialState: IState = {
  currentPackage: {
    franchise_id: 0,
    package_category: 0,
    month: 0,
    quantity: 0,
    quantity_free: 0,
    discount_pay: 0,
    payment_periodicity: "one",
    package_type: "custom",
    max_additional_person: 0,
    session_time: 0,
    description: "",
    price_amount: 0,
    price_currency_code: "usd",
    additional_person_amount: 0,
    additional_person_currency_code: "usd",
    promo: "",
    status: false,
  },
  formInvalid: false,
};

const mapStateToProps = (state: AppState) => {
  const {
    packages: {currentPackage: currentPackage},
    category: { data: categoryPackage },
    franchise: { data: franchises, isLoading: isLoadingFranchises },
  } = state;
  return {
    currentPackage,
    categoryPackage,
    franchises,
    isLoadingFranchises,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addPackageAction,
      editPackageAction,
      getByIdPackageAction,
      getCategoryPackageAction,
      resetCurrentPackage,
      getUserFranchisesBaseOnRoleAction,
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
)(CreatePackage);
