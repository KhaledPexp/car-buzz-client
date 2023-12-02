import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { authProvider } from '../../Context/AuthContext';
import toast from 'react-hot-toast';
import Loading from '../Shared/Loading';
import { Link, Outlet } from 'react-router-dom';

const DashBoard = () => {
    const {user}=useContext(authProvider);

    const {data, isLoading, refetch } = useQuery({
        queryKey:['user'],
        queryFn: async()=>{
            try{
                const res = await fetch(`http://localhost:8080/singleuser?email=${user?.email}`,{
                    headers:{
                        authentication:`bearer ${localStorage.getItem('goldTocken')}` 
                    }
                });
                const result = await res.json();
                return result;
            }
            catch{
                 toast.error('Something went wrong!')
            } 
        }
    });
    
    const userData = data;
    console.log(userData);
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div className='mx-24 h-screen flex'>
            <aside className='w-1/3 border-2'>
               <div className='flex justify-center mt-10'>
                    <div className='leading-8'>
                        <img className='rounded-full w-20 p-0 border-4 ml-4 border-blue-300' src={userData?.profilePic} alt="" />
                        <h2 className='my-4'>{userData?.name}</h2>
                        <button className=' text-white py-1 px-8 mb-5 rounded bg-[#00a5d0]'>{userData?.accountType}</button>
                    </div>
               </div>
                <hr />
                <div className='text-center mt-5'>
                    {
                        userData?.accountType === 'Buyer' && <><Link to='/dashboard/orders' className=' text-white py-1 px-8 mb-5 rounded bg-[#00a5d0]'>Orders</Link></>
                    }
                </div>
            </aside>
            <article className='w-full'>
                <div className='w-full p-5 text-4xl font-bold bg-[#00a5d0] text-white text-center mb-5'>Welcome to Your Dashboard {userData.name}</div>
                <Outlet></Outlet>
            </article>
        </div>
    );
};

export default DashBoard;