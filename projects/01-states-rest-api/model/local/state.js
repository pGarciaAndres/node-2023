import { readJSON } from '../../utils.js'
const states = readJSON('./model/local/states.json')

export class StateModel {
  static async getAll ({ key }) {
    if (key) {
      return states.filter((state) =>
        state.key.toLocaleLowerCase().includes(key.toLocaleLowerCase())
      )
    }
    return states
  }

  static async create ({ input }) {
    if (states.find((state) => state.key === input.key)) return false
    states.push(input)
    return input
  }

  static async delete ({ key }) {
    const stateIndex = states.findIndex((state) => state.key === key)
    if (stateIndex === -1) return false

    states.splice(stateIndex, 1)
    return true
  }

  static async update ({ key, input }) {
    const stateIndex = states.findIndex((state) => state.key === key)
    if (stateIndex === -1) return false

    states[stateIndex] = {
      ...states[stateIndex],
      ...input
    }

    return states[stateIndex]
  }
}
