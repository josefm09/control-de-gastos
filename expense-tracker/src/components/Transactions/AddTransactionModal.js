import React, { useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { Button, Modal, Form } from "react-bootstrap";
import "./modal.css";

export const AddTransactionModal = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
    setError("");
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const { addTransaction, currentMonth } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();

    if (text.trim() === "" || amount.trim() === "") {
      setError("Porfavor Ingresa una descripción y cantidad.");
      return;
    }

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount,
      date: new Date().getDate(),
    };

    setText("");
    setAmount(0);
    setError("");
    handleCloseModal();
    addTransaction(newTransaction, currentMonth);
  };

  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal} className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Agregar Movimiento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="text">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required={true}
                placeholder="Agrega una descripción"
                className="custom-input"
              />
            </Form.Group>

            <Form.Group controlId="amount" className="pt-2">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                value={amount}
                required={true}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Ingresa la cantidad..."
                className="custom-input"
              />
              <Form.Text className="text-muted custom-text-muted">
                (Negativo - Gasto, Positivo - Ingreso)
              </Form.Text>
            </Form.Group>

            {error && <div className="text-danger">{error}</div>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleCloseModal} className="custom-button-secondary">
            Cerrar
          </Button>
          <Button variant="primary" onClick={onSubmit} className="custom-button-primary">
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="fixed-bottom d-flex justify-content-center mb-3">
        <Button
          onClick={handleShowModal}
          className="add-transaction-button"
        >
          Agregar Movimiento
        </Button>
      </div>
    </>
  );
};
