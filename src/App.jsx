import { HashRouter, Route, Routes } from 'react-router'
import './App.css'
import Home from './components/Home'
import AboutMe from './components/AboutMe'
import UpcomingEvents from './components/UpcomingEvents'

function App() {
  return <HashRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/about" element={<AboutMe/>}></Route>
      <Route path="/upcoming-events" element={<UpcomingEvents/>}></Route>
    </Routes>
  </HashRouter>
}

export default App
