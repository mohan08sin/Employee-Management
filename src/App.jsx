
import './App.css'
import HeaderComponent from './Components/HeaderComponent'
import ListEmployeeComponent from './Components/ListEmployeeComponent'
import Footer from './Components/FooterC'
import {BrowserRouter, Routes , Route} from 'react-router-dom'
import EmployeeComponent from './Components/EmployeeComponent'
import ListComponent from './Components/ListComponent'
import DepartmentComponent from './Components/DepartmentComponent'



function App() {
 

  return (
    <>
    <BrowserRouter>
      <HeaderComponent />
      <Routes>
        <Route path='/' element={<ListEmployeeComponent />} />
        <Route path='/employees' element={<ListEmployeeComponent />} />
        <Route path='/add-employee' element={<EmployeeComponent />} />
        <Route path='/update-employee/:id' element={<EmployeeComponent />} />
        <Route path='/departments' element={<ListComponent />} />
        <Route path='/add-department' element={<DepartmentComponent />} />
        <Route path='/edit-department/:id' element={<DepartmentComponent />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
