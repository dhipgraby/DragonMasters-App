import { writable,derived } from 'svelte/store';

export const createWritableStore = (key, startValue) => {
    const { subscribe, set } = writable(startValue);
    
    return {
      subscribe,
      set,
      useLocalStorage: () => {
        const json = localStorage.getItem(key);
        if (json) {
          set(JSON.parse(json));
        }
        
        subscribe(current => {
          localStorage.setItem(key, JSON.stringify(current));
        });
      }
    };
  }
