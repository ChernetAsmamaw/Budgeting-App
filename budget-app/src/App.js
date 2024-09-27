import Container from 'react-bootstrap/Container';
import { Stack, Button } from 'react-bootstrap';
import BudgetCard from './components/BudgetCard.js';
import { ReactComponent as Logo } from './logo.svg';

function App() {
  return (
    <Container className='my-4'>
      <Stack direction='horizontal' gap='2' className='mb-4'>
        <Logo width='40' height='40' className='me-1'/>
        <h1 className='me-auto'>Budget App</h1>
        <Button variant='primary'>Add Budget</Button>
        <Button variant='outline-primary'>Add Expense</Button>
      </Stack>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: `repeat(auto-fill, minmax(300px, 1fr))`, 
        gap: '1rem', 
        alignItems: 'flex-start' }}>

        <BudgetCard name='Food' amount={200} max={500} gray={true}></BudgetCard>
        <BudgetCard name='Entertainment' amount={400} max={300} gray></BudgetCard>
      </div>

    </Container>
  );
}

export default App;
