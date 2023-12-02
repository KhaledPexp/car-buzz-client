import { RouterProvider } from 'react-router-dom';
import './App.css';
import routes from './Routes/routes';
import { Toaster } from 'react-hot-toast';
import { useContext } from 'react';
import { authProvider } from './Context/AuthContext';


function App() {
  const {darkTheme} = useContext(authProvider);
  return (
    <div data-theme={darkTheme? 'dark':''} className={darkTheme && 'text-white'}>
        <RouterProvider router={routes}></RouterProvider>
        <Toaster></Toaster>
    </div>
  );
}

export default App;
