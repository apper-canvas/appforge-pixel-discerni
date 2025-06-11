import { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const Documentation = () => {
  const [activeSection, setActiveSection] = useState('getting-started')
  const [searchQuery, setSearchQuery] = useState('')

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: 'Rocket',
      subsections: [
        { id: 'introduction', title: 'Introduction' },
        { id: 'quick-start', title: 'Quick Start' },
        { id: 'first-app', title: 'Your First App' }
      ]
    },
    {
      id: 'visual-builder',
      title: 'Visual Builder',
      icon: 'Layout',
      subsections: [
        { id: 'components', title: 'Components' },
        { id: 'styling', title: 'Styling' },
        { id: 'interactions', title: 'Interactions' }
      ]
    },
    {
      id: 'database',
      title: 'Database',
      icon: 'Database',
      subsections: [
        { id: 'schema-design', title: 'Schema Design' },
        { id: 'relationships', title: 'Relationships' },
        { id: 'queries', title: 'Queries' }
      ]
    },
    {
      id: 'authentication',
      title: 'Authentication',
      icon: 'Shield',
      subsections: [
        { id: 'setup', title: 'Setup' },
        { id: 'providers', title: 'Social Providers' },
        { id: 'permissions', title: 'Permissions' }
      ]
    },
    {
      id: 'deployment',
      title: 'Deployment',
      icon: 'Globe',
      subsections: [
        { id: 'subdomains', title: 'Subdomains' },
        { id: 'custom-domains', title: 'Custom Domains' },
        { id: 'environment', title: 'Environment Variables' }
      ]
    },
    {
      id: 'api',
      title: 'API Reference',
      icon: 'Code',
      subsections: [
        { id: 'endpoints', title: 'Endpoints' },
        { id: 'authentication-api', title: 'Authentication' },
        { id: 'webhooks', title: 'Webhooks' }
      ]
    }
  ]

  const content = {
    'getting-started': {
      'introduction': {
        title: 'Welcome to AppForge',
        content: `
# Welcome to AppForge

AppForge is a comprehensive platform that lets you build, deploy, and manage React applications with built-in backend services. No need to worry about servers, databases, or authentication - we handle all of that for you.

## What You Can Build

- **SaaS Applications**: Complete with user management, billing, and analytics
- **E-commerce Stores**: Product catalogs, shopping carts, and payment processing  
- **Portfolio Websites**: Showcase your work with custom designs
- **Admin Dashboards**: Data visualization and management interfaces
- **Blog Platforms**: Content management with rich editing capabilities

## Key Features

- **Visual Builder**: Drag-and-drop interface for rapid development
- **Built-in Database**: Schema designer with relationships and queries
- **Authentication**: Social logins and user management out of the box
- **Instant Deployment**: Your apps go live on custom subdomains immediately
- **Team Collaboration**: Invite team members and manage permissions
- **Analytics**: Track usage, performance, and user behavior

Ready to get started? Let's build your first app!
        `
      },
      'quick-start': {
        title: 'Quick Start Guide',
        content: `
# Quick Start Guide

Get your first app up and running in under 5 minutes.

## Step 1: Create Your Account

1. Click "Get Started" in the top navigation
2. Choose your preferred authentication method
3. Complete your profile setup

## Step 2: Create Your First App

1. From your dashboard, click "Create App"
2. Choose a template or start from scratch
3. Enter your app name and subdomain
4. Select your billing tier

## Step 3: Design Your App

Use our visual builder to:
- Add components from the library
- Customize styles and properties
- Set up interactions and data binding
- Preview your changes in real-time

## Step 4: Configure Your Database

1. Open the Database tab in the builder
2. Create tables for your data
3. Define fields and relationships
4. Set up any initial data

## Step 5: Set Up Authentication

1. Navigate to the Authentication tab
2. Enable your preferred login methods
3. Configure social providers if needed
4. Set up user permissions

## Step 6: Deploy Your App

1. Click "Deploy" in the builder
2. Your app will be built and deployed automatically
3. Access it at your-subdomain.appforge.dev
4. Share it with the world!

That's it! You now have a fully functional React application with backend services.
        `
      },
      'first-app': {
        title: 'Building Your First App',
        content: `
# Building Your First App

Let's walk through creating a simple task management app step by step.

## Planning Your App

Before we start building, let's plan what we need:
- A list of tasks with titles and completion status
- Ability to add new tasks
- Mark tasks as complete/incomplete
- Delete tasks

## Setting Up the Database

First, we'll create a database table for our tasks:

1. Open the Database tab in the builder
2. Click "Add Table"
3. Name it "tasks"
4. Add these fields:
   - \`id\` (string, required) - auto-generated
   - \`title\` (string, required)
   - \`completed\` (boolean, default: false)
   - \`createdAt\` (date, required)

## Building the Interface

Now let's build the user interface:

### Task List Component
1. Drag a "List" component to your canvas
2. Connect it to your tasks table
3. Configure the list item template to show task title and status

### Add Task Form
1. Add an "Input" component for the task title
2. Add a "Button" component to submit new tasks
3. Set up the form submission to create new tasks

### Task Actions
1. Add a "Checkbox" for marking tasks complete
2. Add a "Delete" button for removing tasks
3. Configure the actions to update/delete tasks

## Adding Interactivity

Connect your components to make them functional:

1. **Add Task**: Connect the form submission to create a new task record
2. **Toggle Complete**: Connect the checkbox to update the task's completed status
3. **Delete Task**: Connect the delete button to remove the task record

## Styling Your App

Make it look great:
1. Choose a color scheme
2. Set up proper spacing and typography
3. Add hover effects and transitions
4. Make it responsive for mobile devices

## Testing and Deployment

1. Use the preview feature to test your app
2. Try all the interactions to make sure they work
3. Test on different screen sizes
4. Deploy when you're satisfied with the result

Congratulations! You've built your first AppForge application.
        `
      }
    },
    'visual-builder': {
      'components': {
        title: 'Components Library',
        content: `
# Components Library

AppForge provides a comprehensive set of pre-built components that you can drag and drop into your applications.

## Basic Components

### Button
Interactive button with multiple styles and states.
- **Properties**: Text, Color, Size, Variant
- **Events**: onClick, onMouseOver, onMouseOut
- **Use Cases**: Form submissions, navigation, actions

### Text
Display text content with rich formatting options.
- **Properties**: Content, Font, Size, Color, Weight
- **Variants**: Heading, Paragraph, Caption, Label
- **Features**: Markdown support, HTML rendering

### Image
Display images with responsive behavior.
- **Properties**: Source, Alt text, Size, Fit
- **Features**: Lazy loading, placeholder, crop modes
- **Formats**: JPG, PNG, WebP, SVG

## Form Components

### Input
Text input with validation and formatting.
- **Types**: Text, Email, Password, Number, Tel
- **Features**: Validation, Formatting, Autocomplete
- **Properties**: Placeholder, Required, Pattern

### Select
Dropdown selection with search and multi-select.
- **Features**: Search, Multi-select, Custom options
- **Data**: Static options or database-driven
- **Styling**: Custom styling, icons, grouping

### Checkbox
Boolean input for yes/no choices.
- **Properties**: Label, Default state, Disabled
- **Events**: onChange, onFocus, onBlur
- **Styling**: Custom checkmark, colors, sizes

## Layout Components

### Container
Wrapper component for organizing content.
- **Properties**: Max width, Padding, Alignment
- **Responsive**: Breakpoint-specific settings
- **Features**: Grid system, flexbox utilities

### Card
Structured content container with shadows and borders.
- **Elements**: Header, Body, Footer, Actions
- **Variants**: Elevated, Outlined, Filled
- **Features**: Hover effects, click handlers

### Grid
Responsive grid system for complex layouts.
- **Properties**: Columns, Gap, Alignment
- **Responsive**: Different layouts per breakpoint
- **Features**: Auto-fit, minmax, subgrid

## Data Components

### List
Display collections of data with templates.
- **Data Sources**: Database tables, API endpoints
- **Features**: Pagination, sorting, filtering
- **Templates**: Customizable item rendering

### Table
Structured data display with advanced features.
- **Features**: Sorting, filtering, pagination
- **Columns**: Custom renderers, formatters
- **Actions**: Row selection, bulk operations

### Chart
Data visualization with multiple chart types.
- **Types**: Line, Bar, Pie, Area, Scatter
- **Data**: Real-time updates, interactive legends
- **Styling**: Colors, animations, responsive

## Media Components

### Video
Video player with controls and streaming support.
- **Sources**: Direct files, YouTube, Vimeo
- **Features**: Controls, autoplay, loop, muted
- **Responsive**: Adaptive quality, mobile-friendly

### Audio
Audio player for music and sound effects.
- **Features**: Playlist, controls, visualization
- **Formats**: MP3, WAV, OGG, streaming
- **Controls**: Play/pause, volume, seek

## Navigation Components

### Menu
Navigation menus with nested structure.
- **Types**: Horizontal, Vertical, Dropdown
- **Features**: Icons, badges, active states
- **Mobile**: Hamburger menu, slide-out drawer

### Breadcrumb
Navigation path showing current location.
- **Features**: Auto-generation, custom separators
- **Styling**: Icons, colors, hover effects
- **Behavior**: Click navigation, overflow handling

### Pagination
Navigate through large datasets.
- **Features**: Page numbers, prev/next, jump to page
- **Styling**: Compact, full, minimal variants
- **Behavior**: Keyboard navigation, ARIA support
        `
      }
    }
  }

  const getCurrentContent = () => {
    const section = sections.find(s => s.id === activeSection)
    const subsection = section?.subsections?.[0]
    if (subsection && content[activeSection]?.[subsection.id]) {
      return content[activeSection][subsection.id]
    }
    return { title: 'Coming Soon', content: 'This section is being written. Check back soon!' }
  }

  const filteredSections = sections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.subsections.some(sub =>
      sub.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  const currentContent = getCurrentContent()

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-80 glass border-r border-gray-700 flex flex-col">
        {/* Search */}
        <div className="p-6 border-b border-gray-700">
          <div className="relative">
            <ApperIcon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {filteredSections.map((section) => (
              <div key={section.id}>
                <button
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? 'bg-primary text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <ApperIcon name={section.icon} size={18} />
                  <span className="font-medium">{section.title}</span>
                </button>
                {activeSection === section.id && section.subsections && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="ml-6 mt-2 space-y-1"
                  >
                    {section.subsections.map((subsection) => (
                      <button
                        key={subsection.id}
                        className="block w-full text-left px-3 py-1 text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        {subsection.title}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8">
          <motion.article
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            <h1 className="text-3xl font-bold mb-8">{currentContent.title}</h1>
            <div className="text-gray-300 leading-relaxed">
              {currentContent.content.split('\n').map((line, index) => {
                if (line.startsWith('# ')) {
                  return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{line.slice(2)}</h1>
                }
                if (line.startsWith('## ')) {
                  return <h2 key={index} className="text-2xl font-semibold mt-6 mb-3">{line.slice(3)}</h2>
                }
                if (line.startsWith('### ')) {
                  return <h3 key={index} className="text-xl font-medium mt-4 mb-2">{line.slice(4)}</h3>
                }
                if (line.startsWith('- ')) {
                  return (
                    <li key={index} className="ml-4">
                      {line.slice(2)}
                    </li>
                  )
                }
                if (line.startsWith('1. ')) {
                  return (
                    <li key={index} className="ml-4 list-decimal">
                      {line.slice(3)}
                    </li>
                  )
                }
                if (line.includes('**') && line.includes('**')) {
                  const parts = line.split('**')
                  return (
                    <p key={index} className="mb-4">
                      {parts.map((part, i) => 
                        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                      )}
                    </p>
                  )
                }
                if (line.trim() === '') {
                  return <br key={index} />
                }
                return <p key={index} className="mb-4">{line}</p>
              })}
            </div>
          </motion.article>

          {/* Navigation Footer */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-700">
            <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
              <ApperIcon name="ChevronLeft" size={16} />
              <span>Previous</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
              <span>Next</span>
              <ApperIcon name="ChevronRight" size={16} />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Documentation