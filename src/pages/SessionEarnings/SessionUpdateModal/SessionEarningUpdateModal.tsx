import React, {Component} from "react";
import {initialState, IProps, IState} from "./SessionEarningUpdateModalContainer";
import Select from "react-select";
import {Button, Col, Form, Label, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import {TextInput} from "../../../components";

class SessionEarningUpdateModal extends Component<IProps, IState> {
    state = {
        ...initialState,
    };
    statusList = [
        {
            key: "PO",
            name: "PAID_OUT"
        },
        {
            key: "NPO",
            name: "NOT_PAID_OUT"
        },
        {
            key: "CA",
            name: "CANCELED"
        },
    ]

    constructor(props) {
        super(props);

        this.state.sessionEarningForm = this.props.item;

    }

    dropDownItem = (item, value) => {
        this.setState({
            sessionEarningForm: {
                ...this.state.sessionEarningForm,
                status: item["name"]
            }
        });
    }
    onSubmitForm = (evt) => {
        evt.preventDefault();

        this.props.updateSessionEarningAction(this.props.item.id, {
            status: this.statusList.filter(item => {
                if (this.state.sessionEarningForm.status === item.name) {
                    return item;
                }
            })[0].key,
            trainer_amount: this.state.sessionEarningForm.trainer_amount,
            franchise_amount: this.state.sessionEarningForm.franchise_amount,
        });
        this.props.onToggleModal();
    };

    componentDidMount = () => {

    };

    onChangeTextInput = evt => {
        const {
            target: {name, value}
        } = evt;
        this.setState({
            sessionEarningForm: {
                ...this.state.sessionEarningForm,
                [name]: value
            }
        });
    };

    render() {
        const {
            isShowModal,
            onToggleModal,
        } = this.props;
        const {
            sessionEarningForm, formInvalid,
        } = this.state;
        return (
            <Modal
                className="modal-width"
                centered
                scrollable
                isOpen={isShowModal}
                toggle={onToggleModal}
            >
                <ModalHeader toggle={onToggleModal}>
                    Edit Session Earning
                </ModalHeader>
                <ModalBody>
                    <div className={`animated fadeIn w-100 h-100`}>
                        <Row className="m-0">
                            <Col className="col-lg-12">

                                <Form onSubmit={this.onSubmitForm} noValidate>

                                    <Label for="trainer_amount" className={"mt-4"}>
                                        Trainer Earning
                                    </Label>
                                    <TextInput
                                        className={"w-100"}
                                        placeholder="Trainer Earning"
                                        name="trainer_amount"
                                        required
                                        value={sessionEarningForm.trainer_amount || 0}
                                        onChange={this.onChangeTextInput}
                                    />
                                    <Label for="franchise_amount" className={"mt-4"}>
                                        Franchise Earning
                                    </Label>
                                    <TextInput
                                        className={"w-100"}
                                        placeholder="Franchise Earning"
                                        name="franchise_amount"
                                        required
                                        value={sessionEarningForm.franchise_amount || 0}
                                        onChange={this.onChangeTextInput}
                                    />


                                    <div>
                                        <Label for="status" className={"mt-4"}>
                                            Status
                                        </Label>

                                        <Select
                                            value={this.statusList.filter(
                                                option =>
                                                    option.name ===
                                                    sessionEarningForm.status || ''
                                            )}
                                            className={"w-100"}
                                            getOptionLabel={opt => opt.name}
                                            getOptionValue={opt => opt.key}
                                            options={this.statusList.filter(item => {
                                                if (sessionEarningForm.status === "PAID_OUT") {
                                                    if (sessionEarningForm.status === item.name) {
                                                        return item;
                                                    }
                                                } else {
                                                    return item;
                                                }
                                            })}
                                            name={"status"}
                                            placeholder="Status"
                                            menuPosition={"fixed"}
                                            onChange={this.dropDownItem}
                                        />
                                    </div>


                                    <Button
                                        className="primary-btn mt-4 col-md-6 col-sm-12"
                                        type={"submit"}
                                    >
                                        Save
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                </ModalBody>
            </Modal>
        );
    }
}

export default SessionEarningUpdateModal;

const styleInput = {
    input: {
        height: 30
    }
};
