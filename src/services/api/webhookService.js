import webhooksData from '../mockData/webhooks.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let webhooks = [...webhooksData]

export const webhookService = {
  async getAll() {
    await delay(250)
    return [...webhooks]
  },

  async getById(id) {
    await delay(200)
    const webhook = webhooks.find(w => w.id === id)
    if (!webhook) {
      throw new Error('Webhook not found')
    }
    return { ...webhook }
  },

  async create(webhookData) {
    await delay(400)
    const newWebhook = {
      id: Date.now().toString(),
      ...webhookData,
      status: 'active',
      lastTriggered: null,
      totalCalls: 0,
      successRate: 100,
      createdAt: new Date().toISOString()
    }
    webhooks.push(newWebhook)
    return { ...newWebhook }
  },

  async update(id, updates) {
    await delay(300)
    const index = webhooks.findIndex(w => w.id === id)
    if (index === -1) {
      throw new Error('Webhook not found')
    }
    webhooks[index] = { ...webhooks[index], ...updates }
    return { ...webhooks[index] }
  },

  async delete(id) {
    await delay(250)
    const index = webhooks.findIndex(w => w.id === id)
    if (index === -1) {
      throw new Error('Webhook not found')
    }
    webhooks.splice(index, 1)
    return true
  },

  async testWebhook(id) {
    await delay(1000)
    const webhook = webhooks.find(w => w.id === id)
    if (!webhook) {
      throw new Error('Webhook not found')
    }
    
    // Simulate test result
    const success = Math.random() > 0.2 // 80% success rate
    const index = webhooks.findIndex(w => w.id === id)
    webhooks[index] = {
      ...webhooks[index],
      lastTriggered: new Date().toISOString(),
      totalCalls: webhooks[index].totalCalls + 1,
      successRate: success ? Math.min(100, webhooks[index].successRate + 1) : Math.max(0, webhooks[index].successRate - 5)
    }
    
    return {
      success,
      statusCode: success ? 200 : 500,
      responseTime: Math.floor(Math.random() * 500) + 100,
      message: success ? 'Webhook test successful' : 'Webhook test failed'
    }
  }
}