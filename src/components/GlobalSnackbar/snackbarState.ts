import { atomWithStore } from 'jotai/zustand';
import create from 'zustand/vanilla';

// project dependencies
import type { InitialSnackbarState } from './types';

export const snackbarStore = create<InitialSnackbarState>(() => ({
  color: '',
  title: '',
  message: '',
}));

export const snackbarState = atomWithStore(snackbarStore);
