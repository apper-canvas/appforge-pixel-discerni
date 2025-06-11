import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'
import { appService } from '../services'

const Templates = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(false)

  const categories = [
    { id: 'all', name: 'All Templates', count: 24 },
    { id: 'saas', name: 'SaaS', count: 8 },
    { id: 'ecommerce', name: 'E-commerce', count: 6 },
    { id: 'portfolio', name: 'Portfolio', count: 4 },
    { id: 'blog', name: 'Blog', count: 3 },
    { id: 'dashboard', name: 'Dashboard', count: 3 }
  ]

  const templates = [
    {
      id: 1,
      name: 'SaaS Landing',
      description: 'Complete SaaS landing page with pricing, features, and testimonials',
      category: 'saas',
      image: '/api/placeholder/400/300',
      features: ['Authentication', 'Billing', 'User Dashboard'],
      complexity: 'Advanced',
      estimatedTime: '2 hours'
    },
    {
      id: 2,
      name: 'E-commerce Store',
      description: 'Full-featured online store with cart, checkout, and inventory management',
      category: 'ecommerce',
      image: '/api/placeholder/400/300',
      features: ['Product Catalog', 'Shopping Cart', 'Payment Integration'],
      complexity: 'Advanced',
      estimatedTime: '3 hours'
    },
    {
      id: 3,
      name: 'Portfolio Website',
      description: 'Clean portfolio website for showcasing your work and skills',
      category: 'portfolio',
      image: '/api/placeholder/400/300',
      features: ['Gallery', 'Contact Form', 'Blog'],
      complexity: 'Beginner',
      estimatedTime: '1 hour'
    },
    {
      id: 4,
      name: 'Task Manager',
      description: 'Collaborative task management app with teams and projects',
      category: 'saas',
      image: '/api/placeholder/400/300',
      features: ['Team Collaboration', 'Project Management', 'Time Tracking'],
      complexity: 'Intermediate',
      estimatedTime: '2 hours'
    },
    {
      id: 5,
      name: 'Blog Platform',
      description: 'Modern blog platform with rich text editor and comment system',
      category: 'blog',
      image: '/api/placeholder/400/300',
      features: ['Rich Editor', 'Comments', 'SEO Optimization'],
      complexity: 'Intermediate',
      estimatedTime: '1.5 hours'
    },
    {
      id: 6,
      name: 'Admin Dashboard',
      description: 'Comprehensive admin dashboard with analytics and user management',
      category: 'dashboard',
      image: '/api/placeholder/400/300',
      features: ['Analytics', 'User Management', 'Reports'],
      complexity: 'Advanced',
      estimatedTime: '2.5 hours'
    }
  ]

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory)

  const useTemplate = async (template) => {
    setLoading(true)
    try {
      const newApp = await appService.create({
        name: `${template.name} App`,
        subdomain: template.name.toLowerCase().replace(/\s+/g, '-'),
        status: 'building',
        createdAt: new Date().toISOString(),
        billingTier: 'starter',
        monthlyVisits: 0,
        template: template.id
      })
      toast.success('App created from template!')
      // Navigate to builder would happen here
    } catch (err) {
      toast.error('Failed to create app from template')
    } finally {
      setLoading(false)
    }
  }

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case 'Beginner': return 'text-success bg-success/20'
      case 'Intermediate': return 'text-warning bg-warning/20'
      case 'Advanced': return 'text-error bg-error/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold mb-4">
              Choose Your Starting Point
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Start with professionally designed templates and customize them to match your vision. 
              Each template includes database schema, authentication, and core functionality.
            </p>
          </motion.div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-primary to-secondary text-white'
                  : 'bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-xl overflow-hidden hover:scale-102 transition-transform duration-200 group"
            >
              {/* Template Preview */}
              <div className="h-48 bg-gradient-to-br from-gray-700 to-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl font-bold text-gray-500 opacity-20">
                    {template.name.charAt(0)}
                  </div>
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(template.complexity)}`}>
                    {template.complexity}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4">
                    <button
                      onClick={() => useTemplate(template)}
                      disabled={loading}
                      className="w-full px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-200 disabled:opacity-50"
                    >
                      {loading ? 'Creating...' : 'Use Template'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Template Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{template.name}</h3>
                  <div className="flex items-center text-sm text-gray-400">
                    <ApperIcon name="Clock" size={14} className="mr-1" />
                    {template.estimatedTime}
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-4">{template.description}</p>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Includes:</h4>
                  <div className="flex flex-wrap gap-2">
                    {template.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-1 bg-gray-800 text-xs rounded-full text-gray-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button className="flex-1 px-3 py-2 border border-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
                    Preview
                  </button>
                  <button
                    onClick={() => useTemplate(template)}
                    disabled={loading}
                    className="flex-1 px-3 py-2 bg-gradient-to-r from-primary to-secondary text-white text-sm font-medium rounded-lg hover:scale-105 transition-transform duration-200 disabled:opacity-50"
                  >
                    {loading ? 'Creating...' : 'Use Template'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Template CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="glass rounded-xl p-8 max-w-2xl mx-auto">
            <ApperIcon name="Sparkles" size={48} className="text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Need a Custom Template?</h3>
            <p className="text-gray-400 mb-6">
              Can't find what you're looking for? Start from scratch with our visual builder 
              or request a custom template for your specific use case.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/builder"
                className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-200"
              >
                Start from Scratch
              </Link>
              <button className="px-6 py-3 border border-gray-600 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
                Request Template
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Templates