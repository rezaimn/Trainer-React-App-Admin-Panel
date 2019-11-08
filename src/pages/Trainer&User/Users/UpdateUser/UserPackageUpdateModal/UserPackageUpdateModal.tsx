import React, {Component} from "react";
import {initialState, IProps, IState} from "./UserPackageUpdateModalContainer";
import * as NumericInput from "react-numeric-input";
import Select from "react-select";
import {Button, Col, Form, Label, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import DatePicker from "react-datepicker";
import {TextInput} from "../../../../../components";

class UserPackageUpdateModal extends Component<IProps, IState> {
    state = {
        ...initialState,
    };
    statusOptions = [
        {
            id: 'ACTIVE',
            name: 'ACTIVE'
        },
        {
            id: 'DEACTIVE',
            name: 'DEACTIVE'
        }
    ]

    constructor(props) {
        super(props);
    }

    onSubmitForm = (evt) => {
        this.state.packageForm.expire_time = this.state.packageForm.expire_time.substr(0, 10);

        evt.preventDefault();
        this.props.updateUserPackageAction(this.state.packageForm.id, this.state.packageForm);
    };

    componentDidMount = () => {
        this.setState(
            {packageForm: this.props.item}
        );

    };
    onChangeTextInput = evt => {
        const {
            target: {name, value}
        } = evt;
        this.setState({
            packageForm: {
                ...this.state.packageForm,
                [name]: value
            }
        });
    };

    onChangeTextNumber = (value, name) => {
        this.setState({
            packageForm: {
                ...this.state.packageForm,
                [name]: value
            }
        });
    };
    customInputChange = (name, value) => {

        this.setState({
            packageForm: {
                ...this.state.packageForm,
                [name]: value
            }
        });
    }
    dropDownItem = (item, value) => {

        this.setState({
            packageForm: {
                ...this.state.packageForm,
                status: item["id"]
            }
        });
    }

    render() {
        const {
            isShowModal,
            onToggleModal
        } = this.props;
        const {packageForm, formInvalid} = this.state;
        return (
            <Modal
                centered
                scrollable
                isOpen={isShowModal}
                toggle={onToggleModal}
            >
                <ModalHeader toggle={onToggleModal}>
                    Edit User Package
                </ModalHeader>
                <ModalBody>
                    <div className={`animated fadeIn w-100 h-100`}>
                        <Row className="m-0">
                            <Col>

                                <Form onSubmit={this.onSubmitForm} noValidate>
                                    <Row>
                                        <Label for="month" className={"mt-2"}>
                                            Number of months
                                        </Label>
                                        <NumericInput
                                            className={"w-100"}
                                            min={0}
                                            max={12}
                                            name={'month'}
                                            value={packageForm.month || 0}
                                            style={styleInput}
                                            onChange={(value) => this.onChangeTextNumber(value, 'month')}
                                        />

                                        <Label for="quantity" className={"mt-4"}>
                                            Quantity of sessions
                                        </Label>
                                        <NumericInput
                                            className={"w-100"}
                                            min={0}
                                            max={7}
                                            value={packageForm.quantity || 0}
                                            name={"quantity"}
                                            style={styleInput}
                                            onChange={(value) => this.onChangeTextNumber(value, 'quantity')}
                                        />

                                        <Label for="free-quantity" className={"mt-4"}>
                                            Quantity of Free sessions
                                        </Label>
                                        <NumericInput
                                            className={"w-100"}
                                            min={0}
                                            max={7}
                                            value={packageForm.quantity_free || 0}
                                            name={"free-quantity"}
                                            style={styleInput}
                                            onChange={(value) => this.onChangeTextNumber(value, 'quantity_free')}
                                        />
                                        <React.Fragment>
                                            <Label for="date" className={"mt-4"}>
                                                Expiration Date
                                            </Label>
                                            <DatePicker
                                                name="date"
                                                className={'w-100 form-control'}
                                                selected={packageForm.expire_time ? new Date(packageForm.expire_time) : new Date()}
                                                onChange={(value) => this.customInputChange('expire_time', value)}
                                                title={'Expiration date'}
                                                placeholderText={'Expiration date'}
                                                required
                                            />
                                        </React.Fragment>
                                        <Label for="max_additional_person" className={"mt-4"}>
                                            Count additional person
                                        </Label>
                                        <NumericInput
                                            className={"w-100"}
                                            min={0}
                                            value={packageForm.max_additional_person || 0}
                                            name={"max_additional_person"}
                                            style={styleInput}
                                            onChange={(value) => this.onChangeTextNumber(value, 'max_additional_person')}
                                        />

                                        <Label for="description" className={"mt-4"}>
                                            Short description
                                        </Label>
                                        <TextInput
                                            className={"w-100"}
                                            placeholder="Short description"
                                            name="description"
                                            required
                                            value={packageForm.description || ""}
                                            onChange={this.onChangeTextInput}
                                        />
                                        <Label for="status" className={"mt-4"}>
                                            Status
                                        </Label>
                                        <Select
                                            value={this.statusOptions.filter(
                                                option =>
                                                    option.id ===
                                                    packageForm.status
                                            )}
                                            className={"w-100"}
                                            getOptionLabel={opt => opt.name}
                                            getOptionValue={opt => opt.id}
                                            options={this.statusOptions}
                                            name={"status"}
                                            placeholder="Status"
                                            menuPosition={"fixed"}
                                            onChange={this.dropDownItem}
                                        />
                                    </Row>
                                    <Button
                                        className="primary-btn mt-2 col-md-2 col-sm-12"
                                        type={"submit"}
                                    >
                                        Update
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

export default UserPackageUpdateModal;

const styleInput = {
    input: {
        height: 30
    }
};
