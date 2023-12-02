import React from 'react';
import toast from 'react-hot-toast';
import Loading from '../Shared/Loading';
import { useQuery } from 'react-query';

const Orders = () => {

    const {data, isLoading, refetch} = useQuery({
        queryKey:['carsData'],
        queryFn:async()=>{
            try{
                const res = await fetch('http://localhost:8080/orders',{
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
    },)
    
    if(isLoading){
        return <Loading></Loading>
    }

    return (
        <div>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Car Model</th>
        <th>Price</th>
        <th>Meeting Location</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        <td>{data.carModel}</td>
        <td>${data.price}</td>
        <td>{data.meetingLocation}</td>
        <td><button>Delete</button></td>
      </tr>
    
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default Orders;