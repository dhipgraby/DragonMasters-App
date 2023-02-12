import { writable } from 'svelte/store';

export const createWritableStore = (key, startValue,customExpiration = null) => {
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
          //  if (customExpiration !== null)  current.expires = customExpiration  
          localStorage.setItem(key, JSON.stringify(current));
        });
      }
    };
  }
