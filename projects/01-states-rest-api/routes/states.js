import { Router } from 'express'
import { StateController } from '../controller/states.js'

export const createStatesRouter = ({ stateModel }) => {
  const statesRouter = Router()
  const stateController = new StateController({ stateModel })

  statesRouter.get('/', stateController.getAll)
  statesRouter.post('/', stateController.create)
  statesRouter.delete('/:key', stateController.delete)
  statesRouter.patch('/:key', stateController.update)

  return statesRouter
}
