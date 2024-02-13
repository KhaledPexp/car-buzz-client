import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckOut from './CheckOut';
import { useLoaderData } from 'react-router-dom';

const pk = process.env.REACT_APP_stripeKey;
const stripePromise = loadStripe(pk);



const Payments = () => {
    const data = useLoaderData();
   
    return (
        <div className='mx-10 w-1/3'>
            <Elements stripe={stripePromise}>
                <CheckOut product={data} />
            </Elements>
        </div>
    );
};

export default Payments;