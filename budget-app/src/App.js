import Container from 'react-bootstrap/Container';
import { Stack, Button } from 'react-bootstrap';
import BudgetCard from './components/BudgetCard.js';
import { ReactComponent as Logo } from './logo.svg';
import AddBudget from './components/AddBudget';
import AddExpense from './components/AddExpense';
import { useState } from 'react';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetContext';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import TotalBudgetCard from './components/TotalBudgetCard';
import ViewExpense from './components/ViewExpense';


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
  }


  function openAddExpenseModal(budgetId) {
    setAddExpenseBudgetId(budgetId);
    setShowAddExpense(true);
  }

  

  return (
    <>
    <Container className='my-4'>
      <Stack direction='horizontal' gap='2' className='mb-5'>
        <Logo width='45' height='45' className='me-1'/>
        <h1 className='me-auto fw-bold text-secondary text-uppercase pt-1 fs-2'>BUDGET APP </h1>
        <Button variant='primary' onClick={() => setShowAddBudget(true)}>Add Budget</Button>
        <Button variant='outline-primary' onClick={() => setShowAddExpense(openAddExpenseModal)}>Add Expense</Button>
      </Stack>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: `repeat(auto-fill, minmax(400px, 1fr))`, 
        gap: '1rem',
        alignItems: 'flex-start' }}>

        {budget && budget.map(budget => {
          const amount = getBudgetExpense(budget.id).reduce(
            (total, expense) => total + expense.amount, 0
          )
          return (
            <BudgetCard 
              key={budget.id}
              name={budget.name}
              amount={amount}
              max={budget.maxBudget}
              onAddExpenseClick={() => openAddExpenseModal(budget.id)}
              onViewExpenseClick={() => setViewExpenseBudgetId(budget.id)}
            />
          )
        })
      }

      {/* Uncategorized Budget card /> */}
      <UncategorizedBudgetCard
        onAddExpenseClick={openAddExpenseModal}
        onViewExpenseClick={() => setViewExpenseBudgetId(UNCATEGORIZED_BUDGET_ID)}
        />

      {/* Total Budget card /> */}
      <TotalBudgetCard />

      </div>

    </Container>

    {/*Add Budget Modal */}
    <AddBudget show={showAddBudget } handleClose={handleClose} />

    {/*Add Expense Modal */}
    <AddExpense show={showAddExpense } handleClose={() => setShowAddExpense(false)}  defaultBudgetId={addExpenseBudgetId} />
    
    {/*View Expense Modal */}
    <ViewExpense budgetId={viewExpenseBudgetId} handleClose={() => setViewExpenseBudgetId(null)} />

    </>

  );
}

export default App;
