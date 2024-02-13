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
                const res = await fetch(`https://car-buzz-srv.vercel.app/singleuser?email=${user?.email}`,{
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
    
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div className='mx-24 h-screen flex mt-10 max-md:block max-sm:mx-5'>
            <aside className='w-1/3 border-2 max-sm:block max-md:flex max-md:w-full max-md:items-center max-md:justify-between max-md:p-5'>
               <div className='flex justify-center mt-10 '>
                    <div className='leading-8'>
                        <img className='rounded-full w-20 p-0 border-4 ml-4 max-md:mr-5 border-blue-300 max-md:inline-block' src={userData?.profilePic} alt="" />
                        <h2 className='my-4 max-md:inline-block max-md:mr-5'>{userData?.name}</h2>
                        <button className='max-md:inline-block text-white py-1 px-8 mb-5 max-md:mr-10 rounded bg-[#00a5d0]'>{userData?.accountType}</button>
                    </div>
               </div>
                <hr className='max-md:hidden' />
                <div className='text-center mt-5'>
                    {
                        userData?.accountType === 'Buyer' && <><Link to='/dashboard/orders' className=' text-white py-1 px-8 mb-5 rounded bg-[#00a5d0]'>Orders</Link></>
                    }
                    {
                        userData?.accountType === 'Seller' && <><Link to='/newPost' className=' text-white py-1 px-8 mb-5 rounded bg-[#00a5d0]'>Create New Post</Link></>
                    }
                    {
                        userData?.accountType === 'Admin' && <><Link to='/dashboard/AllUsers' className=' text-white py-1 px-8 mb-5 rounded bg-[#00a5d0]'>Users</Link></>
                    }
                </div>
            </aside>
            <article className='w-full mb-10'>
                <div className='w-full p-5 text-4xl font-bold bg-[#00a5d0] text-white text-center mb-5'>Welcome to Your Dashboard {userData?.name}</div>
                <Outlet></Outlet>
            </article>
        </div>
    );
};

export default DashBoard;