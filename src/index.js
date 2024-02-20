import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import {store} from "./redux/store";
import {Provider} from "react-redux";
import './styles/globals.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    errorElement: <NotFound/>,
  },
  {
    path: '/cart',
    element: <Cart/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <div className='Wrapper'>
      <div className='Container'>
        <RouterProvider router={router}/>
      </div>
    </div>
  </Provider>
);
