import { Modal, Button, Form } from "react-bootstrap";
import { useRef } from "react";
import { useBudgets } from "../contexts/BudgetContext";

export default function AddBudget({ show, handleClose }) {
  const nameRef = useRef();
  const maxBudgetRef = useRef();

  const time = new Date().toISOString();

  const { addBudget } = useBudgets();
  function handleSubmit(e) {
    e.preventDefault();
    addBudget({
      name: nameRef.current.value,
      maxBudget: parseFloat(maxBudgetRef.current.value),
      time: time,
    });
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Budget Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter budget name"
              controlId="name"
              ref={nameRef}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Max Budget</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter max budget"
              controlId="maxBudget"
              min="0"
              step="0.01"
              ref={maxBudgetRef}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Add Budget
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
