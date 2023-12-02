import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { authProvider } from '../../Context/AuthContext';
import { tockenSet } from './tockenSet';
import Loading from '../Shared/Loading';


const Register = () => {
    const nevigate = useNavigate();
    const { handleRegisterWithEmail, user, loader} = useContext(authProvider);
    const {register, handleSubmit, reset, formState: { errors }}  = useForm();
    const ApiKey = process.env.REACT_APP_ApiKey;
    const handleRegister = (data) =>{
        const email = data.email;
        const password = data.password;
        const UserName = data.name;
        const image = data.photo[0];
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

                const userDetails ={
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    accountType: data.accountType,
                    profilePic: imgData.data.url,
                    
                }
                handleRegisterWithEmail(email, password)
                        .then(result =>{
                            const user = result.user;

                            fetch('https://car-buzz-srv.vercel.app/user',{
                                method:'POST',
                                headers:{
                                    "content-type": "application/json"
                                },
                                body: JSON.stringify(userDetails)
                            })
                            .then(result => result.json())
                            .then(data => {
                                const {result,tocken} = data;
                                if(tocken){
                                    tockenSet(tocken);
                                }
                                if(result.acknowledged){
                                    toast.success(`${UserName} added successfully`)
                                    nevigate('/', {replace: true});
                                    reset();
                                    
                                }
                            })
                        })
                        .catch(e => {
                            toast.error(e.message)
                        })
                
            }
        })
    }
    if(loader){
        return <Loading></Loading>
    }
    return (
        user?.uid? nevigate('/', {replace:true}):
        <div className='flex justify-center mt-10'>

                <div className='container-layout py-16 w-1/3 max-sm:w-3/4 max-lg:w-2/3'>
                <div className=' border p-8 shadow-md'>
                    <h3 className='text-xl font-semibold pb-8'>Register Here</h3>
                    <form onSubmit={handleSubmit(handleRegister)}>
                        <div className='space-y-8'>
                            <label className='block'>
                                <p>Your Name</p>
                                <input {...register('name', {required:true})} className='px-2 py-2 w-full border rounded' type="text"  placeholder='your name'  />
                            </label>
                            
                            <label className='block'>
                                <p>Your Email</p>
                                <input {...register('email', {required:true})} className='px-2 py-2 w-full border rounded' type="email"  placeholder='elone@musk.com'  />
                            </label>
                            
                            <label className='block'>
                                <p>Your Password</p>
                                <input {...register("password", {
                                required: "Please Enter Your Password",
                                minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters long!"
                                }})} className='px-2 py-2 w-full border rounded' type="password" name='password' placeholder='••••••••••••' />
                                {errors.password&& <p className='text-red-500'>{errors.password?.message}</p>}
                            </label>
                            <label className='block'>
                                <p>Creating Account As</p>
                                <select {...register('accountType', {required:true})} defaultValue='Buyer' className='px-2 py-2 w-full border rounded'>
                                    <option value="Seller">Seller</option>
                                    <option value="Buyer">Buyer</option>
                                </select>
                            </label>
                            <label className='block'>
                                <p>Your Profile Photo</p>
                                <input {...register('photo',{required:true})} className='px-2 py-2 w-full border rounded' type="file" />
                            </label>
                            <button className='btn bg-[#00a5d0] px-4 py-2 w-full rounded text-center text-white hover:bg-[#5ebed6]'>Register</button>
                        </div>
                        
                    </form>
                    <div className='pt-2'>
                        <p>Already have an account? <Link to='/login'>login</Link></p>
                    </div>
                   
                        {/* <div className='pe-2 pt-5'>
                            <button className='btn bg-blue-500 px-4 py-2 text-white w-full rounded hover:bg-blue-400' > Login in using Google
                            </button>
                        </div> */}
                </div>
            </div>

        </div>
    );
};


export default Register;