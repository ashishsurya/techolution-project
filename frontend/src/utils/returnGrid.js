import { v4 as uuidv4 } from 'uuid';

export const returnGrid = (rows, columns) => {
  const grid = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      grid.push({ selected: false, x: i, y: j, id: uuidv4()});
    }
  }

  return grid;
};
