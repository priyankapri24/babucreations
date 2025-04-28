import React from 'react'
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className= " bg-[#9205a2] text-white py-8 mt-10  ">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 ">Babu Creations</h2>
          <p className="text-sm ">
            Quality you can trust. Serving you the best chocolate and currency garlands for all occasions.
          </p>
        </div>

        {/* Quick Links */}
        <div onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' })}}>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/home" className="hover:underline">Home</Link></li>
            <li><Link to="/productspage" className="hover:underline">Products</Link></li>
            <li><Link to="/combo" className="hover:underline">Combos</Link></li>
            <li><Link to="/Contactus" className="hover:underline">ContactUs</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="text-sm">Email: babustores@gmail.com</p>
          <p className="text-sm">Phone: +91 9840357974</p>
          <a className='text-sm' href='https://g.co/kgs/nLQ6LZS'>Location</a>
          {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d971.6084606629177!2d80.12403771579153!3d13.071668200000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526195b60394df%3A0x7267f909d6c373b8!2sbabu%20nattumarandu%20kadai!5e0!3m2!1sen!2sin!4v1713524584418!5m2!1sen!2sin" width="200" height="200" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}

          <p className="text-sm mt-2">© {new Date().getFullYear()} Babu Stores. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}



export default Footer