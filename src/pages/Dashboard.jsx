import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import { appService } from '@/services'
const Dashboard = () => {
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    loadApps()
  }, [])

  const loadApps = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await appService.getAll()
      setApps(result)
    } catch (err) {
      setError(err.message || 'Failed to load apps')
      toast.error('Failed to load apps')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteApp = async (appId) => {
    if (!confirm('Are you sure you want to delete this app? This action cannot be undone.')) {
      return
    }

    try {
      await appService.delete(appId)
      setApps(apps.filter(app => app.id !== appId))
      toast.success('App deleted successfully')
    } catch (err) {
      toast.error('Failed to delete app')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'deployed': return 'text-success bg-success/20'
      case 'building': return 'text-warning bg-warning/20'
      case 'failed': return 'text-error bg-error/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'deployed': return 'CheckCircle'
      case 'building': return 'Clock'
      case 'failed': return 'XCircle'
      default: return 'Circle'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="h-8 bg-gray-700 rounded w-64 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-96"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-6 animate-pulse"
              >
                <div className="h-32 bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-2/3"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <ApperIcon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Failed to Load Apps</h3>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={loadApps}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (apps.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="Plus" size={32} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Create Your First App</h3>
          <p className="text-gray-400 mb-6">
            Get started by creating your first React application. Choose from templates or start from scratch.
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-200"
          >
            Create New App
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Apps</h1>
            <p className="text-gray-400">
              Manage your React applications and track their performance
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-200 flex items-center space-x-2"
          >
            <ApperIcon name="Plus" size={20} />
            <span>Create App</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Apps</p>
                <p className="text-2xl font-bold">{apps.length}</p>
              </div>
              <ApperIcon name="Layers" size={24} className="text-primary" />
            </div>
          </div>
          <div className="glass rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Deployed</p>
                <p className="text-2xl font-bold">
                  {apps.filter(app => app.status === 'deployed').length}
                </p>
              </div>
              <ApperIcon name="CheckCircle" size={24} className="text-success" />
</div>
          </div>
          <div className="glass rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Monthly Visits</p>
                <p className="text-2xl font-bold">
                  {apps.reduce((sum, app) => sum + (app?.monthlyVisits || 0), 0).toLocaleString()}
                </p>
              </div>
              <ApperIcon name="BarChart3" size={24} className="text-accent" />
            </div>
          </div>
          <div className="glass rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Billing</p>
                <p className="text-2xl font-bold">
                  ${apps.reduce((sum, app) => {
                    const prices = { starter: 0, pro: 29, enterprise: 99 }
                    return sum + (prices[app?.billingTier] || 0)
                  }, 0)}
                </p>
              </div>
              <ApperIcon name="DollarSign" size={24} className="text-success" />
            </div>
          </div>
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-xl p-6 hover:scale-102 transition-transform duration-200 group"
            >
              {/* App Preview */}
              <AppPreview app={app} />

              {/* App Info */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-1">{app.name}</h3>
                <p className="text-gray-400 text-sm">{app.subdomain}.appforge.dev</p>
</div>

              {/* Stats */}
              <div className="flex justify-between text-sm text-gray-400 mb-4">
                <span>{(app?.monthlyVisits || 0).toLocaleString()} visits</span>
                <span className="capitalize">{app?.billingTier || 'starter'}</span>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link
                  to={`/builder/${app.id}`}
                  className="flex-1 px-3 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/80 transition-colors text-center"
                >
                  Edit
                </Link>
                <a
                  href={`https://${app.subdomain}.appforge.dev`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-3 py-2 border border-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors text-center"
                >
                  View
                </a>
                <button
                  onClick={() => handleDeleteApp(app.id)}
                  className="px-3 py-2 text-error hover:bg-error/20 rounded-lg transition-colors"
                >
                  <ApperIcon name="Trash2" size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Create App Modal */}
        {showCreateModal && (
          <CreateAppModal
            onClose={() => setShowCreateModal(false)}
            onSuccess={(newApp) => {
              setApps([...apps, newApp])
              setShowCreateModal(false)
              toast.success('App created successfully!')
            }}
          />
        )}
      </div>
    </div>
  )
}

const CreateAppModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    subdomain: '',
    billingTier: 'starter'
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const newApp = await appService.create({
        ...formData,
        status: 'building',
        createdAt: new Date().toISOString(),
        monthlyVisits: 0
      })
      onSuccess(newApp)
    } catch (err) {
      toast.error('Failed to create app')
    } finally {
      setLoading(false)
    }
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
        className="glass rounded-xl p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Create New App</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <ApperIcon name="X" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">App Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="My Awesome App"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Subdomain</label>
            <div className="flex">
              <input
                type="text"
                value={formData.subdomain}
                onChange={(e) => setFormData({ ...formData, subdomain: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-l-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="my-app"
                required
              />
              <span className="px-3 py-2 bg-gray-700 border border-gray-600 border-l-0 rounded-r-lg text-gray-400">
                .appforge.dev
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Billing Tier</label>
            <select
              value={formData.billingTier}
              onChange={(e) => setFormData({ ...formData, billingTier: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="starter">Starter (Free)</option>
              <option value="pro">Pro ($29/month)</option>
              <option value="enterprise">Enterprise ($99/month)</option>
            </select>
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
              disabled={loading}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:scale-105 transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create App'}
            </button>
</div>
        </form>
      </motion.div>
    </motion.div>
  )
}
const AppPreview = ({ app }) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'deployed': return 'text-success bg-success/20'
      case 'building': return 'text-warning bg-warning/20'
      case 'failed': return 'text-error bg-error/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'deployed': return 'CheckCircle'
      case 'building': return 'Clock'
      case 'failed': return 'XCircle'
      default: return 'Circle'
    }
  }

  return (
    <div className="h-32 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg mb-4 relative overflow-hidden">
      {/* Preview Image */}
      {app.previewImage && !imageError ? (
        <>
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={app.previewImage}
            alt={`${app.name} preview`}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
{/* Dark overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/20"></div>
        </>
      ) : (
        /* Fallback to letter display */
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-4xl font-bold text-gray-500">{app?.name?.charAt(0) || '?'}</div>
        </div>
      )}
      {/* Status Badge */}
      <div className="absolute top-2 right-2">
        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 backdrop-blur-sm ${getStatusColor(app.status)}`}>
          <ApperIcon name={getStatusIcon(app.status)} size={12} />
          <span className="capitalize">{app.status}</span>
        </span>
      </div>
      
      {/* Template Badge */}
      {app.template && (
        <div className="absolute top-2 left-2">
          <span className="px-2 py-1 bg-black/40 backdrop-blur-sm text-white text-xs rounded-full capitalize">
            {app.template}
          </span>
        </div>
      )}
    </div>
  )
}

export default Dashboard