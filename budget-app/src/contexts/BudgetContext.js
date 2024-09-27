import React, { useContext, useState } from 'react'

const BudgetContext = React.createContext();


export default function useBudgets() {
  return useContext(BudgetContext);
}


// minute 21

export const BudgetProvider = ({ children }) => {

  // State to store the budget and expenses
  const [budget, setBudget] = useState([]);
  const {expense, setExpense} = useState([]);

  // Function to get the budget and expenses
  const getBudgetExpense = (budgetId) => {
    const selectedBudget = budget.find((item) => item.id === budgetId);
    const selectedExpense = expense.filter((item) => item.budgetId === budgetId);
    return {selectedBudget, selectedExpense};
  }

  return (
    <BudgetContext.Provider value={{
        budget,
        expense,
        getBudgetExpense,
        addBudget,
        addExpense,
        deleteBudget,
        deleteExpense,
    }}>
        {children}
    </BudgetContext.Provider>
  );
}