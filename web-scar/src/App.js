import './App.scss';
import PagPeli from './components/pagPeli/PagPeli';
import MisPelis from './components/pagPeli/MisPelis';
import Nav from './components/nav/Nav';
import Login from './components/login/Login';
import PrivateRoutes from './components/privateRoute/PrivateRoutes';
import DetallesPeli from './components/detallesPeli/DetallesPeli';
import Config from './components/config/Config';
import Registro from './components/registro/Registro'
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
            <Route path='/mis-pelis' element={<MisPelis />} />
            <Route path='/' element={<PagPeli />} />
            <Route path='/pelicula/:id' element={<DetallesPeli />} />
            <Route path='/config' element={<Config />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/registro' element={<Registro/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
