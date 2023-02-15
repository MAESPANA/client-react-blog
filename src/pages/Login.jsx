import React ,{useContext, useState}from 'react'
import { Link,useNavigate } from 'react-router-dom'

import Swal from 'sweetalert2'
import { AuthContext } from '../context/authContext'

const Login = () => {

  const [inputs, setInputs] = useState({
    username:"",
    password:""
  })

  //const [err, seterror] = useState(null)

  const navigate = useNavigate();

  //use el authcontext
  const {login} = useContext(AuthContext)

  console.log()

  const handleChange = e  =>{
    setInputs( prev => ({...prev, [e.target.name ]: e.target.value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      //usando el contextAPi
      await login(inputs)
      navigate('/')
    } catch (err) {
      if (err.response.data === 'User not found!') {
        Swal.fire({
          title: 'El usuario no fue encontrado!',
          text: 'Intenta nuevamente con otro usuario',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
      //Wrong username or password!

      if (err.response.data === 'Wrong username or password!') {
        Swal.fire({
          title: 'La contrasena es incorrecta!',
          text: 'Intenta nuevamente ',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    }
  } 

  return (
    <div className='auth'>
      <h1>Login</h1>
      <form >
        <input name='username' required type="text" placeholder='User name' onChange={handleChange} />
        <input name='password' required type="password" placeholder='Password' onChange={handleChange} />
        <button onClick={handleSubmit}>Login</button>
       
        <span>Don't you have an acoount? 
          {/* <Link to="/register">Register</Link> */}
          <br />
         <Link to="/">Volver al blog</Link></span>
      </form>
    </div>
  )
}

export default Login