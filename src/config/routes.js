import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import AppBuilder from '../pages/AppBuilder'
import Templates from '../pages/Templates'
import Pricing from '../pages/Pricing'
import Documentation from '../pages/Documentation'

export const routes = {
  home: {
    id: 'home',
    label: 'Home',
    path: '/',
    icon: 'Home',
    component: Home
  },
  dashboard: {
    id: 'dashboard',
    label: 'My Apps',
    path: '/dashboard',
    icon: 'LayoutDashboard',
    component: Dashboard
  },
  builder: {
    id: 'builder',
    label: 'App Builder',
    path: '/builder',
    icon: 'Wrench',
    component: AppBuilder
  },
  templates: {
    id: 'templates',
    label: 'Templates',
    path: '/templates',
    icon: 'Layers',
    component: Templates
  },
  pricing: {
    id: 'pricing',
    label: 'Pricing',
    path: '/pricing',
    icon: 'CreditCard',
    component: Pricing
  },
  documentation: {
    id: 'documentation',
    label: 'Documentation',
    path: '/documentation',
    icon: 'BookOpen',
    component: Documentation
  }
}

export const routeArray = Object.values(routes)