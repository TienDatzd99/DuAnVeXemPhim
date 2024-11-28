// src/pages/Login/Login.js
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import { dangNhapAction } from '../../redux/actions/QuanLyNguoiDungAction';
import * as Yup from 'yup';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { userLogin, thongTinNguoiDung, error } = useSelector(state => state.QuanLyNguoiDungReducer);

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string().required('Vui lòng nhập tài khoản'),
      matKhau: Yup.string().required('Vui lòng nhập mật khẩu'),
    }),
    onSubmit: values => {
      dispatch(dangNhapAction(values));
      console.log("Giá trị form:", values);
      // Điều hướng sẽ được xử lý trong useEffect
    },
  });

  useEffect(() => {
    if (userLogin && userLogin.accessToken && thongTinNguoiDung) {
      // Kiểm tra trang trước đó có phải trang đăng ký không
      if (location.state?.from === '/register' || location.pathname === '/register') {
        navigate('/'); // Nếu là trang đăng ký thì điều hướng về home
      } else {
        navigate('/home'); // Điều hướng đến trang Home sau khi đăng nhập thành công và lấy thông tin người dùng
      }
    }
  }, [userLogin, thongTinNguoiDung, navigate, location]);

  return (
    <form className='formSign' onSubmit={formik.handleSubmit}>
      <h3>Login Here</h3>
      
      {/* Hiển thị thông báo lỗi nếu có */}
      {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

      <label className='labelSign' htmlFor="username">Username</label>
      <input 
        className='inputSign'
        type="text"
        placeholder="Input Account"
        id="username"
        name='taiKhoan'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.taiKhoan}
      />
      {formik.touched.taiKhoan && formik.errors.taiKhoan ? (
        <div className="error" style={{ color: 'red' }}>{formik.errors.taiKhoan}</div>
      ) : null}

      <label className='labelSign' htmlFor="password">Password</label>
      <input 
        className='inputSign'
        type="password"
        placeholder="Password"
        id="password"
        name='matKhau'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.matKhau}
      />
      {formik.touched.matKhau && formik.errors.matKhau ? (
        <div className="error" style={{ color: 'red' }}>{formik.errors.matKhau}</div>
      ) : null}

      <div className='flex justify-end p-3'>
        <p className='mr-1'>Bạn chưa có tài khoản? </p>
        <NavLink to='/register' className='text-blue-500'>Sign Up</NavLink>
      </div>

      <button type='submit' className='mt-1 buttonUser'>Log In</button>

      <div className="social">
        <div className="go"><i className="fab fa-google" /> Google</div>
        <div className="fb"><i className="fab fa-facebook" /> Facebook</div>
      </div>
    </form>
  );
}