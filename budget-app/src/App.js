import Container from "react-bootstrap/Container";
import { Stack, Button } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard.js";
import { ReactComponent as Logo } from "./logo.svg";
import AddBudget from "./components/AddBudget";
import AddExpense from "./components/AddExpense";
import { useState } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetContext";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import ViewExpense from "./components/ViewExpense";
import PieChart from "./components/PieChart";

function App() {
  // Handle the show and hide of the modals
  const [showAddBudget, setShowAddBudget] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);

  // Handle the show and hide of the view expense modal
  const [viewExpenseBudgetId, setViewExpenseBudgetId] = useState();

  // Get the budgets from the context
  const { budget, getBudgetExpense } = useBudgets();

  // Handel add expense modal budget id
  const [addExpenseBudgetId, setAddExpenseBudgetId] = useState();

  // Function to close the modals
  const handleClose = () => {
    setShowAddBudget(false);
    setShowAddExpense(false);
  };

  function openAddExpenseModal(budgetId) {
    setAddExpenseBudgetId(budgetId);
    setShowAddExpense(true);
  }

  return (
    <>
      <Container className="my-4">
        {/* Header */}
        <Stack
          direction="horizontal"
          gap="2"
          className="mb-4 border-bottom py-3 px-3"
          style={{ backgroundColor: "#1f2c30", borderRadius: "8px" }}
        >
          <Logo width="45" height="45" className="me-1" />
          <h1 className="me-auto fw-bold text-light text-uppercase pt-1 fs-2">
            BUDGET MANAGER
          </h1>
          <Button variant="light" onClick={() => setShowAddBudget(true)}>
            Add Budget
          </Button>
          <Button
            variant="outline-light"
            onClick={() => setShowAddExpense(openAddExpenseModal)}
          >
            Add Expense
          </Button>
        </Stack>
        {/* Budget Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(auto-fill, minmax(400px, 1fr))`,
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budget &&
            budget.map((budget) => {
              const amount = getBudgetExpense(budget.id).reduce(
                (total, expense) => total + expense.amount,
                0
              );
              return (
                <BudgetCard
                  key={budget.id}
                  name={budget.name}
                  amount={amount}
                  max={budget.maxBudget}
                  time={budget.time}
                  onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                  onViewExpenseClick={() => setViewExpenseBudgetId(budget.id)}
                />
              );
            })}

          {/* Uncategorized Budget card */}
          <UncategorizedBudgetCard
            onAddExpenseClick={openAddExpenseModal}
            onViewExpenseClick={() =>
              setViewExpenseBudgetId(UNCATEGORIZED_BUDGET_ID)
            }
          />

          {/* Total Budget card */}
          <TotalBudgetCard />
        </div>
      </Container>

      {/* Add a Budget */}
      <AddBudget show={showAddBudget} handleClose={handleClose} />

      {/* Add an Expense */}
      <AddExpense
        show={showAddExpense}
        handleClose={() => setShowAddExpense(false)}
        defaultBudgetId={addExpenseBudgetId}
      />

      {/* View Expense */}
      <ViewExpense
        budgetId={viewExpenseBudgetId}
        handleClose={() => setViewExpenseBudgetId(null)}
      />

      {/* Visualize expenses through pie charts */}
      <Container className="my-5 ">
        <PieChart />
      </Container>

      {/* Footer 
      <Container className="my-4">
        <Stack
          direction="horizontal"
          gap="2"
          className="mb-4 border-bottom py-3 px-3 justify-content-center"
          style={{ backgroundColor: "#1f2c30", borderRadius: "8px" }}
        >
          <Logo width="45" height="45" className="me-1" />
          <h1
            className="fw-bold text-light pt-1 fs-5 text-center"
            style={{ fontStyle: "italic", fontFamily: "cursive" }}
          >
            Made with 89 by Chernet
          </h1>
        </Stack>
      </Container>*/}
    </>
  );
}

export default App;
