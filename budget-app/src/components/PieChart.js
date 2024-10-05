import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import React, { useMemo } from "react";
import { useBudgets } from "../contexts/BudgetContext";
import { Stack } from "react-bootstrap";

ChartJS.register(ArcElement, Tooltip, Legend);

// Function to calculate total expenses for each budget
function calculateChartData(budget, getBudgetExpense) {
  const labels = budget.map((b) => b.name);
  const values = budget.map((b) => {
    const totalExpense = getBudgetExpense(b.id).reduce(
      (total, expense) => total + expense.amount,
      0
    );
    return totalExpense;
  });

  return {
    labels,
    datasets: [
      {
        label: "Expenses",
        data: values,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(201, 203, 207, 0.6)",
          "rgba(255, 99, 71, 0.6)",
          "rgba(144, 238, 144, 0.6)",
          "rgba(255, 215, 0, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(201, 203, 207, 1)",
          "rgba(255, 99, 71, 1)",
          "rgba(144, 238, 144, 1)",
          "rgba(255, 215, 0, 1)",
        ],
        borderWidth: 1,
        hoverBackgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
          "rgba(201, 203, 207, 0.8)",
          "rgba(255, 99, 71, 0.8)",
          "rgba(144, 238, 144, 0.8)",
          "rgba(255, 215, 0, 0.8)",
        ],
        hoverBorderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(201, 203, 207, 1)",
          "rgba(255, 99, 71, 1)",
          "rgba(144, 238, 144, 1)",
          "rgba(255, 215, 0, 1)",
        ],
        shadowOffsetX: 2,
        shadowOffsetY: 2,
        shadowBlur: 10,
        shadowColor: "rgba(0, 0, 0, 0.5)",
      },
    ],
  };
}

// BudgetSummary component
function BudgetSummary() {
  const { budget, getBudgetExpense } = useBudgets();

  // Use memo to calculate the chart data only when the budget or getBudgetExpense changes
  const chartData = useMemo(
    () => calculateChartData(budget, getBudgetExpense),
    [budget, getBudgetExpense]
  );

  return (
    <Stack
      direction="vertical"
      gap="2"
      className="mb-4 py-3 px-3"
      style={{
        borderRadius: "8px",
        border: "1px solid #000",
        alignItems: "center",
      }}
    >
      <h2 className="fw-bold text-dark text-uppercase pt-1 fs-4 text-center">
        Budget Summary
      </h2>
      <div
        style={{
          height: "500px",
          width: "500px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
          padding: "10px",
        }}
      >
        <Pie data={chartData} />
      </div>
    </Stack>
  );
}

const PieChart = ({ data }) => {
  return (
    <div
      style={{
        height: "500px",
        width: "500px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
      }}
    >
      <Pie data={data} />
    </div>
  );
};

export default BudgetSummary;
