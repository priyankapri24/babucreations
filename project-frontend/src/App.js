import Home from "./components/pages/Home";
import Navbar from "./components/common/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import CartPage from "./components/pages/Cart";
import ProductsPage from "./components/pages/Products";
import ContactUs from "./components/pages/ContactUs";
import ComboPage from "./components/pages/combopage";
import WeddingComboPage from "./components/items/weddingcombo";
import BirthdayComboPage from "./components/items/birthdaycombo";
import DairyMilkGarland from "./components/items/dairymilkgarland";
import Fivestargarland from "./components/items/fivestargarland";
import Kitkatgarland from "./components/items/kitkatgarland";
import Sandlegarland from "./components/items/sandlegarland";
import Chocolatebouquet from "./components/items/chocolatebouquet";
import Chocolatecrown from "./components/items/chocolatecrown";

import WhatsappButton from "./components/common/whatsappbutton";

import { CartProvider } from "./components/CartContext";



function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-purple-200">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dairymilkgarland" element={<DairyMilkGarland />} />
            <Route path="/fivestargarland" element={<Fivestargarland />} />
            <Route path="/kitkatgarland" element={<Kitkatgarland />} />
            <Route path="/sandlegarland" element={<Sandlegarland />} />
            <Route path="/chocolatecrown" element={<Chocolatecrown />} />
            <Route path="/chocolatebouquet" element={<Chocolatebouquet />} />
            <Route path="/weddingcombo" element={<WeddingComboPage />} />
            <Route path="/birthdaycombo" element={<BirthdayComboPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/Contactus" element={<ContactUs />} />
            <Route path="/combo" element={<ComboPage />} />
            <Route path="/productspage" element={<ProductsPage />} />
            <Route path="*" element={<h1 className="text-center text-2xl">404 - Page Not Found</h1>} />
          </Routes>
        </BrowserRouter>
        <WhatsappButton />
      </div>
    </CartProvider>
  );
}
export default App;