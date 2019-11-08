import {connect} from "react-redux";
import {AppState, DashboardState, getDashboardDataAction, getSettingsAction, updateSettingsAction} from "logic";
// import {IError} from 'logic/src/models'
import "./Dashboard.scss";
import {bindActionCreators} from "redux";
import Dashboard from "./Dashboard";

export interface IProps {
  getSettingsAction: typeof getSettingsAction;
  updateSettingsAction: typeof updateSettingsAction;
    dashboardData: DashboardState,
    getDashboardDataAction: typeof getDashboardDataAction
  // isLoading: boolean;
  // error: IError;
}

export interface IState {
  appSettingsFormData: {
    require_admin_approval: string;
    request_distance: string;
      show_trainer: number;
    package_messaging: string;
      review_session: number;
  };
  showTrainerToggle: boolean;
  distanceToggle: boolean;
  allowMessageToggle: boolean;
  sessionCountToggle: boolean;
  isError: boolean;
  formInvalid: boolean;
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getSettingsAction,
        updateSettingsAction,
        getDashboardDataAction
    },
    dispatch
  );
};
const mapStateToProps = (state: AppState) => {
    const {
        setting: {
            data: appSetting
        },
        dashboard: {
            data: dashboardData
        }
    } = state;
    return {
        appSetting,
        dashboardData
    };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
