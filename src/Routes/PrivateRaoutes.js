import React, { useContext } from 'react';
import { authProvider } from '../Context/AuthContext';
import Loading from '../Components/Shared/Loading';
import { Navigate } from 'react-router-dom';

const PrivateRaoutes = ({children}) => {
    const {loader, user} = useContext(authProvider);

    if(loader){
        return <Loading></Loading>
    }
    if(!user?.uid){
        return <Navigate to='/login' replace ></Navigate>
    }
    return children
};

export default PrivateRaoutes;