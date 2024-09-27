import React from 'react';
import BudgetCard from './BudgetCard';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../contexts/BudgetContext';


export default function UncategorizedBudgetCard(props) {
  
  // useBudgets hook to access the getBudgetExpense function
  const { getBudgetExpense } = useBudgets();

  // Get the total amount of the uncategorized budget expenses and pass it to the BudgetCard component
  const amount = getBudgetExpense(UNCATEGORIZED_BUDGET_ID).reduce(
    (total, expense) => total + expense.amount, 0
  );


  // If thre is no uncategorized budget, din't render the card
  if (amount === 0) return null;

  return (
    <BudgetCard name='Uncategorized' amount={amount} {...props} gray />
        
  )
}
