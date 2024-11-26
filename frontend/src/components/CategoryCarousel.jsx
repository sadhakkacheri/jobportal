import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Briefcase } from 'lucide-react';

const category = [
    {
        title: "Frontend Developer",
        icon: "💻"
    },
    {
        title: "Backend Developer",
        icon: "⚙️"
    },
    {
        title: "Data Science",
        icon: "📊"
    },
    {
        title: "Graphic Designer",
        icon: "🎨"
    },
    {
        title: "FullStack Developer",
        icon: "🚀"
    }
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
            {/* Section Header */}
            <div className="text-center mb-10 max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Popular Categories
                </h2>
                <p className="text-gray-600">
                    Explore opportunities in trending job categories
                </p>
            </div>

            {/* Carousel */}
            <Carousel 
                className="w-full max-w-4xl mx-auto"
                opts={{
                    align: "center",
                    loop: true,
                }}
            >
                <CarouselContent className="-ml-2 md:-ml-4">
                    {category.map((cat, index) => (
                        <CarouselItem 
                            key={index} 
                            className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                        >
                            <Button
                                onClick={() => searchJobHandler(cat.title)}
                                variant="outline"
                                className="w-full h-full min-h-[100px] rounded-xl border-2 border-gray-200 
                                hover:border-purple-500 hover:bg-purple-50 transition-all duration-300
                                flex flex-col items-center justify-center gap-3 p-6 group"
                            >
                                <span className="text-2xl transition-transform duration-300 group-hover:scale-125">
                                    {cat.icon}
                                </span>
                                <span className="font-medium text-gray-700 group-hover:text-purple-700 
                                transition-colors duration-300 text-center">
                                    {cat.title}
                                </span>
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious 
                    className="hidden md:flex -left-12 hover:bg-purple-100 hover:text-purple-700
                    border-gray-200 hover:border-purple-300 transition-all duration-300"
                />
                <CarouselNext 
                    className="hidden md:flex -right-12 hover:bg-purple-100 hover:text-purple-700
                    border-gray-200 hover:border-purple-300 transition-all duration-300"
                />
            </Carousel>

            {/* Navigation Dots for Mobile */}
            <div className="flex justify-center gap-2 mt-6 md:hidden">
                {category.map((_, index) => (
                    <div
                        key={index}
                        className="w-2 h-2 rounded-full bg-gray-300 transition-all duration-300"
                    />
                ))}
            </div>
        </div>
    );
}

export default CategoryCarousel;