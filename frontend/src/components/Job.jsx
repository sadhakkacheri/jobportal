import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="p-6 rounded-lg shadow-md bg-white border border-gray-200 hover:shadow-lg transition-shadow">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? 'Today'
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full hover:bg-gray-100" size="icon">
          <Bookmark className="h-5 w-5 text-gray-600" />
        </Button>
      </div>

      {/* Company Information */}
      <div className="flex items-center gap-4 mb-4">
        <Avatar className="w-14 h-14">
          <AvatarImage src={job?.company?.logo} alt={`${job?.company?.name} Logo`} />
        </Avatar>
        <div>
          <h1 className="font-medium text-lg text-gray-800">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      {/* Job Details */}
      <div className="mb-4">
        <h1 className="font-semibold text-xl text-gray-800 mb-2">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
      </div>

      {/* Job Attributes */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <Badge className="bg-blue-100 text-blue-700 font-medium py-1 px-3 rounded-lg">
          {job?.position} Positions
        </Badge>
        <Badge className="bg-red-100 text-red-600 font-medium py-1 px-3 rounded-lg">
          {job?.jobType}
        </Badge>
        <Badge className="bg-purple-100 text-purple-700 font-medium py-1 px-3 rounded-lg">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="w-full sm:w-auto hover:bg-gray-100 transition"
        >
          Details
        </Button>
        <Button className="w-full sm:w-auto bg-purple-700 text-white hover:bg-purple-800 transition">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
