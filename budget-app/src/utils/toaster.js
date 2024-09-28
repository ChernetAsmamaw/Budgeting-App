import Swal from "sweetalert2";

export const showDeleteBudgetAlert = (onConfirm) => {
  Swal.fire({
    text: "Do you want to delete this budget?",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes!",
    cancelButtonText: "No!",
    width: "40vh",
    height: "10vh",
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    }
  });
};

export const showDeleteExpenseAlert = (onConfirm) => {
  Swal.fire({
    text: "Do you want to delete this expense?",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes!",
    cancelButtonText: "No!",
    width: "40vh",
    height: "10vh",
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    }
  });
};
