import { useContext, useState } from 'react'
import { Footer, Navbar, ScrollToTop } from './components'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AuthContext } from './context/AuthContext'
import { Loader2 } from 'lucide-react'


function App() {
  const { loading } = useContext(AuthContext);

  return (
    !loading
      ?
      <div className='font-family-lexend bg-gradient-to-r from-slate-950 via-gray-950 to-slate-800
 text-white'>
        <Navbar />
        <ToastContainer />
        <main className='min-h-screen'>
          <ScrollToTop />
          <Outlet />
        </main>
        <Footer />
      </div>
      :
      <div className="bg-gradient-to-r from-slate-950 via-gray-950 to-slate-800
 text-white flex justify-center py-28 min-h-screen">
        <div className="w-full max-w-md p-8 space-y-8 text-center flex flex-col items-center">
          <Loader2 className='w-10 h-10 animate-spin' />
          <p className="text-xl font-medium">Loading...</p>
        </div>
      </div>

  )
}

export default App
