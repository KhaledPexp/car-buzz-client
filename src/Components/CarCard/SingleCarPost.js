import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authProvider } from '../../Context/AuthContext';
import ModalComponent from '../Shared/ModalComponent';

const SingleCarPost = ({car, setCarID, carId, setModal}) => {
    const navigate = useNavigate();

    const {user} = useContext(authProvider);
    const {carDetails, image, name, originalP, resellP, used, _id} = car;
    
    const carSelectFun = (car)=>{
        setModal();
        if(user){
            
            return setCarID(car)
            
        }
        navigate('/login', {replace:true})
    }
    return (
        <div>
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <div className="card-body">
                
                <h2 className="card-title">{carDetails}</h2>
                <p>{name}</p>
                <p>Resale Price : ${resellP}</p>
                <p>Original Price : ${originalP}</p>
                <div className="card-actions justify-center w-full">
                <label htmlFor='carBookModal'  onClick={()=>carSelectFun(car)} className="btn bg-[#00a5d0] mt-5 hover:bg-[#51bad4] text-white shadow-sm border-none w-full">Book Now</label>
                
                </div> 
                
            </div>
            
            </div>
        </div>
    );
};

export default SingleCarPost;