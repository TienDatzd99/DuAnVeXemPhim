import { useFormik } from 'formik'
import { values } from 'lodash'
import React from 'react'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { dangNhapAction } from '../../redux/actions/QuanLyNguoiDungAction';

export default function Login() {

  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: values => {
      const action = dangNhapAction(values);
      dispatch(action)
      console.log("ressulxt",values)
    },
  });
  return (

    <form onSubmit={(envent) => {
      envent.preventDefault();
      formik.handleSubmit(envent)
    }}>
      <h3>Login Here</h3>
      <label htmlFor="username">Username</label>
      <input type="text" placeholder="Email or Phone" id="username" name='taiKhoan' onChange={formik.handleChange} />
      <label htmlFor="password">Password</label>
      <input type="password" placeholder="Password" id="password" name='matKhau' onChange={formik.handleChange} />
      <div className='flex justify-end p-3 '>
        <p className='mr-1'>Bạn chưa có tài khoản? </p>

        <NavLink to={'/register'} className='text-blue-500'> Sign Up</NavLink>

      </div>
      <button className='mt-1'>Log In</button>
      <div className="social">
        <div className="go"><i className="fab fa-google" />  Google</div>
        <div className="fb"><i className="fab fa-facebook" />  Facebook</div>
      </div>
    </form>

  )
}
