// // import React, { useEffect } from 'react'
// // import { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import axios from "axios"
// // import Footer from '../common/Footer';
// // import auth from '../../config/firebase';

// // function Customize() {

// //     const [blogs, setBlogs] = useState([]);
// //     const [admin,setadmin]=useState([false])

// //     useEffect(() => {
// //         window.scrollTo(0, 0);

// //         auth.onAuthStateChanged(function(user){
// //             if(user)
// //             {
// //               if(user.uid === 'LE3IR28XciS24RQ9KAXSasZqdJ72'){
// //                 setadmin(true)
// //               }
// //               else{
// //                 setadmin(false)
// //               }
// //             }
// //             else{
// //               console.log('loggedout')
// //             }
// //           })



// //         axios.get("http://localhost:5000/api/blogs").then((res) => {
// //             console.log(res.data)
// //             setBlogs(res.data)
// //         }).catch(() => {
// //             console.log("Error fetching data")
// //         })
// //     }, [])



// //     const [newTitle, setNewTitle] = useState('');
// //     const [newContent, setNewContent] = useState('');


// //     const handleLike = async (blog_id) => {
// //         try {
// //             const response = await axios.patch(`http://localhost:5000/api/blogs/like/${blog_id}`);
// //             // After successfully updating the likes count in the backend, fetch the updated list of blogs
// //             if (response.status === 200) {
// //                 axios.get("http://localhost:5000/api/blogs").then((res) => {
// //                     console.log(res.data)
// //                     setBlogs(res.data)
// //                 }).catch(() => {
// //                     console.log("Error fetching data")
// //                 })
// //             }
// //         } catch (error) {
// //             console.error('Error liking the blog post:', error);
// //         }
// //     };

// //     const handleNewBlogSubmit = (event) => {
// //         event.preventDefault(); // Prevent form from refreshing the page
// //         const today = new Date();
// //         const date = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });


// //         const likes = 0
// //         axios.post("http://localhost:5000/api/blogs", { newTitle, date, newContent, likes }).then((res) => {
// //             console.log(res.data)

// //             axios.get("http://localhost:5000/api/blogs").then((res) => {
// //                 console.log(res.data)
// //                 setBlogs(res.data)
// //             }).catch(() => {
// //                 console.log("Error fetching data")
// //             })

// //         });




// //         setNewTitle('');
// //         setNewContent('');
// //     };

// //     return (
// //         <div className="blog-section ">
// //             <div className='py-14'>

            
// //             <h2 className="text-center text-5xl font-bold mb-14">Customize  <span className='text-[#9205a2]'>your Garland</span></h2>



// //             {/* Blog creation form */}
// //             {admin?
// //             <div className="blog-creation-form mb-8" style={{ width: "80%", margin: "auto" }}>
// //                 <form onSubmit={handleNewBlogSubmit} className="flex flex-col gap-4">
// //                     <input
// //                         type="text"
// //                         placeholder="Blog Title"
// //                         value={newTitle}
// //                         onChange={(e) => setNewTitle(e.target.value)}
// //                         className="p-2 border rounded"
// //                         required
// //                     />
// //                     <textarea
// //                         placeholder="Blog Content"
// //                         value={newContent}
// //                         onChange={(e) => setNewContent(e.target.value)}
// //                         className="p-2 border rounded"
// //                         rows="4"
// //                         required
// //                     />
// //                     <button type="submit" className="bg-orange-400 text-white p-2 rounded hover:bg-orange-600">
// //                         Add Blog
// //                     </button>
// //                 </form>
// //             </div>:''}

// //             <div className="blogs-container grid grid-cols-1 md:grid-cols-2 gap-6 container mx-auto px-4">
// //                 {blogs.map((blog) => (
// //                     <div key={blog._id} className="blog-post mb-8 p-6 bg-white shadow-lg rounded-lg">
// //                         <h3 className="blog-title font-semibold text-2xl text-gray-800 mb-3">{blog.newTitle}</h3>
// //                         <p className="blog-date text-gray-400 text-sm mb-4">{blog.date}</p>
// //                         <p className="blog-content text-gray-600 mb-4">{blog.newContent}</p>
// //                         <span className="text-blue-500 cursor-pointer" onClick={() => handleLike(blog._id)}>Like</span>
// //                         <span className="ml-2">{blog.likes} Likes</span>
// //                     </div>
// //                 ))}
// //             </div>
// //             </div>

// //             <Footer/>
// //         </div>
// //     );
// // }

// // export default Customize

// import React from "react";

// const garlands = [
//   {
//     id: 1,
//     name: "Rose Chocolate Garland",
//     type: "Chocolate",
//     description: "Made with Dairy Milk and Ferrero Rocher. Perfect for birthdays.",
//     price: "₹499",
//     image: "/images/choco1.jpg",
//   },
//   {
//     id: 2,
//     name: "Elegant Currency Garland",
//     type: "Currency",
//     description: "Decorated with ₹10 and ₹20 notes with flowers.",
//     price: "₹999",
//     image: "/images/money1.jpg",
//   },
//   {
//     id: 3,
//     name: "Mix Garland",
//     type: "Mixed",
//     description: "A mix of chocolates and currency – great for celebrations.",
//     price: "₹799",
//     image: "/images/mix1.jpg",
//   },
//   // Add more items as needed
// ];

// const Customize = () => {
//   return (
//     <div className="p-4 max-w-7xl mx-auto font-sans">
//       {/* Hero Section */}
//       <div className="bg-gradient-to-r from-pink-200 to-yellow-100 p-8 text-center rounded-2xl shadow-md">
//         <h1 className="text-4xl font-bold text-pink-600">Discover Our Unique Garland Collection</h1>
//         <p className="mt-2 text-lg text-gray-700">Handcrafted with love – perfect for every celebration</p>
//       </div>

//       {/* Filter Buttons */}
//       <div className="flex justify-center gap-4 mt-6 mb-4">
//         <button className="bg-pink-500 text-white px-4 py-2 rounded-xl hover:bg-pink-600">Juice</button>
//         <button className="bg-yellow-400 text-white px-4 py-2 rounded-xl hover:bg-yellow-500">Chocolate</button>
//         <button className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600">Bangles</button>
//       </div>

//       {/* Garland Cards Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
//         {garlands.map((garland) => (
//           <div key={garland.id} className="bg-white rounded-2xl shadow-lg p-4">
//             <img
//               src={garland.image}
//               alt={garland.name}
//               className="rounded-xl h-48 w-full object-cover"
//             />
//             <h3 className="text-xl font-semibold mt-3">{garland.name}</h3>
//             <p className="text-gray-600 mt-1">{garland.description}</p>
//             <p className="text-pink-600 font-bold mt-2">{garland.price}</p>
//           </div>
//         ))}
//       </div>

//       {/* Custom Order Banner */}
//       <div className="bg-pink-100 mt-10 p-6 rounded-2xl text-center shadow-md">
//         <h2 className="text-2xl font-bold text-pink-700">Need a Custom Design?</h2>
//         <p className="text-gray-700 mt-2">
//           We also take personalized orders – mix chocolates, money, flowers & more!
//         </p>
//         <button className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600">
//           Contact Us
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Customize;
