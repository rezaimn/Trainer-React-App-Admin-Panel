import React from "react";
import {opportunity, updateOpportunityStatus} from "logic";
import {Button, Col, Form, Modal, ModalBody, ModalHeader, Row} from "reactstrap";

import Select from "react-select";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

interface state {
    id: string,
    name: string
}

interface IProps {
    item: opportunity
    isShowModal: boolean;
    onToggleModal: () => void;
    updateOpportunityStatus: typeof updateOpportunityStatus
}

interface IState {
    formInvalid: boolean;
    availableStates: state [],
    selectedState: {
        id: string,
        name: string
    }
}

class EditOpportunityModal extends React.Component<IProps, IState> {
    steps = {
        NEW: "NW",
        TRAINER_ACCEPT: "TA",
        TRAINER_REJECT: "TR",
        CLIENT_ACCEPT: "CA",
        CLIENT_REJECT: "CR",
        TRAINER_HIRE: "TH",
        DONE: "DO"
    };
    availableSteps = {
        NEW: [
            {
                id: 'TA',
                name: 'TRAINER_ACCEPT',
            },
            {
                id: 'TR',
                name: 'TRAINER_REJECT',
            }
        ],
        TRAINER_ACCEPT: [
            {
                id: 'CA',
                name: 'CLIENT_ACCEPT',
            },
            {
                id: 'CR',
                name: 'CLIENT_REJECT',
            }
        ],
        TRAINER_REJECT: [],
        CLIENT_ACCEPT: [
            {
                id: 'TH',
                name: 'TRAINER_HIRE',
            },
            {
                id: 'TR',
                name: 'TRAINER_REJECT',
            }
        ],
        CLIENT_REJECT: [
            {
                id: 'DO',
                name: 'DONE',
            }
        ],
        TRAINER_HIRE: [
            {
                id: 'DO',
                name: 'DONE',
            }
        ]

    };
    state = {
        formInvalid: false,
        availableStates: [
            {
                id: '',
                name: ''
            }
        ],
        selectedState: {
            id: '',
            name: ''
        }
    };

    constructor(props) {
        super(props);
    }

    componentDidMount(): void {

        this.setState(
            {availableStates: this.getAvailableSteps(this.props.item.status)}
        );
        this.setState({
                selectedState:
                    {
                        id: this.steps[this.props.item.status], name: this.props.item.status
                    }
            }
        )

    }


    onSubmitForm = evt => {
        evt.preventDefault();
        this.setState({formInvalid: false});
        this.props.updateOpportunityStatus(this.props.item.id, this.state.selectedState.id, this.state.selectedState.name);
        this.props.onToggleModal();


    };
    stateChange = (item, value) => {
        this.setState({selectedState: item})
    };

    getAvailableSteps(currentStep): state[] {
        let current = [{
            id: this.steps[currentStep],
            name: currentStep,
        }];

        return current.concat(this.availableSteps[currentStep]);
    }

    render() {
        const {onToggleModal, isShowModal, item} = this.props;
        const {
            formInvalid,
            availableStates,
            selectedState
        } = this.state;
        return (
            <Modal
                centered
                scrollable
                isOpen={isShowModal}
                toggle={onToggleModal}
            >
                <ModalHeader toggle={onToggleModal}>
                    Edit Opportunity State
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.onSubmitForm} noValidate>
                        <Row>
                            <Col sm="12">
                                <label>Change Status:</label>
                                <Select
                                    value={availableStates.filter(
                                        option =>
                                            option.name === selectedState.name
                                    )}
                                    className={"col-6"}
                                    name="state"
                                    getOptionLabel={opt => opt.name}
                                    getOptionValue={opt => opt.id}
                                    options={availableStates}
                                    placeholder="Select State"
                                    menuPosition={"fixed"}
                                    onChange={this.stateChange}
                                    menuShouldBlockScroll
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12">
                                <Button
                                    disabled={availableStates.length <= 1}
                                    type="submit"
                                    className="primary-btn mt-4"
                                >
                                    Update
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            updateOpportunityStatus
        },
        dispatch
    );
};

export default connect(
    null,
    mapDispatchToProps
)(EditOpportunityModal);


// export default EditOpportunityModal;
