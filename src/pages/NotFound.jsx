import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md mx-auto"
      >
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="Search" size={32} className="text-white" />
          </div>
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="block px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-200"
          >
            Go Home
          </Link>
          <Link
            to="/dashboard"
            className="block px-6 py-3 border border-gray-600 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            View Dashboard
          </Link>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-sm text-gray-400 mb-4">Popular pages:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link to="/templates" className="text-primary hover:underline text-sm">Templates</Link>
            <span className="text-gray-600">•</span>
            <Link to="/documentation" className="text-primary hover:underline text-sm">Documentation</Link>
            <span className="text-gray-600">•</span>
            <Link to="/pricing" className="text-primary hover:underline text-sm">Pricing</Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound