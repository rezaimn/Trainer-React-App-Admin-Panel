import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    addCertificateAction,
    AppState,
    CertificateModal,
    Currencies,
    deleteUserAction,
    getListUserAction,
    getSpecialitiesAction,
    initialTrainerDetailsState,
    setUserStatusAction,
    SpecialtiesModal,
    TrainerDetails,
    trainerUpdateDetailsInfo
} from "logic";
import {AccountState} from 'logic/src/models'
import EditDetailsInformation from "./EditDetailsInformation";

// getListUserAction

export interface IProps {
    trainerUpdateDetailsInfo?: typeof trainerUpdateDetailsInfo;
    specialities?: SpecialtiesModal[];
    certificatesId?: CertificateModal[];
    userProfile: AccountState;
    getSpecialitiesAction?: typeof getSpecialitiesAction;
    addCertificateAction: typeof addCertificateAction;
}

export interface IState {
    formInvalid: boolean;
    detailInfo: TrainerDetails,
    currencies: Currencies,
    profession: any[],
    tags: string[]
}

export const initialState: IState = {
    formInvalid: false,
    detailInfo: {
        ...initialTrainerDetailsState
    },
    currencies: [
        {
            id: "usd",
            name: "USD"
        }
    ],
    profession: [
        {
            id: "trainer",
            name: "Trainer"
        },
        {
            id: "pro_trainer",
            name: "Pro Trainer"
        }
    ],
    tags: []
}

const mapStateToProps = (state: AppState) => {
    const {
        specialties: {
            data: specialities
        },
        certificates: {
            data: certificatesId
        }
    } = state;
    return {
        specialities,
        certificatesId
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            trainerUpdateDetailsInfo,
            getListUserAction,
            setUserStatusAction,
            deleteUserAction,
            getSpecialitiesAction,
            addCertificateAction
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditDetailsInformation);



