import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../config/firebase';
import { signOut } from 'firebase/auth';

function Sidenav() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [log, setLog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLog(!!user);
      console.log(user ? 'logged in' : 'logged out');
    });

    return () => unsubscribe();
  }, []);

  const logout = () => {
    signOut(auth).then(() => {
      console.log("User signed out");
      navigate('/login');
    });
  };

  return (
    <div className='fixed top-5 right-5 md:hidden z-30'>
      <button className='text-3xl' onClick={() => setIsNavOpen(true)}>☰</button>

      {/* Sidenav */}
      <div
        className={`bg-purple-100 fixed top-0 right-0 h-screen w-[60%] z-40 p-6 transition-transform duration-500 ${
          isNavOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="text-right">
          <button className="text-xl font-bold" onClick={() => setIsNavOpen(false)}>✕</button>
        </div>

        <nav className="mt-10 flex flex-col gap-7 items-center font-medium">
          <Link to="/home" onClick={() => setIsNavOpen(false)}>Home</Link>
          {/* <Link to="/customize" onClick={() => setIsNavOpen(false)}>Customize</Link> */}
          <Link to="/productspage" onClick={() => setIsNavOpen(false)}>Products</Link>
          <Link to="/combo" onClick={() => setIsNavOpen(false)}>Combos</Link>
          <Link to="/Contactus" onClick={() => setIsNavOpen(false)}>Contact Us</Link>

          {log ? (
            <button  onClick={logout} className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition">
              Logout
            </button>
          ) : (
            <button onClick={() => {
              setIsNavOpen(false);
              navigate('/login');
            }} className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition">
              Login
            </button>
          )}
        </nav>
      </div>
    </div>
  );
}

export default Sidenav;
