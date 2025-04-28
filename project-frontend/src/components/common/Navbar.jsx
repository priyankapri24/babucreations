import React, { useEffect, useState } from 'react';
import "./Navbar.css";
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../config/firebase';
import { signOut } from 'firebase/auth';
import ContactUs from '../pages/ContactUs';
import Sidenav from './sidenav';
import { useCart } from '../CartContext';


// @import url('https://fonts.googleapis.com/css2?family=Playwrite+NZ:wght@100..400&family=Poetsen+One&family=Satisfy&display=swap');


function Navbar() {
  const navigate = useNavigate();
  const [log, setlog] = useState(false);
  const { cart } = useCart(); // 🛒 get cart from context

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(function (user) {
      if (user) {
        setlog(true);
        console.log('logged in');
      } else {
        setlog(false);
        console.log('logged out');
      }
    });

    return () => unsubscribe(); // cleanup listener
  }, []);

  function logout() {
    signOut(auth);
  }

  return (
    <div className='z-30 sticky top-0'>
      <div className='pl-7 py-4 pb-4 pr-6 flex justify-between items-center shadow-2xl bg-purple-300 sticky top-0 '>
        <div>
          <h2 className='text-2xl md:text-3xl text-[#4d025ae0] font-rowdies'>Babu <span className='text-[#9909b3e0]'>Creations</span></h2>
          
        </div>

        <div className='md:flex items-center text-[18px] hidden' onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' })}}>
          <Link className='list-none px-5 hover:underline hover:text-[#730280]' to="/home" >Home</Link>
          <Link className='list-none px-5 hover:underline hover:text-[#730280]' to="/productspage">Products</Link>
          <Link className='list-none px-5 hover:underline hover:text-[#730280]' to="/combo">Combos</Link>
          <Link className='list-none px-5 hover:underline hover:text-[#730280]' to="/Contactus">ContactUs</Link>
        </div>

        <Sidenav />

        {/* Grouped Cart Icon and Login/Logout Button */}
        <div className='flex items-center'>
          {/* Cart Icon */}
          <div className='relative right-8 top-1 md:top-0 md:right-3' onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' })}}>
            <Link to="/cart">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7 md:size-10 items-center">
                <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
              </svg>

              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] md:text-[px] rounded-full px-1 md:px-[7px] md:py-[2px] ">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>

          {/* Login/Logout Button */}
          {log ? (
            <button onClick={logout} className='button-style hidden md:block ml-4'>Logout</button> // Add margin-left for spacing
          ) : (
            <button className='button-style hidden md:block ml-4' onClick={() => navigate("/login")}>Login</button> // Add margin-left for spacing
          )}
        </div>

      </div>
    </div>
  );
}

export default Navbar;
