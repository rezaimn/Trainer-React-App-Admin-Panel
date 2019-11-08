import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { IProps, IState} from './ResetPasswordContainer'
import { toast } from "react-toastify";
import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Form,
    FormFeedback,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row,
    Spinner
} from 'reactstrap';
import logo from './../../../assets/img/logo.png';


class ResetPassword extends Component<IProps, IState> {
    constructor(props){
        super(props);
        const state = this.props.history.location.state 
        const email = state && state.email || ''
        this.state.resetPasswordForm.email = email
    }
    state = {
        resetPasswordForm: {
            email: '',
            code: '',
            password: '',
            confirmPassword: ''

        },
        isError: false,
        formInvalid: false,
        isMatchPassword: false
    };

    onChangeTextInput = (evt) => {

        evt.preventDefault();
        const {
            target: {
                name,
                value
            }
        } = evt;
        this.setState({
            resetPasswordForm: {
                ...this.state.resetPasswordForm,
                [name]: value
            }
        })
    };

    // componentWillReceiveProps = (nextProps) => {
    //     if (nextProps.error !== null && nextProps.error !== this.props.error) {
    //         if (nextProps.error) {
    //             toast.error(nextProps.error.message);
    //         }
    //     }

    //     if (
    //         nextProps.successData !== null &&
    //         nextProps.successData !== this.props.successData
    //     ) {
    //         if (nextProps.successData.success) {
    //             toast.success(nextProps.successData.message);
    //             this.props.history.push('/login');
    //         }
    //     }
    // };

    onSubmitLogin = (evt) => {
        evt.preventDefault();

        //TODO: fix me and best solution
        this.setState({isMatchPassword: false})

        const { password , confirmPassword} = this.state.resetPasswordForm;
        if (evt.target.checkValidity()) {
            if(password === confirmPassword){
                this.props.userResetPassAction(this.state.resetPasswordForm);
            } else {
                this.setState({isMatchPassword: true})
            }
        } else {
            this.setState({formInvalid: true})
            return;
        }
    };

    render() {
        // const { isLoading } = this.props;
        const {resetPasswordForm, formInvalid, isMatchPassword} = this.state;

        return (
            <div className="app flex-row align-items-center reset-password-page">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <Card className="p-4">
                                <Row className="logo-bar">
                                    <Col md="6" xs='6' className="float-right">
                                        <h2 className="text-center">Reset Password</h2>
                                    </Col>
                                    <Col md="6" xs='6'>
                                        <img src={logo} className="img-fluid" alt="Responsive image"/>
                                    </Col>
                                </Row>
                                <CardBody>
                                    <Form onSubmit={this.onSubmitLogin} noValidate>
                                        <p className="text-muted">Reset your password</p>
                                        <InputGroup className="mb-4">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-user"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="text"
                                                name="email"
                                                placeholder="Email"
                                                autoComplete="email"
                                                required
                                                value={resetPasswordForm.email}
                                                invalid={resetPasswordForm.email === '' && formInvalid}
                                                onChange={this.onChangeTextInput}/>
                                            <FormFeedback>{"Email is required"}</FormFeedback>
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-user"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="text"
                                                name="code"
                                                placeholder="Code"
                                                autoComplete="code"
                                                required
                                                value={resetPasswordForm.code}
                                                invalid={resetPasswordForm.code === '' && formInvalid}
                                                onChange={this.onChangeTextInput}/>
                                            <FormFeedback>{"Code is required"}</FormFeedback>
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-lock"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                required
                                                type="password"
                                                placeholder="Password"
                                                autoComplete="current-password"
                                                name="password"
                                                value={resetPasswordForm.password}
                                                invalid={resetPasswordForm.password === '' && formInvalid}
                                                onChange={this.onChangeTextInput}/>
                                            <FormFeedback>{"Password is required"}</FormFeedback>
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-lock"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                required
                                                type="password"
                                                placeholder="Confirm Password"
                                                autoComplete="current-password"
                                                name="confirmPassword"
                                                value={resetPasswordForm.confirmPassword}
                                                invalid={resetPasswordForm.confirmPassword === '' && formInvalid || isMatchPassword}
                                                onChange={this.onChangeTextInput}/>
                                            <FormFeedback>{"Confirm Password dose not match"}</FormFeedback>
                                        </InputGroup>
                                        <Row>
                                            <Col md='12' sm='12' xs="12">
                                                <Button type="submit"
                                                        className="px-4 primary-btn width_100P"
                                                >
                                                    {/* {isLoading ? (
                                                        <Spinner size="sm" color="light"/>
                                                    ) :  */}
                                                    {'Reset Password'}
                                                    {/* } */}
                                                </Button>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col
                                                md="6"
                                                sm="12"
                                                xs="12"
                                                className={"text-center"}
                                            >
                                                <Link to={"/login"}>
                                                    {"Login"}
                                                </Link>
                                            </Col>
                                            <Col
                                                md="6"
                                                sm="12"
                                                xs="12"
                                                className={"text-center"}
                                            >
                                                <Link to={"/forgot-password"}>
                                                    {"Forgot Password"}
                                                </Link>
                                            </Col>
                                        </Row>
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

export default ResetPassword;
