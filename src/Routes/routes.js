
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
import Payments from '../Components/Payment/Payments';
import AllUsers from '../Components/DashBoard/AllUsers';
import AvailableCar from '../Components/AvailableCar/AvailableCar';
import ErrorPage from '../Components/ErrorPage/ErrorPage';

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
                path:'/available',
                element:<AvailableCar></AvailableCar>
            },
            {
                path:'/newPost',
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
                        element:<Orders></Orders>,
                        
                    },
                    {
                        path:'/dashboard/AllUsers',
                        element:<AllUsers></AllUsers>,
                        
                    },
                    {
                        path:'/dashboard/checkout/:id',
                        element:<Payments></Payments>,
                        loader: ({params})=> fetch(`https://car-buzz-srv.vercel.app/product/${params.id}`)
                        
                    }
                ]
            }

        ]
    },
    {
        path:'*',
        element:<ErrorPage></ErrorPage>
    }
]);
   


export default routes;