import { Modal, Button, Stack, Table } from 'react-bootstrap';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../contexts/BudgetContext';
import { currencyFormatter } from '../utils/currencyFormatter';
import Swal from 'sweetalert2';

export default function ViewExpense({budgetId, handleClose})  {

  const { getBudgetExpense, budget, deleteBudget, deleteExpense } = useBudgets();

  const budgets = UNCATEGORIZED_BUDGET_ID === budgetId ? { name: 'Uncategorized', id: UNCATEGORIZED_BUDGET_ID } : budget.find(budget => budget.id === budgetId);

const handleDeleteBudget = () => {
        Swal.fire({
            text: "Do you want to delete this budget?",
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes!',
            cancelButtonText: 'No!',
            width: '40vh',
            height: '10vh'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteBudget(budgetId);
                handleClose();
            }
        });
    };

const handleDeleteExpense = (expenseId) => {
    Swal.fire({
        text: "Do you want to delete this expense?",
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes!',
        cancelButtonText: 'No!',
        width: '40vh',
        height: '10vh'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteExpense(expenseId);
        }
    });
};

return (
    <Modal show={budgetId != null} onHide={handleClose}>
            <Modal.Header closeButton>
                    <Modal.Title>
                            <Stack direction='horizontal' gap='4'>
                                    <div>Expense - {budgets?.name}</div>
                                    {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                                            <Button variant='outline-danger' size='sm' onClick={handleDeleteBudget}>Delete</Button>
                                    )}
                            </Stack>
                    </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Table striped bordered hover>
                            <thead>
                                    <tr>
                                            <th>Description</th>
                                            <th>Amount</th>
                                            <th></th>
                                    </tr>
                            </thead>
                            <tbody>
                                    {getBudgetExpense(budgetId).map(expense => (
                                            <tr key={expense.id}>
                                                    <td>{expense.description}</td>
                                                    <td>{currencyFormatter.format(expense.amount)}</td>
                                                    <td>
                                                            <Button variant='outline-danger' size='sm' onClick={() => handleDeleteExpense(expense.id)}>Delete</Button>
                                                    </td>
                                            </tr>
                                    ))}
                            </tbody>
                    </Table>
            </Modal.Body>
            <Modal.Footer>
                    <Button variant='primary' type='submit'>Add Budget</Button>
            </Modal.Footer>
    </Modal>
)
};

