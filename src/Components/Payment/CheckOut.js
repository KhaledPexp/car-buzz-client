import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckOut = ({product}) => {
    const stripe = useStripe()
    const elements = useElements();
    const [cardError, setCardError] = useState('')
    const [clientSecret, setClientSecret] = useState("");
    const [success, setSuccess] = useState("");
    const [processing, setProcessing] = useState(false);
    const [pamentId, setPaymentId] = useState("");

    const {price, name, email} = product;
    
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://car-buzz-srv.vercel.app/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({price}),
        })
          .then((res) => res.json())
          .then((data) => setClientSecret(data.clientSecret));
      }, [price]);

    const handleSubmit = async(event) =>{
        event.preventDefault();
      
        if(!stripe || !elements){
            return;
        }
        const card = elements.getElement(CardElement);
        
        if (card == null) {
        return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setCardError( error.message);
        }
        else{
            setCardError('');
        }
        setSuccess('')
        setProcessing(true)
        const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: name,
                  email: email
                },
              },
            },
          );
          if(confirmError){
            setCardError( confirmError.message);
            return
          }
          if(paymentIntent.status === 'succeeded'){
            setSuccess('Congrats! Your Payment Was Successful')
            setPaymentId(paymentIntent.id)
          };
          setProcessing(false)
    }
    return (
        <>
        <p className='text-amber-700 mb-5'>Payment Deu: ${price}</p>
        <form onSubmit={handleSubmit}>
            <CardElement
            options={{
                style: {
                base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                    color: '#aab7c4',
                    },
                },
                invalid: {
                    color: '#9e2146',
                },
                },
            }}
            />
            <button type="submit" className='btn mt-5 px-8 border-none bg-[#00a5d0] hover:bg-[#5ebed6] text-white' disabled={!stripe || !clientSecret || processing}>
            Pay
            </button>
        </form>
        <p className='text-red-400 pt-2'>{cardError}</p>
        {
            success && <div>
                <p className='py-2 text-green-500'>{success}</p>
                <p>Your Transaction Id: {pamentId}</p>
            </div>
        }
        </>
    );
};

export default CheckOut;