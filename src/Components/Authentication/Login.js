import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate, useNavigation, useNavigationType } from 'react-router-dom';
import { authProvider } from '../../Context/AuthContext';
import { GoogleAuthProvider } from 'firebase/auth';
import { tockenSet } from './tockenSet';
import toast from 'react-hot-toast';

const Login = () => {
    const {handleGoogleSignIn, handleSignInWithEmail, user} = useContext(authProvider);
    const googleProvider = new GoogleAuthProvider();
    const nevigate = useNavigate();


    const {register, handleSubmit, reset, formState: { errors }}  = useForm();
    const handleLogin = data =>{
       const email = data.email;
       const password = data.password;

        handleSignInWithEmail(email, password)
        .then(result =>{
            const user = result.user;
            const userDetails = {
                name: user.displayName,
                email: user.email,
                accountType: 'Buyer',
                profilePic: user.photoURL,
                
            }
            fetch('http://localhost:8080/user',{
                    method:'POST',
                    headers:{
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(userDetails)
                })
            .then(result => result.json())
            .then(data => {
                console.log(data);
                const {result, tocken} = data;
                if(result === email ){
                    toast.success('Successfully Logged In')
                    nevigate('/', {replace: true});
                    
                }
                if(tocken){
                    tockenSet(tocken);
                }
            })
            .catch(e =>{
                toast.error(e.message)
            })

        })
        .catch(e => console.error(e))
        reset();
    }

    const longInWithGoogle = ()=>{
        handleGoogleSignIn(googleProvider)
        .then(result => {
            const user = result.user;
            const email = user.email;
            console.log(user);
            const userDetails ={
                name: user.displayName,
                email: user.email,
                password: '',
                accountType: 'Buyer',
                profilePic: user.photoURL,
                
            }
                fetch('http://localhost:8080/user',{
                    method:'POST',
                    headers:{
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(userDetails)
                })
                .then(result => result.json())
                .then(data => {
                    console.log(data);
                    const {result,tocken} = data;
                    if(result === email ){
                        toast.success('Successfully Logged In')
                        nevigate('/', {replace: true});
                    }
                    if(tocken){
                        tockenSet(tocken);
                    }
                    if(result?.acknowledged){
                        toast.success(`${user.displayName} added successfully`)
                        nevigate('/', {replace: true});
                        reset();
                        
                    }
                })
        })
        .catch(e => console.error(e))
    }

    return ( 
        user?.uid? nevigate('/', {replace:true}):
        <div className='flex justify-center mt-10'>

                <div className='container-layout py-16 w-1/3 max-sm:w-3/4 max-lg:w-2/3'>
                <div className=' border p-8 shadow-md'>
                    <h3 className='text-xl font-semibold pb-8'>Login Here</h3>
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <div className='space-y-8'>
                            
                            <label className='block'>
                                <p>Your Email</p>
                                <input {...register('email', {required:true})} className='px-2 py-2 w-full border rounded' type="email"  placeholder='Your@email.com'  />
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
                            <button className='btn bg-[#00a5d0] px-4 py-2 w-full rounded text-center text-white hover:bg-[#5ebed6]'>Login</button>
                        </div>
                        
                    </form>
                    <div className='pt-2'>
                        <p>Don't have an account? <Link to='/register'>Register</Link></p>
                    </div>
                   
                        <div className='pe-2 pt-5'>
                            <button onClick={longInWithGoogle} className='btn bg-blue-500 px-4 py-2 text-white w-full rounded hover:bg-blue-400' > Login in using Google
                            </button>
                        </div>
                </div>
            </div>

        </div>
    );
};

export default Login;