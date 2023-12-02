import React from 'react';
import toast from 'react-hot-toast';
import Loading from '../Shared/Loading';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

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
              
            }
                 
            
        }
    },)
    const handleDelete = (id) =>{
      fetch(`http://localhost:8080/removeOrder/${id}`,{
          method:'DELETE',
          headers: {
              authentication: `bearer ${localStorage.getItem('goldTocken')}`
          },
          
      })
      .then(res => res.json())
      .then(result => {
          if(result.deletedCount > 0){
              toast.success('Successfully Deleted')
              refetch();
          }
      })
      .catch(e => console.error(e))
      
  }
    if(isLoading){
        return <Loading></Loading>
    }

    return (
        <div >
            <div className=" overflow-x-auto overflow-auto">
              <table className='table mb-10' >
                {/* head */}
                <thead>
                  <tr>
                    <th>Car Model</th>
                    <th>Price</th>
                    <th>Meeting Location</th>
                    <th>Action</th>
                    <th>Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {data && 
                  <tr>
                    <td>{data?.carModel}</td>
                    <td>${data?.price}</td>
                    <td>{data?.meetingLocation}</td>
                    <td><button onClick={()=> handleDelete(data?._id)} className='hover:text-red-400'>Delete</button></td>
                    <td><Link to={`/dashboard/checkout/${data?._id}`}><button className='hover:text-blue-300'>Pay</button></Link></td>
                  </tr>
                }
                  
                </tbody>
              </table>
            </div>
        </div>
    );
};

export default Orders;