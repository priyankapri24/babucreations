import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import auth from '../config/firebase'
 
 
function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[err,seterr]=useState('');

    useEffect(() => {
        window.scrollTo(0, 0);

        auth.onAuthStateChanged(function(user){
            if(user)
            {
              navigate('/home')
            }
            
          })

    }, []);



    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth,email,password).then((res)=>{
            navigate('/home')
        }).catch(()=>{
            seterr('error sigining in pls try again')
        })
    
    };

    

    return (
        <div className="flex justify-center items-center  bg-purple-200 my-32">
            <form onSubmit={handleLogin} className="p-10 bg-slate-50 rounded-lg shadow-2xl" style={{ width: "75%" }}>
                <h2 className="text-2xl font-bold mb-5 text-[#730280]">Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border rounded"
                    />
                </div>

                <p className='text-red-600 cursor-pointer my-2'>{err}</p>

                <p className='text-purple-900 cursor-pointer my-4' onClick={() => navigate("/signup")}>New user? Register here</p>
                <button type="submit" className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition duration-200 ease-in-out">Login</button>

            </form>
        </div>
    );
}

export default Login;


