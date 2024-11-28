// src/pages/Register/Register.js

import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { dangKyAction } from '../../redux/actions/QuanLyNguoiDungAction';
import { use } from 'i18next';

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dangKySuccess, dangKyError } = useSelector(state => state.QuanLyNguoiDungReducer);
  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
      email: '',
      soDt: '',
      maNhom: '',
      hoTen: '',
      agreeTerm: false, // Thêm trường này để quản lý checkbox
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string()
        .required('Username is required'),
      matKhau: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      soDt: Yup.string()
        .matches(/^[0-9]+$/, 'Phone number must be numeric')
        .required('Phone number is required'),
      maNhom: Yup.string()
        .required('Group code is required'),
      hoTen: Yup.string()
        .required('Full name is required'),
    }),
    onSubmit: values => {
      // Handle form submission
      console.log(values);
      dispatch(dangKyAction(values));
      // Bạn có thể dispatch action hoặc gọi API đăng ký tại đây
    },
  });
  useEffect(() => {
    if (dangKySuccess) {
      // Nếu đăng ký thành công, chuyển hướng về trang login
      navigate('/login');
    }
    // Bạn có thể xử lý lỗi đăng ký ở đây nếu cần
    if (dangKyError) {
      // Ví dụ: hiển thị thông báo lỗi
      console.error('Lỗi đăng ký:', dangKyError);
    }
  }, [dangKySuccess, dangKyError, navigate]);

  return (
    <div className="register-container main">
      <div className="container">
        <form onSubmit={formik.handleSubmit} className="appointment-form" id="appointment-form">
          <h2>Sign Up</h2>
          <div className="form-group-1">
            <input
              type="text"
              name="taiKhoan"
              id="taiKhoan"
              placeholder="Username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.taiKhoan}
              required
            />
            {formik.touched.taiKhoan && formik.errors.taiKhoan ? (
              <div className="error">{formik.errors.taiKhoan}</div>
            ) : null}

            <input
              type="password"
              name="matKhau"
              id="matKhau"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.matKhau}
              required
            />
            {formik.touched.matKhau && formik.errors.matKhau ? (
              <div className="error">{formik.errors.matKhau}</div>
            ) : null}

            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              required
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}

            <input
              type="text"
              name="soDt"
              id="soDt"
              placeholder="Phone Number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.soDt}
              required
            />
            {formik.touched.soDt && formik.errors.soDt ? (
              <div className="error">{formik.errors.soDt}</div>
            ) : null}

            <input
              type="text"
              name="maNhom"
              id="maNhom"
              placeholder="Group Code"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.maNhom}
              required
            />
            {formik.touched.maNhom && formik.errors.maNhom ? (
              <div className="error">{formik.errors.maNhom}</div>
            ) : null}

            <input
              type="text"
              name="hoTen"
              id="hoTen"
              placeholder="Full Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.hoTen}
              required
            />
            {formik.touched.hoTen && formik.errors.hoTen ? (
              <div className="error">{formik.errors.hoTen}</div>
            ) : null}
          </div>

          <div className="form-check">
            <input
              type="checkbox"
              name="agreeTerm"
              id="agree-term"
              className="agree-term"
              onChange={formik.handleChange}
              checked={formik.values.agreeTerm}
            />
            <label htmlFor="agree-term" className="label-agree-term">
              <span><span /></span>I agree to the <a href="#" className="term-service">Terms and Conditions</a>
            </label>
          </div>

          <div className="form-submit">
            <button type="submit" className="submit" disabled={!formik.values.agreeTerm}>
              Register
            </button>
          </div>

          <div className="social">
            <div className="go"><i className="fab fa-google" /> Google</div>
            <div className="fb"><i className="fab fa-facebook" /> Facebook</div>
          </div>

          <div className='flex justify-end p-2'>
            <NavLink to={'/login'} className='text-blue-500'>Login</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}