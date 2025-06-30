import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home, NotFound, Login, MembershipPlans, GymGallery, VerifySignIn, Profile, Admission, MembershipDetails, PaymentPage, DayPass } from './pages/index.js'
import AuthContextProvider from './context/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoutes.jsx'
import { AllDayPasses, DayPassForm } from './components/index.js'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/verify-signin",
        element: <VerifySignIn />
      },
      {
        path: '/plans',
        element: <MembershipPlans />
      },
      {
        path: "/gallery",
        element: <GymGallery />
      },


      {
        path: "/day-pass",
        element: <ProtectedRoute>
          <DayPass />
        </ProtectedRoute>
      },
      {
        path: "/day-pass/buy-passes",
        element: <ProtectedRoute>
          <DayPassForm />
        </ProtectedRoute>
      },
      {
        path: "/day-pass/get-passes",
        element: <ProtectedRoute>
          <AllDayPasses />
        </ProtectedRoute>
      },


      {
        path: "/profile",
        element: <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      },
      {
        path: "/admission-form",
        element: <ProtectedRoute>
          <Admission />
        </ProtectedRoute>
      },
      {
        path: "/membership-details",
        element: <ProtectedRoute>
          <MembershipDetails />
        </ProtectedRoute>
      },
      {
        path: "/payment-page",
        element: <ProtectedRoute>
          <PaymentPage />
        </ProtectedRoute>
      },

      
      {
        path: "*",
        element: <NotFound />
      },

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider >
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>,
)
