import {
  Alert,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Stack,
  Typography,
  type ChipProps,
} from '@mui/material'
import { useGetOrdersQuery } from './ordersApi'
import type { OrderStatus } from '../../types/order'

const statusColors: Record<OrderStatus, ChipProps['color']> = {
  PENDING: 'warning',
  PROCESSING: 'info',
  COMPLETED: 'success',
  FAILED: 'error',
}

export const OrderList = () => {
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useGetOrdersQuery(undefined, {
    pollingInterval: 2000,
  })

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
            <Chip
              label={order.status}
              color={statusColors[order.status]}
              size="small"
            />
          </CardContent>
        </Card>
      ))}
    </Stack>
  )
}