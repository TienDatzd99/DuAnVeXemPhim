import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeTemplate from './templates/HomeTemplate/HOmeTemplate';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import News from './pages/News/News';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomeTemplate Component={Home} />}> </Route>
        <Route path='/contact' element={<HomeTemplate Component={Contact} />}> </Route>
        <Route path='/news' element={<HomeTemplate Component={News} />}> </Route>
        <Route path='/login' Component={Login} > </Route>
        <Route path='/register' Component={Register}> </Route>
      </Routes>
    </Router>

  );
}

export default App;
