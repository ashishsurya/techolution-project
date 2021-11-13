import { atom } from 'recoil';

export const dimensionState = atom({
  key: 'dimensionState',
  default: {
    rows: '',
    columns: '',
  },
});
