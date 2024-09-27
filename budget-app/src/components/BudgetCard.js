import { Card, ProgressBar, Stack, Button } from "react-bootstrap";
import { currencyFormatter } from '../utils/currencyFormatter';


// Function to get the variant of the progress bar based on the percentage
function getprogressBarVariant(amount, max) {
  const percentage = (amount / max) * 100;

  if (percentage < 50) {
    return 'primary';
  } else if (percentage < 95) {
    return 'warning';
  } else {
    return 'danger';
  }
}


export default function BudgetCard({ name, amount, max, onAddExpenseClick, hideButtons, onViewExpenseClick }) {
  
  // Red background if amount exceeds the max budget
  const className = [];
  if (amount > 0.95 * max) {
    className.push('bg-danger', "bg-opacity-10", "border-danger");
  }
  else if (amount > 0.7 * max) {
    className.push('bg-light', "border-warning");
  }
  else {
    className.push('bg-light');
  }

  return (
    <Card className={className.join(' ')} >
      <Card.Body className='d-flex flex-column'>

        {/* Title */}
        <Card.Title className='d-flex justify-content-between align-items-baseline fw-normal mb-4 mt-2 mx-1'>
            <div className='me-2'>
                {name}
            </div>
            <div className='d-flex align-items-baseline'>
                {currencyFormatter.format(amount)} 
                {max && (
                  <span className='text-muted fs-6 ms-1'>
                    / {currencyFormatter.format(max)}
                  </span>
                )}
            </div>
        </Card.Title>

        {/* Progress bar */}
        {max && (
          <ProgressBar className="rounded-pill my-2"
          variant={getprogressBarVariant(amount, max)}
          min={0} max={max} now={amount} label={`${Math.round((amount / max) * 100)}%`}
          style={{ height: '1.5rem' }}
          />
        )}
        

        {/* Adding and View buttons */}
        {!hideButtons && (
          <Stack direction='horizontal' gap='2' className='mt-3 mb-2'>
              <Button variant='outline-primary' className="ms-auto" size='sm' onClick={onAddExpenseClick}>Add Expense</Button>
              <Button variant='outline-secondary' size='sm' onClick={onViewExpenseClick}>View Expenses</Button>
          </Stack>
        )}

      </Card.Body>
    </Card>
  )
}