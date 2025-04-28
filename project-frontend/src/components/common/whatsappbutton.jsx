
import React from 'react';

const WhatsappButton = () => {
  return (
    <a
      href="https://wa.me/916374231825"
      className="fixed bottom-8 right-5 z-50 animate-bounce-custom"
      target="_blank"
      rel="noopener noreferrer" 
    >
      <div className=" p-2 rounded-full hover:scale-110 transition-transform duration-300">
        <img
          src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
          alt="Chat on WhatsApp"
          className="w-10 h-10 md:h-14 md:w-14"
        />
      </div>
    </a>
  );
};

export default WhatsappButton;
