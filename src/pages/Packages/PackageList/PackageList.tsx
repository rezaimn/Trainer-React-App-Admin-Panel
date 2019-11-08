import React from "react";
import {Card, CardBody, CardHeader, Col, Input, Row, Table} from "reactstrap";
import HeaderTable from "./HeaderTable";
import {AlertModal} from '../../../components'
import {PackageState} from "logic/src/models";
import {initialState, IProps, IState} from "./PackageListContainer";
import {Link} from 'react-router-dom';
import Paginate from "../../../components/Paginate";

class PackageList extends React.Component<IProps, IState> {
    state = {
        ...initialState,
        filterKey : ""
    }
    componentDidMount = () => {
        this.getList(this.state.currentPage)
        this.props.getCategoryPackageAction()
    };
    onAction = (item: PackageState | null) => {
        this.setState({isShowModalDelete: true, item})
    }
    deletePackage = (item: PackageState) => {
        this.onToggleAlert()
        this.props.deletePackageAction(item.id)
    }
    onSearchChange = (event: any) => {
        this.setState({filterKey: event.target.value});
    }
    onToggleAlert = () =>
        this.setState(prevState => ({ isShowModalDelete: !prevState.isShowModalDelete }));

    filterList = (packageList: PackageState[]) => {
        let result =  packageList.filter(i => {
            for(let key in i){
                if((i[key]+"").includes(this.state.filterKey))
                    return true;
            }
            return false;
        });
        return result;
    }
    changeStatus = (id, mode) => {
        const body = {
            mode: (mode === 'NEW' || mode === 'ARCHIVE') ? 'PUBLISH' : 'ARCHIVE'
        }
        this.props.updatePackageModeAction(id, body);
    };
    onChangePage = page => {
        this.setState({ currentPage: page });
        this.getList(page)
    }
    getList = page => {
        this.props.getPackageAction(page)
    }

    render() {
        const { packagesList, categoryPackage } = this.props;
        const { isShowModalDelete, item } = this.state;
        return (
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <span>
                                <i className="fa fa-align-justify" />
                                {" Package List"}
                            </span>

                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col>
                                    <Input onChange={e => this.onSearchChange(e)} type="text" name="searchKey" placeholder="Search..." />
                                </Col>
                            </Row>
                            <Table
                                hover
                                bordered
                                striped
                                responsive
                                className={"mt-4"}
                            >
                                <thead>{<HeaderTable />}</thead>
                                <tbody>
                                {packagesList.data && packagesList.total> 0 &&
                                    this.filterList(packagesList.data).map((item) => (
                                        <tr key={item.id.toString()}>
                                            <td>
                                                {item.package_type || 'custom'}
                                            </td>
                                            <td>
                                                <i className={item.status ? "fa fa-check-circle text-success font-30" : "fa fa-lg fa-times-circle text-danger font-30"}></i>
                                            </td>
                                            <td>
                                                {categoryPackage && categoryPackage.length > 0 && categoryPackage
                                                    .filter( i => i.id === item.package_category )
                                                    .map( i => i.name )
                                                }
                                            </td>
                                            <td>
                                                {item.month || ''}
                                            </td>
                                            <td>
                                                {item.quantity || ''}
                                            </td>
                                            <td>
                                                {item.additional_person_amount + '$' || ''}
                                            </td>
                                            <td>
                                                {item.session_time + ' hours' || ''}
                                            </td>
                                            <td>
                                                {item.price_amount+'$' || ''}
                                            </td>
                                            <td>
                                                <input
                                                    className={'check-box'}
                                                    type={'checkbox'}
                                                    checked={(item.mode === "NEW" || item.mode === "ARCHIVE") ? false : true}
                                                    onChange={() => {
                                                        this.changeStatus(item.id, item.mode)
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <Link to={`/admin/packages/${item.package_type}/edit/${item.id}`}><span className="fa fa-lg fa-edit text-primary pointer"></span></Link>
                                                <span onClick={() => this.onAction(item)} className="fa fa-lg fa-remove text-danger px-2 pointer"></span>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                            </Table>
                            <Paginate lastPage={packagesList.lastPage} total={packagesList.total} onChangePage={this.onChangePage} />
                        </CardBody>
                    </Card>
                </Col>

                { isShowModalDelete && (<AlertModal 
                    type={'Delete'}
                    toggleModal={this.onToggleAlert}
                    message={'Are you sure?'}
                    isShowModal={isShowModalDelete}
                    item={item}
                    title={'Delete Package'}
                    onClickAlert={this.deletePackage}/>)}
            </Row>
        );
    }
}

export default PackageList;
