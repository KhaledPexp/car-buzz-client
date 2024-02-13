import React from 'react';
import toast from 'react-hot-toast';

const SingleUser = ({user, refetch }) => {
const {name, email, accountType, _id} = user;


const handleDelete = () =>{
    fetch(`https://car-buzz-srv.vercel.app/revmoveUser/${_id}`,{
        method:'DELETE',
        headers: {
            authentication: `bearer ${localStorage.getItem('goldTocken')}`
        },
        
    })
    .then(res => res.json())
    .then(result => {
        if(result.deletedCount >0){
            toast.success('User Successfully Deleted')
            refetch();
        }
    })
    .catch(e => console.error(e))
    
}
    return (
        <>

            {user && 
            <tr>
                <td>{name}</td>
                <td>{email}</td>
                <td>{accountType}</td>
                <td><button onClick={handleDelete} disabled={accountType === 'Admin'} className={accountType === 'Admin'?'':'hover:text-red-400'}>{!(accountType === 'Admin')&& 'Delete'}</button></td>
                
            </tr>
            }
            
    </>
        
    );
};

export default SingleUser;