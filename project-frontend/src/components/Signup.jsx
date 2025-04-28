import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from '../config/firebase';
import Footer from './common/Footer';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [landmark, setLandmark] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [dob, setDob] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
  
    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged(function (user) {
            if (user) {
                navigate('/home');
            }
        });
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (res) => {
                console.log('User created:', res.user);

                try {
                    await axios.post('http://localhost:5000/api/users/register', {
                        name,
                        email,
                        password,
                        phoneNumber,
                        address,
                        landmark,
                        state,
                        pincode,
                        dob,
                    });
                    navigate('/login');
                } catch (backendError) {
                    console.error('Error saving user to DB:', backendError.message);
                    setError('Signup succeeded, but failed to save user info to database.');
                }
            })
            .catch((err) => {
                console.error('Signup failed:', err.message);
                setError(err.message);
            });
    };

    return (
        <div>
            <div className="flex justify-center items-center bg-purple-200">
                <form onSubmit={handleSubmit} className="p-10 bg-slate-50 rounded-lg my-20 shadow-lg w-[70%]">
                    <h2 className="text-2xl font-bold mb-5 text-[#730280]">Sign Up</h2>

                    {/* Name */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Name:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 p-2 w-full border rounded" />
                    </div>

                    {/* Phone Number */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Phone Number:</label>
                        <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required className="mt-1 p-2 w-full border rounded" />
                    </div>



                    {/* Address */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Deleviry Address:</label>
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required className="mt-1 p-2 w-full border rounded" />
                    </div>

                    <div className="mb-4 flex gap-4">
                        {/* State */}
                        <div className="w-1/2">
                            <label className="block text-gray-700">State:</label>
                            <input type="text" value={state} onChange={(e) => setState(e.target.value)} required className="mt-1 p-2 w-full border rounded" />
                        </div>

                        {/* Landmark */}
                        <div className="w-1/2">
                            <label className="block text-gray-700">Landmark:</label>
                            <input type="text" value={landmark} onChange={(e) => setLandmark(e.target.value)} className="mt-1 p-2 w-full border rounded" />
                        </div>
                    </div>


                    {/* Pincode & DOB */}
                    <div className="mb-4 flex gap-4">
                        <div className="w-1/2">
                            <label className="block text-gray-700">Pincode:</label>
                            <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} required className="mt-1 p-2 w-full border rounded" />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-gray-700">Date of Birth:</label>
                            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required className="mt-1 p-2 w-full border rounded" />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 p-2 w-full border rounded" />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 p-2 w-full border rounded" />
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Confirm Password:</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="mt-1 p-2 w-full border rounded" />
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>

                    <p className="text-purple-900 cursor-pointer my-4" onClick={() => navigate("/login")}>
                        Already have an account? Login here
                    </p>

                    <button type="submit" className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition duration-200 ease-in-out">
                        Register
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default Signup;

