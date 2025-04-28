
import React, { useState } from 'react';
import { useCart } from '../CartContext';
import axios from 'axios';
import Footer from '../common/Footer';

const CartPage = () => {
  const { cart, removeFromCart } = useCart();
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phoneNumber: '',
    address: '',
    landmark: '',
    state: '',
    pincode: '',
    chocolate: 'Dairy Milk',
  });

  const localbackendurl = 'http://localhost:5000/api/payment';

  const indianStates = [ /* same state list as before */
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir",
    "Ladakh", "Puducherry", "Chandigarh", "Andaman and Nicobar Islands", "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep"
  ];

  const total = cart.reduce((acc, item) => acc + Number(item.price), 0);

  const handlebuynow = async () => {
    const { customerName, email, phoneNumber, address, landmark, state, pincode } = formData;

    if (!customerName || !email || !phoneNumber || !address || !landmark || !state || !pincode) {
      alert("❌ Please fill out all delivery details before proceeding.");
      return;
    }

    const phoneRegex = /^(?:\+91|91)?[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert("❌ Enter a valid Indian phone number (start with +91 or 91, and 10 digits).");
      return;
    }

    if (!indianStates.includes(state)) {
      alert("❌ Please enter a valid Indian state.");
      return;
    }

    const pinRegex = /^[1-9][0-9]{5}$/;
    if (!pinRegex.test(pincode)) {
      alert("❌ Enter a valid 6-digit Indian pincode.");
      return;
    }

    try {
      const { data } = await axios.post(`${localbackendurl}/orders`, {
        amount: total,
      });
      initPayment(data);
    } catch (error) {
      console.error("Error during order creation:", error);
    }
  };

  const initPayment = (orderData) => {
    const options = {
      key: 'rzp_test_2K5EUlmwuZTui7',
      amount: orderData.data.amount,
      currency: orderData.data.currency,
      name: 'Order from Cart',
      description: cart.map(item => item.title).join(', '),
      order_id: orderData.data.id,
      handler: async (response) => {
        try {
          const verifyRes = await axios.post(`${localbackendurl}/verify`, {
            ...response,
            cartItems: cart,
            totalAmount: total,
            ...formData,
          });

          if (verifyRes.status === 200) {
            alert('✅ Payment successful and order saved!');
            localStorage.removeItem('cart');
            window.location.href = "/thankyou"; // optional
          } else {
            alert('❌ Payment verification failed.');
          }
        } catch (err) {
          console.error("Verification error:", err);
          alert('❌ Payment verification failed.');
        }
      },
      theme: {
        color: '#9205a2',
      },
    };

    const razorpay_popup = new window.Razorpay(options);
    razorpay_popup.open();
  };

  return (
    <div>


    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#730280]">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>Your cart is empty</p>
          <button
            onClick={() => window.location.href = "/productspage"}
            className="text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 mt-4 rounded-md"
          >
            Go to Shop
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {cart.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <img
                  className="w-full h-40 object-cover"
                  src={item.image || 'https://via.placeholder.com/150'}
                  alt={item.title}
                />
                <h2 className="font-semibold mt-2">{item.title}</h2>
                <p className="text-sm text-gray-500">{item.description}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="font-bold text-green-600">₹{item.price}</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-right pr-4">
            <h3 className="text-xl font-semibold text-[#730280]">Total: ₹{total}</h3>
            <button onClick={handlebuynow} className='button-style mt-5 mb-5'>Buy products</button>
          </div>



          <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-200 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-[#730280] text-center">
              🚚 Delivery Details
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              />
              <input
                type="text"
                placeholder="Landmark"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={formData.landmark}
                onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
              />
              <input
                type="text"
                placeholder="State"
                list="stateList"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              />
              <datalist id="stateList">
                {indianStates.map((s, i) => (
                  <option key={i} value={s} />
                ))}
              </datalist>
              <input
                type="text"
                placeholder="Pincode"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
              />
            </div>

            <textarea
              placeholder="Full Address"
              rows="3"
              className="border border-gray-300 rounded-md p-2 mt-4 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

        </>
      )}
    </div>
    <Footer/>
    </div>
  );
};

export default CartPage;
