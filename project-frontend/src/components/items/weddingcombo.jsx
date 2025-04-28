

import React, { useState } from "react";
import axios from "axios";
import Footer from "../common/Footer";

const localbackendurl = 'http://localhost:5000/api/payment';

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir",
  "Ladakh", "Puducherry", "Chandigarh", "Andaman and Nicobar Islands", "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep"
];

const product = {
  name: "Wedding Combo Pack",
  id: "WEDDING_COMBO_002",
  price: 2899,
  originalPrice: 3496,

};

export default function Weddingcombopage() {
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

  const handlebuynow = async () => {
    const { customerName, email, phoneNumber, address, landmark, state, pincode } = formData;

    if (!customerName || !email || !phoneNumber || !address || !landmark || !state || !pincode) {
      alert("❌ Please fill out all delivery details before proceeding.");
      return;
    }

    const phoneRegex = /^(?:\+91|91)?[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert("❌ Enter a valid Indian phone number.");
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
        amount: product.price,
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
      name: product.name,
      description: 'Product Purchase',
      order_id: orderData.data.id,
      handler: async (response) => {
        try {
          const verifyRes = await axios.post(`${localbackendurl}/verify`, {
            ...response,
            productName: product.name,
            productId: product.id,
            amountPaid: orderData.data.amount / 100, // Adding Amount Paid (convert paise to rupees)
            ...formData,
          });

          if (verifyRes.status === 200) {
            alert('✅ Payment successful and order saved!');
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
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        {/* Product Display */}
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 shadow-xl rounded-3xl overflow-hidden md:flex md:items-center">
          <div className="md:w-1/2">
            <img
              src="/images/weddingcombo.jpg"
              alt="Wedding Combo"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="md:w-1/2 p-8 space-y-6">
            <h1 className="text-4xl font-bold text-purple-700">Wedding Combo Pack</h1>
            
            <p className="text-gray-700 text-base">
              A complete wedding set including gorgeous garlands, a beautiful bouquet, and a royal crown — all crafted to add a touch of elegance and tradition to your special day.
            </p>

            <div className="text-2xl font-bold text-pink-600 mt-4">
              ₹{product.price}  <span className="text-gray-500 font-normal text-[19px] line-through">₹{product.originalPrice}</span>
            </div>

            <ul className="space-y-2 text-gray-700 text-base mt-4">
              <li>💐 2 Gorgeous Garlands</li>
              <li>🌸 1 Elegant Bouquet</li>
              <li>👑 1 Decorative Crown</li>
            </ul>

            <div className="mt-6">
              <label className="block mb-2 text-sm font-semibold text-gray-700">Choose Chocolate Type:</label>
              <select
                className="w-full border-2 border-purple-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={formData.chocolate}
                onChange={(e) => setFormData({ ...formData, chocolate: e.target.value })}
              >
                <option value="Dairy Milk">Dairy Milk</option>
                <option value="5 Star">5 Star</option>
                <option value="Ferrero Rocher">Ferrero Rocher</option>
                <option value="KitKat">KitKat</option>
              </select>
            </div>

            <button
              className="w-full py-3 mt-6 rounded-xl font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-800 hover:from-purple-700 hover:to-[#730280] transition-all"
              onClick={handlebuynow}
            >
              Buy now
            </button>
          </div>
        </div>

        {/* Delivery Form */}
        <div className="bg-gradient-to-br from-purple-400 to-purple-500 p-6 rounded-2xl shadow-2xl border border-purple-300">
          <h3 className="text-2xl font-bold mb-6 text-white text-center tracking-wide">
            🚚 Delivery Details
          </h3>

          <div className="grid md:grid-cols-2 gap-5">
            <input type="text" placeholder="Full Name" className="input-field p-3 rounded-lg shadow-sm border border-purple-300 focus:ring-2 focus:ring-purple-600"
              value={formData.customerName} onChange={(e) => setFormData({ ...formData, customerName: e.target.value })} />
            <input type="email" placeholder="Email Address" className="input-field p-3 rounded-lg shadow-sm border border-purple-300 focus:ring-2 focus:ring-purple-600"
              value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <input type="tel" placeholder="Phone Number" className="input-field p-3 rounded-lg shadow-sm border border-purple-300 focus:ring-2 focus:ring-purple-600"
              value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} />
            <input type="text" placeholder="Landmark" className="input-field p-3 rounded-lg shadow-sm border border-purple-300 focus:ring-2 focus:ring-purple-600"
              value={formData.landmark} onChange={(e) => setFormData({ ...formData, landmark: e.target.value })} />
            <input type="text" placeholder="State" list="stateList" className="input-field p-3 rounded-lg shadow-sm border border-purple-300 focus:ring-2 focus:ring-purple-600"
              value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} />
            <datalist id="stateList">
              {indianStates.map((state, idx) => (
                <option key={idx} value={state} />
              ))}
            </datalist>
            <input type="text" placeholder="Pincode" className="input-field p-3 rounded-lg shadow-sm border border-purple-300 focus:ring-2 focus:ring-purple-600"
              value={formData.pincode} onChange={(e) => setFormData({ ...formData, pincode: e.target.value })} />
          </div>

          <textarea placeholder="Full Delivery Address" rows="3" className="input-field mt-6 p-3 w-full rounded-lg shadow-sm border border-purple-300 focus:ring-2 focus:ring-purple-600"
            value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
        </div>

        {/* Custom Order Banner */}
        <div className="bg-purple-100 mt-10 p-6 rounded-2xl text-center shadow-md">
          <h2 className="text-2xl font-bold text-purple-700">✨ Need a Custom Design?</h2>
          <p className="text-gray-700 mt-2">
            Mix chocolates, money, flowers, or customize garland size? <br />We can create it for you!
          </p>
          <a href="tel:+919876543210" className="inline-block mt-4 px-6 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition">
            📞 Call Us Now
          </a>
        </div>

      </div>
      <Footer />
    </div>
  );
}
