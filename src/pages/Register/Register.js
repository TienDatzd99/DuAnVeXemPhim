import { useFormik } from 'formik'
import { values } from 'lodash'
import React from 'react'
import { NavLink } from 'react-router-dom';

export default function Register() {

  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matkhau: '',
    },
    onSubmit: values => {

    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <h3>Register</h3>
        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Email or Phone" id="username" name='taiKhoan' onChange={formik.handleChange} />
        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password" name='matKhau' onChange={formik.handleChange}/>
        <div  className='flex justify-end p-2 '>
            <NavLink to={'/login'} className='text-blue-500'> Login</NavLink>
           
        </div>
        <button className='mt-1'>Register</button>
        <div className="social">
          <div className="go"><i className="fab fa-google" />  Google</div>
          <div className="fb"><i className="fab fa-facebook" />  Facebook</div>
        </div>
      </form>
    </div>
  )
}
