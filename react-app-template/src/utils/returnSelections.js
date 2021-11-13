export const returnSelections = (selections) => {
  return selections
    .map((selection) => `(${selection.x}, ${selection.y})`)
    .join();
};
