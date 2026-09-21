export const createOrderSchema = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['product', 'quantity'],
    properties: {
      product: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
      },
      quantity: {
        type: 'integer',
        minimum: 1,
      },
    },
  },
}