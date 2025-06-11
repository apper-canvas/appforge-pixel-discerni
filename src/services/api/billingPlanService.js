import plansData from '../mockData/billingPlans.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let plans = [...plansData]

export const billingPlanService = {
  async getAll() {
    await delay(300)
    return [...plans]
  },

  async getById(tier) {
    await delay(200)
    const plan = plans.find(plan => plan.tier === tier)
    if (!plan) {
      throw new Error('Plan not found')
    }
    return { ...plan }
  },

  async create(planData) {
    await delay(400)
    const newPlan = {
      id: Date.now().toString(),
      ...planData
    }
    plans.push(newPlan)
    return { ...newPlan }
  },

  async update(tier, updates) {
    await delay(300)
    const index = plans.findIndex(plan => plan.tier === tier)
    if (index === -1) {
      throw new Error('Plan not found')
    }
    plans[index] = { ...plans[index], ...updates }
    return { ...plans[index] }
  },

  async delete(tier) {
    await delay(250)
    const index = plans.findIndex(plan => plan.tier === tier)
    if (index === -1) {
      throw new Error('Plan not found')
    }
    plans.splice(index, 1)
    return true
  }
}