import React, {useEffect, useState} from "react";
import {Table} from "reactstrap";
import {Link} from 'react-router-dom';
import HeaderTable from "./HeaderTable";
import {AlertModal, CardContainer} from "../../../components";
import {IProps} from './CouponsListContainer'
import {CouponState} from "logic/src/models";
import Paginate from "../../../components/Paginate";

const CouponsList = ({getCouponsAction, coupons, deleteCouponsAction}: IProps) => {

    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [item, setItem] = useState<CouponState>()
    const [currentPage, setCurrentPage] = useState(1)


    useEffect(() => {
        getCouponsAction()
    }, [])

    const onToggleAlert = () => setIsShowModalDelete( isShowModalDelete => !isShowModalDelete)

    const deleteCoupons = (data: CouponState) => {
        deleteCouponsAction(data.id);
        onToggleAlert();
    }
    const showAlertDelet = (data: CouponState) => {
        setItem(data);
        onToggleAlert();
    }

    return (
        <CardContainer title={" COUPONS LIST"}>
            <>
                <Table hover bordered striped responsive className={"mt-4"}>
                    <thead>{<HeaderTable /*getCouponsAction={getCouponsAction} currentPage={currentPage}*/ />}</thead>
                    <tbody>
                    {coupons && coupons.data && coupons.data.length > 0 &&
                            coupons.data.map((item, index) => (
                                item.id && <tr key={item.id.toString()}>
                                    <td>
                                        {item.id}
                                    </td>
                                    <td>
                                        {item.code}
                                    </td>
                                    <td>
                                        {item.value}
                                    </td>
                                    <td>
                                        {item.maxBounce}
                                    </td>
                                    <td>
                                        {item.multiple ? 'Yes' : 'No'}
                                    </td>
                                    <td>
                                        {item.expireTime}
                                    </td>
                                    <td>
                                        {item && item.created_at}
                                    </td>
                                    <td>
                                        <Link to={`/admin/coupons/edit/${item.id}`} className="fa fa-lg fa-edit text-primary pointer"></Link>
                                        <span onClick={()=> showAlertDelet(item)} className="fa fa-lg fa-remove text-danger px-2 pointer"></span>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
                <AlertModal
                    type={'Delete'}
                    toggleModal={onToggleAlert}
                    message={'Are you sure?'}
                    isShowModal={isShowModalDelete}
                    item={item}
                    title={'Delete Coupons'}
                    onClickAlert={deleteCoupons}/>
            </>
            <Paginate lastPage={coupons.lastPage} total={coupons.total} onChangePage={page => setCurrentPage(page)} />
        </CardContainer>
    );
};

export default CouponsList;
