const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Razorpay = require('razorpay');
const crypto = require('crypto');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/babucreations', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch((err) => console.log('❌ MongoDB Error:', err));

// Razorpay Instance
const razorpay = new Razorpay({
  key_id: 'rzp_test_2K5EUlmwuZTui7',
  key_secret: 'M6rpyRdpl14Mu7ifMvzojjnc',
});

// Mongoose User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  password: String,
  phoneNumber: String,
  address: String,
  landmark: String,
  state: String,
  pincode: String,
  dob: String,
});
const User = mongoose.model('User', userSchema);

// Mongoose Order Schema
const orderSchema = new mongoose.Schema({
  productName: String,
  productId: String,
  customerName: String,
  email: String,
  phoneNumber: String,
  address: String,
  landmark: String,
  amountPaid:Number,
  state: String,
  quantity:Number,
  pincode: String,
  chocolate: String,
  razorpay_order_id: String,
  razorpay_payment_id: String,
  razorpay_signature: String,
  date: { type: Date, default: Date.now },
});
const Order = mongoose.model('Order', orderSchema);

// Root Route
app.get('/', (req, res) => {
  res.status(200).send('✅ BabuStore API is running...');
});

// Signup Route
app.post('/api/users/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send('✅ User registered successfully');
  } catch (error) {
    console.error('❌ Signup Error:', error.message);
    res.status(500).send('❌ Failed to register user');
  }
});

// Create Razorpay Order
app.post('/api/payment/orders', async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: crypto.randomBytes(10).toString('hex'),
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({ data: order });

  } catch (error) {
    console.error("❌ Razorpay Order Error:", error.stack);
    res.status(500).json({ error: "Order creation failed" });
  }
});

// Verify Payment and Save Order
app.post('/api/payment/verify', async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      productName,
      productId,
      customerName,
      email,
      phoneNumber,
      address,
      landmark,
      state,
      pincode,
      amountPaid, // 💰 Save it here
      quantity,
      chocolate
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", razorpay.key_secret)
      .update(sign)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).send("❌ Payment verification failed");
    }

    const newOrder = new Order({
      productName,
      productId,
      customerName,
      email,
      phoneNumber,
      address,
      landmark,
      state,
      quantity,
      pincode,
      amountPaid, // 💰 Save it here
      chocolate,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    await newOrder.save();
    res.status(200).send("✅ Payment verified & order saved");

  } catch (error) {
    console.error("❌ Verification Error:", error.stack);
    res.status(500).send("❌ Payment verification or order save failed");
  }
});

// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`🚀 Server running at http://localhost:${port}`));
