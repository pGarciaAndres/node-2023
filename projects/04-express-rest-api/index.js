const express = require('express')
const states = require('./states.json')
const { validateState, validateUpdate } = require('./schemas/states')
const cors = require('cors')

const app = express()
app.disable('x-powered-by')
app.use(express.json())
app.use(cors())

app.get('/states', (req, res) => {
  const { key } = req.query
  if (key) {
    const result = states.filter((state) =>
      state.key.toLocaleLowerCase().includes(key.toLocaleLowerCase())
    )
    return res.json(result)
  }
  res.json(states)
})

app.post('/states', (req, res) => {
  const { key } = req.body

  if (states.find((state) => state.key === key)) {
    return res.status(409).json({ error: 'State already exists' })
  }

  const newState = validateState(req.body)

  if (!newState.success) {
    return res.status(400).json({ error: JSON.parse(newState.error.message) })
  }

  states.push(newState.data)
  res.status(201).json(newState)
})

app.delete('/states/:key', (req, res) => {
  const { key } = req.params
  const stateIndex = states.findIndex((state) => state.key === key)

  if (stateIndex === -1) {
    return res.status(404).json({ error: 'State not found' })
  }

  states.splice(stateIndex, 1)

  return res.json({ message: 'State deleted' })
})

app.patch('/states/:key', (req, res) => {
  const result = validateUpdate(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const { key } = req.params
  const stateIndex = states.findIndex((state) => state.key === key)

  if (stateIndex === -1) {
    return res.status(404).json({ error: 'State not found' })
  }

  const updateState = {
    ...states[stateIndex],
    ...result.data
  }

  states[stateIndex] = updateState
  return res.json(updateState)
})

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
