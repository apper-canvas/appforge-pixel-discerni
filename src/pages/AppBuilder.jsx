import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'
import { appService, databaseTableService, authProviderService, webhookService, subscriptionService } from '../services'

const AppBuilder = () => {
  const { appId } = useParams()
  const [app, setApp] = useState(null)
  const [activeTab, setActiveTab] = useState('builder')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (appId) {
      loadApp()
    } else {
      setLoading(false)
    }
  }, [appId])

  const loadApp = async () => {
    try {
      const appData = await appService.getById(appId)
      setApp(appData)
    } catch (err) {
      toast.error('Failed to load app')
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'builder', label: 'Visual Builder', icon: 'Layout' },
    { id: 'database', label: 'Database', icon: 'Database' },
    { id: 'auth', label: 'Authentication', icon: 'Shield' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ]

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading app builder...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="flex-shrink-0 h-16 glass border-b border-gray-700 flex items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-semibold">
            {app ? app.name : 'New App'} Builder
          </h1>
          {app && (
            <span className="px-2 py-1 bg-gray-700 text-xs rounded-full">
              {app.subdomain}.appforge.dev
            </span>
          )}
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border border-gray-600 text-white rounded-lg hover:bg-gray-800 transition-colors">
            Preview
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:scale-105 transition-transform duration-200">
            Deploy
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 glass border-r border-gray-700 overflow-y-auto">
          <nav className="p-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors mb-2 ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <ApperIcon name={tab.icon} size={18} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          {activeTab === 'builder' && <VisualBuilder app={app} />}
          {activeTab === 'database' && <DatabaseDesigner app={app} />}
          {activeTab === 'auth' && <AuthConfiguration app={app} />}
          {activeTab === 'settings' && <AppSettings app={app} />}
        </main>
      </div>
    </div>
  )
}

const VisualBuilder = ({ app }) => {
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [canvas, setCanvas] = useState([])
  const [chatMessages, setChatMessages] = useState([
    { 
      type: 'assistant', 
      content: `Welcome to ${app?.name || 'your app'} builder! I'm here to help you create amazing components through conversation. What would you like to build first?`,
      timestamp: new Date()
    }
  ])
  const [chatInput, setChatInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const components = [
    { id: 'button', name: 'Button', icon: 'Square', category: 'Basic' },
    { id: 'input', name: 'Input', icon: 'Type', category: 'Form' },
    { id: 'card', name: 'Card', icon: 'Square', category: 'Layout' },
    { id: 'text', name: 'Text', icon: 'Type', category: 'Basic' },
    { id: 'image', name: 'Image', icon: 'Image', category: 'Media' },
    { id: 'list', name: 'List', icon: 'List', category: 'Data' }
  ]

  const addComponent = (component, fromChat = false) => {
    const newComponent = {
      id: Date.now(),
      type: component.id,
      name: component.name,
      props: {},
      style: { x: Math.random() * 100 + 50, y: Math.random() * 100 + 50 }
    }
    setCanvas([...canvas, newComponent])
    
    if (fromChat) {
      setTimeout(() => {
        setChatMessages(prev => [...prev, {
          type: 'assistant',
          content: `Perfect! I've added a ${component.name} to your canvas. You can click on it to customize its properties, or tell me what you'd like to do next!`,
          timestamp: new Date()
        }])
        setIsTyping(false)
      }, 1500)
    } else {
      toast.success(`${component.name} added to canvas`)
    }
  }

  const handleChatSubmit = (e) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const userMessage = { 
      type: 'user', 
      content: chatInput,
      timestamp: new Date()
    }
    setChatMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    // Enhanced AI simulation
    let response = ''
    let suggestedComponent = null
    let delay = 2000

    const input = chatInput.toLowerCase()
    
    if (input.includes('button') || input.includes('click') || input.includes('submit')) {
      response = `Great idea! I'll create a button for you. Buttons are essential for user interactions like form submissions, navigation, or triggering actions. This will be perfect for your ${app?.name || 'app'}!`
      suggestedComponent = components.find(c => c.id === 'button')
    } else if (input.includes('input') || input.includes('form') || input.includes('field') || input.includes('enter')) {
      response = `Excellent! An input field is exactly what you need. This will allow users to enter data, whether it's for search, forms, or user information. I'll add one to your canvas right away.`
      suggestedComponent = components.find(c => c.id === 'input')
    } else if (input.includes('card') || input.includes('display') || input.includes('show') || input.includes('container')) {
      response = `Perfect choice! Cards are fantastic for organizing and displaying content in a clean, structured way. They're great for user profiles, product listings, or any grouped information.`
      suggestedComponent = components.find(c => c.id === 'card')
    } else if (input.includes('list') || input.includes('items') || input.includes('multiple') || input.includes('collection')) {
      response = `Smart thinking! A list component is ideal for displaying multiple items, whether it's a todo list, user directory, or product catalog. I'll set that up for you!`
      suggestedComponent = components.find(c => c.id === 'list')
    } else if (input.includes('text') || input.includes('heading') || input.includes('title') || input.includes('paragraph')) {
      response = `Good call! Text components are fundamental for headings, descriptions, and content. They help structure your app's information hierarchy beautifully.`
      suggestedComponent = components.find(c => c.id === 'text')
    } else if (input.includes('image') || input.includes('photo') || input.includes('picture') || input.includes('media')) {
      response = `Excellent! Images make apps more engaging and visual. Whether it's user avatars, product photos, or decorative elements, this will enhance your app's appeal.`
      suggestedComponent = components.find(c => c.id === 'image')
    } else if (input.includes('dashboard') || input.includes('admin')) {
      response = `A dashboard is a great idea! Let me start with some essential components. I'll add a card for displaying metrics and a list for data. We can build from there!`
      suggestedComponent = components.find(c => c.id === 'card')
      delay = 3000
    } else if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      response = `Hello! I'm excited to help you build your app. What kind of interface are you envisioning? You could describe a specific component you need, or tell me about the overall functionality you're trying to create.`
    } else {
      response = `That sounds interesting! Based on what you described, I think we should start with some foundational components. Would you like me to suggest a button for user interactions, or perhaps an input field for data collection?`
    }

    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        type: 'assistant', 
        content: response,
        timestamp: new Date()
      }])
      
      if (suggestedComponent) {
        addComponent(suggestedComponent, true)
      } else {
        setIsTyping(false)
      }
    }, delay)

    setChatInput('')
  }

  return (
    <div className="h-full flex">
      {/* Chat Interface - Primary */}
      <div className="w-96 border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold flex items-center">
            <ApperIcon name="MessageCircle" size={20} className="mr-2 text-primary" />
            AI Builder Assistant
          </h3>
          <p className="text-sm text-gray-400 mt-1">Describe what you want to build</p>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`p-3 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-primary text-white rounded-br-sm' 
                    : 'bg-gray-800 text-gray-200 rounded-bl-sm'
                }`}>
                  <p className="text-sm">{message.content}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1 px-1">
                  {message.timestamp?.toLocaleTimeString()}
                </p>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-gray-800 p-3 rounded-lg rounded-bl-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-gray-700">
          <form onSubmit={handleChatSubmit} className="flex space-x-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Describe your component or feature..."
              className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={isTyping || !chatInput.trim()}
              className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ApperIcon name="Send" size={16} />
            </button>
          </form>
          <div className="mt-2 flex flex-wrap gap-1">
            {['Add a button', 'Create a form', 'Show a list', 'Add a card'].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setChatInput(suggestion)}
                className="px-2 py-1 bg-gray-700 text-xs rounded hover:bg-gray-600 transition-colors"
                disabled={isTyping}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Component Library - Secondary */}
      <div className="w-64 border-r border-gray-700 p-4 overflow-y-auto">
        <h3 className="text-sm font-semibold mb-3 text-gray-400">Quick Add Components</h3>
