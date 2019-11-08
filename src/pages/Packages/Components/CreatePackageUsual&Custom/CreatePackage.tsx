import React, {Component} from "react";
import {initialState, IProps, IState} from "./CreatePackageContainer";
import PaymentsPackage from "./PaymentsPackage";
import SettingsPackage from "./SettingsPackage";
import {Button, Card, CardBody, CardHeader, Col, Form, Row} from "reactstrap";
import {NameDropDown} from "../../../../constants";

class CreatePackage extends Component<IProps, IState> {
    state = {
        ...initialState,
    };

    onSubmitForm = (evt) => {
        evt.preventDefault();

        
        if(this.props.type === 'usual') {
            this.state.currentPackage.package_type = 'usual'
        }
        
        // TODO Check required
        if(this.props.from === 'add'){
            this.props.addPackageAction(this.state.currentPackage)
        } else {
            this.props.editPackageAction(this.props.id, this.state.currentPackage)
        }
        

    };

    componentDidMount = () => {

        this.props.getUserFranchisesBaseOnRoleAction();

        if(this.props.from === 'add') this.props.resetCurrentPackage()

        if(this.props.type === 'usual') {
            this.props.getCategoryPackageAction()
        }

        if(this.props.from === 'edit') {
            this.props.getByIdPackageAction(this.props.id)
        }
    };
    onChangeTextInput = evt => {
        const {
            target: { name, value }
        } = evt;
        this.setState({
            currentPackage: {
                ...this.state.currentPackage,
                [name]: value
            }
        });
    };

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.currentPackage !== this.props.currentPackage) {
            this.setState({
                currentPackage: {
                    ...nextProps.currentPackage
                }
            })
        }
    }

    onChangeTextNumber = (value, name) => {
        this.setState({
            currentPackage: {
                ...this.state.currentPackage,
                [name]: value
            }
        });
    };

    onChangeStatus = (status, name) => {
        this.setState({
            currentPackage: {
                ...this.state.currentPackage,
                [name]: status
            }
        });
    };

    onChangeDropdown = (item, value) => {
        switch (value.name) {
            case NameDropDown.franchise:
                this.setState(
                    {
                        currentPackage: {
                            ...this.state.currentPackage,
                            franchise_id: item["id"]
                        }
                    }
                )
        }
    };


    render() {
        const { 
            title,
            type, 
            categoryPackage, 
            from,
            franchises,
            isLoadingFranchises
        } = this.props;
        const {currentPackage} = this.state;
        return (
            <div className={`animated fadeIn w-100 h-100`}>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>{title}</CardHeader>
                            <CardBody>
                                <Form onSubmit={this.onSubmitForm} noValidate>
                                    <Row>
                                        <SettingsPackage
                                            type={type}
                                            setting_package={currentPackage}
                                            onChangeTextInput={
                                                this.onChangeTextInput
                                            }
                                            onChangeTextNumber={this.onChangeTextNumber}
                                            onChangeStatus={this.onChangeStatus}
                                            categoryPackage={categoryPackage}
                                            onChangeDropdown={this.onChangeDropdown}
                                            franchises={franchises}
                                            isLoadingFranchises={isLoadingFranchises}
                                        />
                                        <PaymentsPackage
                                            type={type}
                                            payments_package={currentPackage}
                                            onChangeTextInput={
                                                this.onChangeTextInput
                                            }
                                            onChangeTextNumber={this.onChangeTextNumber}
                                        />
                                    </Row>
                                    <Button
                                        className="primary-btn mt-2 col-md-2 col-sm-12"
                                        type={"submit"}
                                    >
                                        {from === 'add' ? 'Create Package' : 'Edit Package'}
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

export default CreatePackage;

const styleInput = {
    input: {
        height: 30
    }
};
