import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-md">
            <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
                {/* Logo Section */}
                <div>
                    <h1 className="text-2xl font-bold text-white">
                        Job<span className="text-yellow-400">Portal</span>
                    </h1>
                </div>

                {/* Links Section */}
                <div className="hidden md:flex items-center gap-12">
                    <ul className="flex font-medium items-center gap-6 text-white">
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li>
                                    <Link
                                        to="/admin/companies"
                                        className="hover:text-yellow-300 transition-colors duration-200"
                                    >
                                        Companies
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/admin/jobs"
                                        className="hover:text-yellow-300 transition-colors duration-200"
                                    >
                                        Jobs
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        to="/"
                                        className="hover:text-yellow-300 transition-colors duration-200"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/jobs"
                                        className="hover:text-yellow-300 transition-colors duration-200"
                                    >
                                        Jobs
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/browse"
                                        className="hover:text-yellow-300 transition-colors duration-200"
                                    >
                                        Browse
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* Authentication Buttons */}
                    {!user ? (
                        <div className="flex items-center gap-4">
                            <Link to="/login">
                                <Button variant="outline" className="text-black border-white hover:bg-white hover:text-indigo-600">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-yellow-400 hover:bg-yellow-300 text-indigo-600">
                                    Signup
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 bg-white shadow-lg border rounded-md p-4">
                                <div>
                                    <div className="flex gap-3 mb-4">
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                        </Avatar>
                                        <div>
                                            <h4 className="font-medium text-gray-800">{user?.fullname}</h4>
                                            <p className="text-sm text-gray-600">{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3 text-gray-700">
                                        {user && user.role === 'student' && (
                                            <div className="flex items-center gap-2 cursor-pointer">
                                                <User2 className="text-gray-600" />
                                                <Link to="/profile">
                                                    <Button variant="link" className="text-indigo-600 hover:underline">
                                                        View Profile
                                                    </Button>
                                                </Link>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2 cursor-pointer">
                                            <LogOut className="text-gray-600" />
                                            <Button
                                                onClick={logoutHandler}
                                                variant="link"
                                                className="text-indigo-600 hover:underline"
                                            >
                                                Logout
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden flex items-center">
                    {/* TODO: Add mobile menu toggle here */}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
