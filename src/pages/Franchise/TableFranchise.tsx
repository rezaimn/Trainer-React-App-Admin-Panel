import React, {useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner, Table} from "reactstrap";
import HeaderTable from "./HeaderTable";
import {Link} from "react-router-dom";
import {Map} from "../../components";
import {FranchiseState} from "logic/src/models";

const TableFranchise = props => {

    const [modal, setModal] = useState(false);
    const [isModalDelete, setIsModalDelete] = useState(false)
    const [franchise, setFranchise] = useState<FranchiseState>();

    function showModal(item: FranchiseState, isDelete: boolean) {
        setIsModalDelete(isDelete);
        setModal(isModal => !isModal);
        setFranchise(item);
    }

    function deleteFranchise() {
        if(franchise){
            props.deleteFranchiseAction(franchise['id'])
            setModal(isModal => !isModal);
        }
        
    }
    return (
        <>
            <Table hover bordered striped responsive className={"mt-4"}>
                <thead>{<HeaderTable />}</thead>
                <tbody>
                    {props &&
                        props.users.length > 0 &&
                        props.users.map((item, index) => (
                            <tr key={item.id.toString()}>
                                <td>{index + 1}</td>
                                <td>
                                    {item.user && ((item.user.firstname || "") + (item.user.lastname || ""))}
                                </td>
                                <td>{(item.user && item.user.email) || ""}</td>
                                <td> {item.name || ""} </td>

                                <td>
                                    <Link
                                        className="fa fa-lg fa-edit"
                                        to={`/admin/franchise/edit/${item.id}`}
                                    ></Link>
                                    <span
                                        onClick={() => showModal(item, true)}
                                        className="fa fa-lg fa-remove text-danger px-2 pointer"
                                    ></span>
                                    <span
                                        className="fa fa-lg fa-map-o px-2 pointer"
                                        onClick={() => showModal(item, false)}
                                    ></span>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
            {props.isLoading && (
                <div className="text-center">
                    <Spinner color="success" type="grow" />
                </div>
            )}
            <Modal
                centered
                scrollable
                isOpen={modal}
                toggle={() => setModal(isModal => !isModal)}
            >
                <ModalHeader toggle={() => setModal(isModal => !isModal)}>
                    Franchise
                </ModalHeader>
                <ModalBody>
                    {isModalDelete ? (
                        "Are you sure?"
                    ) : (
                        <Map
                            className=""
                            geometry={(franchise && franchise.geometry) || []}
                            zoom={5}
                            query={props.query}
                        />
                    )}
                </ModalBody>
                {isModalDelete && (
                    <ModalFooter>
                        <Button
                            color="danger"
                            onClick={() => deleteFranchise()}
                        >
                            {"Delete"}
                        </Button>
                        <Button
                            color="secondary"
                            onClick={() => setModal(isModal => !isModal)}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                )}
            </Modal>
        </>
    );
};

export default TableFranchise;
