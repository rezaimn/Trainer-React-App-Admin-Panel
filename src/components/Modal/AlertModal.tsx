import React, {useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

interface IProps {
    isShowModal: boolean;
    toggleModal: () => void;
    message: string;
    title: string;
    type: 'Delete' | 'OK' | 'Save';
    onClickAlert: (item: any) => void;
    item: any;
}
const AlertModal = (props: IProps) => {
    const {
        isShowModal = false,
        message = "",
        title = "",
        type = "Delete",
        onClickAlert,
        item,
        toggleModal
    } = props;

    return (
        <Modal
            centered
            scrollable
            isOpen={isShowModal}
            toggle={toggleModal}
        >
            <ModalHeader toggle={toggleModal}>
                {title}
            </ModalHeader>
            <ModalBody>{message}</ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={() => onClickAlert(item)}>
                    {type}
                </Button>
                <Button
                    color="secondary"
                    onClick={toggleModal}
                >
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export { AlertModal };
