import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';


const Category = () => {
    const {register, handleSubmit, formState: { errors }}  = useForm();

    const ApiKey = process.env.REACT_APP_ApiKey;

    const addCar = (data, e) =>{
        
        const image = data.carPhoto[0];
        const formData = new FormData();
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${ApiKey}`
        fetch(url, {
            method:'POST',
            body: formData
        })
        .then(result => result.json())
        .then(imgData => {
            
            if(imgData.success){
                const usedCar ={
                    carDetails: data.carDetails,
                    used: data.usedYears,
                    name: data.ownerName,
                    originalP: data.orgPrice,
                    resellP: data.resellPrice,
                    image: imgData.data.url,
                    location: data.location,
                    email: data.email,
                    brand: data.brandName,
                }
                fetch('https://car-buzz-srv.vercel.app/carDetails',{
                    method:'POST',
                    headers:{
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(usedCar)
                })
                .then(result => result.json())
                .then(data => {
                    if(data.acknowledged){
                        toast.success('Your car added successfully')
                        e.target.reset();
                        
                    }
                })
            }
        })
    }

    return (
        <div className='mx-24 flex justify-center'>
            
            <form onSubmit={handleSubmit(addCar)} className='leading-10 text-left'>
                <label className='block'>
                    <p>Type your car name and Model</p>
                    <input {...register('carDetails', { required: true })} type="text" placeholder="Type your car details" className="input input-bordered input-info w-full max-w-xs" />
                </label>
                <label className='block'>
                    <p>Used Years</p>
                    <input {...register('usedYears', {required: true})}  type="text" placeholder="used years" className="input input-bordered input-info w-full max-w-xs" />
                </label>
                <label className='block'>
                    <p>Brand Name</p>
                    <input {...register('brandName', {required: true})}  type="text" placeholder="your car's brand" className="input input-bordered input-info w-full max-w-xs" />
                </label>
                <label className='block'>
                    <p>Your name</p>
                    <input {...register('ownerName', {required: true})}  type="text" placeholder="type your name here" className="input input-bordered input-info w-full max-w-xs" />
                </label>
                <label className='block'>
                    <p>Email</p>
                    <input {...register('email', {required: true})}  type="text" placeholder="type your email here" className="input input-bordered input-info w-full max-w-xs" />
                </label>
                <label className='block'>
                    <p>Location</p>
                    <input {...register('location', {required: true})}  type="text" placeholder="type your location here" className="input input-bordered input-info w-full max-w-xs" />
                </label>
                <label className='block'>
                    <p>Original Price</p>
                    <input {...register('orgPrice', {required: true}) } type="float" placeholder="type original price" className="input input-bordered input-info w-full max-w-xs" />
                </label>
                <label className='block'>
                    <p>Resell Price</p>
                    <input {...register('resellPrice', {required: true})} type="float" placeholder="type resell price" className="input input-bordered input-info w-full max-w-xs" />
                </label>
                <label className='block'>
                    <p>Car Photo</p>
                    <input {...register('carPhoto', {required: true})} type="file"  className="input input-bordered input-info w-full max-w-xs" />
                </label>
                <div className='flex justify-center w-full'>
                     <button className='btn hover:bg-[#6fc7de] text-white mt-5 bg-[#00a5d0]'>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Category;