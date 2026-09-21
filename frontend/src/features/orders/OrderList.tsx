import { useSelector } from 'react-redux'
import {
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from '@mui/material'
import type { RootState } from '../../app/store'

export function OrderList() {
  const orders = useSelector((state: RootState) => state.orders.items)

  if (orders.length === 0) {
    return <Typography>No orders yet.</Typography>
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