import { createContext } from 'react';

/*
We use it to save query in home location
to return when home icon is clicked.
We save in ref to avoid re-renders.
*/
export const HomeCtx = createContext();
