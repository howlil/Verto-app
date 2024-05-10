import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/landing-page/Home'
import { ActiveRouteProvider } from './utils/ActiveRouteContex'
export default function App() {
  return (
    <>
     <Router>
      <ActiveRouteProvider>
      <Routes>
        <Route path = '/' element = {<Home/>}  />
      </Routes>
      </ActiveRouteProvider>
    </Router>
    </>
  )
}
