import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate('/browse');
    };

    return (
        <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-indigo-50/90 via-white to-white">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-purple-100/50 blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-indigo-100/50 blur-3xl"></div>
            </div>

            {/* Main content */}
            <div className="relative px-4 py-16 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
                <div className="flex flex-col items-center gap-8 max-w-3xl mx-auto">
                    {/* Badge */}
                    <span className="inline-flex items-center px-6 py-2.5 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm tracking-wide shadow-sm transform hover:scale-105 transition-transform duration-200 cursor-default">
                        No. 1 Job Hunt Website
                    </span>

                    {/* Heading */}
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                            Search, Apply & <br />
                            Get Your{' '}
                            <span className="text-purple-700 relative">
                                Dream Job
                                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
                                    <path d="M0 7c30-7 70-7 100 0" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                                </svg>
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                            Explore opportunities that align with your skills and aspirations. 
                            Find the perfect role for you today!
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="w-full max-w-2xl mt-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder="Find your dream jobs"
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="w-full px-6 py-4 text-lg rounded-full border-2 border-gray-200 
                                    shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                                    transition-all duration-200 placeholder-gray-400"
                                />
                            </div>
                            <Button
                                onClick={searchJobHandler}
                                className="px-8 py-4 rounded-full bg-purple-600 hover:bg-purple-700 
                                text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 
                                transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                <Search className="h-5 w-5" />
                                <span className="hidden sm:inline">Search Jobs</span>
                            </Button>
                        </div>
                    </div>

                    {/* Optional: Stats or trust indicators */}
                    <div className="flex flex-wrap justify-center gap-8 mt-8 text-center">
                        {['1M+ Jobs Posted', '500K+ Companies', '10M+ Job Seekers'].map((stat) => (
                            <div key={stat} className="px-6 py-2 bg-white/80 rounded-full shadow-sm">
                                <span className="text-sm font-medium text-gray-600">{stat}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;