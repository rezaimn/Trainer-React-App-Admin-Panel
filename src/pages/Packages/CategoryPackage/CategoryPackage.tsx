import React from "react";
import { Table, Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import HeaderTable from "./HeaderTable";
import { AlertModal } from '../../../components'
import { IProps, IState, initialState, Action } from "./CategoryPackageContainer";
import { CategoryPackageState } from "logic/src/models";
import ModalAE from './ModalAddEdit';

class CategoryPackage extends React.Component<IProps, IState> {
    state = {
        ...initialState
    }
    componentDidMount = () => {
        this.props.getCategoryPackageAction();
        this.props.getUserFranchisesBaseOnRoleAction();
    };

    onActionModal = (item: CategoryPackageState | FormData | null) => {
        const { from } = this.state;
        if(from === 'add') {
            this.props.addCategoryPackageAction(item)
        }else {
            if(this.state.item){
                this.props.editCategoryPackageAction(this.state.item.id,item)
            }
            
        }
    }

    onAction = (item: CategoryPackageState | null, from: Action) => {
        
        if(from === 'delete') {
            this.setState({isShowModalDelete: true, item})
        }else {
            this.setState({
                from,
                item,
                isShowModal: true
            })
        }
        
    }

    deleteCategory = (item: CategoryPackageState) => {
        this.onToggleAlert()
        console.log(item)
        this.props.deleteCategoryPackageAction(item.id)
    }

    onToggleModal = () =>
        this.setState(prevState => ({ isShowModal: !prevState.isShowModal }));

    onToggleAlert = () =>
        this.setState(prevState => ({ isShowModalDelete: !prevState.isShowModalDelete }));


    render() {
        const { categoryPackage, franchises, isLoadingFranchises } = this.props;
        const { from, item, isShowModal, isShowModalDelete } = this.state;
        return (
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <span>
                                <i className="fa fa-cog" />
                                {"  Category package manager"}
                            </span>
                            <span className={"float-right text-success"} onClick={() => this.onAction(null, 'add')}>
                                {" "}
                                <i className="fa fa-plus pointer p-1" />{" "}
                            </span>
                        </CardHeader>
                        <CardBody>
                            <Table
                                hover
                                bordered
                                striped
                                responsive
                                className={"mt-4"}
                            >
                                <thead>{<HeaderTable />}</thead>
                                <tbody>
                                {categoryPackage  && categoryPackage.length> 0 &&
                                    categoryPackage.map((item, index) => (
                                        <tr key={item.id.toString()}>
                                            <td>{index + 1}</td>
                                            <td>
                                                {item.name}
                                            </td>
                                            <td>
                                                {item.Franchise && item.Franchise.name}
                                            </td>
                                            <td>
                                                {item.description}
                                            </td>
                                            <td>
                                                <span onClick={()=> this.onAction(item, 'edit')} className="fa fa-lg fa-edit text-primary pointer"></span>
                                                <span onClick={()=> this.onAction(item, 'delete')} className="fa fa-lg fa-remove text-danger px-2 pointer"></span>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
                { isShowModal && (<ModalAE 
                    isShowModal={isShowModal}
                    item={item}
                    franchises={franchises}
                    isLoadingFranchises={isLoadingFranchises}
                    from={from}
                    onAction={this.onActionModal}
                    onToggleModal={this.onToggleModal}
                    />
                )}
                { isShowModalDelete && (<AlertModal 
                    type={'Delete'}
                    toggleModal={this.onToggleAlert}
                    message={'Are you sure?'}
                    isShowModal={isShowModalDelete}
                    item={item}
                    title={'Delete Category Package'}
                    onClickAlert={this.deleteCategory}/>)}
            </Row>
        );
    }
}

export default CategoryPackage;
