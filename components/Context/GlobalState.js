import React, {createContext, useState} from 'react';

// Create two context:
// ThemeContext: to query the context state
// ThemeDispatchContext: to mutate the context state
const ThemeContext = createContext(undefined);
const ThemeDispatchContext = createContext(undefined);

// A "provider" is used to encapsulate only the
// components that needs the state in this context
function ThemeProvider({children}) {
  const [Theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={Theme}>
      <ThemeDispatchContext.Provider value={setTheme}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeContext.Provider>
  );
}

export {ThemeProvider, ThemeContext, ThemeDispatchContext};
