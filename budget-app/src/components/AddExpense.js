import { Modal, Button, Form } from 'react-bootstrap';
import { useRef } from 'react';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../contexts/BudgetContext';

export default function AddExpense({show, handleClose, defaultBudgetId})  {

  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();

  const { addExpense, budget } = useBudgets();
  function handleSubmit(e) {
    e.preventDefault();
    addExpense(
    {
        budgetId: budgetIdRef.current.value,
        description: descriptionRef.current.value,
        amount: parseFloat(amountRef.current.value)
    })
    handleClose();
  }



  return (
    <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>Add Budget</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className='mb-3'>
                    <Form.Label>Budget</Form.Label>
                    <Form.Select as='select' controlId='budgetId' ref={budgetIdRef} defaultValue={defaultBudgetId}>
                        <option id={UNCATEGORIZED_BUDGET_ID}> Uncategorized </option>
                        {budget && budget.map(budget => (
                            <option key={budget.id} value={budget.id}>
                                {budget.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type='text' placeholder='Enter description' controlId='description' ref={descriptionRef} required />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type='number' placeholder='Enter amount' controlId='amount' min='0' step='0.01' ref={amountRef} required />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='primary' type='submit'>Add Expense</Button>
            </Modal.Footer>
        </Form>
    </Modal>
  )
};

