import React, { useState } from "react";
import { Modal, Button, Stack, Table, Form } from "react-bootstrap";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetContext";
import { currencyFormatter } from "../utils/currencyFormatter";
import { timeFormatter } from "../utils/timeFormatter";
import {
  showDeleteBudgetAlert,
  showDeleteExpenseAlert,
} from "../utils/toaster";

export default function ViewExpense({ budgetId, handleClose }) {
  const {
    getBudgetExpense,
    budget,
    deleteBudget,
    deleteExpense,
    updateExpense,
  } = useBudgets(); // Added updateExpense

  const budgets =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
      : budget.find((budget) => budget.id === budgetId);

  // Search expenses by date/description
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");

  // State for editing expenses
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [editedDescription, setEditedDescription] = useState("");
  const [editedAmount, setEditedAmount] = useState("");

  // Filter Function
  const filteredExpenses = getBudgetExpense(budgetId).filter((expense) => {
    const matchesDescription = expense.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDate = searchDate
      ? new Date(expense.time).toISOString().split("T")[0] === searchDate
      : true;
    return matchesDescription && matchesDate;
  });

  // Handle save edited expense
  const handleSaveEdit = (expenseId) => {
    updateExpense(expenseId, {
      description: editedDescription,
      amount: parseFloat(editedAmount),
    });
    setEditingExpenseId(null);
  };

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="4">
            <div className="fw-bold fs-4">{budgets?.name}</div>
            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => {
                  showDeleteBudgetAlert(() => deleteBudget(budgetId));
                  handleClose();
                }}
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/** Search for expenses using date or description */}
        <input
          type="text"
          placeholder="Search by description"
          className="form-control mb-3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="date"
          className="form-control mb-3"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense) => (
              <tr key={expense.id}>
                <td>
                  {editingExpenseId === expense.id ? (
                    <Form.Control
                      type="text"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                    />
                  ) : (
                    expense.description
                  )}
                </td>
                <td>
                  {editingExpenseId === expense.id ? (
                    <Form.Control
                      type="number"
                      value={editedAmount}
                      onChange={(e) => setEditedAmount(e.target.value)}
                    />
                  ) : (
                    currencyFormatter.format(expense.amount)
                  )}
                </td>
                <td>{timeFormatter(expense.time)}</td>
                <td>
                  {editingExpenseId === expense.id ? (
                    <>
                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() => handleSaveEdit(expense.id)}
                        style={{ margin: "1px 3px" }}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => setEditingExpenseId(null)}
                        style={{ margin: "1px 3px" }}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => {
                          setEditingExpenseId(expense.id);
                          setEditedDescription(expense.description);
                          setEditedAmount(expense.amount);
                        }}
                        style={{ margin: "1px 3px" }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() =>
                          showDeleteExpenseAlert(() =>
                            deleteExpense(expense.id)
                          )
                        }
                        style={{ margin: "1px 3px" }}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
}
