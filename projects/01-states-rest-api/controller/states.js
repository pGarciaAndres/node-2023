import { StateModel } from '../model/local/state.js'
import { validateState, validateUpdate } from '../schema/states.js'

export class StateController {
  constructor ({ stateModel }) {
    this.stateModel = stateModel
  }

  getAll = async (req, res) => {
    const { key } = req.query
    const states = await StateModel.getAll({ key })
    res.json(states)
  }

  create = async (req, res) => {
    const result = validateState(req.body)
    if (!result.success) return res.status(400).json({ error: JSON.parse(result.error.message) })
    const state = await StateModel.create({ input: result.data })
    res.status(201).json(state)
  }

  delete = async (req, res) => {
    const { key } = req.params
    const result = await StateModel.delete({ key })
    if (!result) return res.status(404).json({ error: 'State not found' })
    return res.json({ message: 'State deleted' })
  }

  update = async (req, res) => {
    const result = validateUpdate(req.body)
    if (!result.success) return res.status(400).json({ error: JSON.parse(result.error.message) })
    const { key } = req.params
    const state = await StateModel.update({ key, input: result.data })
    return res.json(state)
  }
}
