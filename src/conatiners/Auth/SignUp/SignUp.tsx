import React, {Component} from "react";
import {dropDown, IProps, IState, signUpForm} from "./SignUpContainer";
import {NameDropDown} from '../../../constants'
import {DropDown, TextInput} from "../../../components";
import {Link} from "react-router-dom";
import {Button, Card, CardBody, Col, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";
import logo from "./../../../assets/img/logo.png";

class SignUp extends Component<IProps, IState> {
    selectedGeo = {
        country_id: 0,
        state_id: 0,
        city_id: 0
    };
    state = {
        signUpForm,
        dropDown,
        formInvalid: false
    };

    componentDidMount = () => {
        this.props.countryListAction(true);
    };
    onChangeTextInput = evt => {
        evt.preventDefault();
        const {
            target: { name, value }
        } = evt;
        this.setState({
            signUpForm: {
                ...this.state.signUpForm,
                [name]: value
            }
        });
    };
    // componentWillReceiveProps = nextProps => {
    //     if (nextProps.error !== null && nextProps.error !== this.props.error) {
    //         if(nextProps.error){
    //             toast.error(nextProps.error.message);
    //         }
    //     }
    //     if(nextProps.successData !== null && nextProps.successData !== this.props.successData){
    //         if(nextProps.successData.success){
    //             // this.setState({
    //             //     signUpForm, 
    //             //     dropDown 
    //             // })
    //             toast.success(nextProps.successData.message);
    //             this.props.history.replace('/login')
    //         }

    //     }
    // };

    onSubmitSignUp = evt => {
        evt.preventDefault();
        // resrt error
        this.setState({ formInvalid: false });


        let geo = this.selectedGeo;
        if (evt.target.checkValidity() && geo.country_id && geo.state_id && geo.city_id ) {
            const  data = {
                ...this.state.signUpForm,
                ...geo
            }
            this.props.userSignUpAction(data);
            return;
        } else {
            this.setState({ formInvalid: true });
            return;
        }
    };

    dropDownItem = (name, value, item) => {
        this.setState({
            dropDown: {
                ...this.state.dropDown,
                [name]: value
            }
        });
        if (name === NameDropDown.country_id) {

            // fetch get state list with country_id
            this.props.stateListAction(item["id"]);

            // save country_id
            this.selectedGeo.country_id = item["id"];
        } else if (name === NameDropDown.state_id) {

            // fetch get cityies list with country_id & state_id
            this.props.cityListAction(this.selectedGeo.country_id, item["id"]);

            // save state_id
            this.selectedGeo.state_id = item["id"];
        } else if (name === NameDropDown.city_id) {
            // save city_id
            this.selectedGeo.city_id = item["id"];
        }
    };

    render() {
        const {
            // isLoading,
            isLoadingGeoCountry,
            isLoadingGeoCity,
            isLoadingGeoState,
            cities,
            countries,
            states,
        } = this.props;
        const { signUpForm, formInvalid, dropDown } = this.state;
        return (
            <div className="app flex-row align-items-center sign-up-page scrollable">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="9" lg="7" xl="6">
                            <Card className="mx-4">
                                <Row className="logo-bar">
                                    <Col md="6" xs="6" className="float-right">
                                        <h2 className="text-center">Sign Up</h2>
                                    </Col>
                                    <Col md="6" xs="6">
                                        <img
                                            src={logo}
                                            className="img-fluid"
                                            alt="Responsive image"
                                        />
                                    </Col>
                                </Row>
                                <CardBody className="p-4">
                                    <Form
                                        onSubmit={this.onSubmitSignUp}
                                        noValidate
                                    >
                                        <p className="text-muted">
                                            Create your account
                                        </p>
                                        <TextInput
                                            className="mb-3"
                                            icon={"icon-user"}
                                            placeholder="First Name"
                                            name="firstname"
                                            required
                                            value={signUpForm.firstname}
                                            textInvalid={
                                                "First Name is required"
                                            }
                                            invalid={
                                                signUpForm.firstname === "" &&
                                                formInvalid
                                            }
                                            onChange={this.onChangeTextInput}
                                        />

                                        <TextInput
                                            className="mb-3"
                                            icon={"icon-user"}
                                            placeholder="Last Name"
                                            name="lastname"
                                            required
                                            value={signUpForm.lastname}
                                            textInvalid={
                                                "Last Name is required"
                                            }
                                            invalid={
                                                signUpForm.lastname === "" &&
                                                formInvalid
                                            }
                                            onChange={this.onChangeTextInput}
                                        />

                                        <TextInput
                                            className="mb-3"
                                            icon={"icon-user"}
                                            placeholder="password"
                                            name="password"
                                            type="password"
                                            required
                                            value={signUpForm.password}
                                            textInvalid={
                                                "Password is required"
                                            }
                                            invalid={
                                                signUpForm.password === "" &&
                                                formInvalid
                                            }
                                            onChange={this.onChangeTextInput}
                                        />

                                        <FormGroup>
                                            <Label for="exampleSelect">
                                                Gender
                                            </Label>
                                            <Input
                                                value={signUpForm.gender} 
                                                onChange={this.onChangeTextInput}
                                                name={'gender'}
                                                type="select"
                                                id="exampleSelect"
                                            >
                                                <option value={'male'}>Male</option>
                                                <option value={'female'}>Female</option>
                                            </Input>
                                        </FormGroup>

                                        <TextInput
                                            className="mb-3"
                                            icon={"icon-user"}
                                            placeholder="Date Of Birth"
                                            name="dob"
                                            required
                                            type={"date"}
                                            value={signUpForm.dob}
                                            textInvalid={
                                                "Date Of Birth is required"
                                            }
                                            invalid={
                                                signUpForm.dob === "" &&
                                                formInvalid
                                            }
                                            onChange={this.onChangeTextInput}
                                        />

                                        <TextInput
                                            className="mb-3"
                                            icon={"fa fa-envelope-o"}
                                            placeholder="Email"
                                            name="email"
                                            required
                                            type={"email"}
                                            value={signUpForm.email}
                                            textInvalid={"Email is required"}
                                            invalid={
                                                signUpForm.email === "" &&
                                                formInvalid
                                            }
                                            onChange={this.onChangeTextInput}
                                        />

                                        <TextInput
                                            className="mb-3"
                                            icon={"icon-user"}
                                            placeholder="Phone"
                                            name="phone"
                                            required
                                            type={"tel"}
                                            value={signUpForm.phone}
                                            textInvalid={"Phone is required"}
                                            invalid={
                                                signUpForm.phone === "" &&
                                                formInvalid
                                            }
                                            onChange={this.onChangeTextInput}
                                        />
                                        <TextInput
                                            className="mb-3"
                                            icon={"icon-user"}
                                            placeholder="Zip Code"
                                            name="zipcode"
                                            required
                                            value={signUpForm.zipcode}
                                            textInvalid={"Zip Code is required"}
                                            invalid={
                                                signUpForm.zipcode === "" &&
                                                formInvalid
                                            }
                                            onChange={this.onChangeTextInput}
                                        />

                                        <div className="row drop-down-row">
                                            <DropDown
                                                value={
                                                    dropDown.selectedCountry ||
                                                    "Country"
                                                }
                                                className={"col-4"}
                                                name={"selectedCountry"}
                                                items={countries}
                                                onDropDownItem={
                                                    this.dropDownItem
                                                }
                                                keyOfValue={"iso"}
                                                loading={isLoadingGeoCountry}
                                                invalid={formInvalid}
                                            />
                                            <DropDown
                                                value={
                                                    dropDown.selectedState ||
                                                    "State"
                                                }
                                                className={"col-4"}
                                                name={"selectedState"}
                                                items={states}
                                                keyOfValue={"name"}
                                                onDropDownItem={
                                                    this.dropDownItem
                                                }
                                                loading={isLoadingGeoState}
                                                invalid={formInvalid}
                                            />
                                            <DropDown
                                                value={
                                                    dropDown.selectedCity ||
                                                    "City"
                                                }
                                                className={"col-4"}
                                                name={"selectedCity"}
                                                items={cities}
                                                keyOfValue={"name"}
                                                onDropDownItem={
                                                    this.dropDownItem
                                                }
                                                loading={isLoadingGeoCity}
                                                invalid={formInvalid}
                                            />
                                        </div>

                                        <Button block className="primary-btn">
                                            {/* {isLoading ? (
                                                <Spinner
                                                    size="sm"
                                                    color="light"
                                                />
                                            ) : ( */}
                                                {"Create Account"}
                                            {/* )} */}
                                        </Button>
                                        <Link to="/login">
                                            <div className="mt-3 text-center">
                                                Already have an account? Log in
                                            </div>
                                        </Link>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default SignUp;
