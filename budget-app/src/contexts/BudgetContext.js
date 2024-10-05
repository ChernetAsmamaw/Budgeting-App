import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

// Create a context for the budget and expense data
const BudgetContext = React.createContext();

// Constant for uncategorized budget ID
export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

// Custom hook to consume the context
export function useBudgets() {
  return useContext(BudgetContext);
}

export const BudgetProvider = ({ children }) => {
  // Using custom local storage hook to store budget and expense arrays
  const [budget, setBudget] = useLocalStorage("budget", []);
  const [expense, setExpense] = useLocalStorage("expense", []);

  /**
   * Retrieves all expenses associated with a specific budget.
   * @param {string} budgetId - The ID of the budget for which expenses are retrieved.
   * @returns {Array} - An array of expenses that belong to the specified budget.
   */
  function getBudgetExpense(budgetId) {
    if (!expense) return [];
    return expense.filter((expense) => expense.budgetId === budgetId);
  }

  /**
   * Adds a new budget to the list. If a budget with the same name exists, it won't add a duplicate.
   * @param {Object} budgetData - The new budget data containing name, maxBudget, and time.
   * @param {string} budgetData.name - The name of the budget.
   * @param {number} budgetData.maxBudget - The maximum allowable budget.
   * @param {string} budgetData.time - The time of budget creation.
   */
  function addBudget({ name, maxBudget, time }) {
    setBudget((previousBudget) => {
      // Prevent duplicate budgets with the same name
      if (previousBudget.find((budget) => budget.name === name)) {
        return previousBudget;
      }
      // Add a new budget
      return [...previousBudget, { id: uuidv4(), name, maxBudget, time }];
    });
  }

  /**
   * Adds a new expense to a specified budget.
   * @param {Object} expenseData - The expense data containing budgetId, description, amount, and time.
   * @param {string} expenseData.budgetId - The ID of the budget to which the expense belongs.
   * @param {string} expenseData.description - The description of the expense.
   * @param {number} expenseData.amount - The amount spent.
   * @param {string} expenseData.time - The time when the expense was made.
   */
  function addExpense({ budgetId, description, amount, time }) {
    setExpense((previousExpense) => {
      // Add a new expense
      return [
        ...previousExpense,
        { id: uuidv4(), budgetId, description, amount, time },
      ];
    });
  }

  /**
   * Deletes a budget and moves its associated expenses to the uncategorized budget.
   * @param {string} budgetId - The ID of the budget to be deleted.
   */
  function deleteBudget(budgetId) {
    setExpense((previousExpense) => {
      // Move all expenses from the deleted budget to the uncategorized budget
      return previousExpense.map((expense) => {
        if (expense.budgetId !== budgetId) return expense;
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
      });
    });

    setBudget((previousBudget) => {
      // Remove the budget by filtering it out from the list
      return previousBudget.filter((budget) => budget.id !== budgetId);
    });
  }

  /**
   * Deletes a specific expense.
   * @param {string} expenseId - The ID of the expense to be deleted.
   */
  function deleteExpense(expenseId) {
    setExpense((previousExpense) => {
      // Remove the expense by filtering it out
      return previousExpense.filter((expense) => expense.id !== expenseId);
    });
  }

  /**
   * Updates an existing expense's description and amount.
   * @param {string} id - The ID of the expense to be updated.
   * @param {Object} updatedExpenseData - The updated expense data.
   * @param {string} updatedExpenseData.description - The updated description of the expense.
   * @param {number} updatedExpenseData.amount - The updated amount of the expense.
   */
  function updateExpense(id, { description, amount }) {
    setExpense((previousExpense) => {
      // Find the expense by its ID and update its data
      return previousExpense.map((expense) => {
        if (expense.id === id) {
          return { ...expense, description, amount };
        }
        return expense;
      });
    });
  }

  return (
    <BudgetContext.Provider
      value={{
        budget, // Array of budgets
        expense, // Array of expenses
        getBudgetExpense, // Function to retrieve expenses by budget
        addBudget, // Function to add a new budget
        addExpense, // Function to add a new expense
        deleteBudget, // Function to delete a budget
        deleteExpense, // Function to delete an expense
        updateExpense, // Function to update an expense
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
