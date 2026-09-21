import {
  Alert,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material'
import { useGetOrdersQuery } from './ordersApi'

export const OrderList = () => {
  const { data: orders = [], isLoading, isError } = useGetOrdersQuery()

  if (isLoading) {
    return <CircularProgress />
  }

  if (isError) {
    return <Alert severity="error">Failed to load orders</Alert>
  }

  if (!orders.length) {
    return <Typography>No orders yet</Typography>
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Orders</Typography>

      {orders.map((order) => (
        <Card
          key={order.id}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            transition: '0.2s',
            '&:hover': {
              transform: 'translateY(-2px)',
              borderColor: 'primary.main',
            },
          }}
        >
          <CardContent>
            <Typography variant="h6">{order.product}</Typography>
            <Typography>Quantity: {order.quantity}</Typography>
            <Chip label={order.status} color="warning" />
          </CardContent>
        </Card>
      ))}
    </Stack>
  )
}