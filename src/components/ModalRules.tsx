import React from "react";
//import bootstrap
import { Modal, Table } from "react-bootstrap";
//style
import "./style/ModalRules.css";

//interface for the props
interface ModalRulesI {
  showModal: boolean;
  handleCloseModal: Object;
}

const ModalRules = (props: ModalRulesI) => {
  const { showModal, handleCloseModal } = props;
  return (
    <div className="rules">
      <Modal
        backdropClassName="back-drop-modal"
        contentClassName="rules-modal"
        show={showModal}
        onHide={handleCloseModal}
      >
        <Modal.Header className="rules-heading" closeButton>
          <Modal.Title className="rules-heading-title">
            Rewards Rules
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="rules-body">
          <Table className='rules-table' borderless >
            <tbody>
              <tr>
                <td>50</td>

                <td>🍒</td>
                <td>🍒</td>
                <td>🍒</td>
              </tr>
              <tr>
                <td>40</td>
                <td>🍒</td>
                <td>🍒</td>
              </tr>
              <tr>
                <td>20</td>
                <td>🍎</td>
                <td>🍎</td>
                <td>🍎</td>
              </tr>
              <tr>
                <td>10</td>
                <td>🍎</td>
                <td>🍎</td>
              </tr>
              <tr>
                <td>15</td>
                <td>🍌</td>
                <td>🍌</td>
                <td>🍌</td>
              </tr>
              <tr>
                <td>5</td>
                <td>🍌</td>
                <td>🍌</td>
              </tr>
              <tr>
                <td>3</td>
                <td>🍋</td>
                <td>🍋</td>
                <td>🍋</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalRules;
