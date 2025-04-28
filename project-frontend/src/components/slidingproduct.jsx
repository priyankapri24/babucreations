import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'Dairymilk Garland',
    price: '₹999',
    image: '/images/choco1.jpg',
    link: '/dairymilkgarland',
  },
  {
    id: 2,
    name: 'Wedding combos',
    price: '₹3100',
    image: '/images/currency1.jpg',
    link: '/weddingcombo',
  },
  {
    id: 3,
    name: 'Chocolate crown',
    price: '₹799',
    image: '/images/combo1.jpg',
    link: '/chocolatecrown',
  },
  // Add more product objects as needed
];

function SlidingProducts() {
  const navigate = useNavigate();

  return (
    <div className="my-9 max-w-[1400px] mx-auto">
      <h2 className="text-2xl font-bold mb-5 text-center text-[#5f1567]">Our Exclusive Products</h2>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={19}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
        }}
        loop={true}
      >
        {products.map(product => (
          <SwiperSlide key={product.id}>
            <div
              className="bg-white rounded-2xl shadow-lg p-4 text-center transform transition duration-300 hover:scale-105 mt-5 mb-5 cursor-pointer"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                navigate(product.link);
              }}
            >
              <img src={product.image} alt={product.name} className="h-52 object-cover rounded-xl w-full" />
              <h3 className="text-lg font-semibold mt-3">{product.name}</h3>
              <p className="text-purple-700 font-bold">{product.price}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SlidingProducts;
