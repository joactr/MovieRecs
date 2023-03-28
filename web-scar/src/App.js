import './App.scss';
import PagPeli from './components/pagPeli/PagPeli';
import Nav from './components/nav/Nav';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";

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
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
