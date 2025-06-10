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
