import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeTemplate from './templates/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import News from './pages/News/News';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Detail from './pages/Detail/Detail';
import Checkout from './pages/Checkout/Checkout';
import { Suspense, lazy } from 'react';
import UserTemplate from './templates/UserTemplate/UserTemplate';

// Lazy load for CheckoutTemplate
const CheckoutTemplateLazy = lazy(() => import('./templates/CheckoutTemplate/CheckoutTemplate'));

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomeTemplate Component={Home} />} />
        <Route path='/contact' element={<HomeTemplate Component={Contact} />} />
        <Route path='/detail/:id' element={<HomeTemplate Component={Detail} />} />
        <Route path='/news' element={<HomeTemplate Component={News} />} />
        <Route path='/login' element={<UserTemplate Component={Login} />} />
        <Route path='/register' element={<UserTemplate Component={Register} />} />

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
