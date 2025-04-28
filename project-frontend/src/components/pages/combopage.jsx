import Footer from '../common/Footer';
import { useNavigate } from 'react-router-dom';

import React from 'react';
import WeddingComboPage from '../items/weddingcombo';


const combos = [
  {
    title: '💍 Wedding Combos',
    description: 'Make wedding celebrations extra special with our elegant wedding garland combos.',
    items: [
      ' customized chocolate garlands',
      'Matching color themes',
      '4 products',
    ],
    perfectFor: 'Engagements, Sangeet, Wedding Day, and Reception',
    button: 'Customize yours now!',
    image: '/images/wedding-combo.jpg', 
    link: '/weddingcombo', // for wedding


  },
  {
    title: '🎉 Birthday Combos',
    description: 'Celebrate birthdays in style with our fun and festive birthday combos!',
    link: '/birthdaycombo', // for birthday
    items: [
      'customized Chocolate garlands',
      'Colorful ribbons and sparkles',
      '2 products',
    ],
    perfectFor: 'Kids, Teens, Adults – anyone who loves sweet surprises!',
    button: 'Customize yours now!',
    image: '/images/birthday-combo.jpg',
  },
  
];

export default function ComboPage() {
    const navigate = useNavigate();

   console.log(combos.title)
  return (
    <div>

    
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-10">🌸 Combo Collections</h1>
      <p className="text-center text-lg text-gray-600 mb-12">
        Explore our handcrafted garlands — perfect for weddings, birthdays, and custom celebrations!
      </p>

      <div className="grid md:grid-cols-2 gap-8" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' })}}>
        {combos.map((combo, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all">
            <img
              src={combo.image}
              alt={combo.title}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h2 className="text-2xl font-semibold mb-2">{combo.title}</h2>
            <p className="mb-3 text-gray-700">{combo.description}</p>
            <ul className="list-disc list-inside mb-3 text-gray-600">
              {combo.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="italic text-sm text-gray-500 mb-4">Perfect for: {combo.perfectFor}</p>
            <button onClick={() => navigate(combo.link)} className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition">
              {combo.button}  
            </button>
            
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <h3 className="text-xl font-bold">✨ Why Choose Us?</h3>
        <ul className="text-gray-700 mt-4 space-y-2">
          <li>✔️ 100% Handmade with love</li>
          <li>✔️ Fully customizable themes</li>
          <li>✔️ Premium quality chocolates & currency</li>
          <li>✔️ Fast delivery & elegant packaging</li>
        </ul>
      </div>
    </div>
    <Footer/>
    </div>
  );
}

