import React, { useEffect } from 'react'
import { Navigate, Route,Routes } from 'react-router-dom'
import Login from '../Pages/User/NavLogin'
import Signup from '../Pages/User/NavSignup'
import Homepage from '../Pages/User/NavHome'
import Profile from '../Pages/User/Navprofile'
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import { addUser } from '../components/Redux/userSlice'
export default function UserRoutes() {
  const dispatch =useDispatch()

  const checkIfUser =async(token)=>{
    try {
      const response=await axios.get(`http://localhost:5000/checkIfUser`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      dispatch(
        addUser({
          id: response.data.data.id,
          name: response.data.data.name,
          token:response.data.data.token
        })
      );
      
    } catch (error) {
      console.log(error.message);
      
    }

  }

  useEffect(()=>{
    let token = localStorage.getItem('token')
    console.log(token);
    token && checkIfUser(token)

  },[])
  const user = useSelector(store=>store.user.userD)
  console.log(user,"jjjjjjjjjjjjjjjj");
  return (
    <div>
      <Routes>
        <Route path='/'element={<Homepage />} />
        <Route path='/login' element={user.token?<Navigate to='/'/>:<Login />} />
        <Route path='/signup'element={user.token?<Navigate to='/'/>:<Signup />}/>
        <Route path='/profile'element={user.token?<Profile/>:<Navigate to='/login'/>} />
      </Routes>
    </div>
  )
}
