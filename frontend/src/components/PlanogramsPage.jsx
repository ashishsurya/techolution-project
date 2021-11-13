import React, { useState, useEffect } from 'react';
import PlanogramComponent from './PlanogramComponent';

const PlanogramsPage = ({}) => {
  const [planograms, setPlanograms] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPlanograms = async () => {
    setLoading(true);
    await fetch('/planogram', {
      method: 'GET',
    })
      .then(function (response) {
        return response.text();
      })
      .then(function (data) {
        setPlanograms(JSON.parse(data));
      });
    setLoading(false);
  };

  console.log(planograms);

  useEffect(() => {
    fetchPlanograms();
  }, []);

  planograms.forEach((planogram) => {
    console.log({ ...planogram });
  });

  if (loading) {
    return <p>Loading....</p>;
  }
  return (
    <div className='p-5 relative'>
      <button
        onClick={fetchPlanograms}
        className='bg-green-500 right-3 absolute text-white p-3'
      >
        Refresh
      </button>
      <h1 className='text-4xl font-bold text-center text-green-500 tracking-tighter'>
        List of Planograms
      </h1>
      {planograms.map((planogram) => {
        console.log(planogram.categories);
        return (
          <PlanogramComponent
            key={planogram._id}
            name={planogram.name}
            dimensions={planogram.dimensions}
            categories={planogram.categories}
          />
        );
      })}
    </div>
  );
};

export default PlanogramsPage;
