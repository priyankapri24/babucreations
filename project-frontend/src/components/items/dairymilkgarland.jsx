

  import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { FaStar, FaTruck, FaPlus, FaMinus } from 'react-icons/fa';
import Footer from '../common/Footer';
import axios from 'axios';


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

const DairyMilkGarland = () => {
  const [faqOpen, setFaqOpen] = useState(null);
  const [quantity, setQuantity] = useState(1);
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

  const product = {
    id: 3,
    name: 'DairyMilk Garland',
    price: 999,
    originalPrice: 1299,
    images: ['/images/dairy1.jpg', '/images/dairy2.jpg', '/images/dairy3.jpg'],
    description: 'Celebrate your special moments with our beautifully crafted Dairy Milk Garland! Made with fresh Dairy Milk chocolates, each garland is arranged carefully to create a sweet and memorable gift for birthdays, anniversaries, weddings, and special surprises.Its not just a chocolate treat its a joyful experience that brings smiles and happiness!',
    features: `• Includes popular chocolates like Dairy Milk, KitKat, 5 Star (customizable options available)
• : Easy to carry and gift without any damage
•  Approximate Length: 3 to 3.5 feet 
• Hygienically packed and handled with care
• Customization available for birthdays, anniversaries, or corporate gifting

🔔 Note: The exact number , weight, size of chocolates may vary depending on your selection and availability.`,

    range: `• Delivery Time: 2 to 5 business days based on your location
• Serviceable Areas: Major towns and cities 
• Each bouquet is prepared fresh upon order to ensure quality
• Proper climate-protected packaging to avoid melting during transit

📦 Gift Packaging: Comes in a secure and decorative gift box.`,
    occasionIdeas: [
      `• Perfect birthday surprise for chocolate lovers
• Romantic gift for Valentine's Day or anniversaries
• Appreciation gift for teachers or mentors
• Thank you gesture or 'just because' surprise.`
    ],
    rating: 4.8,
    faqs: [
      {
        question: 'How many chocolates are used in one garland?',
        answer: 'Each garland typically contains approx 50 Dairy Milk chocolates',
      },
      {
        question: ' How do I care for the garland after receiving it?',
        answer: 'Keep it in a cool, dry place away from direct sunlight to avoid melting. Best enjoyed within 3-5 days!',
      },
      {
        question: 'Can I change my delivery address after placing the order?',
        answer: 'Once an order has been processed, changes to the delivery address may not be possible. Please ensure that the correct address is entered at checkout.',
      },
      {
        question: 'Can I order the Chocolate Garland for a special occasion?',
        answer: 'Absolutely! Our chocolate garland make the perfect gift for birthdays, anniversaries, weddings, proposals, or any other special occasion. You can even add a special message to make it more personalized.',
      },
      {
        question: 'How long does it take to prepare the Product?',
        answer: 'We usually require 2–3 days for preparation, depending on the customization and order volume.',
      },
    ],
  };

  const toggleFAQ = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

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
        amount: product.price * quantity,
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
            quantity,
            amount: product.price * quantity,
            amountPaid: product.price * quantity, // ✅ Add this
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
      <div className="max-w-4xl mx-auto p-6 font-sans">
        <Swiper modules={[Navigation]} navigation={true} spaceBetween={20} slidesPerView={1} className="mb-6 relative">
          {product.images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img src={img} alt={`product-${idx}`} className="rounded-xl w-full h-72 md:h-96 object-cover shadow-lg" />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="space-y-4">
          <h2 className="md:text-3xl text-2xl font-bold text-gray-800">{product.name}</h2>
          <span className='text-green-700 block pb-1'>Special price!</span>
          <div className="flex items-center gap-3">
            <span className="text-2xl text-purple-800 font-semibold pr-3">₹{product.price * quantity}</span>
            <span className="text-red-500 line-through">₹{product.originalPrice}</span>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} className="px-3 py-1 bg-purple-200 text-purple-800 rounded-md">-</button>
            <span className="font-semibold">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1 bg-purple-200 text-purple-800 rounded-md">+</button>
          </div>

          <p className="text-gray-700">{product.description}</p>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={`text-yellow-400 ${i < Math.floor(product.rating) ? 'opacity-100' : 'opacity-40'}`} />
            ))}
            <span className="text-sm text-gray-500">({product.rating})</span>
          </div>

          <button onClick={handlebuynow} className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">Buy Now</button>

          <div className="mt-5">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Features</h3>
            <p className="text-gray-700 md:text-[17px] whitespace-pre-line">{product.features}</p>
          </div>

            {/* Delivery Form */}
            <div className="bg-gradient-to-br bg-purple-400 p-6 rounded-2xl shadow-2xl mb-8 border border-purple-300">
            <h3 className="text-2xl font-bold mb-6 text-white text-center tracking-wide">
              🚚 Delivery Details
            </h3>
            <div className="grid md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Full Name"
                className="input-field p-3 rounded-lg shadow-sm border border-purple-300 focus:ring-2 focus:ring-purple-600"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                className="input-field p-3 rounded-lg shadow-sm border border-purple-300 focus:ring-2 focus:ring-purple-600"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="input-field p-3 rounded-lg shadow-sm border border-purple-300 focus:ring-2 focus:ring-purple-600"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              />
              <input
                type="text"
                placeholder="Landmark"
                className="input-field p-3 rounded-lg shadow-sm border border-purple-300 focus:ring-2 focus:ring-purple-600"
                value={formData.landmark}
                onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
              />
              <input
                type="text"
                placeholder="State"
                list="stateList"
                className="input-field p-3 rounded-lg shadow-sm border border-purple-300 focus:ring-2 focus:ring-purple-600"
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
                className="input-field p-3 rounded-lg shadow-sm border border-purple-300 focus:ring-2 focus:ring-purple-600"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
              />
            </div>

            <textarea
              placeholder="Full Address"
              rows="3"
              className="input-field mt-6 p-3 w-full rounded-lg shadow-sm border border-purple-300 focus:ring-2 focus:ring-purple-600"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />

          
          </div>

          {/* Delivery & Service Section */}
          <div className="mt-5">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Delivery & Packaging Info</h3>
            <p className="text-gray-700 md:text-[17px] whitespace-pre-line">{product.range}</p>
          </div>

          <div className='mt-5'>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Occasion Ideas</h3>
          <p className="text-gray-700 md:text-[17px] whitespace-pre-line">{product.occasionIdeas}</p>

          </div>
          
           {/* FAQs */}
           <div className="mt-9">
            <h3 className="text-2xl font-bold mb-3 text-gray-800">FAQs</h3>
            <div className="space-y-3">
              {product.faqs.map((faq, idx) => (
                <div key={idx} className="border rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full flex justify-between items-center px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 font-medium text-gray-800"
                  >
                    {faq.question}
                    <span>{faqOpen === idx ? <FaMinus /> : <FaPlus />}</span>
                  </button>
                  {faqOpen === idx && (
                    <div className="px-4 py-2 text-gray-600 bg-white text-sm">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DairyMilkGarland;


        

         
      
