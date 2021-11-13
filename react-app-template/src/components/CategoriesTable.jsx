import React, { useState, useEffect } from 'react';
import { returnSelections } from '../utils/returnSelections';

const CategoriesTable = ({ categories }) => {
  return (
    <div>
      <table className="shadow w-full mt-10 pl-3 font-mono">
        <thead className="font-sans text-xl font-semibold tracking-tighter">
          <td>Name</td>
          <td>Color</td>
          <td>Selections</td>
        </thead>
        <tbody>
          {categories?.map((category) => (
            <tr>
              <td>{category?.categoryName}</td>
              <td>
                <div
                  className='w-10 h-10'
                  style={{ backgroundColor: category?.color.hex }}
                ></div>
              </td>
              <td>
                {returnSelections(category?.selections)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;
