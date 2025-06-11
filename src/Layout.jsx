import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from './components/ApperIcon'

const Layout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  const navigation = [
    { name: 'Home', path: '/', icon: 'Home' },
    { name: 'My Apps', path: '/dashboard', icon: 'LayoutDashboard' },
    { name: 'Templates', path: '/templates', icon: 'Layers' },
    { name: 'Documentation', path: '/documentation', icon: 'BookOpen' },
    { name: 'Pricing', path: '/pricing', icon: 'CreditCard' }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <NavLink to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <ApperIcon name="Zap" size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold text-white">AppForge</span>
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 py-2 text-sm font-medium transition-colors duration-200 relative ${
                      isActive
                        ? 'text-white'
                        : 'text-gray-300 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.name}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute -bottom-[17px] left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                          initial={false}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <NavLink
                to="/dashboard"
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary to-secondary rounded-lg hover:scale-105 transition-transform duration-200"
              >
                Get Started
              </NavLink>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
            >
              <ApperIcon 
                name={mobileMenuOpen ? "X" : "Menu"} 
                size={24} 
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-700 bg-surface/95 backdrop-blur-lg"
            >
              <div className="px-4 py-3 space-y-1">
                {navigation.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? 'text-white bg-primary/20'
                          : 'text-gray-300 hover:text-white hover:bg-gray-700'
                      }`
                    }
                  >
                    <ApperIcon name={item.icon} size={18} />
                    <span>{item.name}</span>
                  </NavLink>
                ))}
                <div className="pt-3 border-t border-gray-700">
                  <NavLink
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary to-secondary rounded-lg"
                  >
                    Get Started
                  </NavLink>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout