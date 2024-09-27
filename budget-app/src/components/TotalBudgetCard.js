import React from 'react';
import BudgetCard from './BudgetCard';
import { useBudgets } from '../contexts/BudgetContext';


export default function TotalBudgetCard() {
  
  const { budget, expense } = useBudgets();

  const amount = expense.reduce(
    (total, expense) => total + expense.amount, 0
  );

  const max = budget.reduce(
    (total, budget) => total + budget.maxBudget, 0
  );

  if (max === 0) return null;

  return (
    <BudgetCard name='Total'  gray max={max} amount={amount} hideButtons />
        
  )
}
