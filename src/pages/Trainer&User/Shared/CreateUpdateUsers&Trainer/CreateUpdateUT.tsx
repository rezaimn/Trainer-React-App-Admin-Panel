import React, {Component} from "react";
import {TextInput} from "../../../../components";
import {initialAccountState, initialBankAccount, initialState, IProps, IState} from "./CreateUpdateUTContainer";
import {NameDropDown} from "../../../../constants";
import Select from "react-select";
import {toast} from "react-toastify";
import BankData from "./BankData";
import DatePicker from "react-datepicker";
import {addDays} from 'date-fns';
import {Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import InputMask from "react-input-mask";

class CreateUpdateUT extends Component<IProps, IState> {
    isUser = true;
    isUpdate = false;

    constructor(props) {
        super(props);
        this.props.clearGeoDataAction();
        this.state.createForm.role = this.props.role;
        if (this.props.role === "CU") {
            this.isUser = true;
        } else {
            this.isUser = false;
        }
    }

    datePickerInputChange = (name, value: Date) => {

        this.setState({
            createForm: {
                ...this.state.createForm,
                [name]: value.toISOString().split("T")[0]
            }
        });
    }
    state = {
        ...initialState
    };

    componentDidMount = () => {
        if (this.props.role === 'FA') {
            this.props.notAssignedFranchiseListAction();
            this.props.countryListAction(true);
        } else {

            this.props.countryListAction();
        }

    };

    componentWillReceiveProps = nextProps => {
        if (nextProps.userProfile !== this.props.userProfile) {
            this.isUpdate = true;
            this.setState(
                {
                    createForm: {
                        ...nextProps.userProfile,
                        dob:
                            nextProps.userProfile &&
                            nextProps.userProfile.dob &&
                            nextProps.userProfile.dob.split("T")[0],
                        bankDataChanged: false,
                        bankData: nextProps.userProfile.bankAccounts.data &&
                        nextProps.userProfile.bankAccounts.data.length > 0 ? nextProps.userProfile.bankAccounts.data[0] : initialBankAccount
                    }
                },
                () => this.loadLocationData()
            );
        }
    };

    onSubmitForm = evt => {
        evt.preventDefault();
        if (!this.state.createForm.bankDataChanged) {
            delete this.state.createForm.bankData;
        }
        if (this.props.role === "FA") {

            this.props.updateAdminFranchiseAction({
                franchise: this.state.createForm.FranchiseAdmin.map(item => {
                    return item.id;
                }),
                admin: this.state.createForm.id
            });
        }
        this.setState({formInvalid: false});
        let {
            city_id,
            state_id,
            country_id,
            Franchise = []
        } = this.state.createForm;

        if (
            evt.target.checkValidity() &&
            country_id &&
            state_id &&
            city_id &&
            this.props.role !== "FA"
                ? Franchise && Franchise.length > 0
                : true
        ) {
            if (Franchise && Franchise.length > 0) {
                Franchise[0].active = true;
            }


            //TODO rename Franchise to franchise

            if (!this.props.userProfile) {
                const data = {
                    ...this.state.createForm,
                    franchise: Franchise.map(item => ({
                        franchise_id: item.id,
                        active: item.active || true
                    }))
                };

                this.props.userSignUpAction(
                    this.props.role === "FA" ? this.state.createForm : data
                );
            } else {
                const data = {
                    ...this.state.createForm,
                    franchise: Franchise.map(item => ({
                        franchise_id: item.franchise_id || item.id || 0,
                        active: item.active || true
                    }))
                };
                this.props.userUpdateProfile(this.props.userProfile.id, data);
                if (!this.isUpdate) {
                    this.setState(
                        {
                            createForm: {
                                ...initialAccountState,
                                dob: null,
                                bankDataChanged: false,
                                bankData: initialBankAccount
                            }
                        },
                        () => this.loadLocationData()
                    );
                }

            }
        } else {
            this.setState({formInvalid: true});
            toast.error("Please fill field");
        }
    };

    onChangeTextInput = evt => {
        evt.preventDefault();
        const {
            target: {name, value}
        } = evt;
        this.setState({
            createForm: {
                ...this.state.createForm,
                [name]: value
            }
        });
    };
    onBankEdit = () => {

        this.setState({
            bankDisabled: !this.state.bankDisabled
        });
        this.setState({
            createForm: {
                ...this.state.createForm,
                bankDataChanged: this.state.bankDisabled
            }
        });
    }
    onChangeTextInputBank = evt => {
        evt.preventDefault();
        const {
            target: {name, value}
        } = evt;
        if (this.state.createForm.bankData) {
            this.setState({
                createForm: {
                    ...this.state.createForm,
                    bankData: {
                        ...this.state.createForm.bankData,
                        [name]: value
                    }
                }
            });
        }
    };
    loadLocationData = () => {

        this.props.stateListAction(this.state.createForm.country_id, this.props.role === 'FA' ? true : false);
        this.props.cityListAction(
            this.state.createForm.country_id,
            this.state.createForm.state_id,
            this.props.role === 'FA' ? true : false
        );
        if (this.props.role !== 'FA') {
            this.props.franchiseListAction(this.state.createForm.city_id);
        } else {
            this.props.notAssignedFranchiseListAction();
        }
    };
    dropDownItem = (item, value) => {
        const {country_id, Franchise = []} = this.state.createForm;

        if (value.name === NameDropDown.country_id) {
            // fetch get state list with country_id
            if (this.props.role === 'FA') {
                this.props.stateListAction(item["id"], true);
            } else {
                this.props.stateListAction(item["id"]);
            }

            this.setState({
                createForm: {
                    ...this.state.createForm,
                    country_id: item["id"]
                }
            });
        } else if (value.name === NameDropDown.state_id) {
            // fetch get cityies list with country_id & state_id
            if (this.props.role === 'FA') {
                this.props.cityListAction(country_id, item["id"], true);
            } else {
                this.props.cityListAction(country_id, item["id"]);
            }

            this.setState({
                createForm: {
                    ...this.state.createForm,
                    state_id: item["id"]
                }
            });
        } else if (value.name === NameDropDown.city_id) {
            // save city_id
            if (item["id"] > 0) {
                this.props.franchiseListAction(item["id"]);
            }

            // this.state.createForm.city_id = item["id"];

            this.setState({
                createForm: {
                    ...this.state.createForm,
                    city_id: item["id"]
                }
            });
        } else if (value.name === NameDropDown.franchise) {
            // save city_id
            if (value.action === "remove-value") {
                const franchiseList = Franchise.filter(item => {
                    return item.id !== value.removedValue.id;
                });
                this.setState({
                    createForm: {
                        ...this.state.createForm,
                        Franchise: franchiseList
                    }
                });
                return;
            }

            this.setState({
                createForm: {
                    ...this.state.createForm,
                    Franchise: [...item]
                }
            });
        }
    };
    franchiseListDropDown = (item, value) => {

        const {FranchiseAdmin = []} = this.state.createForm;

        if (value.action === "remove-value") {
            const franchiseList = FranchiseAdmin.filter(item => {
                return item.id !== value.removedValue.id;
            });
            this.setState({
                createForm: {
                    ...this.state.createForm,
                    FranchiseAdmin: franchiseList
                }
            });
            this.props.addToNotAssignedFranchiseListAction(value.removedValue);
            return;
        }
        if (value.action === 'clear') {
            for (let franchise of this.state.createForm.FranchiseAdmin) {
                this.props.addToNotAssignedFranchiseListAction(franchise);
            }
            this.setState({
                createForm: {
                    ...this.state.createForm,
                    FranchiseAdmin: []
                }
            });
        }
        this.setState({
            createForm: {
                ...this.state.createForm,
                FranchiseAdmin: [...item]
            }
        });

    }

    render() {
        const {
            isLoadingGeoCountry,
            isLoadingGeoCity,
            isLoadingGeoState,
            cities,
            countries,
            userProfile,
            states,
            isLoadingGeoFranchise,
            franchise,
            notAssignedFranchiseList,

        } = this.props;
        const {createForm, formInvalid, bankDisabled, selectedFranchise} = this.state;
        let content: any = null;


        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                {this.isUpdate ? "Update " : "Create "}
                                {this.props.role === "CU"
                                    ? "User"
                                    : this.props.role === "TR"
                                        ? "Trainer"
                                        : "Franchise Admin"}
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={this.onSubmitForm} noValidate>
                                    {/* Firstname */}
                                    <Label for="Lastname">First Name</Label>
                                    <TextInput
                                        icon={"icon-user"}
                                        placeholder="First Name"
                                        name="firstname"
                                        required
                                        value={createForm.firstname || ""}
                                        textInvalid={"First Name is required"}
                                        invalid={
                                            createForm.firstname === "" &&
                                            formInvalid
                                        }
                                        onChange={this.onChangeTextInput}
                                    />

                                    {/* Lastname */}
                                    <Label for="Lastname" className="mt-4">
                                        Lastname
                                    </Label>
                                    <TextInput
                                        icon={"icon-user"}
                                        placeholder="Last Name"
                                        name="lastname"
                                        required
                                        value={createForm.lastname || ""}
                                        textInvalid={"Last Name is required"}
                                        invalid={
                                            createForm.lastname === "" &&
                                            formInvalid
                                        }
                                        onChange={this.onChangeTextInput}
                                    />

                                    {/* email */}
                                    <Label for="emailInput" className="mt-4">
                                        Email
                                    </Label>
                                    <TextInput
                                        icon={"fa fa-envelope-o"}
                                        placeholder="Email"
                                        name="email"
                                        required
                                        type={"email"}
                                        value={createForm.email}
                                        textInvalid={"Email is required"}
                                        invalid={
                                            createForm.email === "" &&
                                            formInvalid
                                        }
                                        onChange={this.onChangeTextInput}
                                    />

                                    {/* dob */}
                                    {
                                        (!this.isUpdate && (this.props.role === 'TR' || this.props.role === 'FA')) ? (
                                                <div className="date-picker-base">
                                                    <span className="input-group-text date-picker-icon">
                                                        <i className="fa fa-calendar" aria-hidden="true"></i>
                                                    </span>
                                                    <Label>{'Date Of Birth'}</Label>
                                                    <DatePicker
                                                        className={'w-100 form-control'}
                                                        selected={createForm.dob ? new Date(createForm.dob) : addDays(new Date(), -6570)}
                                                        onChange={(value) => this.datePickerInputChange('dob', value)}
                                                        peekNextMonth
                                                        maxDate={addDays(new Date(), -6570)}
                                                        title={'Date Of Birth'}
                                                        placeholderText={'Date Of Birth'}
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        dropdownMode="select"
                                                        required
                                                        isClearable
                                                    />
                                                </div>
                                            ) :
                                            <div className="date-picker-base">
                                                <span className="input-group-text date-picker-icon">
                                                    <i className="fa fa-calendar" aria-hidden="true"></i>
                                                </span>
                                                <Label>{'Date Of Birth'}</Label>
                                                <DatePicker
                                                    className={'w-100 form-control'}
                                                    selected={createForm.dob ? new Date(createForm.dob) : new Date()}
                                                    onChange={(value) => this.datePickerInputChange('dob', value)}
                                                    peekNextMonth
                                                    title={'Date Of Birth'}
                                                    placeholderText={'Date Of Birth'}
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    required
                                                    isClearable
                                                />
                                            </div>
                                    }
                                    {!this.props.userProfile && (
                                        <div>
                                            {/* password */}
                                            <Label
                                                for="password"
                                                className="mt-4"
                                            >
                                                Password
                                            </Label>
                                            <TextInput
                                                icon={"fa fa-lock"}
                                                placeholder="Password"
                                                name="password"
                                                type="password"
                                                required={
                                                    !this.props.userProfile
                                                }
                                                value={createForm.password}
                                                textInvalid={
                                                    "Password is required"
                                                }
                                                invalid={
                                                    createForm.password ===
                                                    "" && formInvalid
                                                }
                                                onChange={
                                                    this.onChangeTextInput
                                                }
                                            />
                                            <Label
                                                for="repeatPassword"
                                                className="mt-4"
                                            >
                                                Confirm Password
                                            </Label>
                                            <TextInput
                                                icon={"fa fa-lock"}
                                                placeholder="Confirm Password"
                                                name="confirmPassword"
                                                type="password"
                                                required={
                                                    !this.props.userProfile
                                                }
                                                value={createForm.confirmPassword}
                                                textInvalid={
                                                    "Confirm Password is required "
                                                }
                                                invalid={
                                                    ((createForm.password === "") && (formInvalid) && (createForm.password !== createForm.confirmPassword))
                                                }
                                                onChange={
                                                    this.onChangeTextInput
                                                }
                                            />
                                        </div>
                                    )}

                                    {/* Phone */}
                                    <div>
                                        <span className="input-group-text phone-icon">
                                            <i className="fa fa-phone" aria-hidden="true"></i>
                                        </span>

                                        <Label for="examplePhone" className="phone-label">
                                            Phone
                                        </Label>
                                        <InputMask className="form-control w-100 phone-input"
                                                   mask="999-999-9999"
                                                   placeholder="111-222-2222"
                                                   name="phone"
                                                   type={"tel"}
                                                   value={createForm.phone}
                                            // textinvalid={"Phone is required"}
                                            // invalid={
                                            //     createForm.phone === "" &&
                                            //     formInvalid
                                            // }
                                                   onChange={this.onChangeTextInput}
                                        />
                                    </div>
                                    {/* Zip Code */}
                                    <Label for="examplePhone" className="mt-4">
                                        Zip code
                                    </Label>
                                    <TextInput
                                        icon={"icon-user"}
                                        placeholder="Zip Code"
                                        name="zipcode"
                                        required
                                        value={createForm.zipcode}
                                        textInvalid={"Zip Code is required"}
                                        invalid={
                                            createForm.zipcode === "" &&
                                            formInvalid
                                        }
                                        onChange={this.onChangeTextInput}
                                    />
                                    {/* Description */}
                                    <Label for="description" className="mt-4">
                                        Description
                                    </Label>
                                    <TextInput
                                        icon={"icon-user"}
                                        placeholder="Description"
                                        name="description"
                                        value={createForm.description}
                                        invalid={
                                            createForm.description === "" &&
                                            formInvalid
                                        }
                                        onChange={this.onChangeTextInput}
                                    />
                                    {/* Gender */}
                                    <FormGroup>
                                        <Label
                                            for="exampleSelect"
                                            className="mt-4"
                                        >
                                            Gender
                                        </Label>
                                        <Input
                                            value={createForm.gender || "male"}
                                            onChange={this.onChangeTextInput}
                                            name={"gender"}
                                            type="select"
                                            id="exampleSelect"
                                        >
                                            <option value={"male"}>Male</option>
                                            <option value={"female"}>
                                                Female
                                            </option>
                                        </Input>
                                    </FormGroup>

                                    <div className="row drop-down-row mt-4">
                                        <Select
                                            value={countries.filter(
                                                option =>
                                                    option.id ===
                                                    createForm.country_id
                                            )}
                                            className={"col-3 "}
                                            name="country_id"
                                            getOptionLabel={opt => opt.iso}
                                            getOptionValue={opt => opt.id}
                                            options={countries}
                                            isLoading={isLoadingGeoCountry}
                                            placeholder="Country"
                                            menuPosition={"fixed"}
                                            onChange={this.dropDownItem}
                                            menuShouldBlockScroll
                                        />

                                        <Select
                                            value={states.filter(
                                                option =>
                                                    option.id ===
                                                    createForm.state_id
                                            )}
                                            className={"col-3"}
                                            getOptionLabel={opt => opt.name}
                                            getOptionValue={opt => opt.id}
                                            options={states}
                                            name={"state_id"}
                                            isLoading={isLoadingGeoState}
                                            placeholder="State"
                                            menuPosition={"fixed"}
                                            onChange={this.dropDownItem}
                                            menuShouldBlockScroll
                                        />

                                        <Select
                                            value={cities.filter(
                                                option =>
                                                    option.id ===
                                                    createForm.city_id
                                            )}
                                            className={"col-3"}
                                            getOptionLabel={opt => opt.name}
                                            getOptionValue={opt => opt.id}
                                            options={cities}
                                            menuPosition={"fixed"}
                                            name={"city_id"}
                                            isLoading={isLoadingGeoCity}
                                            placeholder="City"
                                            onChange={this.dropDownItem}
                                            menuShouldBlockScroll
                                        />
                                        {this.props.role !== "FA" && (
                                            <Select
                                                value={createForm.Franchise}
                                                // value={this.state.createForm.franchise}
                                                className={"col-3"}
                                                isMulti
                                                getOptionLabel={opt => opt.name || 'NoName'}
                                                getOptionValue={opt => opt.id}
                                                options={franchise}
                                                name="franchise"
                                                // isLoading={true}
                                                placeholder="Franchise"
                                                menuShouldBlockScroll
                                                menuPosition={"fixed"}
                                                onChange={this.dropDownItem}
                                                isLoading={
                                                    isLoadingGeoFranchise
                                                }
                                            />

                                        )}
                                    </div>

                                    {this.props.role === "FA" && (
                                        <div className="row drop-down-row mt-4">
                                            <Select
                                                value={createForm.FranchiseAdmin}
                                                className={"col-6"}
                                                isMulti
                                                getOptionLabel={opt => opt.name || 'NoName'}
                                                getOptionValue={opt => opt.id}
                                                options={notAssignedFranchiseList}
                                                name="franchise"
                                                placeholder="Franchise"
                                                menuShouldBlockScroll
                                                menuPosition={"fixed"}
                                                onChange={this.franchiseListDropDown}
                                            />
                                        </div>
                                    )}
                                    {
                                        this.props.role !== "CU" && this.props.userProfile && this.props.userProfile.bankData &&
                                        <Card className="mt-5">
                                            <CardHeader>
                                                <span>Bank Account Data</span>
                                                <span>
                                                    <i className="fa fa-2x fa-edit primary-color float-right pointer"
                                                       onClick={this.onBankEdit}></i>
                                                </span>
                                            </CardHeader>
                                            <CardBody>

                                                <BankData
                                                    disabled={bankDisabled}
                                                    formInvalid={formInvalid}
                                                    onChangeTextInput={this.onChangeTextInputBank}
                                                    bankData={createForm.bankData}
                                                />
                                            </CardBody>
                                        </Card>
                                    }
                                    <Button className="primary-btn mt-4">
                                        {this.isUpdate ? "Update " : "Create "}
                                        {this.props.role === "CU"
                                            ? "User"
                                            : this.props.role === "TR"
                                                ? "Trainer"
                                                : "Franchise Admin"}
                                    </Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CreateUpdateUT;
