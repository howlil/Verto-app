import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/landing-page/Home'
import { ActiveRouteProvider } from './utils/ActiveRouteContex'
import Dashboard from './pages/dashboard/Dashboard'
import Kriteria from './pages/kriteria/Kriteria'
import NilaiKriteria from './pages/nilai-kriteria/NilaiKriteria'
import Alternatif from './pages/alternatif/Alternatif'
import HasilAnalisis from './pages/hasil-analisis/HasilAnalisis'
export default function App() {
  return (
    <>
     <Router>
      <ActiveRouteProvider>
      <Routes>
        <Route path ='/' element = {<Home/>}  />
        <Route path ='/dashboard' element = {<Dashboard/>}  />
        <Route path ='/kriteria' element = {<Kriteria/>}  />
        <Route path ='/nilaiKriteria' element = {<NilaiKriteria/>}  />
        <Route path ='/alternatif' element = {<Alternatif/>}  />
        <Route path ='/hasilAnalisis' element = {<HasilAnalisis/>}  />
      </Routes>
      </ActiveRouteProvider>
    </Router>
    </>
  )
}
