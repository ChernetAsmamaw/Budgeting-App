import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

const BudgetContext = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export function useBudgets() {
  return useContext(BudgetContext);
}

// minute 21

export const BudgetProvider = ({ children }) => {
  // State to store the budget and expenses
  const [budget, setBudget] = useLocalStorage("budget", []);
  const [expense, setExpense] = useLocalStorage("expense", []);

  // Function to get the expenses of a budget
  function getBudgetExpense(budgetId) {
    if (!expense) return [];
    return expense.filter((expense) => expense.budgetId === budgetId);
  }

  // Function to add a budget
  function addBudget({ name, maxBudget, time }) {
    setBudget((previousBudget) => {
      if (previousBudget.find((budget) => budget.name === name)) {
        return previousBudget;
      }
      return [...previousBudget, { id: uuidv4(), name, maxBudget, time }];
    });
  }

  // Function to add an expense
  function addExpense({ budgetId, description, amount, time }) {
    setExpense((previousExpense) => {
      return [
        ...previousExpense,
        { id: uuidv4(), budgetId, description, amount, time },
      ];
    });
  }

  // Function to delete a budget
  function deleteBudget(budgetId) {
    setExpense((previousExpense) => {
      return previousExpense.map((expense) => {
        if (expense.budgetId !== budgetId) return expense;
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
      });
    });

    setBudget((previousBudget) => {
      // This keeps the budgets that do not match the id and removes the one that matches
      return previousBudget.filter((budget) => budget.id !== budgetId);
    });
  }

  // Function to delete an expense
  function deleteExpense(expenseId) {
    setExpense((previousExpense) => {
      return previousExpense.filter((expense) => expense.id !== expenseId);
    });
  }

  return (
    <BudgetContext.Provider
      value={{
        budget,
        expense,
        getBudgetExpense,
        addBudget,
        addExpense,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
