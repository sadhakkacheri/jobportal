import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isInitiallyApplied =
    singleJob?.applications?.some((application) => application.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{singleJob?.title}</h1>
          <div className="flex items-center gap-3 mt-4 flex-wrap">
            <Badge className="bg-blue-100 text-blue-700 font-medium">{singleJob?.postion} Positions</Badge>
            <Badge className="bg-red-100 text-[#F83002] font-medium">{singleJob?.jobType}</Badge>
            <Badge className="bg-purple-100 text-[#7209b7] font-medium">{singleJob?.salary}LPA</Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`px-6 py-2 rounded-lg ${
            isApplied
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-[#7209b7] hover:bg-[#5f32ad] text-white'
          }`}
        >
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>

      {/* Divider */}
      <div className="my-6 border-b border-gray-300"></div>

      {/* Job Details Section */}
      <div className="space-y-4">
        <h1 className="text-lg font-medium text-gray-700 border-b border-gray-200 pb-2">
          Job Description
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <p className="font-bold">
            Role: <span className="font-normal text-gray-700">{singleJob?.title}</span>
          </p>
          <p className="font-bold">
            Location: <span className="font-normal text-gray-700">{singleJob?.location}</span>
          </p>
          <p className="font-bold">
            Description: <span className="font-normal text-gray-700">{singleJob?.description}</span>
          </p>
          <p className="font-bold">
            Experience: <span className="font-normal text-gray-700">{singleJob?.experience} yrs</span>
          </p>
          <p className="font-bold">
            Salary: <span className="font-normal text-gray-700">{singleJob?.salary}LPA</span>
          </p>
          <p className="font-bold">
            Total Applicants:{' '}
            <span className="font-normal text-gray-700">
              {singleJob?.applications?.length}
            </span>
          </p>
          <p className="font-bold">
            Posted Date:{' '}
            <span className="font-normal text-gray-700">
              {singleJob?.createdAt.split('T')[0]}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
