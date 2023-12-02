
import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import Home from '../Components/Home/Home';
import Category from '../Components/Pages/Category';
import Blog from '../Components/Pages/Blog';
import Login from '../Components/Authentication/Login';
import Register from '../Components/Authentication/Register';
import PrivateRaoutes from './PrivateRaoutes';
import DashBoard from '../Components/DashBoard/DashBoard';
import MainDashboard from '../Components/DashBoard/MainDashboard';
import Orders from '../Components/DashBoard/Orders';

const routes = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/category',
                element:<Category></Category>
            },
            {
                path:'/blog',
                element:<Blog></Blog>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/register',
                element:<Register></Register>
            },
            {
                path:'/dashboard',
                element:<PrivateRaoutes><DashBoard></DashBoard></PrivateRaoutes>,
                children:[
                    {
                        path:'/dashboard',
                        element:<MainDashboard></MainDashboard>
                    },
                    {
                        path:'/dashboard/orders',
                        element:<Orders></Orders>
                    }
                ]
            }

        ]
    },

]);
   


export default routes;