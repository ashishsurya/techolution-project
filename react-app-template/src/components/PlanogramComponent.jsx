import React, { useState, useEffect } from 'react';
import CategoriesTable from './CategoriesTable';

const PlanogramComponent = ({ name, categories, dimensions }) => {
  return (
    <div className='p-4 border-2 border-gray-600 my-10'>
      <h1 className='text-2xl font-bold tracking-tight'>
        Planogram Name :{' '}
        <span className='text-lg tracking-normal text-gray-700'>{name}</span>
      </h1>
      <h2 className='text-2xl font-bold tracking-tight'>
        Dimensions :{' '}
        <span className='text-lg tracking-normal text-gray-700'>
          {dimensions}
        </span>
      </h2>

      <CategoriesTable categories={categories} />
    </div>
  );
};

export default PlanogramComponent;
