import { useState, type SubmitEvent } from 'react'
import { Alert, Button, Stack, TextField, Typography } from '@mui/material'
import { useCreateOrderMutation } from './ordersApi'

export const OrderForm = () => {
  const [product, setProduct] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [createOrder, { isLoading, isError }] = useCreateOrderMutation()

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!product.trim() || quantity < 1) {
      return
    }

    try {
      await createOrder({
        product: product.trim(),
        quantity,
      }).unwrap()

      setProduct('')
      setQuantity(1)
    } catch {
      // Displayed through isError
    }
  }

  return (
    <Stack component="form" onSubmit={handleSubmit} spacing={2}>
      <Typography variant="h5">Create order</Typography>

      {isError && <Alert severity="error">Failed to create order</Alert>}

      <TextField
        label="Product"
        value={product}
        onChange={(event) => setProduct(event.target.value)}
        required
      />

      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={(event) => setQuantity(Number(event.target.value))}
        slotProps={{ htmlInput: { min: 1 } }}
        required
      />

      <Button type="submit" variant="contained" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create order'}
      </Button>
    </Stack>
  )
}