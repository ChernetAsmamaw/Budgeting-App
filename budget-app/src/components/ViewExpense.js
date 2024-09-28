import React from "react";
import { Modal, Button, Stack, Table } from "react-bootstrap";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetContext";
import { currencyFormatter } from "../utils/currencyFormatter";
import { timeFormatter } from "../utils/timeFormatter";
import {
  showDeleteBudgetAlert,
  showDeleteExpenseAlert,
} from "../utils/toaster";

export default function ViewExpense({ budgetId, handleClose }) {
  const { getBudgetExpense, budget, deleteBudget, deleteExpense } =
    useBudgets();

  const budgets =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
      : budget.find((budget) => budget.id === budgetId);

  // Search expenses by date/description
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchDate, setSearchDate] = React.useState("");

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

        <Table striped bordered hover>
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
                <td>{expense.description}</td>
                <td>{currencyFormatter.format(expense.amount)}</td>
                <td>{timeFormatter(expense.time)}</td>
                <td>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() =>
                      showDeleteExpenseAlert(() => deleteExpense(expense.id))
                    }
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
}
