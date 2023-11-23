import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomeBody from './components/pageComponent/homeContent';
import './css/index.css';
import SearchComponent from './components/pageComponent/searchContent';

const router = createBrowserRouter(
  [
    {
      path : '/',
      element : <App/>,
      children : [
        {
          path : '',
          element : <HomeBody/>
        },
        {
          path : '/search',
          element : <SearchComponent />
        }
      ]
    }
  ]
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

