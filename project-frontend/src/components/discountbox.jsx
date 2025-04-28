import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6"; // Font Awesome X icon

const DiscountBox = () => {
  const [showBanner, setShowBanner] = useState(true);

  if (!showBanner) return null;

  return (
    <div className="w-full bg-[#700a8d] text-white flex justify-between items-center px-4 py-2 text-sm sm:text-base z-20">
      {/* <p className="text-center w-full font-medium">
        Sign Up and <b>GET 20% OFF</b> for your first Order
      </p> */}
      <p className="text-center w-full font-medium">
        find your perfect garland at your pace ;)
      </p>
      <button
        onClick={() => setShowBanner(false)}
        className="text-white text-lg absolute right-4"
      >
        <FaXmark />
      </button>
    </div>
  );
};

export default DiscountBox;
