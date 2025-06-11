import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly')

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for side projects and learning',
      price: { monthly: 0, yearly: 0 },
      features: [
        '1 App',
        '1GB Database Storage',
        '10K Monthly Requests',
        'Basic Authentication',
        'Community Support',
        'AppForge Subdomain'
      ],
      limitations: [
        'No custom domains',
        'AppForge branding'
      ],
      cta: 'Start Free',
      popular: false,
      color: 'gray'
    },
    {
      name: 'Pro',
      description: 'For professionals and growing businesses',
      price: { monthly: 29, yearly: 290 },
      features: [
        '5 Apps',
        '10GB Database Storage',
        '100K Monthly Requests',
        'Full Authentication Suite',
        'Priority Support',
        'Custom Domains',
        'Remove AppForge Branding',
        'Advanced Analytics',
        'Team Collaboration (5 members)'
      ],
      limitations: [],
      cta: 'Start Pro Trial',
      popular: true,
      color: 'primary'
    },
    {
      name: 'Enterprise',
      description: 'For large teams and mission-critical apps',
      price: { monthly: 99, yearly: 990 },
      features: [
        'Unlimited Apps',
        '100GB Database Storage',
        '1M Monthly Requests',
        'SSO & Advanced Security',
        'Dedicated Support',
        'White-label Solution',
        'Advanced Analytics & Reporting',
        'Unlimited Team Members',
        'Custom Integrations',
        'SLA Guarantee'
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false,
      color: 'secondary'
    }
  ]

  const faqs = [
    {
      question: 'What happens when I exceed my plan limits?',
      answer: 'We\'ll notify you when you approach your limits. You can upgrade anytime or we\'ll temporarily throttle requests to keep your apps running.'
    },
    {
      question: 'Can I change plans anytime?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and we\'ll prorate any charges.'
    },
    {
      question: 'What kind of support do you offer?',
      answer: 'Starter plans get community support, Pro plans get priority email support, and Enterprise plans get dedicated support with SLA guarantees.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 30-day money-back guarantee for all paid plans. No questions asked.'
    },
    {
      question: 'Can I host my own database?',
      answer: 'Enterprise plans can connect to external databases. Contact our sales team to discuss your specific requirements.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.'
    }
  ]

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return {
          border: 'border-primary',
          bg: 'from-primary to-secondary',
          text: 'text-primary'
        }
      case 'secondary':
        return {
          border: 'border-secondary',
          bg: 'from-secondary to-accent',
          text: 'text-secondary'
        }
      default:
        return {
          border: 'border-gray-600',
          bg: 'from-gray-600 to-gray-700',
          text: 'text-gray-400'
        }
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Simple, Transparent
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Pricing
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Start free and scale as you grow. No hidden fees, no surprises. 
              Just powerful tools to build amazing React applications.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Billing Toggle */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-12">
            <div className="bg-gray-800 p-1 rounded-lg">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  billingPeriod === 'monthly'
                    ? 'bg-white text-gray-900'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                  billingPeriod === 'yearly'
                    ? 'bg-white text-gray-900'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Yearly
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-primary to-secondary text-white text-xs px-2 py-0.5 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => {
              const colors = getColorClasses(plan.color)
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative glass rounded-xl p-8 ${
                    plan.popular ? 'gradient-border' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-primary to-accent text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className={plan.popular ? 'gradient-border-inner p-8 -m-8' : ''}>
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                      <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                      <div className="mb-2">
                        <span className="text-4xl font-bold">
                          ${plan.price[billingPeriod]}
                        </span>
                        {plan.price[billingPeriod] > 0 && (
                          <span className="text-gray-400">
                            /{billingPeriod === 'monthly' ? 'month' : 'year'}
                          </span>
                        )}
                      </div>
                      {billingPeriod === 'yearly' && plan.price.monthly > 0 && (
                        <p className="text-sm text-gray-400">
                          ${(plan.price.monthly * 12).toFixed(0)} billed monthly
                        </p>
                      )}
                    </div>

                    <div className="mb-8">
                      <h4 className="font-semibold mb-4">Everything in {plan.name}:</h4>
                      <ul className="space-y-3">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start">
                            <ApperIcon name="Check" size={16} className="text-success mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      {plan.limitations.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-700">
                          <ul className="space-y-2">
                            {plan.limitations.map((limitation) => (
                              <li key={limitation} className="flex items-start">
                                <ApperIcon name="X" size={16} className="text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-500 text-sm">{limitation}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <button
                      className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-primary to-secondary text-white hover:scale-105'
                          : 'border border-gray-600 text-white hover:bg-gray-800'
                      }`}
                    >
                      {plan.cta}
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Compare Plans</h2>
            <p className="text-gray-400">
              See exactly what's included in each plan
            </p>
          </motion.div>

          <div className="glass rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-6 font-semibold">Features</th>
                    <th className="text-center p-6 font-semibold">Starter</th>
                    <th className="text-center p-6 font-semibold">Pro</th>
                    <th className="text-center p-6 font-semibold">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Apps', starter: '1', pro: '5', enterprise: 'Unlimited' },
                    { feature: 'Database Storage', starter: '1GB', pro: '10GB', enterprise: '100GB' },
                    { feature: 'Monthly Requests', starter: '10K', pro: '100K', enterprise: '1M' },
                    { feature: 'Custom Domains', starter: '❌', pro: '✅', enterprise: '✅' },
                    { feature: 'Team Members', starter: '1', pro: '5', enterprise: 'Unlimited' },
                    { feature: 'Priority Support', starter: '❌', pro: '✅', enterprise: '✅' },
                    { feature: 'Advanced Analytics', starter: '❌', pro: '✅', enterprise: '✅' },
                    { feature: 'White-label', starter: '❌', pro: '❌', enterprise: '✅' },
                    { feature: 'SLA', starter: '❌', pro: '❌', enterprise: '✅' }
                  ].map((row, index) => (
                    <tr key={row.feature} className={index % 2 === 0 ? 'bg-gray-800/20' : ''}>
                      <td className="p-6 font-medium">{row.feature}</td>
                      <td className="p-6 text-center text-gray-400">{row.starter}</td>
                      <td className="p-6 text-center text-primary">{row.pro}</td>
                      <td className="p-6 text-center text-secondary">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400">
              Everything you need to know about our pricing
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
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
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Building?
            </h2>
            <p className="text-gray-300 mb-8">
              Join thousands of developers who ship faster with AppForge
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-200"
              >
                Start Free Today
              </Link>
              <button className="px-8 py-4 border border-gray-600 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
                Schedule Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Pricing