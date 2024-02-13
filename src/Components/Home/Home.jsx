import React, { useContext, useEffect, useState } from 'react';
import { authProvider } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';
import SingleCarPost from '../CarCard/SingleCarPost';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import toast from 'react-hot-toast';
import ModalComponent from '../Shared/ModalComponent';
import "./modal.css"


const Home = () => {
    const {user} = useContext(authProvider)
    let url = null;
    const [banner, setBanner] = useState(true);
    const [usedcar, setCar] = useState([])
    const [carId, setCarID] = useState(null)
    const [modal, setModal] = useState(false);

    const handleModal = ()=>{
        setModal(true)
    }
    
    useEffect(()=>{
        fetch('https://car-buzz-srv.vercel.app/cars')
        .then(res => res.json())
        .then(result => {
            setCar(result)
        })
    },[])


    setTimeout(()=>{
        setBanner(!banner);
    },5000)

    if(banner){
       url = '/media/bnner/1.jpg'
    }
    else{
        url = '/media/bnner/2.jpg'
    }
    return (
        <div className='my-5'>
            <div className='banner relative h-1/3'>
                <img className='w-full h-auto' src={url} alt="" />
                <div className='bg-black absolute top-0 z-30 w-full h-full opacity-30'></div>
                <div className='flex justify-center max-sm:hidden'>
                    <div className='absolute z-50 lg:top-1/3 sm:top-2 md:top-5 text-white text-center'>
                        <h1 className='text-6xl font-bold mx-lg:text-4xl'>FIND THE RIGHT CAR FOR YOU.</h1>
                        <p className='text-xl font-semibold mt-5'>We have more than a thousands of used cars for you to choose.</p>
                        <Link to='/available'><button className='btn bg-[#00a5d0] mt-5 hover:bg-[#5ebed6] text-white'>See All Cars</button></Link>
                    </div>
                </div>
            </div>
            <div className='flex justify-center my-10'>
                
                <div className='grid grid-cols-3 gap-10 justify-around py-10 w-4/5'>
                    <div className='bg-gray-100 rounded hover:bg-[#00a5d0] '>
                      <Link><img className='p-5 pt-14 w-full' src="/media/Brands/audi.png" alt="audi-car" /></Link>
                    </div>
                    <div className='bg-gray-100 rounded hover:bg-[#00a5d0]'>
                      <Link><img src="/media/Brands/bmw.png" alt="" /></Link>
                    </div>
                    <div className='bg-gray-100 rounded hover:bg-[#00a5d0]'>
                    <Link><img src="/media/Brands/volkswagen.png" alt="" /></Link>
                    </div>
                
                </div>
            </div>
            <div className='mx-auto py-10'>
                <hr className='mx-24 border-1 border-gray-300 font-bold' />
                <div className='relative justify-center'> <div className='flex justify-center'><h1 className='text-3xl font-bold absolute -top-5 bg-white px-4'>LATEST USED VEHICLES</h1></div></div>
            </div>
            <div className='lg:mx-24 justify-center max-lg:mx-5'>
                   
                <div className='grid grid-cols-3 gap-10 justify-around py-10 max-sm:grid-cols-1 max-md:justify-items-center mx-md:gap-5 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                    
                    {
                        usedcar?.map(car => <SingleCarPost
                            key={car._id}
                            car={car}
                            setModal={handleModal}
                            modal={modal}
                            carId={carId}
                            setCarID = {setCarID}
                            ></SingleCarPost>
                        )
                        
                    }   
                </div>
                
            </div>
            <div className={modal?'absolute z-30 mx-0 top-0 h-screen w-screen customModal':'hidden'}>
                    {
                        carId && <ModalComponent car = {carId} modal={modal} setModal={setModal} ></ModalComponent>
                    }
                </div>
            <div>
            
            </div>
            <div className='lg:mx-24 my-10 mb-20 max-sm:mx-5 sm:mx-5 md:mx-0'>
                <div className='relative'>
                    <img className='rounded-md lg:w-full max-sm:h-96 ' src="/media/bnner/contact-bg.jpg" alt="" />
                    <div className='bg-black absolute top-0 z-10 w-full h-full opacity-75 rounded-md'></div>
                    <div className='flex justify-center'>
                        <div className='text-white absolute lg:top-0 z-20 lg:w-1/2 text-center px-7 py-6 max-sm:top-1 sm:w-full max-sm:w-full sm:top-1'>
                            <p className='font-semibold mb-5'>CONTACT US</p>
                            <h1 className='text-3xl font-bold mb-5 max-sm:hidden sm:text-xl'>Contact With Us for Better Deal!</h1>
                            <form className='leading-10 text-black'>
                                <input className='p-2 block w-full my-3 rounded-md' type="email" placeholder='Email' />
                                <input className='p-2 block w-full rounded-md' type="text" placeholder='Subject' />
                                <textarea className='p-2 block w-full my-3 rounded-md' placeholder='Write about your car details' cols="30" rows="2"></textarea>
                                <button className='btn mt-2 px-20 border-none bg-[#00a5d0] hover:bg-[#5ebed6] text-white'>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Home;