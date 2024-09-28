import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders Budget Manager title", () => {
  render(<App />);
  const titleElement = screen.getByText(/BUDGET MANAGER/i);
  expect(titleElement).toBeInTheDocument();
});

test("renders Add Budget button", () => {
  render(<App />);
  const addButton = screen.getByText(/Add Budget/i);
  expect(addButton).toBeInTheDocument();
});

test("renders Add Expense button", () => {
  render(<App />);
  const addExpenseButton = screen.getByText(/Add Expense/i);
  expect(addExpenseButton).toBeInTheDocument();
});

test("opens Add Budget modal when Add Budget button is clicked", () => {
  render(<App />);
  const addButton = screen.getByText(/Add Budget/i);
  fireEvent.click(addButton);
  const modalTitle = screen.getByText(/Add Budget/i);
  expect(modalTitle).toBeInTheDocument();
});

test("opens Add Expense modal when Add Expense button is clicked", () => {
  render(<App />);
  const addExpenseButton = screen.getByText(/Add Expense/i);
  fireEvent.click(addExpenseButton);
  const modalTitle = screen.getByText(/Add Expense/i);
  expect(modalTitle).toBeInTheDocument();
});

test("renders BudgetCard components", () => {
  render(<App />);
  const budgetCards = screen.getAllByText(/View Expenses/i);
  expect(budgetCards.length).toBeGreaterThan(0);
});

test("renders Uncategorized Budget card", () => {
  render(<App />);
  const uncategorizedCard = screen.getByText(/Uncategorized/i);
  expect(uncategorizedCard).toBeInTheDocument();
});

test("renders Total Budget card", () => {
  render(<App />);
  const totalBudgetCard = screen.getByText(/Total/i);
  expect(totalBudgetCard).toBeInTheDocument();
});

test("opens View Expense modal when View Expenses button is clicked", () => {
  render(<App />);
  const viewExpenseButtons = screen.getAllByText(/View Expenses/i);
  fireEvent.click(viewExpenseButtons[0]);
  const modalTitle = screen.getByText(/Expenses/i);
  expect(modalTitle).toBeInTheDocument();
});
