import React from "react";
//import bootstrap
import { Modal } from "react-bootstrap";
//interface for the props
interface ModalRulesI {
  showModal: boolean;
  handleCloseModal: Object;
}

const ModalRules = (props: ModalRulesI) => {
  const { showModal, handleCloseModal } = props;
  return (
    <div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalRules;
