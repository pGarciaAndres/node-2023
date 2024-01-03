const z = require('zod')

const stateSchema = z.object({
  key: z.string({
    required_error: 'Key is required',
    invalid_type_error: 'Key must be a string',
    duplicate_error: 'Key must be unique'
  }),
  size: z
    .number({
      required_error: 'Size is required',
      invalid_type_error: 'Size must be a number'
    })
    .int()
    .min(1)
    .max(10),
  counted: z
    .boolean({
      invalid_type_error: 'Counted must be a boolean'
    })
    .default(false),
  checked: z
    .array(z.string())
    .default([])
    .superRefine((val, ctx) => {
      if (val.length !== new Set(val).size) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'No duplicates allowed.'
        })
      }
    })
})

function validateState (state) {
  return stateSchema.safeParse(state)
}

function validateUpdate (object) {
  return stateSchema.partial().safeParse(object)
}

module.exports = {
  validateState,
  validateUpdate
}
