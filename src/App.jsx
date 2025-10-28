import { HashRouter, Route, Routes } from 'react-router'
import './App.css'
import Layout from './components/Layout'
import Home from './components/Home'
import AboutMe from './components/AboutMe'
import UpcomingEvents from './components/UpcomingEvents'
import PastEvents from './components/PastEvents'
import Quizzes from './components/Quizzes'
import Tutorials from './components/Tutorials'

function App() {
  return <HashRouter>
    <Routes>
      {/* <Route path="/" element={<Home/>}></Route> */}
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>} />
        <Route path="/about" element={<AboutMe/>}></Route>
        <Route path="/upcoming-events" element={<UpcomingEvents/>}></Route>
        <Route path="/past-events" element={<PastEvents/>}></Route>
        <Route path="/quizzes" element={<Quizzes/>}></Route>
        <Route path="/tutorials" element={<Tutorials/>}></Route>
      </Route>
    </Routes>
  </HashRouter>
}

export default App
