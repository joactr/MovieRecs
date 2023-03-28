import './App.scss';
import PagPeli from './components/pagPeli/PagPeli';
import Nav from './components/nav/Nav';
import { createBrowserRouter, Route, Router, BrowserRouter, RouterProvider, Routes } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div><Nav/><label>Película test</label></div>,
  },
  {
    path: "/peli",
    element: <div><Nav/><PagPeli/></div>,
  },
]);

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
          <Route path='/' element={<label>Película test</label>} />
          <Route path='/mis-pelis' element={<PagPeli/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
