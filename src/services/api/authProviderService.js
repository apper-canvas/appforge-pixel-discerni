import providersData from '../mockData/authProviders.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let providers = [...providersData]

export const authProviderService = {
  async getAll() {
    await delay(300)
    return [...providers]
  },

  async getById(id) {
    await delay(200)
    const provider = providers.find(provider => provider.id === id)
    if (!provider) {
      throw new Error('Provider not found')
    }
    return { ...provider }
  },

  async create(providerData) {
    await delay(400)
    const newProvider = {
      id: Date.now().toString(),
      ...providerData,
      createdAt: new Date().toISOString()
    }
    providers.push(newProvider)
    return { ...newProvider }
  },

  async update(id, updates) {
    await delay(300)
    const index = providers.findIndex(provider => provider.id === id)
    if (index === -1) {
      throw new Error('Provider not found')
    }
    providers[index] = { ...providers[index], ...updates }
    return { ...providers[index] }
  },

  async delete(id) {
    await delay(250)
    const index = providers.findIndex(provider => provider.id === id)
    if (index === -1) {
      throw new Error('Provider not found')
    }
    providers.splice(index, 1)
    return true
  }
}