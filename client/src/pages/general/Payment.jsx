import { useEffect } from "react";
import axios from "axios";

export const PaymentButton = ({ amount, jobId, clientEmail, clientName }) => {
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://sdk.monnify.com/plugin/monnify.js";
//     script.async = true;
//     document.body.appendChild(script);
//   }, []);


import.meta.env.VITE_MONNIFY_SECRET_KEY 


  const handlePayment = () => {
    console.log(amount, jobId, clientName, clientEmail);
    window.MonnifySDK.initialize({
      amount, // Amount to pay
      currency: "NGN",
      reference: `TXN_${Date.now()}`, // Unique reference
      customerName: clientName,
      customerEmail: clientEmail,
      apiKey: import.meta.env.VITE_MONNIFY_API_KEY, // Replace with Monnify Public Key
      contractCode: import.meta.env.VITE_MONNIFY_CONTRACT_CODE, // Replace with Monnify Contract Code
      paymentDescription: `Payment for Job ${jobId}`,
      isTestMode: true, // Change to false in production
      paymentMethods: ["CARD",
    "ACCOUNT_TRANSFER",
    "USSD",
    "PHONE_NUMBER"],
      onLoadStart: () => {
        console.log("loading has started")
      },
      onLoadComplete: () => {
        console.log("SDK is UP")
      },
      onComplete: (response) => {
        if (response.paymentStatus === "PAID") {
          // Update your backend with the payment status
          fetch('/api/verify/payment-success', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(response)
          })
          .then(res => res.json())
          .then(data => {
            console.log('Payment status updated:', data);
          })
          .catch(error => {
            console.error('Error updating payment status:', error);
          });
      
          // Update the UI to show payment success
          alert('Payment Successful!');
        } else {
          alert('Payment Failed!');
        }
      },
      onClose: function (data){
        console.log(data);
        if (data.responseCode === "USER_CANCELLED") {
          alert('Payment was cancelled by the user.');
        } else {
          alert('Payment process was closed.');
        }
      }
    });
  };

  return <button onClick={handlePayment}>Pay Now</button>;
};