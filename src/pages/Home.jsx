import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'
import MainFeature from '../components/MainFeature'

const Home = () => {
  const features = [
    {
      icon: 'Zap',
      title: 'Visual App Builder',
      description: 'Drag and drop components to build React apps visually with real-time preview.'
    },
    {
      icon: 'Database',
      title: 'Built-in Database',
      description: 'Design schemas, manage relationships, and query data without external services.'
    },
    {
      icon: 'Shield',
      title: 'Authentication Ready',
      description: 'Configure social logins, user management, and permissions with zero code.'
    },
    {
      icon: 'CreditCard',
      title: 'Billing Integration',
      description: 'Built-in subscription management and usage tracking for your apps.'
    },
    {
      icon: 'Globe',
      title: 'Instant Deployment',
      description: 'Deploy to custom subdomains with automatic SSL and CDN optimization.'
    },
    {
      icon: 'Users',
      title: 'Team Collaboration',
      description: 'Invite team members and manage permissions for collaborative development.'
    }
  ]

  const pricingTiers = [
    {
      name: 'Starter',
      price: 0,
      features: ['1 App', '1GB Database', 'Basic Auth', 'Community Support'],
      cta: 'Start Free',
      popular: false
    },
    {
      name: 'Pro',
      price: 29,
      features: ['5 Apps', '10GB Database', 'Social Auth', 'Priority Support', 'Custom Domains'],
      cta: 'Start Pro',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 99,
      features: ['Unlimited Apps', '100GB Database', 'SSO', 'White-label', 'Dedicated Support'],
      cta: 'Contact Sales',
      popular: false
    }
  ]

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Build React Apps
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Without Backend Hassle
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Create full-stack React applications with built-in database, authentication, 
              and billing. Deploy to custom subdomains in minutes, not months.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-200"
              >
                Start Building Free
              </Link>
              <button className="px-8 py-4 border border-gray-600 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-200">
                Watch Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Experience the Builder
            </h2>
            <p className="text-xl text-gray-300">
              Try our visual app builder with this interactive demo
            </p>
          </motion.div>
          <MainFeature />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Build Apps
            </h2>
            <p className="text-xl text-gray-300">
              From database design to deployment, we've got you covered
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl p-6 hover:scale-102 transition-transform duration-200"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4">
                  <ApperIcon name={feature.icon} size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-300">
              Choose the plan that fits your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative glass rounded-xl p-8 ${
                  tier.popular ? 'gradient-border' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary to-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className={tier.popular ? 'gradient-border-inner p-8 -m-8' : ''}>
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">${tier.price}</span>
                    <span className="text-gray-300">/month</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <ApperIcon name="Check" size={16} className="text-success mr-3" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                      tier.popular
                        ? 'bg-gradient-to-r from-primary to-secondary text-white hover:scale-105'
                        : 'border border-gray-600 text-white hover:bg-gray-800'
                    }`}
                  >
                    {tier.cta}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/20 to-secondary/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Build Your Next App?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of developers who've shipped faster with AppForge
            </p>
            <Link
              to="/dashboard"
              className="inline-block px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-200"
            >
              Start Building Today
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home