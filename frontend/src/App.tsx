import { Container, Paper, Stack, Typography } from '@mui/material'
import { OrderForm } from './features/orders/OrderForm'
import { OrderList } from './features/orders/OrderList'

const App = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ mb: 1}}>
        OrderFlow
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Event-driven order processing
      </Typography>

      <Stack spacing={4}>
        <Paper sx={{ p: 3 }}>
          <OrderForm />
        </Paper>

        <OrderList />
      </Stack>
    </Container>
  )
}

export default App