import React, { Component } from "react";
import { Link } from "react-router-dom";
import { IProps, IState } from "./ForgotPasswordContainer";
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
} from "reactstrap";
import logo from "./../../../assets/img/logo.png";

class ForgotPassword extends Component<IProps, IState> {
    state = {
        ForgotPasswordFormData: {
            email: ""
        },
        formInvalid: false
    };

    onChangeTextInput = evt => {
        evt.preventDefault();
        const {
            target: { name, value }
        } = evt;
        this.setState({
            ForgotPasswordFormData: {
                ...this.state.ForgotPasswordFormData,
                [name]: value
            }
        });
    };

    // componentWillReceiveProps = nextProps => {
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
    //             this.props.history.push({
    //                 pathname: "/reset-password",
    //                 state: {
    //                     email: this.state.ForgotPasswordFormData.email
    //                 }
    //             });
    //         }
    //     }
    // };

    onSubmitLogin = evt => {
        evt.preventDefault();
        if (evt.target.checkValidity()) {
            this.props.userForgotPassAction(this.state.ForgotPasswordFormData);
            return;
        } else {
            this.setState({ formInvalid: true });
            return;
        }
    };

    render() {
        // const { isLoading } = this.props;
        const { ForgotPasswordFormData, formInvalid } = this.state;

        return (
            <div className="app flex-row align-items-center forgot-password-page">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6">
                            <Card className="p-4">
                                <Row className="logo-bar">
                                    <Col md="6" xs="6" className="float-right">
                                        <h2 className="text-center">
                                            Forgot Password
                                        </h2>
                                    </Col>
                                    <Col md="6" xs="6">
                                        <img
                                            src={logo}
                                            className="img-fluid"
                                            alt="Responsive image"
                                        />
                                    </Col>
                                </Row>
                                <CardBody>
                                    <Form
                                        onSubmit={this.onSubmitLogin}
                                        noValidate
                                    >
                                        <p className="text-muted">
                                            Get reset password code by email
                                        </p>
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
                                                value={
                                                    ForgotPasswordFormData.email
                                                }
                                                invalid={
                                                    ForgotPasswordFormData.email ===
                                                        "" && formInvalid
                                                }
                                                onChange={
                                                    this.onChangeTextInput
                                                }
                                            />
                                            <FormFeedback>
                                                {"Email is required"}
                                            </FormFeedback>
                                        </InputGroup>
                                        <Row>
                                            <Col md="12" sm="12" xs="12">
                                                <Button
                                                    type="submit"
                                                    className="px-4 primary-btn width_100P"
                                                >
                                                    {/* {isLoading ? (
                                                        <Spinner
                                                            size="sm"
                                                            color="light"
                                                        />
                                                    ) : ( */}
                                                        {"Get Code"}
                                                    {/* )} */}
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
                                                <Link to={"/reset-password"}>
                                                    {"Reset Password"}
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

export default ForgotPassword;
