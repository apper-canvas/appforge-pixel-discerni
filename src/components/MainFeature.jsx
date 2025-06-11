import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from './ApperIcon'

const MainFeature = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [canvasComponents, setCanvasComponents] = useState([])

  const steps = [
    {
      title: 'Choose Components',
      description: 'Drag components from our library',
      icon: 'Package'
    },
    {
      title: 'Design & Style',
      description: 'Customize appearance with our visual editor',
      icon: 'Palette'
    },
    {
      title: 'Connect Data',
      description: 'Link components to your database',
      icon: 'Database'
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

  const addToCanvas = (component) => {
    const newComponent = {
      ...component,
      id: `${component.id}-${Date.now()}`,
      position: { x: Math.random() * 200, y: Math.random() * 100 }
    }
    setCanvasComponents([...canvasComponents, newComponent])
    setActiveStep(Math.min(activeStep + 1, steps.length - 1))
  }

  return (
    <div className="glass rounded-2xl p-8 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">Interactive App Builder Demo</h3>
        <p className="text-gray-400">
          Experience how easy it is to build React apps visually
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
        {/* Component Library */}
        <div className="bg-gray-900 rounded-xl p-4 overflow-hidden">
          <h4 className="font-semibold mb-4 flex items-center">
            <ApperIcon name="Package" size={16} className="mr-2" />
            Components
          </h4>
          <div className="space-y-2">
            {components.map((component) => (
              <motion.button
                key={component.id}
                onClick={() => addToCanvas(component)}
                className="w-full flex items-center space-x-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-8 h-8 ${component.color} rounded flex items-center justify-center`}>
                  <ApperIcon name={component.icon} size={16} className="text-white" />
                </div>
                <span className="text-sm font-medium">{component.name}</span>
                <ApperIcon 
                  name="Plus" 
                  size={14} 
                  className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" 
                />
              </motion.button>
            ))}
          </div>
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

        {/* Properties Panel */}
        <div className="bg-gray-900 rounded-xl p-4">
          <h4 className="font-semibold mb-4 flex items-center">
            <ApperIcon name="Settings" size={16} className="mr-2" />
            Properties
          </h4>
          {selectedComponent ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Component</label>
                <p className="text-gray-400 capitalize">{selectedComponent.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Style</label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="50"
                    max="200"
                    className="w-full"
                    onChange={() => setActiveStep(2)}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      className="px-3 py-1 bg-primary text-white text-xs rounded"
                      onClick={() => setActiveStep(2)}
                    >
                      Primary
                    </button>
                    <button 
                      className="px-3 py-1 bg-gray-700 text-white text-xs rounded"
                      onClick={() => setActiveStep(2)}
                    >
                      Secondary
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Data Source</label>
                <select 
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-sm"
                  onChange={() => setActiveStep(3)}
                >
                  <option>Select table...</option>
                  <option>Users</option>
                  <option>Products</option>
                  <option>Orders</option>
                </select>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-sm">
              Select a component from the canvas to edit its properties
            </p>
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