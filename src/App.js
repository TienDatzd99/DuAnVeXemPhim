import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeTemplate from './templates/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import News from './pages/News/News';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Detail from './pages/Detail/Detail';
import Checkout from './pages/Checkout/Checkout';
import { Component, Suspense, lazy } from 'react';
import UserTemplate from './templates/UserTemplate/UserTemplate';
import Loading from './components/Loading/Loading';
import AdminTemplate from './templates/AdminTemplate/AdminTemplate';
import Films from './pages/Admin/Films/Films';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import ShowTime from './pages/Admin/Showtime/ShowTime';
import AddNew from './pages/Admin/Films/AddNew/AddNew';
import Edit from './pages/Admin/Films/Edit/Edit';

// Lazy load for CheckoutTemplate
const CheckoutTemplateLazy = lazy(() => import('./templates/CheckoutTemplate/CheckoutTemplate'));

function App() {
  return (
    <Router>
      <Loading />
      <Routes>
        <Route path='/' element={<HomeTemplate Component={Home} />} />
        <Route path='/home' element={<HomeTemplate Component={Home} />} />
        <Route path='/contact' element={<HomeTemplate Component={Contact} />} />
        <Route path='/detail/:id' element={<HomeTemplate Component={Detail} />} />
        <Route path='/news' element={<HomeTemplate Component={News} />} />
        <Route path='/login' element={<UserTemplate Component={Login} />} />
        <Route path='/register' element={<UserTemplate Component={Register} />} />
        <Route path='/profile' element={<UserTemplate Component={Register} />} />
        <Route path='/admin' element={<AdminTemplate Component={Dashboard} />} />
        <Route path='/admin/Films' element={<AdminTemplate Component={Films} />} />
        <Route path='/admin/Films/edit/:id' element={<AdminTemplate Component={Edit} />} />

        <Route path='/admin/Films/addnew' element={<AdminTemplate Component={AddNew} />} />
        <Route path='/admin/users' element={<AdminTemplate Component={Dashboard} />} />
        <Route path='/admin/Films/ShowTime/:id/:tenphim' element={<AdminTemplate Component={ShowTime} />} />

        <Route path='/admin/Films/ShowTime' element={<AdminTemplate Component={ShowTime} />} />


        {/* Lazy loading with Suspense */}
        <Route
          path='/checkout/:id'
          element={
            <Suspense fallback={<h1>LOADING...</h1>}>
              <CheckoutTemplateLazy Component={Checkout} />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
