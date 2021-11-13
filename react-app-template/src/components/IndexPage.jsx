import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { dimensionState } from '../atoms/dimensionState';
import PlanoGramGrid from './PlanoGramGrid';
import { selectionsState } from '../atoms/selectionsState';
import { returnGrid } from '../utils/returnGrid';
import { v4 as uuidv4 } from 'uuid';
import InputColor from 'react-input-color';
import { categoriesState } from '../atoms/categoriesState';
import CategoriesTable from './CategoriesTable';

const IndexPage = ({}) => {
  // all state variables
  const [dimensions, setDimensions] = useRecoilState(dimensionState);
  const [selections, setSelections] = useRecoilState(selectionsState);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [grid, setGrid] = useState(
    returnGrid(dimensions.rows, dimensions.columns)
  );
  const [categoryName, setCategoryName] = useState('');
  const [color, setColor] = React.useState({});
  const [planogramName, setPlanogramName] = useState('');

  useEffect(() => {
    setGrid(returnGrid(dimensions.rows, dimensions.columns));
  }, [dimensions]);

  // tile click handler
  const selectHandler1 = (selected, id, x, y) => {
    if (!selected) {
      setSelections([...selections, { id: uuidv4(), x, y }]);
      setGrid(
        grid.map((box) => {
          if (box.id === id) {
            box.selected = !selected;
          }
          return box;
        })
      );
    } else {
      setSelections(
        selections.filter((selection) => selection.x !== x || selection.y !== y)
      );
      setGrid(
        grid.map((box) => {
          if (box.id === id) {
            box.selected = !selected;
          }
          return box;
        })
      );
    }
  };

  // fixselection Handler
  const fixSelectionHadler = () => {
    if (categoryName === '') {
      alert('Category name cannot be empty');
      return;
    }
    setCategories([...categories, { categoryName, color, selections }]);
    setGrid(
      grid.map((box) => {
        if (box.selected) {
          box.color = color;
        }
        return box;
      })
    );
    setSelections([]);
  };

  const savePlanogram = async () => {
    const planogram = {
      _id: uuidv4(),
      name: planogramName,
      dimensions: `${dimensions.rows}x${dimensions.columns}`,
      categories,
    };
    await fetch('/planogram', {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(planogram),
    })
      .then(() => {
        console.log('Success');
      })
      .catch((err) => console.log(err));
  };

  console.log(categories);

  return (
    <div className='h-auto grid grid-cols-2'>
      {/* left grid(tiles) */}
      <section>
        <PlanoGramGrid
          selectHandler1={selectHandler1}
          grid={grid}
          color={color}
        />
        {categories.length > 0 && <CategoriesTable categories={categories} />}
      </section>

      {/* right grid(form and category selections) */}
      <section className='p-3'>
        <h1 className='text-4xl font-bold text-center text-green-500 tracking-tighter'>
          Planogram UI
        </h1>
        <div className='mt-3 flex space-x-4 pl-6'>
          <div className='input-container'>
            <label className='font-medium text-xl p-2' htmlFor='rows'>
              Rows
            </label>
            <input
              value={dimensions.rows}
              onChange={(e) =>
                setDimensions({ ...dimensions, rows: e.target.value })
              }
              className='input'
              type='number'
              placeholder='Enter no of rows'
            />
          </div>
          <div className='input-container'>
            <label className='font-medium text-xl p-2' htmlFor='columns'>
              Columns
            </label>
            <input
              value={dimensions.columns}
              onChange={(e) =>
                setDimensions({ ...dimensions, columns: e.target.value })
              }
              className='input'
              type='number'
              placeholder='Enter no of columns'
            />
          </div>
        </div>
        <div className='flex mt-3 space-x-12 pl-6'>
          <div className='input-container'>
            <label className='font-medium text-xl p-2' htmlFor='columns'>
              Category Name
            </label>
            <input
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className='input'
              type='text'
              placeholder='Enter category name'
            />
          </div>
          <div className='input-container'>
            <label className='font-medium text-xl p-2' htmlFor='columns'>
              Category Color
            </label>
            <InputColor
              initialValue='#5e72e4'
              onChange={setColor}
              placement='center'
            />
          </div>
        </div>
        <button
          onClick={fixSelectionHadler}
          className='ml-6 mt-4 p-3 bg-green-400 text-white shadow'
        >
          Fix Selection
        </button>

        <div className='pl-6 mt-10 px-5 flex'>
          <input
            value={planogramName}
            onChange={(e) => setPlanogramName(e.target.value)}
            className='input flex-1'
            type='text'
            placeholder='Enter planogram name'
          />
          <button
            onClick={savePlanogram}
            className='bg-green-500 text-white px-2'
          >
            Save Planogram
          </button>
        </div>
      </section>
    </div>
  );
};

export default IndexPage;
