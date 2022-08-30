import { useEffect, useRef } from 'react';

// saves state in local storage

// for example, this function is outside component that uses the hook.
// const clearStorage = () => localStorage.removeItem('homePage');

export const usePersist = ({
  key, // key in localStorage to save
  state,
  setState, // function to change state
  saveAlways, // if true it persists between full reloads
  clearStorage // function created outside component for proper memory clean
}) => {
  const stateRef = useRef();
  stateRef.current = state;

  const saveState = () => localStorage.setItem(key, JSON.stringify(stateRef.current));
  useEffect(() => {
    if (!localStorage.getItem(key)) {
      saveState(state);

    } else {
      const savedState = JSON.parse(localStorage.getItem(key));
      setState(savedState);
    }

    if (!saveAlways) {
      // remove previous event if was
      window.removeEventListener('beforeunload', clearStorage);
      window.addEventListener('beforeunload', clearStorage);
    }
  }, []);

  useEffect(saveState);
};
