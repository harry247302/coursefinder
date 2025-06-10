import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <div>
      <ToastContainer />
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default App