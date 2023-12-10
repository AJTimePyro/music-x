import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
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
          path : '/artist/:artistID',
          element : <ArtistPageComponent/>
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