<div className="space-y-3">
          {['Basic', 'Form', 'Layout', 'Data', 'Media'].map(category => (
            <div key={category}>
              <h4 className="text-xs font-medium text-gray-500 mb-2">{category}</h4>
              <div className="space-y-1">
                {components
                  .filter(comp => comp.category === category)
                  .map(component => (
                    <button
                      key={component.id}
                      onClick={() => addComponent(component)}
                      className="w-full flex items-center space-x-2 p-2 border border-gray-700 rounded-lg hover:border-primary hover:bg-gray-800 transition-colors text-left group"
                    >
                      <ApperIcon 
                        name={component.icon} 
                        size={16} 
                        className="text-gray-400 group-hover:text-primary" 
                      />
                      <span className="text-xs">{component.name}</span>
                    </button>
                  ))
                }
              </div>
            </div>
          ))}
        </div>
      </div>

{/* Canvas */}
      <div className="flex-1 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-4 bg-white rounded-lg shadow-xl overflow-auto">
          <div className="h-full">
            {canvas.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <ApperIcon name="MessageCircle" size={48} className="mx-auto mb-4" />
                  <p className="text-lg font-semibold mb-2">Start Building with AI</p>
                  <p className="text-sm">Describe what you want in the chat, or use quick-add components</p>
                  <div className="mt-4 text-xs text-gray-500">
                    Try: "Add a login button" or "Create a user card"
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-600">Your App Preview</h4>
                  <div className="text-xs text-gray-500">
                    {canvas.length} component{canvas.length !== 1 ? 's' : ''}
                  </div>
                </div>
                <div className="space-y-4">
                  {canvas.map(component => (
                    <motion.div
                      key={component.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer transition-all hover:border-gray-400 ${
                        selectedComponent?.id === component.id ? 'border-primary bg-primary/5' : ''
                      }`}
                      onClick={() => setSelectedComponent(component)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-500 capitalize">
                          {component.type}
                        </span>
                        {selectedComponent?.id === component.id && (
                          <span className="text-xs text-primary">Selected</span>
                        )}
                      </div>
                      <ComponentPreview component={component} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
{/* Properties Panel */}
      <div className="w-80 border-l border-gray-700 p-4 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Properties</h3>
        {selectedComponent ? (
          <div className="space-y-4">
            <div className="glass rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <ApperIcon name="Settings" size={16} className="text-primary" />
                <h4 className="font-medium capitalize">{selectedComponent.type}</h4>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Content</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    placeholder="Enter text content..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Style</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="px-3 py-2 bg-primary/20 border border-primary text-primary text-xs rounded-lg">
                      Primary
                    </button>
                    <button className="px-3 py-2 bg-gray-700 border border-gray-600 text-gray-300 text-xs rounded-lg">
                      Secondary
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Size</label>
                  <select className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm">
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="glass rounded-lg p-4">
              <h4 className="font-medium mb-3 flex items-center">
                <ApperIcon name="Zap" size={16} className="mr-2 text-secondary" />
                AI Suggestions
              </h4>
              <div className="space-y-2">
                <button 
                  onClick={() => setChatInput(`Make this ${selectedComponent.type} more colorful`)}
                  className="w-full text-left px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors"
                >
                  💄 Improve styling
                </button>
                <button 
                  onClick={() => setChatInput(`Add functionality to this ${selectedComponent.type}`)}
                  className="w-full text-left px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors"
                >
                  ⚡ Add interactions
                </button>
                <button 
                  onClick={() => setChatInput(`Connect this ${selectedComponent.type} to database`)}
                  className="w-full text-left px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors"
                >
                  🔌 Connect data
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <ApperIcon name="MousePointer" size={32} className="text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400 text-sm mb-4">
              Select a component from the canvas to edit its properties
            </p>
            <p className="text-xs text-gray-500">
              Or ask the AI assistant to modify components for you!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

const ComponentPreview = ({ component }) => {
  switch (component.type) {
    case 'button':
      return <button className="px-4 py-2 bg-blue-500 text-white rounded">Button</button>
    case 'input':
      return <input type="text" placeholder="Input field" className="w-full px-3 py-2 border border-gray-300 rounded" />
    case 'card':
      return (
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-black mb-2">Card Title</h3>
          <p className="text-gray-600">Card content goes here</p>
        </div>
      )
    case 'text':
      return <p className="text-black">Sample text content</p>
    case 'image':
      return <div className="w-32 h-24 bg-gray-200 rounded flex items-center justify-center">
        <ApperIcon name="Image" size={24} className="text-gray-400" />
      </div>
    case 'list':
      return (
        <ul className="space-y-1">
          <li className="text-black">• List item 1</li>
          <li className="text-black">• List item 2</li>
          <li className="text-black">• List item 3</li>
        </ul>
      )
    default:
      return <div className="p-4 bg-gray-100 rounded text-black">Unknown Component</div>
  }
}
const DatabaseDesigner = ({ app }) => {
  const [activeTab, setActiveTab] = useState('tables')
  const [tables, setTables] = useState([])
  const [webhooks, setWebhooks] = useState([])
  const [subscriptions, setSubscriptions] = useState([])
  const [loading, setLoading] = useState(false)
  const [showCreateTable, setShowCreateTable] = useState(false)
  const [showCreateWebhook, setShowCreateWebhook] = useState(false)
  const [showCreateSubscription, setShowCreateSubscription] = useState(false)
  const [selectedTable, setSelectedTable] = useState(null)
  const [selectedWebhook, setSelectedWebhook] = useState(null)
  const [selectedSubscription, setSelectedSubscription] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedSchemas, setExpandedSchemas] = useState({ public: true, auth: true, storage: true })

  const databaseTabs = [
    { id: 'tables', label: 'Tables', icon: 'Table' },
    { id: 'webhooks', label: 'Webhooks', icon: 'Webhook' },
    { id: 'subscriptions', label: 'Subscriptions', icon: 'Radio' }
  ]

  useEffect(() => {
    if (app) {
      loadData()
    }
  }, [app, activeTab])

  const loadData = async () => {
    setLoading(true)
    try {
      if (activeTab === 'tables') {
        const result = await databaseTableService.getAll()
        const appTables = result.filter(table => table.appId === app?.id)
        setTables(appTables)
        if (appTables.length > 0 && !selectedTable) {
          setSelectedTable(appTables[0])
        }
      } else if (activeTab === 'webhooks') {
        const result = await webhookService.getAll()
        const appWebhooks = result.filter(webhook => webhook.appId === app?.id)
        setWebhooks(appWebhooks)
        if (appWebhooks.length > 0 && !selectedWebhook) {
          setSelectedWebhook(appWebhooks[0])
        }
      } else if (activeTab === 'subscriptions') {
        const result = await subscriptionService.getAll()
        const appSubscriptions = result.filter(sub => sub.appId === app?.id)
        setSubscriptions(appSubscriptions)
        if (appSubscriptions.length > 0 && !selectedSubscription) {
          setSelectedSubscription(appSubscriptions[0])
        }
      }
    } catch (err) {
      toast.error(`Failed to load ${activeTab}`)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTable = async (tableData) => {
    try {
      const newTable = await databaseTableService.create({
        ...tableData,
        appId: app.id,
        schema: 'public',
        rowCount: 0
      })
      setTables([...tables, newTable])
      setSelectedTable(newTable)
      setShowCreateTable(false)
      toast.success('Table created successfully')
    } catch (err) {
      toast.error('Failed to create table')
    }
  }

  const handleCreateWebhook = async (webhookData) => {
    try {
      const newWebhook = await webhookService.create({
        ...webhookData,
        appId: app.id
      })
      setWebhooks([...webhooks, newWebhook])
      setSelectedWebhook(newWebhook)
      setShowCreateWebhook(false)
      toast.success('Webhook created successfully')
    } catch (err) {
      toast.error('Failed to create webhook')
    }
  }

  const handleCreateSubscription = async (subscriptionData) => {
    try {
      const newSubscription = await subscriptionService.create({
        ...subscriptionData,
        appId: app.id
      })
      setSubscriptions([...subscriptions, newSubscription])
      setSelectedSubscription(newSubscription)
      setShowCreateSubscription(false)
      toast.success('Subscription created successfully')
    } catch (err) {
      toast.error('Failed to create subscription')
    }
  }

  const handleDeleteTable = async (tableId) => {
    if (!confirm('Are you sure you want to delete this table? This action cannot be undone.')) {
      return
    }
    
    try {
      await databaseTableService.delete(tableId)
      const updatedTables = tables.filter(t => t.id !== tableId)
      setTables(updatedTables)
      if (selectedTable?.id === tableId) {
        setSelectedTable(updatedTables[0] || null)
      }
      toast.success('Table deleted successfully')
    } catch (err) {
      toast.error('Failed to delete table')
    }
  }

  const handleDeleteWebhook = async (webhookId) => {
    if (!confirm('Are you sure you want to delete this webhook?')) {
      return
    }
    
    try {
      await webhookService.delete(webhookId)
      const updatedWebhooks = webhooks.filter(w => w.id !== webhookId)
      setWebhooks(updatedWebhooks)
      if (selectedWebhook?.id === webhookId) {
        setSelectedWebhook(updatedWebhooks[0] || null)
      }
      toast.success('Webhook deleted successfully')
    } catch (err) {
      toast.error('Failed to delete webhook')
    }
  }

  const handleDeleteSubscription = async (subscriptionId) => {
    if (!confirm('Are you sure you want to delete this subscription?')) {
      return
    }
    
    try {
      await subscriptionService.delete(subscriptionId)
      const updatedSubscriptions = subscriptions.filter(s => s.id !== subscriptionId)
      setSubscriptions(updatedSubscriptions)
      if (selectedSubscription?.id === subscriptionId) {
        setSelectedSubscription(updatedSubscriptions[0] || null)
      }
      toast.success('Subscription deleted successfully')
    } catch (err) {
      toast.error('Failed to delete subscription')
    }
  }

  const handleTestWebhook = async (webhookId) => {
    try {
      const result = await webhookService.testWebhook(webhookId)
      if (result.success) {
        toast.success(`Webhook test successful (${result.statusCode}) - ${result.responseTime}ms`)
      } else {
        toast.error(`Webhook test failed (${result.statusCode}) - ${result.message}`)
      }
      // Refresh webhook data to show updated stats
      loadData()
    } catch (err) {
      toast.error('Failed to test webhook')
    }
  }

  const handleToggleSubscription = async (subscriptionId) => {
    try {
      const updatedSub = await subscriptionService.toggleStatus(subscriptionId)
      setSubscriptions(subscriptions.map(s => 
        s.id === subscriptionId ? updatedSub : s
      ))
      if (selectedSubscription?.id === subscriptionId) {
        setSelectedSubscription(updatedSub)
      }
      toast.success(`Subscription ${updatedSub.status === 'active' ? 'activated' : 'paused'}`)
    } catch (err) {
      toast.error('Failed to toggle subscription')
    }
  }

  const getSchemaIcon = (schema) => {
    switch (schema) {
      case 'public': return 'Database'
      case 'auth': return 'Shield'
      case 'storage': return 'HardDrive'
      default: return 'Folder'
    }
  }

  const getFieldTypeIcon = (type) => {
    switch (type) {
      case 'string': return 'Type'
      case 'number': return 'Hash'
      case 'boolean': return 'ToggleLeft'
      case 'date': return 'Calendar'
      case 'array': return 'List'
      case 'object': return 'Braces'
      default: return 'Circle'
    }
  }

  const groupTablesBySchema = () => {
    const schemas = {
      public: tables.filter(t => !t.schema || t.schema === 'public'),
      auth: tables.filter(t => t.schema === 'auth'),
      storage: tables.filter(t => t.schema === 'storage')
    }
    
    // Add example auth tables if none exist
    if (schemas.auth.length === 0) {
      schemas.auth = [
        { id: 'auth_users', name: 'users', schema: 'auth', fields: [
          { name: 'id', type: 'string', required: true },
          { name: 'email', type: 'string', required: true },
          { name: 'created_at', type: 'date', required: true }
        ], isSystemTable: true },
        { id: 'auth_sessions', name: 'sessions', schema: 'auth', fields: [
          { name: 'id', type: 'string', required: true },
          { name: 'user_id', type: 'string', required: true },
          { name: 'expires_at', type: 'date', required: true }
        ], isSystemTable: true }
      ]
    }
    
    // Add example storage tables if none exist
    if (schemas.storage.length === 0) {
      schemas.storage = [
        { id: 'storage_objects', name: 'objects', schema: 'storage', fields: [
          { name: 'id', type: 'string', required: true },
          { name: 'name', type: 'string', required: true },
          { name: 'bucket_id', type: 'string', required: true },
          { name: 'size', type: 'number', required: true }
        ], isSystemTable: true }
      ]
    }
    
    return schemas
  }

  const filteredTables = tables.filter(table => 
    table.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredWebhooks = webhooks.filter(webhook => 
    webhook.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredSubscriptions = subscriptions.filter(subscription => 
    subscription.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleSchema = (schema) => {
    setExpandedSchemas(prev => ({
      ...prev,
      [schema]: !prev[schema]
    }))
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading database...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Database Tabs */}
      <div className="border-b border-gray-700 bg-surface/50">
        <div className="flex space-x-1 p-4">
          {databaseTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id)
                setSearchQuery('')
              }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <ApperIcon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {activeTab === 'tables' && (
          <>
            {/* Schema Sidebar */}
            <div className="w-80 border-r border-gray-700 flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Tables</h3>
                  <button
                    onClick={() => setShowCreateTable(true)}
                    className="p-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
                  >
                    <ApperIcon name="Plus" size={16} />
                  </button>
                </div>
                
                {/* Search */}
                <div className="relative">
                  <ApperIcon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tables..."
                    className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Schema List */}
              <div className="flex-1 overflow-y-auto p-4">
                {Object.entries(groupTablesBySchema()).map(([schemaName, schemaTables]) => (
                  <div key={schemaName} className="mb-4">
                    <button
                      onClick={() => toggleSchema(schemaName)}
                      className="w-full flex items-center justify-between p-2 hover:bg-gray-800 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center space-x-2">
                        <ApperIcon name={getSchemaIcon(schemaName)} size={16} className="text-gray-400" />
                        <span className="font-medium capitalize">{schemaName}</span>
                        <span className="text-xs text-gray-500">({schemaTables.length})</span>
                      </div>
                      <ApperIcon 
                        name={expandedSchemas[schemaName] ? "ChevronDown" : "ChevronRight"} 
                        size={16} 
                        className="text-gray-400 group-hover:text-white transition-colors" 
                      />
                    </button>
                    
                    {expandedSchemas[schemaName] && (
                      <div className="ml-4 mt-2 space-y-1">
                        {schemaTables
                          .filter(table => table.name.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map(table => (
                          <button
                            key={table.id}
                            onClick={() => setSelectedTable(table)}
                            className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors group ${
                              selectedTable?.id === table.id 
                                ? 'bg-primary text-white' 
                                : 'hover:bg-gray-800 text-gray-300'
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <ApperIcon name="Table" size={14} />
                              <span className="text-sm">{table.name}</span>
                              {table.isSystemTable && (
                                <span className="text-xs bg-gray-600 px-1 rounded">sys</span>
                              )}
                            </div>
                            <span className="text-xs opacity-60">
                              {table.fields?.length || 0} cols
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Table Details */}
            <div className="flex-1 overflow-y-auto">
              {selectedTable ? (
                <TableDetailsView 
                  table={selectedTable} 
                  onDelete={handleDeleteTable}
                  getFieldTypeIcon={getFieldTypeIcon}
                />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <ApperIcon name="Database" size={48} className="text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Select a Table</h3>
                    <p className="text-gray-400 mb-4">Choose a table from the sidebar to view its details</p>
                    {tables.length === 0 && (
                      <button
                        onClick={() => setShowCreateTable(true)}
                        className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:scale-105 transition-transform duration-200"
                      >
                        Create Your First Table
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'webhooks' && (
          <>
            {/* Webhooks Sidebar */}
            <div className="w-80 border-r border-gray-700 flex flex-col">
              <div className="p-4 border-b border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Webhooks</h3>
                  <button
                    onClick={() => setShowCreateWebhook(true)}
                    className="p-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
                  >
                    <ApperIcon name="Plus" size={16} />
                  </button>
                </div>
                
                <div className="relative">
                  <ApperIcon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search webhooks..."
                    className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-2">
                  {filteredWebhooks.map(webhook => (
                    <button
                      key={webhook.id}
                      onClick={() => setSelectedWebhook(webhook)}
                      className={`w-full p-3 rounded-lg text-left transition-colors ${
                        selectedWebhook?.id === webhook.id 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{webhook.name}</span>
                        <span className={`w-2 h-2 rounded-full ${
                          webhook.status === 'active' ? 'bg-success' : 'bg-gray-500'
                        }`}></span>
                      </div>
                      <div className="text-xs opacity-60">{webhook.table}</div>
                      <div className="text-xs opacity-60">{webhook.events.length} events</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Webhook Details */}
            <div className="flex-1 overflow-y-auto">
              {selectedWebhook ? (
                <WebhookDetailsView 
                  webhook={selectedWebhook}
                  onDelete={handleDeleteWebhook}
                  onTest={handleTestWebhook}
                />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <ApperIcon name="Webhook" size={48} className="text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Select a Webhook</h3>
                    <p className="text-gray-400 mb-4">Choose a webhook to view its details and configuration</p>
                    {webhooks.length === 0 && (
                      <button
                        onClick={() => setShowCreateWebhook(true)}
                        className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:scale-105 transition-transform duration-200"
                      >
                        Create Your First Webhook
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'subscriptions' && (
          <>
            {/* Subscriptions Sidebar */}
            <div className="w-80 border-r border-gray-700 flex flex-col">
              <div className="p-4 border-b border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Subscriptions</h3>
                  <button
                    onClick={() => setShowCreateSubscription(true)}
                    className="p-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
                  >
                    <ApperIcon name="Plus" size={16} />
                  </button>
                </div>
                
                <div className="relative">
                  <ApperIcon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search subscriptions..."
                    className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-2">
                  {filteredSubscriptions.map(subscription => (
                    <button
                      key={subscription.id}
                      onClick={() => setSelectedSubscription(subscription)}
                      className={`w-full p-3 rounded-lg text-left transition-colors ${
                        selectedSubscription?.id === subscription.id 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{subscription.name}</span>
                        <span className={`w-2 h-2 rounded-full ${
                          subscription.status === 'active' ? 'bg-success' : 'bg-gray-500'
                        }`}></span>
                      </div>
                      <div className="text-xs opacity-60">{subscription.table}</div>
                      <div className="text-xs opacity-60">{subscription.connections} connections</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Subscription Details */}
            <div className="flex-1 overflow-y-auto">
              {selectedSubscription ? (
                <SubscriptionDetailsView 
                  subscription={selectedSubscription}
                  onDelete={handleDeleteSubscription}
                  onToggle={handleToggleSubscription}
                />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <ApperIcon name="Radio" size={48} className="text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Select a Subscription</h3>
                    <p className="text-gray-400 mb-4">Choose a subscription to view its details and manage real-time updates</p>
                    {subscriptions.length === 0 && (
                      <button
                        onClick={() => setShowCreateSubscription(true)}
                        className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:scale-105 transition-transform duration-200"
                      >
                        Create Your First Subscription
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Modals */}
      {showCreateTable && (
        <CreateTableModal
          onClose={() => setShowCreateTable(false)}
          onSubmit={handleCreateTable}
        />
      )}

      {showCreateWebhook && (
        <CreateWebhookModal
          onClose={() => setShowCreateWebhook(false)}
          onSubmit={handleCreateWebhook}
          tables={tables}
        />
      )}

      {showCreateSubscription && (
        <CreateSubscriptionModal
          onClose={() => setShowCreateSubscription(false)}
          onSubmit={handleCreateSubscription}
          tables={tables}
        />
      )}
    </div>
  )
}

const TableDetailsView = ({ table, onDelete, getFieldTypeIcon }) => (
  <div className="p-6">
    {/* Table Header */}
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
          <ApperIcon name="Table" size={16} className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold">{table.name}</h2>
          <p className="text-sm text-gray-400">
            {table.schema || 'public'} schema • {table.fields?.length || 0} columns
          </p>
        </div>
      </div>
      
      {!table.isSystemTable && (
        <div className="flex space-x-2">
          <button className="px-3 py-2 border border-gray-600 text-white rounded-lg hover:bg-gray-800 transition-colors">
            <ApperIcon name="Edit" size={16} />
          </button>
          <button 
            onClick={() => onDelete(table.id)}
            className="px-3 py-2 border border-gray-600 text-error hover:bg-error/20 rounded-lg transition-colors"
          >
            <ApperIcon name="Trash2" size={16} />
          </button>
        </div>
      )}
    </div>

    {/* Table Stats */}
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="glass rounded-lg p-4">
        <div className="text-sm text-gray-400">Rows</div>
        <div className="text-xl font-semibold">{table.rowCount || '0'}</div>
      </div>
      <div className="glass rounded-lg p-4">
        <div className="text-sm text-gray-400">Size</div>
        <div className="text-xl font-semibold">128 KB</div>
      </div>
      <div className="glass rounded-lg p-4">
        <div className="text-sm text-gray-400">Relationships</div>
        <div className="text-xl font-semibold">{table.relationships?.length || 0}</div>
      </div>
    </div>

    {/* Columns */}
    <div className="glass rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Columns</h3>
      <div className="space-y-2">
        {table.fields?.map((field, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <ApperIcon name={getFieldTypeIcon(field.type)} size={16} className="text-gray-400" />
              <div>
                <div className="font-medium">{field.name}</div>
                <div className="text-sm text-gray-400">{field.type}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {field.required && (
                <span className="px-2 py-1 bg-error/20 text-error text-xs rounded">required</span>
              )}
              {field.name === 'id' && (
                <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">primary key</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Relationships */}
    {table.relationships?.length > 0 && (
      <div className="glass rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Relationships</h3>
        <div className="space-y-2">
          {table.relationships.map((rel, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <ApperIcon name="ArrowRight" size={16} className="text-gray-400" />
                <div>
                  <div className="font-medium">{rel.type}</div>
                  <div className="text-sm text-gray-400">to {rel.table} via {rel.foreignKey}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
)

const WebhookDetailsView = ({ webhook, onDelete, onTest }) => (
  <div className="p-6">
    {/* Webhook Header */}
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
          <ApperIcon name="Webhook" size={16} className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold">{webhook.name}</h2>
          <p className="text-sm text-gray-400">
            {webhook.table} table • {webhook.events.length} events
          </p>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <button 
          onClick={() => onTest(webhook.id)}
          className="px-3 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition-colors"
        >
          <ApperIcon name="Play" size={16} />
        </button>
        <button className="px-3 py-2 border border-gray-600 text-white rounded-lg hover:bg-gray-800 transition-colors">
          <ApperIcon name="Edit" size={16} />
        </button>
        <button 
          onClick={() => onDelete(webhook.id)}
          className="px-3 py-2 border border-gray-600 text-error hover:bg-error/20 rounded-lg transition-colors"
        >
          <ApperIcon name="Trash2" size={16} />
        </button>
      </div>
    </div>

    {/* Webhook Stats */}
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="glass rounded-lg p-4">
        <div className="text-sm text-gray-400">Status</div>
        <div className={`text-xl font-semibold ${webhook.status === 'active' ? 'text-success' : 'text-gray-400'}`}>
          {webhook.status}
        </div>
      </div>
      <div className="glass rounded-lg p-4">
        <div className="text-sm text-gray-400">Total Calls</div>
        <div className="text-xl font-semibold">{webhook.totalCalls.toLocaleString()}</div>
      </div>
      <div className="glass rounded-lg p-4">
        <div className="text-sm text-gray-400">Success Rate</div>
        <div className="text-xl font-semibold text-success">{webhook.successRate}%</div>
      </div>
      <div className="glass rounded-lg p-4">
        <div className="text-sm text-gray-400">Last Triggered</div>
        <div className="text-xl font-semibold">
          {webhook.lastTriggered ? new Date(webhook.lastTriggered).toLocaleTimeString() : 'Never'}
        </div>
      </div>
    </div>

    {/* Configuration */}
    <div className="glass rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Configuration</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Endpoint URL</label>
          <div className="p-3 bg-gray-800 rounded-lg font-mono text-sm">{webhook.url}</div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Events</label>
          <div className="flex flex-wrap gap-2">
            {webhook.events.map((event, index) => (
              <span key={index} className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">
                {event}
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Secret</label>
          <div className="p-3 bg-gray-800 rounded-lg font-mono text-sm">
            {webhook.secret.replace(/./g, '*')}
          </div>
        </div>

        {Object.keys(webhook.headers).length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Headers</label>
            <div className="space-y-2">
              {Object.entries(webhook.headers).map(([key, value]) => (
                <div key={key} className="p-3 bg-gray-800 rounded-lg">
                  <div className="text-sm font-medium">{key}</div>
                  <div className="text-sm text-gray-400 font-mono">{value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
)

const SubscriptionDetailsView = ({ subscription, onDelete, onToggle }) => (
  <div className="p-6">
    {/* Subscription Header */}
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
          <ApperIcon name="Radio" size={16} className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold">{subscription.name}</h2>
          <p className="text-sm text-gray-400">
            {subscription.table} table • {subscription.protocol}
          </p>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <button 
          onClick={() => onToggle(subscription.id)}
          className={`px-3 py-2 rounded-lg transition-colors ${
            subscription.status === 'active' 
              ? 'bg-warning text-white hover:bg-warning/80' 
              : 'bg-success text-white hover:bg-success/80'
          }`}
        >
          <ApperIcon name={subscription.status === 'active' ? 'Pause' : 'Play'} size={16} />
        </button>
        <button className="px-3 py-2 border border-gray-600 text-white rounded-lg hover:bg-gray-800 transition-colors">
          <ApperIcon name="Edit" size={16} />
        </button>
        <button 
          onClick={() => onDelete(subscription.id)}
          className="px-3 py-2 border border-gray-600 text-error hover:bg-error/20 rounded-lg transition-colors"
        >
          <ApperIcon name="Trash2" size={16} />
        </button>
      </div>
    </div>

    {/* Subscription Stats */}
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="glass rounded-lg p-4">
        <div className="text-sm text-gray-400">Status</div>
        <div className={`text-xl font-semibold ${subscription.status === 'active' ? 'text-success' : 'text-gray-400'}`}>
          {subscription.status}
        </div>
      </div>
      <div className="glass rounded-lg p-4">
        <div className="text-sm text-gray-400">Connections</div>
        <div className="text-xl font-semibold">{subscription.connections}</div>
      </div>
      <div className="glass rounded-lg p-4">
        <div className="text-sm text-gray-400">Messages</div>
        <div className="text-xl font-semibold">{subscription.messagesDelivered.toLocaleString()}</div>
      </div>
      <div className="glass rounded-lg p-4">
        <div className="text-sm text-gray-400">Protocol</div>
        <div className="text-xl font-semibold">{subscription.protocol === 'websocket' ? 'WebSocket' : 'SSE'}</div>
      </div>
    </div>

    {/* Configuration */}
    <div className="glass rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Configuration</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Endpoint</label>
          <div className="p-3 bg-gray-800 rounded-lg font-mono text-sm">{subscription.endpoint}</div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Events</label>
          <div className="flex flex-wrap gap-2">
            {subscription.events.map((event, index) => (
              <span key={index} className="px-2 py-1 bg-secondary/20 text-secondary text-xs rounded">
                {event}
              </span>
            ))}
          </div>
        </div>

        {subscription.filter && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Filter</label>
            <div className="p-3 bg-gray-800 rounded-lg font-mono text-sm">{subscription.filter}</div>
          </div>
        )}
      </div>
    </div>
</div>
)
const CreateTableModal = ({ onClose, onSubmit }) => {
  const [tableName, setTableName] = useState('')
  const [fields, setFields] = useState([
    { name: 'id', type: 'string', required: true }
  ])

  const fieldTypes = ['string', 'number', 'boolean', 'date', 'array', 'object']

  const addField = () => {
    setFields([...fields, { name: '', type: 'string', required: false }])
  }

  const updateField = (index, key, value) => {
    const newFields = [...fields]
    newFields[index] = { ...newFields[index], [key]: value }
    setFields(newFields)
  }

  const removeField = (index) => {
    if (index === 0) return // Don't remove id field
    setFields(fields.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      name: tableName,
      fields: fields,
      relationships: []
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="glass rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Create Table</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <ApperIcon name="X" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Table Name</label>
            <input
              type="text"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="users"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium">Fields</label>
              <button
                type="button"
                onClick={addField}
                className="px-3 py-1 bg-primary text-white text-sm rounded-lg hover:bg-primary/80 transition-colors"
              >
                Add Field
              </button>
            </div>
            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                  <input
                    type="text"
                    value={field.name}
                    onChange={(e) => updateField(index, 'name', e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Field name"
                    required
                    disabled={index === 0}
                  />
                  <select
                    value={field.type}
                    onChange={(e) => updateField(index, 'type', e.target.value)}
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {fieldTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={(e) => updateField(index, 'required', e.target.checked)}
                      className="rounded"
                      disabled={index === 0}
                    />
                    <span className="text-sm">Required</span>
                  </label>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeField(index)}
                      className="p-2 text-error hover:bg-error/20 rounded-lg transition-colors"
                    >
                      <ApperIcon name="Trash2" size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-600 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:scale-105 transition-transform duration-200"
            >
              Create Table
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

const AuthConfiguration = ({ app }) => {
  const [providers, setProviders] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (app) {
      loadAuthProviders()
    }
  }, [app])

  const loadAuthProviders = async () => {
    setLoading(true)
    try {
      const result = await authProviderService.getAll()
      setProviders(result.filter(provider => provider.appId === app?.id))
    } catch (err) {
      toast.error('Failed to load auth providers')
    } finally {
      setLoading(false)
    }
  }

  const toggleProvider = async (providerId, enabled) => {
    try {
      await authProviderService.update(providerId, { enabled })
      setProviders(providers.map(p => 
        p.id === providerId ? { ...p, enabled } : p
      ))
      toast.success(`Provider ${enabled ? 'enabled' : 'disabled'}`)
    } catch (err) {
      toast.error('Failed to update provider')
    }
  }

  const authOptions = [
    { type: 'email', name: 'Email/Password', icon: 'Mail', description: 'Traditional email and password authentication' },
    { type: 'google', name: 'Google', icon: 'Chrome', description: 'Sign in with Google accounts' },
    { type: 'github', name: 'GitHub', icon: 'Github', description: 'Sign in with GitHub accounts' },
    { type: 'facebook', name: 'Facebook', icon: 'Facebook', description: 'Sign in with Facebook accounts' },
    { type: 'twitter', name: 'Twitter', icon: 'Twitter', description: 'Sign in with Twitter accounts' },
    { type: 'apple', name: 'Apple', icon: 'Apple', description: 'Sign in with Apple ID' }
  ]

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading authentication settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full p-6 overflow-y-auto">
      <div className="max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">Authentication Settings</h2>

        <div className="space-y-6">
          {authOptions.map(option => {
            const provider = providers.find(p => p.type === option.type)
            const isEnabled = provider?.enabled || false

            return (
              <div key={option.type} className="glass rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                      <ApperIcon name={option.icon} size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{option.name}</h3>
                      <p className="text-gray-400 text-sm">{option.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleProvider(provider?.id || Date.now(), !isEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        isEnabled ? 'bg-primary' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          isEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                    {isEnabled && (
                      <button className="px-3 py-1 border border-gray-600 text-sm rounded-lg hover:bg-gray-800 transition-colors">
                        Configure
                      </button>
                    )}
                  </div>
</div>
              </div>
            )
          })}
        </div>

        <div className="mt-8 glass rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-400">Require 2FA for all users</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Email Verification</h4>
                <p className="text-sm text-gray-400">Require email verification for new accounts</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Password Requirements</h4>
                <p className="text-sm text-gray-400">Enforce strong password policy</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const CreateWebhookModal = ({ onClose, onSubmit, tables }) => {
  const [webhookData, setWebhookData] = useState({
    name: '',
    url: '',
    table: '',
    events: [],
    headers: {},
    secret: ''
  })
  const [newHeaderKey, setNewHeaderKey] = useState('')
  const [newHeaderValue, setNewHeaderValue] = useState('')

  const eventOptions = ['INSERT', 'UPDATE', 'DELETE']
  
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...webhookData,
      events: webhookData.events.map(event => `${webhookData.table}.${event.toLowerCase()}`)
    })
  }

  const toggleEvent = (event) => {
    setWebhookData(prev => ({
      ...prev,
      events: prev.events.includes(event) 
        ? prev.events.filter(e => e !== event)
        : [...prev.events, event]
    }))
  }

  const addHeader = () => {
    if (newHeaderKey && newHeaderValue) {
      setWebhookData(prev => ({
        ...prev,
        headers: { ...prev.headers, [newHeaderKey]: newHeaderValue }
      }))
      setNewHeaderKey('')
      setNewHeaderValue('')
    }
  }

  const removeHeader = (key) => {
    setWebhookData(prev => ({
      ...prev,
      headers: Object.fromEntries(Object.entries(prev.headers).filter(([k]) => k !== key))
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="glass rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Create Webhook</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <ApperIcon name="X" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Webhook Name</label>
            <input
              type="text"
              value={webhookData.name}
              onChange={(e) => setWebhookData({ ...webhookData, name: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="User Registration Webhook"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Endpoint URL</label>
            <input
              type="url"
              value={webhookData.url}
              onChange={(e) => setWebhookData({ ...webhookData, url: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="https://api.example.com/webhooks/users"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Table</label>
            <select
              value={webhookData.table}
              onChange={(e) => setWebhookData({ ...webhookData, table: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            >
              <option value="">Select a table</option>
              {tables.map(table => (
                <option key={table.id} value={table.name}>{table.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Events</label>
            <div className="flex flex-wrap gap-2">
              {eventOptions.map(event => (
                <button
                  key={event}
                  type="button"
                  onClick={() => toggleEvent(event)}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                    webhookData.events.includes(event)
                      ? 'bg-primary text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {event}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Secret (Optional)</label>
            <input
              type="text"
              value={webhookData.secret}
              onChange={(e) => setWebhookData({ ...webhookData, secret: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="whsec_1234567890abcdef"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Headers (Optional)</label>
            <div className="space-y-2">
              {Object.entries(webhookData.headers).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={key}
                    disabled
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm"
                  />
                  <input
                    type="text"
                    value={value}
                    disabled
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeHeader(key)}
                    className="p-2 text-error hover:bg-error/20 rounded-lg transition-colors"
                  >
                    <ApperIcon name="X" size={16} />
                  </button>
                </div>
              ))}
              
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newHeaderKey}
                  onChange={(e) => setNewHeaderKey(e.target.value)}
                  placeholder="Header name"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <input
                  type="text"
                  value={newHeaderValue}
                  onChange={(e) => setNewHeaderValue(e.target.value)}
                  placeholder="Header value"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={addHeader}
                  className="p-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
                >
                  <ApperIcon name="Plus" size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-600 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:scale-105 transition-transform duration-200"
            >
              Create Webhook
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

const CreateSubscriptionModal = ({ onClose, onSubmit, tables }) => {
  const [subscriptionData, setSubscriptionData] = useState({
    name: '',
    table: '',
    events: [],
    filter: '',
    protocol: 'websocket',
    endpoint: ''
  })

  const eventOptions = ['INSERT', 'UPDATE', 'DELETE']
  const protocolOptions = [
    { value: 'websocket', label: 'WebSocket' },
    { value: 'server-sent-events', label: 'Server-Sent Events' }
  ]
  
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(subscriptionData)
  }

  const toggleEvent = (event) => {
    setSubscriptionData(prev => ({
      ...prev,
      events: prev.events.includes(event) 
        ? prev.events.filter(e => e !== event)
        : [...prev.events, event]
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="glass rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Create Subscription</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <ApperIcon name="X" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Subscription Name</label>
            <input
              type="text"
              value={subscriptionData.name}
              onChange={(e) => setSubscriptionData({ ...subscriptionData, name: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Live User Activity"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Table</label>
            <select
              value={subscriptionData.table}
              onChange={(e) => setSubscriptionData({ ...subscriptionData, table: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            >
              <option value="">Select a table</option>
              {tables.map(table => (
                <option key={table.id} value={table.name}>{table.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Events</label>
            <div className="flex flex-wrap gap-2">
              {eventOptions.map(event => (
                <button
                  key={event}
                  type="button"
                  onClick={() => toggleEvent(event)}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                    subscriptionData.events.includes(event)
                      ? 'bg-secondary text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {event}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Protocol</label>
            <select
              value={subscriptionData.protocol}
              onChange={(e) => setSubscriptionData({ ...subscriptionData, protocol: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {protocolOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Endpoint</label>
            <input
              type="url"
              value={subscriptionData.endpoint}
              onChange={(e) => setSubscriptionData({ ...subscriptionData, endpoint: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder={subscriptionData.protocol === 'websocket' ? 'wss://realtime.example.com/users' : 'https://api.example.com/sse/users'}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Filter (Optional)</label>
            <input
              type="text"
              value={subscriptionData.filter}
              onChange={(e) => setSubscriptionData({ ...subscriptionData, filter: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="status = 'active'"
            />
            <p className="text-xs text-gray-400 mt-1">SQL WHERE clause to filter events</p>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-600 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:scale-105 transition-transform duration-200"
            >
              Create Subscription
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

const AppSettings = ({ app }) => {
  const [settings, setSettings] = useState({
    name: app?.name || '',
    subdomain: app?.subdomain || '',
    description: '',
    customDomain: '',
    billingTier: app?.billingTier || 'starter'
  })

  const handleSave = async () => {
    try {
      await appService.update(app.id, settings)
      toast.success('Settings saved successfully')
    } catch (err) {
      toast.error('Failed to save settings')
    }
  }

  return (
    <div className="h-full p-6 overflow-y-auto">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">App Settings</h2>

        <div className="space-y-6">
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">General</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">App Name</label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={settings.description}
                  onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Describe your app..."
                />
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Domain Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Subdomain</label>
                <div className="flex">
                  <input
                    type="text"
                    value={settings.subdomain}
                    onChange={(e) => setSettings({ ...settings, subdomain: e.target.value })}
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-l-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <span className="px-3 py-2 bg-gray-700 border border-gray-600 border-l-0 rounded-r-lg text-gray-400">
                    .appforge.dev
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Custom Domain</label>
                <input
                  type="text"
                  value={settings.customDomain}
                  onChange={(e) => setSettings({ ...settings, customDomain: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="myapp.com"
                />
                <p className="text-xs text-gray-400 mt-1">Pro plan required for custom domains</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Billing</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Billing Tier</label>
                <select
                  value={settings.billingTier}
                  onChange={(e) => setSettings({ ...settings, billingTier: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="starter">Starter (Free)</option>
                  <option value="pro">Pro ($29/month)</option>
                  <option value="enterprise">Enterprise ($99/month)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:scale-105 transition-transform duration-200"
            >
              Save Changes
            </button>
            <button className="px-6 py-3 border border-gray-600 text-white rounded-lg hover:bg-gray-800 transition-colors">
              Cancel
            </button>
</div>
        </div>
      </div>
    </div>
  )
}

export default AppBuilder