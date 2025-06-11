import subscriptionsData from '../mockData/subscriptions.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let subscriptions = [...subscriptionsData]

export const subscriptionService = {
  async getAll() {
    await delay(250)
    return [...subscriptions]
  },

  async getById(id) {
    await delay(200)
    const subscription = subscriptions.find(s => s.id === id)
    if (!subscription) {
      throw new Error('Subscription not found')
    }
    return { ...subscription }
  },

  async create(subscriptionData) {
    await delay(400)
    const newSubscription = {
      id: Date.now().toString(),
      ...subscriptionData,
      status: 'active',
      connections: 0,
      messagesDelivered: 0,
      createdAt: new Date().toISOString()
    }
    subscriptions.push(newSubscription)
    return { ...newSubscription }
  },

  async update(id, updates) {
    await delay(300)
    const index = subscriptions.findIndex(s => s.id === id)
    if (index === -1) {
      throw new Error('Subscription not found')
    }
    subscriptions[index] = { ...subscriptions[index], ...updates }
    return { ...subscriptions[index] }
  },

  async delete(id) {
    await delay(250)
    const index = subscriptions.findIndex(s => s.id === id)
    if (index === -1) {
      throw new Error('Subscription not found')
    }
    subscriptions.splice(index, 1)
    return true
  },

  async toggleStatus(id) {
    await delay(200)
    const index = subscriptions.findIndex(s => s.id === id)
    if (index === -1) {
      throw new Error('Subscription not found')
    }
    
    const newStatus = subscriptions[index].status === 'active' ? 'paused' : 'active'
    subscriptions[index] = {
      ...subscriptions[index],
      status: newStatus
    }
    
    return { ...subscriptions[index] }
  }
}