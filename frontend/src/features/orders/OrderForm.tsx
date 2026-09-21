import { useState, type SubmitEvent } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Stack, TextField, Typography } from '@mui/material'
import { addOrder } from './ordersSlice'

export const OrderForm = () => {
  const dispatch = useDispatch()

  const [product, setProduct] = useState('')
  const [quantity, setQuantity] = useState(1)

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!product.trim() || quantity < 1) {
      return
    }

    dispatch(
      addOrder({
        id: crypto.randomUUID(),
        product: product.trim(),
        quantity,
        status: 'PENDING',
      }),
    )

    setProduct('')
    setQuantity(1)
  }

  return (
    <Stack component="form" onSubmit={handleSubmit} spacing={2}>
      <Typography variant="h5">Create order</Typography>

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

      <Button type="submit" variant="contained">
        Create order
      </Button>
    </Stack>
  )
}