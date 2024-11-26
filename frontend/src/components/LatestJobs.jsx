import React from 'react';  
import LatestJobCards from './LatestJobCards';  
import { useSelector } from 'react-redux';  

const LatestJobs = () => {  
    const { allJobs } = useSelector(store => store.job);  

    return (  
        <div className="container mx-auto px-4 py-8">  
            <h2 className="text-2xl font-bold text-center mb-6">Latest & Top Job Openings</h2>  
            {allJobs.length <= 0 ? (  
                <p className="text-center text-gray-500">No Jobs Available</p>  
            ) : (  
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">  
                    {allJobs.slice(0, 6).map((job) => (  
                        <LatestJobCards key={job.id} job={job} />  
                    ))}  
                </div>  
            )}  
        </div>  
    );  
};  

export default LatestJobs;