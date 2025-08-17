
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignInpage from './auth/sign-in'
import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard'

import { ClerkProvider } from '@clerk/clerk-react'
import EditResume from './Resume/[resumeId]/edit/EditResume'
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}
const router = createBrowserRouter([
  {
    element: <App />,
    children: [

      {
        path: '/Dashboard',
        element: <Dashboard />
      },
      {
        path:'/Dashboard/Resume/:resumeId/edit',
        element:<EditResume/>
      }
    ]
  },
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/auth/sign-in',
    element: <SignInpage />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>

      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>,
)
