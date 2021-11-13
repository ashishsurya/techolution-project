import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { dimensionState } from '../atoms/dimensionState';

const PlanoGramGrid = ({ selectHandler1, grid, color }) => {
  const [dimensions, setDimensions] = useRecoilState(dimensionState);

  // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <div>
      <h1 className='text-4xl font-bold text-center text-green-500 tracking-tighter'>Planogram Grid</h1>
      <div
        className='grid gap-2 '
        style={{
          gridTemplateColumns: `repeat(${dimensions.columns},1fr)`,
          gridTemplateRows: `repeat(${dimensions.rows},1fr)`,
        }}
      >
        {grid.map((box) => (
          <p
            key={box.id}
            onClick={() => {
              selectHandler1(box.selected, box.id, box.x, box.y);
            }}
            className={`p-2 ${box.selected && "line-through	"} text-white text-center font-mono cursor-pointer`}
            style={{
              backgroundColor: `${
                !box.selected ? '#9e9797' : '#9488e0'
              }`,
            }}
          >
            {box.x}, {box.y}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PlanoGramGrid;
