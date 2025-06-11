import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from './ApperIcon'

const MainFeature = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [canvasComponents, setCanvasComponents] = useState([])
  const [chatMessages, setChatMessages] = useState([
    { type: 'assistant', content: 'Hi! I\'m here to help you build your app. What would you like to create today?' },
  ])
  const [chatInput, setChatInput] = useState('')

  const steps = [
    {
      title: 'Describe Your App',
      description: 'Tell me what you want to build in natural language',
      icon: 'MessageCircle'
    },
    {
      title: 'Refine with Chat',
      description: 'I\'ll suggest components and improvements',
      icon: 'Zap'
    },
    {
      title: 'Visual Polish',
      description: 'Fine-tune with our visual editor if needed',
      icon: 'Palette'
    },
    {
      title: 'Deploy Live',
      description: 'Publish to your custom subdomain',
      icon: 'Rocket'
    }
  ]

  const components = [
    { id: 'button', name: 'Button', icon: 'Square', color: 'bg-blue-500' },
    { id: 'input', name: 'Input', icon: 'Type', color: 'bg-green-500' },
    { id: 'card', name: 'Card', icon: 'Rectangle', color: 'bg-purple-500' },
    { id: 'list', name: 'List', icon: 'List', color: 'bg-orange-500' }
  ]

  const addToCanvas = (component, fromChat = false) => {
    const newComponent = {
      ...component,
      id: `${component.id}-${Date.now()}`,
      position: { x: Math.random() * 200, y: Math.random() * 100 }
    }
    setCanvasComponents([...canvasComponents, newComponent])
    
    if (fromChat) {
      setActiveStep(Math.min(activeStep + 1, steps.length - 1))
      setChatMessages(prev => [...prev, {
        type: 'assistant',
        content: `Great! I've added a ${component.name} to your app. ${getNextSuggestion()}`
      }])
    } else {
      setActiveStep(Math.min(activeStep + 1, steps.length - 1))
    }
  }

  const getNextSuggestion = () => {
    const suggestions = [
      'Would you like to add an input field to collect user data?',
      'How about a card to display information?',
      'Should we add a list to show multiple items?',
      'Would you like to style this component differently?'
    ]
    return suggestions[Math.floor(Math.random() * suggestions.length)]
  }

  const handleChatSubmit = (e) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const userMessage = { type: 'user', content: chatInput }
    setChatMessages(prev => [...prev, userMessage])

    // Simple AI simulation based on keywords
    let response = 'I understand you want to '
    let suggestedComponent = null

    if (chatInput.toLowerCase().includes('button')) {
      response = 'Perfect! I\'ll add a button for you. Buttons are great for user interactions like submitting forms or triggering actions.'
      suggestedComponent = components.find(c => c.id === 'button')
    } else if (chatInput.toLowerCase().includes('input') || chatInput.toLowerCase().includes('form')) {
      response = 'Excellent choice! I\'ll add an input field. This will let users enter data into your app.'
      suggestedComponent = components.find(c => c.id === 'input')
    } else if (chatInput.toLowerCase().includes('card') || chatInput.toLowerCase().includes('display')) {
      response = 'Great idea! I\'ll add a card component. Cards are perfect for displaying organized information.'
      suggestedComponent = components.find(c => c.id === 'card')
    } else if (chatInput.toLowerCase().includes('list') || chatInput.toLowerCase().includes('show')) {
      response = 'Smart! I\'ll add a list component. Lists are ideal for showing multiple items or data entries.'
      suggestedComponent = components.find(c => c.id === 'list')
    } else {
      response = 'That sounds interesting! Based on what you described, I recommend starting with a button and input field. What do you think?'
    }

    setTimeout(() => {
      setChatMessages(prev => [...prev, { type: 'assistant', content: response }])
      if (suggestedComponent) {
        setTimeout(() => addToCanvas(suggestedComponent, true), 1000)
      }
      setActiveStep(Math.min(activeStep + 1, steps.length - 1))
    }, 1000)

    setChatInput('')
  }

  return (
    <div className="glass rounded-2xl p-8 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">AI-Powered App Builder Demo</h3>
        <p className="text-gray-400">
          Build React apps through natural conversation - just tell us what you want!
        </p>
      </div>
      {/* Progress Steps */}
      <div className="flex justify-between mb-8 relative">
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-700">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary"
            initial={{ width: '0%' }}
            animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        {steps.map((step, index) => (
          <div key={index} className="relative z-10 flex flex-col items-center">
            <motion.div
              className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                index <= activeStep
                  ? 'bg-gradient-to-r from-primary to-secondary border-primary text-white'
                  : 'bg-gray-800 border-gray-600 text-gray-400'
              }`}
              whileHover={{ scale: 1.1 }}
            >
              <ApperIcon name={step.icon} size={20} />
            </motion.div>
            <div className="text-center mt-3">
              <p className="font-medium text-sm">{step.title}</p>
              <p className="text-xs text-gray-400 max-w-24">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

{/* Demo Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-96">
        {/* Chat Interface - Primary */}
        <div className="bg-gray-900 rounded-xl p-4 overflow-hidden flex flex-col">
          <h4 className="font-semibold mb-4 flex items-center">
            <ApperIcon name="MessageCircle" size={16} className="mr-2" />
            AI Assistant
          </h4>
          
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 mb-4">
            {chatMessages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  message.type === 'user' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-800 text-gray-200'
                }`}>
                  {message.content}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleChatSubmit} className="flex space-x-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Describe what you want to build..."
              className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
            >
              <ApperIcon name="Send" size={16} />
            </button>
          </form>
        </div>

        {/* Canvas */}
        <div className="bg-white rounded-xl p-4 relative overflow-hidden">
          <div className="absolute top-2 left-2 right-2 bg-gray-100 h-8 rounded flex items-center px-3">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            </div>
            <span className="text-xs text-gray-500 ml-3">myapp.appforge.dev</span>
          </div>
          
          <div className="mt-12 h-full">
            {canvasComponents.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <ApperIcon name="MousePointer" size={32} className="mx-auto mb-2" />
                  <p className="text-sm">Click components to add them here</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <AnimatePresence>
                  {canvasComponents.map((component) => (
                    <motion.div
                      key={component.id}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="cursor-pointer"
                      onClick={() => setSelectedComponent(component)}
                    >
                      <ComponentPreview component={component} isSelected={selectedComponent?.id === component.id} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

{/* Visual Components - Secondary */}
        <div className="bg-gray-900 rounded-xl p-4">
          <h4 className="font-semibold mb-4 flex items-center">
            <ApperIcon name="Package" size={16} className="mr-2" />
            Quick Add
            <span className="ml-2 text-xs text-gray-400">(Optional)</span>
          </h4>
          <p className="text-xs text-gray-400 mb-3">Or drag components directly:</p>
          <div className="grid grid-cols-2 gap-2">
            {components.map((component) => (
              <motion.button
                key={component.id}
                onClick={() => addToCanvas(component)}
                className="flex flex-col items-center space-y-2 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-8 h-8 ${component.color} rounded flex items-center justify-center`}>
                  <ApperIcon name={component.icon} size={16} className="text-white" />
                </div>
                <span className="text-xs font-medium">{component.name}</span>
              </motion.button>
            ))}
          </div>
          
          {selectedComponent && (
            <div className="mt-4 pt-4 border-t border-gray-700">
              <h5 className="text-sm font-medium mb-2">Selected: {selectedComponent.name}</h5>
              <div className="space-y-2">
                <button 
                  className="w-full px-3 py-1 bg-primary text-white text-xs rounded"
                  onClick={() => setActiveStep(2)}
                >
                  Style This
                </button>
                <button 
                  className="w-full px-3 py-1 bg-gray-700 text-white text-xs rounded"
                  onClick={() => setActiveStep(2)}
                >
                  Add Data
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 mt-8">
        <button
          onClick={() => {
            setCanvasComponents([])
            setSelectedComponent(null)
            setActiveStep(0)
          }}
          className="px-6 py-2 border border-gray-600 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Reset Demo
        </button>
        <button
          onClick={() => setActiveStep(steps.length - 1)}
          className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:scale-105 transition-transform duration-200"
        >
          Deploy App
        </button>
      </div>
    </div>
  )
}

const ComponentPreview = ({ component, isSelected }) => {
  const baseClasses = `p-3 rounded border-2 transition-all ${
    isSelected ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-gray-400'
  }`

  switch (component.id.split('-')[0]) {
    case 'button':
      return (
        <div className={baseClasses}>
          <button className="px-4 py-2 bg-blue-500 text-white rounded text-sm">
            Click Me
          </button>
        </div>
      )
    case 'input':
      return (
        <div className={baseClasses}>
          <input
            type="text"
            placeholder="Enter text..."
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
          />
        </div>
      )
    case 'card':
      return (
        <div className={baseClasses}>
          <div className="bg-gray-50 p-3 rounded">
            <h4 className="font-medium text-gray-900 text-sm mb-1">Card Title</h4>
            <p className="text-gray-600 text-xs">Card content goes here</p>
          </div>
        </div>
      )
    case 'list':
      return (
        <div className={baseClasses}>
          <ul className="space-y-1 text-sm">
            <li className="text-gray-900">• List item 1</li>
            <li className="text-gray-900">• List item 2</li>
            <li className="text-gray-900">• List item 3</li>
          </ul>
        </div>
      )
    default:
      return (
        <div className={baseClasses}>
          <div className="p-3 bg-gray-100 rounded text-center text-sm text-gray-600">
            {component.name}
          </div>
        </div>
      )
  }
}

export default MainFeature