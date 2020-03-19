import React from 'react';
import { Modal, ModalHeader, Form, ModalBody, ModalFooter, Button } from 'reactstrap';
export default function CustomModal(props) {
    const {
        className,
        modal,
        toggle,
        handleSubmit
    } = props;


    return (

        <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>Add To Cart</ModalHeader>
            <ModalBody>
                <Form id="form" onSubmit={handleSubmit}>
                    {props.children}
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button form="form" type="submit" color="primary">Submit</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}