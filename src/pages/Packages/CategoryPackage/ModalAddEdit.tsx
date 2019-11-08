import React from "react";
import { CategoryPackageState, FranchiseState } from "logic/src/models";
import { TextInput } from "../../../components";
import { Action } from './CategoryPackageContainer'
import {
    Modal,
    ModalHeader,
    ModalBody,
    FormFeedback,
    Button,
    Form,
    Row,
    Col,
    FormGroup,
    Label,
    Input
} from "reactstrap";
import Select from "react-select";

interface IProps {
    from: Action;
    item: CategoryPackageState | null;
    franchises: FranchiseState[];
    isLoadingFranchises: boolean;
    onAction: (item: FormData | CategoryPackageState | null) => void;
    isShowModal: boolean;
    onToggleModal: () => void;
}

interface IState {
    formInvalid: boolean;
    category: CategoryPackageState;
}
class ModalAE extends React.Component<IProps, IState> {
    state = {
        formInvalid: false,
        category: {
            id: 0,
            icon: "",
            name: "",
            description: "",
            status: false,
            franchise_id: 0
        },
    };

    constructor(props) {
        super(props);
        if (this.props.from === "edit"  && this.props.item) {
            this.state.category.description=this.props.item.description
            this.state.category.name=this.props.item.name
            this.state.category.id=this.props.item.id
            this.state.category.status=this.props.item.status
            this.state.category.franchise_id=this.props.item.franchise_id
        }
    }

    onSubmitForm = evt => {
        evt.preventDefault();
        this.setState({ formInvalid: false });
        const formData = new FormData();
        formData.append("icon", this.state.category.icon || (this.props.item && this.props.item.icon));
        formData.append("name", this.state.category.name);
        formData.append("description", this.state.category.description);
        formData.append("franchise_id", ''+this.state.category.franchise_id);
        formData.append("status", this.state.category && this.state.category.status && this.state.category.status.toString() || 'true');
        if (evt.target.checkValidity()) {
            this.props.onToggleModal();
            this.props.onAction(formData);
        } else {
            this.setState({ formInvalid: true });
        }
    };

    onChangeInputFile = evt => {
        this.setState({
            category: {
                ...this.state.category,
                icon: evt.target.files[0]
            }
        });
    };

    onChangeTextInput = evt => {
        evt.preventDefault();
        const {
            target: { name, value }
        } = evt;
        this.setState({
            category: {
                ...this.state.category,
                [name]: value
            }
        });
    };

    onChangeFranchise = (item, value) => {
        this.setState(
            {
                category: {
                    ...this.state.category,
                    franchise_id: item["id"]
                }
            }
        )
    } 

    render() {
        const { from, onToggleModal, isShowModal, franchises, isLoadingFranchises } = this.props;
        const {
            formInvalid,
            category: { description, icon, name }
        } = this.state;
        let imageIcon: any = '';
        icon ? imageIcon = URL.createObjectURL(icon) : imageIcon = this.props.item && this.props.item.icon;

        return (
            <Modal
                centered
                scrollable
                isOpen={isShowModal}
                toggle={onToggleModal}
            >
                <ModalHeader toggle={onToggleModal}>
                    {from === "add"
                        ? "add category package"
                        : "edit category package"}
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.onSubmitForm} noValidate>
                        <Row>
                            <Col sm="12">
                                {/* TODO */}
                                { imageIcon && (<img src={imageIcon} alt={'icon'} style={{width: 50, height: 50}}/>)}
                                <FormGroup>
                                    <Label for="avatar">Upload Icon</Label>
                                    <Input
                                        type="file"
                                        name="file"
                                        id="icon"
                                        onChange={this.onChangeInputFile}
                                        required={false}
                                        invalid={icon === "" && formInvalid}
                                    />
                                    <FormFeedback>
                                        {"Icon is required"}
                                    </FormFeedback>
                                </FormGroup>

                                <Label for="franchise" className={"mt-2"}>
                                    Franchise
                                </Label>
                                <Select
                                    id="franchise"
                                    className={"w-100"}
                                    getOptionLabel={opt => opt.name}
                                    getOptionValue={opt => opt.id}
                                    options={franchises}
                                    menuPosition={"fixed"}
                                    name={"franchise"}
                                    placeholder="Franchise"
                                    isLoading={isLoadingFranchises}
                                    onChange={this.onChangeFranchise}
                                    menuShouldBlockScroll
                                    value={franchises.filter(i => i.id == this.state.category.franchise_id)}
                                />

                                {/* {Name} */}
                                <Label for="Lastname">Name</Label>
                                <TextInput
                                    icon={"icon-user"}
                                    placeholder="Name"
                                    name="name"
                                    required
                                    value={name || ""}
                                    textInvalid={"Name is required"}
                                    invalid={name === "" && formInvalid}
                                    onChange={this.onChangeTextInput}
                                />

                                {/* {Description} */}
                                <Label className={"mt-3"} for="Lastname">
                                    Description
                                </Label>
                                <TextInput
                                    icon={"icon-user"}
                                    placeholder="Description"
                                    name="description"
                                    required
                                    value={description || ""}
                                    textInvalid={"Description is required"}
                                    invalid={description === "" && formInvalid}
                                    onChange={this.onChangeTextInput}
                                />
                                {from === 'edit' && (
                                    <FormGroup>
                                    <Label for="status" className="mt-4">
                                        Status
                                    </Label>
                                    <Input
                                        value={this.state.category.status}
                                        onChange={this.onChangeTextInput}
                                        name={'status'}
                                        type="select"
                                        id="exampleSelect"
                                    >
                                        <option value={"true"}>active</option>
                                        <option value={"false"}>inactive</option>
                                    </Input>
                                </FormGroup>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12">
                                <Button
                                    type="submit"
                                    className="primary-btn mt-4"
                                >
                                    {from === "add"
                                        ? "create category package"
                                        : "edit category package"}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
            </Modal>
        );
    }
}

export default ModalAE;
