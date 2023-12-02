import React from 'react';
import { useLoaderData } from 'react-router-dom';
import SingleUser from './SingleUser';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';

const AllUsers = () => {
    // const data = useLoaderData();

    const {data, isLoading, refetch} = useQuery({
        queryKey:['users'],
        queryFn: async()=>{
            const user = await fetch('http://localhost:8080/allusers')
            const result = await user.json();
            return result;
        }
    })
    console.log(data);
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div className='overflow-auto'>
            <table className="table">
            {/* head */}
            <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>User Type</th>
                <th>Action</th>
                
            </tr>
            </thead>
            <tbody>
                {
                    data?.map(user => <SingleUser
                        user={user}
                        refetch={refetch}
                        key={user._id}
                        
                    ></SingleUser>)
                }
            
            
            </tbody>
        </table>
            
        </div>
    );
};

export default AllUsers;