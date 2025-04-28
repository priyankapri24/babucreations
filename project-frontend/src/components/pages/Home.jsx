import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../common/Footer';
import SlidingProducts from '../slidingproduct';
import Bestproductlist from '../Bestproductlist';
import Customize from './Customize';
import DiscountBox from '../discountbox';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className=''>
        <DiscountBox/>
      <SlidingProducts />
      <Bestproductlist />
      {/* <WhatsappWidget/> */}

      <div className='flex items-center justify-center my-14'>
        <div className='justify-center hidden sm:block'>
          <img className='w-60 md:w-96 ' alt="Blog Profile Image" />
        </div>

        <div className="w-full sm:w-1/2 flex-col justify-center ml-6">
          <h2 className='text-3xl md:text-6xl font-bold pb-2'>Click here see</h2>
          <h2 className='text-4xl md:text-7xl font-bold text-[#9205a2] py-2'>Combo offers !</h2>

          <p className='py-2'>Want something unique? You can personalize your garland with your favorite chocolates, currency notes, and colors.</p>
          <button className='button-style mt-2' 
          onClick={() =>{
            navigate("/combo");
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
            
          }>know more</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
