import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import Footer from '../common/Footer';

const productsData = [
  {
    id: 1,
    title: "Dairymilk Garland",
    description: "Delicious Dairy Milk chocolates crafted into a stunning garland, a perfect treat for any occasion.",
    price: 999, // Discounted price
    originalPrice: 1299, // Original price before discount
    category: "chocolate",
    image: "https://via.placeholder.com/300x200",
    link: "/dairymilkgarland",
  },
  {
    id: 2,
    title: "Fivestar Garland",
    description: "Elegant 5 Star chocolate garland, a perfect gift for celebrations, combining sweetness and beauty beautifully.",
    price: 999, // Discounted price
    originalPrice: 1199, // Original price before discount
    category: "currency",
    image: "https://via.placeholder.com/300x200",
    link: "/fivestargarland",
  },
  {
    id: 3,
    title: "Kitkat Garland",
    description: "Fun and crunchy KitKat chocolate garland, ideal for gifting during birthdays, anniversaries, or special events.",
    price: 1199,
    originalPrice: 1399, // Original price before discount

    category: "combo",
    image: "https://via.placeholder.com/300x200",
    link: "/kitkatgarland",
  },
  {
    id: 4,
    title: "Chocolate crown",
    description: "Luxurious chocolate crown made with premium chocolates, perfect for making any occasion feel regal and sweet.",
    price: 799,
    originalPrice: 995, // Original price before discount

    category: "flower",
    image: "https://via.placeholder.com/300x200",
    link: "/chocolatecrown",
  },
  {
    id: 5,
    title: "Chocolate Bouquet",
    description: "Beautifully crafted chocolate bouquet chocolates, perfect for impressing loved ones on any special day.",
    price: 699,
    originalPrice: 899, // Original price before discount

    category: "chocolate",
    image: "https://via.placeholder.com/300x200",
    link: "/chocolatebouquet",
  },
  {
    id: 6,
    title: "Sandle Garland",
    description: "Unique Sandle Garland featuring chocolates, a thoughtful and creative gift idea for special celebrations or occasions.",
    price: 190,
    originalPrice: 249, // Original price before discount

    category: "currency",
    image: "https://via.placeholder.com/300x200",
    link: "/sandlegarland",
  },
];

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const { addToCart } = useCart();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filterProducts = () => {
    const searchTermLower = searchTerm.toLowerCase();
    const filtered = productsData.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTermLower) ||
        product.category.toLowerCase().includes(searchTermLower)
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    filterProducts();
  }, [searchTerm]);

  return (
    <div>
      <div className="p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#730280] mb-6">
          Products
        </h1>

        {/* Search Bar */}
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search for products..."
            className="px-3 py-2 border border-gray-300 rounded-lg w-full max-w-md"
          />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' })}}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link to={product.link || "#"} key={product.id}>
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <img
                    className="w-full h-32 sm:h-40 md:h-60 object-cover"
                    src={product.image}
                    alt={product.title}
                  />
                  <div className="p-3 sm:p-4">
                    <h2 className="text-base md:text-lg font-semibold text-gray-800">
                      {product.title}
                    </h2>
                    <p className="hidden md:block text-gray-500 mt-1">
                      {product.description}
                    </p>
                    <div className="block mt-2 md:mt-3">
                      <h1 className=" md:text-xl font-bold text-green-600">
                        ₹{product.price}<span className="ml-2 font-normal text-red-500 text-sm line-through ">₹{product.originalPrice}</span> </h1>
                      
                      <button
                        onClick={(e) => {
                          e.preventDefault(); // Prevent Link navigation
                          addToCart(product);
                        }}
                        className="px-3 sm:px-4 mt-4 py-1 sm:py-1.5 bg-[#9205a2] text-white text-sm md:text-[18px] rounded-full hover:bg-[#d048dcb9] transition"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              <p>No products found based on your search.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;
