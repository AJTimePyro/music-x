import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import HomeBody from './components/pageComponent/homeContent';
import './css/index.css';
import SearchComponent from './components/pageComponent/searchContent';
import ArtistPageComponent from './components/pageComponent/artistContent';

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
          element : <SearchComponent/>
        },
        {
          path : '/artist',
          children : [
            {
              path : '',
              element : <Navigate to="/"/>
            },
            {
              path : ':artistID',
              element : <ArtistPageComponent/>
            }
          ]
        },
        {
          path : '*',
          element : <Navigate to="/"/>
        }
      ]
    },
  ]
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

