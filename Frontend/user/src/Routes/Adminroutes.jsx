import React from 'react'
import Navadminlog from '../Pages/Admin/Navadminlog'
import Navdashboard from '../Pages/Admin/Navdashboard'
import Navuserlist from '../Pages/Admin/Navuserlist'
import Navadduser from '../Pages/Admin/Navadduser'
import { Routes,Route, } from 'react-router-dom'
export default function Adminroutes() {
  return (
    <div>
      <Routes>
        <Route path='/login'element={<Navadminlog />} />
        <Route path='/dashboard'element={< Navdashboard/>} />
        <Route path='/userlist'element={<Navuserlist/>} />
        <Route path='/adduser'element={<Navadduser />}/>
      </Routes>
    </div>
  )
}
