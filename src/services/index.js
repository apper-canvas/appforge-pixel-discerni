// API Services
export { appService } from './api/appService'
export { databaseTableService } from './api/databaseTableService'
export { authProviderService } from './api/authProviderService'
export { webhookService } from './api/webhookService'
export { subscriptionService } from './api/subscriptionService'
export { databaseFunctionService } from './api/databaseFunctionService'

// Mock Data
export { default as appsData } from './mockData/apps.json'
export { default as databaseTablesData } from './mockData/databaseTables.json'
export { default as authProvidersData } from './mockData/authProviders.json'
export { default as webhooksData } from './mockData/webhooks.json'
export { default as subscriptionsData } from './mockData/subscriptions.json'
export { default as databaseFunctionsData } from './mockData/databaseFunctions.json'

// Utility functions
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Common service patterns
export const createServiceId = () => Date.now().toString()
export const createTimestamp = () => new Date().toISOString()