import { createContext, useContext, useState } from "react";

const ThemeContext = createContext("");

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;

export const useTheme = () => useContext(ThemeContext);