import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';


//Hook đa ngôn ngữ
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { TOKEN, USER_LOGIN } from '../../../../util/settings/config';

const { Option } = Select;

export default function Header() {

  const nagivate = useNavigate()

  const { Option } = Select;

  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

  console.log('userLogin', userLogin);
  const { t, i18n } = useTranslation();


  const handleChange = (value) => {
    i18n.changeLanguage(value)
  }


  const renderLogin = () => {
    if (_.isEmpty(userLogin)) {
      return <Fragment>
        <button onClick={() => {
          nagivate('/login')
        }} className="self-center px-8 py-3 rounded">{t('signin')}</button>
        <button onClick={() => {
          nagivate('/register')
        }} className="self-center px-8 py-3 font-semibold rounded bg-violet-600 text-coolGray-50">{t('register')}</button>

      </Fragment>
    }
    return <Fragment> <button onClick={() => {
      nagivate('/profile')
    }} className="self-center px-8 py-3 rounded">Hello ! {userLogin.hoTen}</button>
      <button onClick={() => {
        localStorage.removeItem(USER_LOGIN);
        localStorage.removeItem(TOKEN);
        nagivate('/home');
        window.location.reload();
      }} className="text-yellow-500 mr-5">Đăng xuất</button>
    </Fragment>
  }


  // Hàm để áp dụng lớp CSS tùy thuộc vào trạng thái của NavLink
  return (
    <header className="p-4 bg-coolGray-100 text-coolGray-800 bg-opacity-40 bg-black text-white fixed w-full z-10" >
        <div className="container flex justify-between h-16 mx-auto">
            <NavLink to="/" aria-label="Back to homepage" className="flex items-center p-2">
            <img
               src="/logoPhim.png"
          alt="logo"
          className="h-32"

        />
            </NavLink>
            <ul className="items-stretch hidden space-x-3 lg:flex">
                <li className="flex">
                    <NavLink to="/home" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-violet-600 border-violet-600 text-white" activeClassName="border-b-2 border-white">Home</NavLink>
                </li>
                <li className="flex">
                    <NavLink to="/contact" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white" activeClassName="border-b-2 border-white">Contact</NavLink>
                </li>
                <li className="flex">
                    <NavLink to="/news" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white" activeClassName="border-b-2 border-white">News</NavLink>
                </li>

            </ul>
            <div className="items-center flex-shrink-0 hidden lg:flex">

                {renderLogin()}




                <Select defaultValue="en" style={{ width: 100 }} onChange={handleChange}>
                    <Option value="en">Eng</Option>
                    <Option value="chi">Chi</Option>

                    <Option value="vi">Vi</Option>
                </Select>

            </div>
            <button className="p-4 lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-coolGray-800">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>


            {/* {t('hello.2')} */}
        </div>
    </header>
  );
}
