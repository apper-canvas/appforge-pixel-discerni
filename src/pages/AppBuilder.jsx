import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'
import { appService, databaseTableService, authProviderService } from '../services'

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

  const components = [
    { id: 'button', name: 'Button', icon: 'Square', category: 'Basic' },
    { id: 'input', name: 'Input', icon: 'Type', category: 'Form' },
    { id: 'card', name: 'Card', icon: 'Square', category: 'Layout' },
    { id: 'text', name: 'Text', icon: 'Type', category: 'Basic' },
    { id: 'image', name: 'Image', icon: 'Image', category: 'Media' },
    { id: 'list', name: 'List', icon: 'List', category: 'Data' }
  ]

  const addComponent = (component) => {
    const newComponent = {
      id: Date.now(),
      type: component.id,
      name: component.name,
      props: {},
      style: { x: 50, y: 50 }
    }
    setCanvas([...canvas, newComponent])
    toast.success(`${component.name} added to canvas`)
  }

  return (
    <div className="h-full flex">
      {/* Component Library */}
      <div className="w-80 border-r border-gray-700 p-6 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Components</h3>
        <div className="space-y-4">
          {['Basic', 'Form', 'Layout', 'Data', 'Media'].map(category => (
            <div key={category}>
              <h4 className="text-sm font-medium text-gray-400 mb-2">{category}</h4>
              <div className="grid grid-cols-2 gap-2">
                {components
                  .filter(comp => comp.category === category)
                  .map(component => (
                    <button
                      key={component.id}
                      onClick={() => addComponent(component)}
                      className="p-3 border border-gray-600 rounded-lg hover:border-primary transition-colors text-center group"
                    >
                      <ApperIcon 
                        name={component.icon} 
                        size={24} 
                        className="mx-auto mb-1 text-gray-400 group-hover:text-primary" 
                      />
                      <div className="text-xs">{component.name}</div>
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
          {canvas.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-400">
              <div className="text-center">
                <ApperIcon name="MousePointer" size={48} className="mx-auto mb-4" />
                <p className="text-lg">Drag components here to start building</p>
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {canvas.map(component => (
                <motion.div
                  key={component.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer ${
                    selectedComponent?.id === component.id ? 'border-primary bg-primary/10' : ''
                  }`}
                  onClick={() => setSelectedComponent(component)}
                >
                  <ComponentPreview component={component} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Properties Panel */}
      <div className="w-80 border-l border-gray-700 p-6 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Properties</h3>
        {selectedComponent ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Component Type</label>
              <p className="text-gray-400 capitalize">{selectedComponent.type}</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Text Content</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-black"
                placeholder="Enter text..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Style</label>
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Width"
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-black"
                  />
                  <input
                    type="text"
                    placeholder="Height"
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-black"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-400">Select a component to edit its properties</p>
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
  const [tables, setTables] = useState([])
  const [loading, setLoading] = useState(false)
  const [showCreateTable, setShowCreateTable] = useState(false)

  useEffect(() => {
    if (app) {
      loadTables()
    }
  }, [app])

  const loadTables = async () => {
    setLoading(true)
    try {
      const result = await databaseTableService.getAll()
      setTables(result.filter(table => table.appId === app?.id))
    } catch (err) {
      toast.error('Failed to load tables')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTable = async (tableData) => {
    try {
      const newTable = await databaseTableService.create({
        ...tableData,
        appId: app.id
      })
      setTables([...tables, newTable])
      setShowCreateTable(false)
      toast.success('Table created successfully')
    } catch (err) {
      toast.error('Failed to create table')
    }
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading database schema...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Database Schema</h2>
        <button
          onClick={() => setShowCreateTable(true)}
          className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:scale-105 transition-transform duration-200 flex items-center space-x-2"
        >
          <ApperIcon name="Plus" size={16} />
          <span>Add Table</span>
        </button>
      </div>

      {tables.length === 0 ? (
        <div className="text-center py-12">
          <ApperIcon name="Database" size={48} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Tables Yet</h3>
          <p className="text-gray-400 mb-4">Create your first database table to get started</p>
          <button
            onClick={() => setShowCreateTable(true)}
            className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:scale-105 transition-transform duration-200"
          >
            Create Table
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tables.map(table => (
            <div key={table.id} className="glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{table.name}</h3>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <ApperIcon name="Edit" size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-error transition-colors">
                    <ApperIcon name="Trash2" size={16} />
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                {table.fields?.map((field, index) => (
                  <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-800 rounded-lg">
                    <span className="font-medium">{field.name}</span>
                    <span className="text-sm text-gray-400">{field.type}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {showCreateTable && (
        <CreateTableModal
          onClose={() => setShowCreateTable(false)}
          onSubmit={handleCreateTable}
        />
      )}
    </div>
  )
}

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