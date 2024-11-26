import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
    file: null,
  });
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setInput((prev) => ({ ...prev, file: e.target.files?.[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!input.fullname || !input.email || !input.phoneNumber || !input.password || !input.role) {
      return toast.error('Please fill all required fields.');
    }

    if (input.file && !input.file.type.startsWith('image/')) {
      return toast.error('Please upload a valid image file.');
    }

    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('password', input.password);
    formData.append('role', input.role);
    if (input.file) {
      formData.append('file', input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Signup failed.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-50 py-10 px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 space-y-6"
        >
          <h1 className="text-2xl font-bold text-center text-gray-800">Sign Up</h1>

          {/* Full Name */}
          <div>
            <Label htmlFor="fullname" className="text-gray-700">
              Full Name
            </Label>
            <Input
              type="text"
              id="fullname"
              name="fullname"
              value={input.fullname}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-gray-700">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone Number */}
          <div>
            <Label htmlFor="phoneNumber" className="text-gray-700">
              Phone Number
            </Label>
            <Input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password" className="text-gray-700">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={input.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Role Selection */}
          <div>
            <Label className="text-gray-700">Role</Label>
            <RadioGroup className="flex gap-4 mt-2">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  id="student"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={handleChange}
                  className="cursor-pointer"
                />
                <Label htmlFor="student" className="text-gray-700">
                  Student
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  id="recruiter"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={handleChange}
                  className="cursor-pointer"
                />
                <Label htmlFor="recruiter" className="text-gray-700">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Profile Picture */}
          <div>
            <Label htmlFor="file" className="text-gray-700">
              Profile Picture
            </Label>
            <Input
              type="file"
              id="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2 w-full p-2 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button className="w-full flex items-center justify-center bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
            >
              Signup
            </Button>
          )}

          {/* Login Link */}
          <p className="text-sm text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
