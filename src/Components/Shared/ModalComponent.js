import React, { useContext, useState } from 'react';
import { authProvider } from '../../Context/AuthContext';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ModalComponent = ({car, setModal, modal}) => {
    const nevigate = useNavigate()
    const {carDetails, image, name, originalP, resellP, used, _id} = car;
    const {user} = useContext(authProvider)
    const {register, handleSubmit, formState: { errors }, reset}  = useForm();

    const handleBooking = (data) => {
        reset();
        const bookinginfo = {
            carModel: carDetails,
            price: resellP,
            name:user.displayName,
            email: user.email,
            phone: data.phone,
            meetingLocation: data.location,
            carId: _id,
        }
        fetch('http://localhost:8080/booking',{
            method:'POST',
            headers:{
                'content-type': 'application/json',
                authentication: `bearer ${localStorage.getItem('goldTocken')}`
            },
            body:JSON.stringify(bookinginfo)
        })
        .then(res => res.json())
        .then(result => {
            console.log(result);
            const {message} = result;
            if(result){
                if(result.message){
                    toast.error(message)
                }
                else{
                toast.success('Your Booking was Successful')
                }
            }
        })
        .catch(e => {
            toast.error(e.message)
        })
    }
    const modalsetfun = ()=>{
        setModal(false)
    }

    return (
        <div className='z-20 relative w-screen h-screen'>
        <input type="checkbox" id="carBookModal" className=" hidden" />
        
        <div className={modal? 'block relative ':'hidden' }id='carBookModal' >
            <div className='flex justify-center items-center'>
            <div className="modal-box absolute z-50 top-0 left-0 w-screen" >
                <h3 className="font-bold text-2xl">{carDetails}</h3>
                <div className='flex justify-between'>
                    <p className="text-lg my-4 font-semibold text-primary">Resale Price: ${resellP}</p>
                    <p className="text-lg my-4 font-semibold">Original Price: ${originalP}</p>
                </div>

                <form onSubmit={handleSubmit(handleBooking)}>
                    <input type="text" defaultValue={user?.displayName} placeholder="Type here" className="input input-bordered w-full" disabled />
                    <input type="text"  defaultValue={user?.email} placeholder="Type here" className="input input-bordered w-full mt-4" disabled />
                    <input type="number" {...register('phone', {required:true})} name='phone' placeholder="You Phone Number" className="input input-bordered w-full mt-4" />
                    <input type="text" {...register('location', {required:true})} name='location' placeholder="Meeting Location" className="input input-bordered w-full mt-4" />
                    
                    <input type="submit" value="Submit" className='w-full btn mt-6' />
                </form>
                <button id='carBookModal' onClick={modalsetfun} className='text-black'>close</button>
            </div>
            </div>
            
        </div>
        
    </div>
    );
};

export default ModalComponent;