"use client"
import React, { useEffect, useRef, useCallback } from 'react';
import useRazorpay, { RazorpayOptions } from 'react-razorpay';

const Checkout: React.FC = () => {
  const [Razorpay, isLoaded] = useRazorpay();
  const razorpayContainerRef = useRef<HTMLDivElement>(null);

  const handlePayment = useCallback(() => {
    // Simulated order creation
    const order = {
      id: 'pl_NNb1f4Le0T61VO',
    };

    const options: RazorpayOptions = {
      key: 'rzp_test_uGoq5ADrFTgYRAhk',
      amount: '3000',
      currency: 'USD',
      name: 'Acme Corp',
      description: 'Test Transaction',
      image: 'https://example.com/your_logo',
      order_id: order.id,
      handler: (res: any) => {
        console.log(res);
      },
      prefill: {
        name: 'Parixeet Patel',
        email: 'parixeet0363@example.com',
        contact: '9998887776',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
      container: 'your-container-id',
    };

    if (Razorpay) {
      const rzpay = new Razorpay(options);
      rzpay.open();
    }
  }, [Razorpay]);

  useEffect(() => {
    if (isLoaded && razorpayContainerRef.current) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
      script.async = true;
      script.setAttribute('data-payment_button_id', 'pl_NNb1f4Le0T61VO');
      razorpayContainerRef.current.appendChild(script);

      return () => {
        // razorpayContainerRef.current.removeChild(script);
        if (razorpayContainerRef.current) {
          razorpayContainerRef.current.removeChild(script);
        }
      };
    }
  }, [isLoaded]);

  return (
    <>
      <div ref={razorpayContainerRef} className='flex items-center justify-center h-screen w-screen'>

      </div>
    </>
  );
};

export default Checkout;
