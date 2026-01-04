import {Route, BrowserRouter as Router, Routes, Navigate} from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Read from './pages/vocabulary/Read'
import Flashcards from './pages/games/Flashcards'

function App() {
  
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/vocabulary/read" element={<Read/>}/>
          <Route path="/games/flashcards" element={<Flashcards/>}/>
      </Routes>
    </Router>
  )
}

export default App
