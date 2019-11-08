import React, {Component} from "react";
import {Button, Col, Form, Label, Row} from "reactstrap";
import {ResetPasswordState} from "logic"
import {TextInput} from "../../../../components";

interface IProps {
    userResetPassAction: (password: string) => void;
    email: string;

}

class ResetPassword extends Component<IProps> {

    state = {
        formInvalid: false,
        resetPassword: {
            password: '',
            confirm: ''
        }
    };
    onChangeTextInput = evt => {
        evt.preventDefault();
        const {
            target: {name, value}
        } = evt;
        this.setState({
            resetPassword: {
                ...this.state.resetPassword,
                [name]: value
            }
        });
    };
    onSubmitForm = evt => {
        evt.preventDefault();
        this.setState({formInvalid: false});


        if (this.state.resetPassword.password === this.state.resetPassword.confirm && !this.state.formInvalid) {
            const body: ResetPasswordState = {
                password: this.state.resetPassword.password,
                email: this.props.email,
                code: Math.floor(Math.random() * 1000)
            };
            console.log("333333333333333333333333333333333333", body)
            this.props.userResetPassAction(body);
        } else {
            this.setState({formInvalid: true});
        }
    };

    render() {
        const {} = this.props;
        const {resetPassword, formInvalid} = this.state;
        return (


            <Form onSubmit={this.onSubmitForm} noValidate>
                <Row>
                    <Col sm="6">
                        {/* Password */}
                        <Label for="password">Password</Label>
                        <TextInput
                            icon={"key"}
                            placeholder="Password"
                            name="password"
                            type="password"
                            required
                            value={resetPassword.password}
                            textInvalid={"Password is required"}
                            invalid={
                                resetPassword.password === "" &&
                                formInvalid
                            }
                            onChange={this.onChangeTextInput}
                        />
                    </Col>
                    <Col sm="6">
                        {/* Lastname */}
                        <Label for="confirm">
                            Confirm Password
                        </Label>
                        <TextInput
                            icon={"key"}
                            placeholder="Confirm Password"
                            name="confirm"
                            required
                            type="password"
                            value={resetPassword.confirm}
                            textInvalid={"Confirm Password is required"}
                            invalid={
                                resetPassword.confirm === "" &&
                                formInvalid
                            }
                            onChange={this.onChangeTextInput}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col sm="12">
                        <Button type="submit" className="primary-btn mt-4">
                            Edit Password
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default ResetPassword;
