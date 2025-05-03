import React, { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
interface RegisterFormProps {
  onSubmit: (username: string, email: string, password: string) => void;
  error?: string;
}
export const RegisterForm = ({
  onSubmit,
  error
}: RegisterFormProps) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(true);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(username, email, password);
  };
  return <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-100">
      <div className={`relative w-[850px] h-[550px] bg-white rounded-[30px] shadow-lg overflow-hidden m-5 ${isActive ? 'active' : ''}`}>
        {/* Form Box */}
        <div className="absolute right-0 w-1/2 h-full bg-white flex items-center text-gray-800 text-center p-10 z-10 transition-all duration-600 ease-in-out delay-[1.2s]">
          <form onSubmit={handleSubmit} className="w-full">
            <h1 className="text-4xl font-semibold mb-8">Registration</h1>
            <div className="relative my-8">
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="w-full py-3 px-5 pr-12 bg-gray-100 rounded-lg border-none outline-none text-base font-medium" required />
              <User className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            <div className="relative my-8">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full py-3 px-5 pr-12 bg-gray-100 rounded-lg border-none outline-none text-base font-medium" required />
              <Mail className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            <div className="relative my-8">
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full py-3 px-5 pr-12 bg-gray-100 rounded-lg border-none outline-none text-base font-medium" required />
              <Lock className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button type="submit" className="w-full h-12 bg-blue-500 rounded-lg shadow text-white text-base font-semibold hover:bg-blue-600 transition-colors">
              Register
            </button>
            <p className="text-sm text-gray-600 my-4">
              or register using google account
            </p>
            <div className="flex justify-center">
              <a href="#" className="p-2.5 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-6 h-6" />
              </a>
            </div>
          </form>
        </div>
        {/* Toggle Box */}
        <div className="absolute w-full h-full">
          <div className="absolute w-[300%] h-full left-[50%] bg-blue-500 rounded-[150px] z-20 transition-all duration-[1.8s] ease-in-out"></div>
          {/* Right Toggle Panel */}
          <div className="absolute right-0 w-1/2 h-full text-white flex flex-col justify-center items-center z-20 transition-all duration-600 ease-in-out delay-[1.2s]">
            <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
            <p className="mb-8">Already have an account?</p>
            <Link to="/login" className="w-40 h-12 border-2 border-white rounded-lg flex items-center justify-center text-white font-semibold hover:bg-white hover:text-blue-500 transition-colors">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>;
};