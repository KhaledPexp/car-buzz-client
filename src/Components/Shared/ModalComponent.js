import React, { useContext, useState } from 'react';
import { authProvider } from '../../Context/AuthContext';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import "./modal.css"


const ModalComponent = ({car, setModal, modal}) => {
    const nevigate = useNavigate()
    const {carDetails, image, name, originalP, resellP, used, _id} = car;
    const {user, darkTheme} = useContext(authProvider)
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
        fetch('https://car-buzz-srv.vercel.app/booking',{
            method:'POST',
            headers:{
                'content-type': 'application/json',
                authentication: `bearer ${localStorage.getItem('goldTocken')}`
            },
            body:JSON.stringify(bookinginfo)
        })
        .then(res => res.json())
        .then(result => {
            
            const {message} = result;
            if(result){
                if(result.message){
                    toast.error(message)
                }
                else{
                toast.success('Your Booking was Successful')
                setModal(false);
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
        
        <>
        <input type="checkbox" id="carBookModal" className=" hidden" />
        <div className='flex justify-center items-center w-full'>
            <div className={modal? 'flex justify-center w-full z-40 ':'hidden' }id='carBookModal'>
                <div className="w-1/3 h-auto bg-white px-5 pb-5 rounded absolute top-1/2 z-50 " >
                    <div className='w-full flex justify-end items-center mb-5'>
                    <button id='carBookModal' onClick={modalsetfun} className= {darkTheme?'text-black':'text-center mt-5'}>X</button>
                    </div>
                    <h3 className={darkTheme?"text-black text-2xl":"font-bold text-2xl"}>{carDetails}</h3>
                    <div className='flex justify-between'>
                        <p className="text-lg my-4 font-semibold text-primary">Resale Price: ${resellP}</p>
                        <p className="text-lg my-4 font-semibold">Original Price: ${originalP}</p>
                    </div>

                    <form onSubmit={handleSubmit(handleBooking)}>
                        <input type="text" defaultValue={user?.displayName || `${user?.email}`} placeholder="Type here" className="input input-bordered w-full" disabled />
                        <input type="text"  defaultValue={user?.email} placeholder="Type here" className="input input-bordered w-full mt-4" disabled />
                        <input type="number" {...register('phone', {required:true})} name='phone' placeholder="You Phone Number" className="input input-bordered w-full mt-4" />
                        <input type="text" {...register('location', {required:true})} name='location' placeholder="Meeting Location" className="input input-bordered w-full mt-4" />
                        
                        <input type="submit" value="Submit" className='w-full py-3 font-semibold uppercase rounded hover:bg-[#5ebed6] hover:cursor-pointer text-white bg-[#00a5d0] mt-6' />
                    </form>
                    
                </div>
            </div>
            
        </div>
        
        </>
        
    
    );
};

export default ModalComponent;