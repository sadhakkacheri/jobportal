import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
  {
    filterType: 'Location',
    array: ['Delhi NCR', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai'],
  },
  {
    filterType: 'Industry',
    array: ['Frontend Developer', 'Backend Developer', 'FullStack Developer'],
  },
  {
    filterType: 'Salary',
    array: ['0-40k', '42-1lakh', '1lakh to 5lakh'],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md border border-gray-200">
      {/* Header */}
      <h1 className="font-bold text-xl text-gray-800">Filter Jobs</h1>
      <hr className="my-3 border-gray-300" />

      {/* Filters */}
      <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-6">
        {filterData.map((data, index) => (
          <div key={index} className="space-y-3">
            {/* Filter Type Heading */}
            <h2 className="font-semibold text-lg text-gray-700">{data.filterType}</h2>
            {/* Filter Items */}
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div key={itemId} className="flex items-center space-x-3">
                  <RadioGroupItem
                    value={item}
                    id={itemId}
                    className="peer focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-white"
                  />
                  <Label
                    htmlFor={itemId}
                    className="text-sm text-gray-600 peer-checked:font-medium peer-checked:text-purple-700 cursor-pointer hover:text-purple-500 transition"
                  >
                    {item}
                  </Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
