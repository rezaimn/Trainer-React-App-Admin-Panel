import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {IProps, IState} from './SignInContainer'
import {setToken, setUserData} from '../../../utilities'
import {
    Button,
    Card,
    CardBody,
    CardGroup,
    Col,
    Container,
    Form,
    FormFeedback,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row
} from 'reactstrap';
import logo from './../../../assets/img/logo.png';


class SignIn extends Component<IProps, IState> {
    state = {
        loginFormData: {
            email: '',
            password: '',
            state: 'PANEL'
        },
        formInvalid: false,
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
            loginFormData: {
                ...this.state.loginFormData,
                [name]: value
            }
        })
    };

    // componentWillReceiveProps = (nextProps) => {
    //     if (nextProps.error !== null && (nextProps.error !== this.props.error)) {
    //         if (nextProps.error) {
    //             toast.error(nextProps.error.message);
    //         }
    //     }
    // };

    onSubmitLogin = (evt) => {
        evt.preventDefault();
        if (evt.target.checkValidity()) {
            this.props.userSigninAction(this.state.loginFormData);
        } else {
            this.setState({formInvalid: true});
        }
    };

    render() {
        const {token, userData} = this.props;
        const {loginFormData, formInvalid} = this.state;
        if (token) {
            setToken(token);
            setUserData(userData);
            return (<Redirect to='/'/>)
        }

        return (
            <div className="app flex-row align-items-center sign-in-page">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6">
                            <CardGroup>
                                <Card className="p-4">
                                    <Row className="logo-bar">
                                        <Col md="6" xs='6' className="float-right">
                                            <h2 className="text-center">Admin Panel</h2>
                                        </Col>
                                        <Col md="6" xs='6'>
                                            <img src={logo} className="img-fluid" alt="Responsive image"/>
                                        </Col>
                                    </Row>
                                    <CardBody>
                                        <Form onSubmit={this.onSubmitLogin} noValidate>
                                            <p className="text-muted">Sign In to your account</p>
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
                                                    value={loginFormData.email}
                                                    invalid={loginFormData.email === '' && formInvalid}
                                                    onChange={this.onChangeTextInput}/>
                                                <FormFeedback>{"Username is required"}</FormFeedback>
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
                                                    value={loginFormData.password}
                                                    invalid={loginFormData.password === '' && formInvalid}
                                                    onChange={this.onChangeTextInput}/>
                                                <FormFeedback>{"Password is required"}</FormFeedback>
                                            </InputGroup>
                                            <Row>
                                                <Col md='6' sm='12' xs="12">
                                                    <Button type="submit"
                                                            className="px-4 primary-btn width_100P"
                                                    >
                                                        {/* {isLoading ? (
                                                            <Spinner size="sm" color="light"/>
                                                        ) :  */}
                                                        {'Login'}
                                                        {/* } */}
                                                    </Button>
                                                </Col>
                                                {/* <Col md='6' sm='12' xs="12" className="text-right forget-password">
                                                    <Link className="px-0" to='/forgot-password'>Forgot password?</Link>
                                                </Col> */}
                                            </Row>
                                        </Form>
                                    </CardBody>
                                </Card>
                                {/* <Card className="text-white  py-5 d-md-down-none primary-bg-color sign-up"
                                        style={{width: '44%'}}>
                                    <CardBody className="text-center">
                                        <div>
                                            <h2>Sign up</h2>
                                            <p>If you have no account please register a new account to get access to
                                                this panel. </p>
                                            <Link to="/signup">
                                                <Button className="mt-3 dark-btn" active tabIndex={-1}>Register
                                                    Now!</Button>
                                            </Link>
                                        </div>
                                    </CardBody>
                                </Card> */}
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default SignIn;
