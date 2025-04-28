

// // import React from 'react';
// // import axios from 'axios';

// // const BuyNowButton = ({ product, localbackendurl = 'http://localhost:5000' }) => {
// //   const handleBuyNow = async () => {
// //     try {
// //       console.log("🧾 Product info:", product);

// //       // Send the order creation request to the backend
// //       const { data } = await axios.post(`${localbackendurl}/api/payment/orders`, {
// //         amount: product.price,  // Amount in INR
// //       });

// //       initPayment(data.data); // Pass correct nested data for Razorpay
// //     } catch (error) {
// //       console.error("❌ Error during order creation:", error);
// //       alert("Something went wrong while creating the order.");
// //     }
// //   };

// //   const initPayment = (orderData) => {
// //     const options = {
// //       key: 'rzp_test_2K5EUlmwuZTui7',  // Use your Razorpay live key in production
// //       amount: orderData.amount,
// //       currency: orderData.currency,
// //       name: product.name,
// //       description: 'Product Purchase',
// //       order_id: orderData.id,
// //       handler: async (response) => {
// //         try {
// //           // Verify the payment with the backend
// //           const verifyRes = await axios.post(`${localbackendurl}/api/payment/verify`, response);
// //           if (verifyRes.status === 200) {
// //             alert('✅ Payment verified successfully!');

// //             // Save order to the database
// //             await axios.post(`${localbackendurl}/api/orders/save`, {
// //               productId: product._id,
// //               productName: product.name,
// //               chocolate: product.chocolate,
// //               price: product.price,
// //               razorpayPaymentId: response.razorpay_payment_id,
// //               deliveryDetails: {
// //                 name: product.customerName,
// //                 phone: product.customerPhone,
// //                 address: product.customerAddress,
// //                 landmark: product.customerLandmark,
// //               }
// //             });
// //           } else {
// //             alert('❌ Payment verification failed.');
// //           }
// //         } catch (err) {
// //           console.error("❌ Verification failed:", err);
// //           alert('Payment verification failed.');
// //         }
// //       },
// //       theme: {
// //         color: '#9205a2',
// //       },
// //     };

// //     const rzp = new window.Razorpay(options);
// //     rzp.open();
// //   };

// //   return (
// //     <button
// //       onClick={handleBuyNow}
// //       className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
// //     >
// //       Buy Now
// //     </button>
// //   );
// // };

// // export default BuyNowButton;
// import React from 'react';
// import axios from 'axios';

// const BuyNowButton = ({ product, localbackendurl = 'http://localhost:5000', deliveryDetails }) => {
//   const handleBuyNow = async () => {
//     try {
//       console.log("🧾 Product info:", product);

//       // Send the order creation request to the backend
//       const { data } = await axios.post(`${localbackendurl}/api/payment/orders`, {
//         amount: product.price,  // Amount in INR
//       });

//       initPayment(data.data); // Pass correct nested data for Razorpay
//     } catch (error) {
//       console.error("❌ Error during order creation:", error);
//       alert("Something went wrong while creating the order.");
//     }
//   };

//   const initPayment = (orderData) => {
//     const options = {
//       key: 'rzp_test_2K5EUlmwuZTui7',  // Use your Razorpay live key in production
//       amount: orderData.amount,
//       currency: orderData.currency,
//       name: product.name,
//       description: 'Product Purchase',
//       order_id: orderData.id,
//       handler: async (response) => {
//         try {
//           // Verify the payment with the backend
//           const verifyRes = await axios.post(`${localbackendurl}/api/payment/verify`, response);
//           if (verifyRes.status === 200) {
//             alert('✅ Payment verified successfully!');

//             // Save order to the database
//             await axios.post(`${localbackendurl}/api/orders/save`, {
//               productId: product._id,
//               productName: product.name,
//               chocolate: product.chocolate,
//               price: product.price,
//               razorpayPaymentId: response.razorpay_payment_id,
//               deliveryDetails: {
//                 name: deliveryDetails.name,
//                 phone: deliveryDetails.phone,
//                 address: deliveryDetails.address,
//                 landmark: deliveryDetails.landmark,
//               }
//             });
//             alert('🎉 Your order has been successfully placed!');
//           } else {
//             alert('❌ Payment verification failed.');
//           }
//         } catch (err) {
//           console.error("❌ Verification failed:", err);
//           alert('Payment verification failed.');
//         }
//       },
//       theme: {
//         color: '#9205a2',
//       },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   return (
//     <button
//       onClick={handleBuyNow}
//       className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
//     >
//       Buy Now
//     </button>
//   );
// };

// export default BuyNowButton;
