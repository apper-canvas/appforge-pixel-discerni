import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from './Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import AppBuilder from './pages/AppBuilder'
import Templates from './pages/Templates'
import Pricing from './pages/Pricing'
import Documentation from './pages/Documentation'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-white">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="builder/:appId?" element={<AppBuilder />} />
            <Route path="templates" element={<Templates />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="documentation" element={<Documentation />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          toastClassName="!bg-surface !text-white border border-gray-600"
          progressClassName="!bg-primary"
          className="z-[9999]"
        />
      </div>
    </BrowserRouter>
  )
}

export default App