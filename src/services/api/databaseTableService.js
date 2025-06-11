import tablesData from '../mockData/databaseTables.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let tables = [...tablesData]

export const databaseTableService = {
  async getAll() {
    await delay(300)
    return [...tables]
  },

  async getById(id) {
    await delay(200)
    const table = tables.find(table => table.id === id)
    if (!table) {
      throw new Error('Table not found')
    }
    return { ...table }
  },

  async create(tableData) {
    await delay(400)
    const newTable = {
      id: Date.now().toString(),
      ...tableData,
      createdAt: new Date().toISOString()
    }
    tables.push(newTable)
    return { ...newTable }
  },

  async update(id, updates) {
    await delay(300)
    const index = tables.findIndex(table => table.id === id)
    if (index === -1) {
      throw new Error('Table not found')
    }
    tables[index] = { ...tables[index], ...updates }
    return { ...tables[index] }
  },

  async delete(id) {
    await delay(250)
    const index = tables.findIndex(table => table.id === id)
    if (index === -1) {
      throw new Error('Table not found')
    }
    tables.splice(index, 1)
    return true
  }
}