import appsData from '../mockData/apps.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let apps = [...appsData]

export const appService = {
  async getAll() {
    await delay(300)
    return [...apps]
  },

  async getById(id) {
    await delay(200)
    const app = apps.find(app => app.id === id)
    if (!app) {
      throw new Error('App not found')
    }
    return { ...app }
  },

  async create(appData) {
    await delay(400)
    const newApp = {
      id: Date.now().toString(),
      ...appData,
      createdAt: new Date().toISOString(),
      status: 'building'
    }
    apps.push(newApp)
    return { ...newApp }
  },

  async update(id, updates) {
    await delay(300)
    const index = apps.findIndex(app => app.id === id)
    if (index === -1) {
      throw new Error('App not found')
    }
    apps[index] = { ...apps[index], ...updates }
    return { ...apps[index] }
  },

  async delete(id) {
    await delay(250)
    const index = apps.findIndex(app => app.id === id)
    if (index === -1) {
      throw new Error('App not found')
    }
    apps.splice(index, 1)
    return true
  }
}