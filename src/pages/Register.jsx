import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'


const Register = () => {

  const [Inputs, setInputs] = useState({
    username:"",
    email:"",
    password:""
  })

  const [err, seterror] = useState(null)

  const navigate = useNavigate();

  const handleChange = e  =>{
    setInputs( prev => ({...prev, [e.target.name ]: e.target.value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post("/auth/register", Inputs)

      Swal.fire({
        title: 'Registro completado exitosamente!',
        text: 'Inicia Sesion Con tu Usuario Registrado',
        icon: 'success',
        confirmButtonText: 'Ok'
      })

      navigate('/login')
    } catch (err) {
      if (err.response.data == 'User alredy exists!') {
        Swal.fire({
          title: 'Registro ya existe!',
          text: 'Intenta nuevamente con otro usuario',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    }
  } 

  return (
    <div className='auth'>
    <h1>Register</h1>
    <form >
      <input name='username' required type="text" placeholder='User name' onChange={handleChange} />
      <input required name='email' type="email" placeholder='Email' onChange={handleChange} />
      <input required name='password' type="password" placeholder='Password' onChange={handleChange} />
      <button onClick={handleSubmit}>Register</button>
      
      <span>Do you have an acoount? <Link to="/login">Login</Link></span>
    </form>
  </div>
  )
}

export default Register