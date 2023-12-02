import React, { useEffect, useState } from 'react';
import ModalComponent from '../Shared/ModalComponent';
import SingleCarPost from '../CarCard/SingleCarPost';
import "./customModal.css"

const AvailableCar = () => {
    const [allCars, setCars] = useState()
    const [carId, setCarID] = useState(null)
    const [modal, setModal] = useState(false);
    const handleModal = ()=>{
        setModal(true)
    }
    useEffect(()=>{
        fetch('http://localhost:8080/allCars')
        .then(res => res.json())
        .then(result => {
            setCars(result)
        })
    },[])
    return (
        <div className=''>
            <div className='mx-24 mt-5 mx-lg:mx-auto'>
                <div className='grid grid-cols-3 gap-10 justify-around py-10 max-sm:grid-cols-1 max-md:justify-items-center mx-md:gap-5 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                    
                    {
                        allCars?.map(car => <SingleCarPost
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

        <div className={modal?'absolute customModal mx-0 top-0 h-screen w-screen':'hidden'}>
                    {
                        carId && <ModalComponent car = {carId} modal={modal} setModal={setModal} ></ModalComponent>
                    }
                    </div> 
        </div>
        

    );
};

export default AvailableCar;