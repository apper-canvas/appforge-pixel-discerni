import functionsData from '../mockData/databaseFunctions.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let functions = [...functionsData]

export const databaseFunctionService = {
  async getAll() {
    await delay(300)
    return [...functions]
  },

  async getById(id) {
    await delay(200)
    const func = functions.find(func => func.id === id)
    if (!func) {
      throw new Error('Function not found')
    }
    return { ...func }
  },

  async create(functionData) {
    await delay(400)
    const newFunction = {
      id: Date.now().toString(),
      ...functionData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      owner: 'postgres'
    }
    functions.push(newFunction)
    return { ...newFunction }
  },

  async update(id, updates) {
    await delay(300)
    const index = functions.findIndex(func => func.id === id)
    if (index === -1) {
      throw new Error('Function not found')
    }
    functions[index] = { 
      ...functions[index], 
      ...updates,
      updatedAt: new Date().toISOString()
    }
    return { ...functions[index] }
  },

  async delete(id) {
    await delay(250)
    const index = functions.findIndex(func => func.id === id)
    if (index === -1) {
      throw new Error('Function not found')
    }
    functions.splice(index, 1)
    return true
  }
}