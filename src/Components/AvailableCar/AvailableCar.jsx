import React, { useEffect, useState } from 'react';
import ModalComponent from '../Shared/ModalComponent';
import SingleCarPost from '../CarCard/SingleCarPost';
import "./customModal.css"

const AvailableCar = () => {
    const [allCars, setCars] = useState()
    const [brand, setbrand] = useState(null)
    const [carId, setCarID] = useState(null)
    const [modal, setModal] = useState(false);
    const handleModal = ()=>{
        setModal(true)
    }
    const handleBrand = (e) =>{
        e.preventDefault();
        setbrand(null);
        const brandNmade = e.target.value;

        fetch(`https://car-buzz-srv.vercel.app/brand?brandname=${brandNmade}`)
        .then(res => res.json())
        .then(brand => {
            setbrand(brand);
        })
        .catch(err => console.error(err))

    }
    console.log(brand)

    useEffect(()=>{
        fetch('https://car-buzz-srv.vercel.app/allCars')
        .then(res => res.json())
        .then(result => {
            setCars(result)
        })
    },[])
    return (
        <div className=''>
            <div className='mx-24 mt-5 mx-lg:mx-auto'>

            <div class="flex mx-auto max-md:block ">
                <div class="w-1/4 max-md:w-full flex justify-center items-center bg-[#00a5d0] text-white">
                    <ul class=" space-y-3 max-md:my-5">
                        <h3 class="text-xl font-bold mb-3">Choose Category</h3>
                        <select onChange={handleBrand} className='bg-blue-900 px-5 py-2' name="" id="">
                            <option value="vollkswagen">Vollkswagen</option>
                            <option value="bmw">BMW</option>
                            <option value="audi">Audi</option>
                        </select>
                    </ul>
                </div>
                <div class="w-3/4 max-md:w-full">
                    <img src="/media/Vollkswagen-Alloy-wheel.jpg" alt=""/>
                </div>
            </div>
            <div className='mx-auto py-10 mt-10'>
                <hr className='mx-24 border-1 border-gray-300 font-bold' />
                <div className='relative justify-center'> <div className='flex justify-center'><h1 className='text-3xl font-bold absolute -top-5 bg-white px-4'>LATEST USED VEHICLES</h1></div></div>
            </div>
                <div className='grid grid-cols-3 gap-10 justify-around py-10 max-sm:grid-cols-1 max-md:justify-items-center mx-md:gap-5 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                    

                    {
                        brand? <>{
                            brand.map(car => <SingleCarPost
                                key={car._id}
                                car={car}
                                setModal={handleModal}
                                modal={modal}
                                carId={carId}
                                setCarID = {setCarID}
                                used = {car.used}
                                location = {car.location}
                                ></SingleCarPost>)
                        }</>:
                        <>
                        {allCars?.map(car => <SingleCarPost
                            key={car._id}
                            car={car}
                            setModal={handleModal}
                            modal={modal}
                            carId={carId}
                            used = {car.used}
                            location = {car.location}
                            setCarID = {setCarID}
                            ></SingleCarPost>
                        )
                        }
                        </>
                    }
                    
                </div>
                
        </div>

        <div className={modal?'absolute customModal mx-0 top-0 h-screen w-screen':'hidden'}>
                    {
                        carId && <ModalComponent car = {carId} modal={modal} setModal={setModal} ></ModalComponent>
                    }
                    </div> 
        </div>
        

    );
};

export default AvailableCar;