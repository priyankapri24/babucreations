
import React from "react";
import { useCart } from "./CartContext";
import { useNavigate } from 'react-router-dom';

// Card Component
const BestproductCard = ({ image, title, description, price, originalPrice, id, link }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Prevent card click when "Add to Cart" button is clicked
  const handleAddToCart = (e) => {
    e.stopPropagation();  // Prevent card click navigation
    console.log("Adding to cart:", title);
    addToCart({ image, title, description, price, id });
  };

  // Navigate to detail page if link exists
  const handleCardClick = () => {
    if (link) navigate(link);
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <img className="w-full h-40 md:h-60 object-cover" src={image} alt={title} />
      <div className="p-4">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <h2 className="text-base md:text-lg font-bold text-green-600">₹{price}
          <span className="ml-2 font-normal text-red-500 text-sm line-through ">₹{originalPrice}</span>

          </h2>
          <button
            onClick={handleAddToCart}
            className="px-4 py-1 bg-[#9205a2] text-white rounded-full hover:bg-[#f269ffb9] transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

// Product List
function Bestproductlist() {
  const products = [
    {
      id: 1,
      image: "https://via.placeholder.com/300x200",
      title: "Fivestar Garland",
      description: "Sweet 5 Star chocolate garland for special occasions.",
      price: 999,
      originalPrice: 1199, // Original price before discount
      link: "/fivestargarland"
    },
    {
      id: 2,
      image: "https://via.placeholder.com/300x200",
      title: "Kitkat Garland",
      description: "Crispy KitKat garland, a fun, sweet treat",
      price: 1199,
      originalPrice: 1399, // Original price before discount
      link: "/kitkatgarland"
    },
    {
      id: 3,
      image: "https://via.placeholder.com/300x200",
      title: "Chocolate Crown",
      description: "Luxurious chocolate crown, perfect for royal celebrations.",
      price: 799,
      originalPrice: 995, // Original price before discount
      link: "/chocolatecrown"
    },
    {
      id: 4,
      image: "https://via.placeholder.com/300x200",
      title: "Dairymilk Garland",
      description: "Delicious Dairy Milk garland, perfect for celebrations.",
      price: 999,
      originalPrice: 1299, // Original price before discount
      link: "/dairymilkgarland"
    },
    {
      id: 5,
      image: "https://via.placeholder.com/300x200",
      title: "Chocolate Bouquet",
      description: "Beautiful chocolate bouquet, a delightful gift for occasions.",
      price: 699,
      originalPrice: 899, // Original price before discount
      link: "/chocolatebouquet"
    },
    {
      id: 6,
      image: "https://via.placeholder.com/300x200",
      title: "Sandle Garland",
      description: "Creative Sandle Garland, sweet gift for special moments.",
      price: 190,
      originalPrice: 249, // Original price before discount
      link: "/sandlegarland"
    },
    // Add more products as needed
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-9 text-[#730280]">Best Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" 
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      >
        {products.map((product) => (
          <BestproductCard
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            description={product.description}
            price={product.price}
            originalPrice={product.originalPrice}
            link={product.link}
          />
        ))}
      </div>
    </div>
  );
}

export default Bestproductlist;
