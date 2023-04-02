import './App.scss';
import PagPeli from './components/pagPeli/PagPeli';
import Nav from './components/nav/Nav';
import Login from './components/login/Login';
import PrivateRoutes from './components/privateRoute/PrivateRoutes';
import { createBrowserRouter, Route, Router, BrowserRouter, RouterProvider, Routes } from "react-router-dom";


function App() {
  /*return (
    <div>
      <RouterProvider router={router} />
      
    </div>
  );*/

  return (
    <div>
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route element={<PrivateRoutes/>}>
            <Route path='/' element={<label>Película test</label>} />
            <Route path='/mis-pelis' element={<PagPeli />} />
          </Route>
          <Route path='/login' element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
