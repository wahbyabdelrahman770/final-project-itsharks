import { useTheme } from "../ThemeProvider";
import { createContext, useContext, useEffect, useState } from "react";
export const NavStore = createContext({});

const NavContext = ({ children }) => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTitle, setSearchTitle] = useState("movie");
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const token = import.meta.env.VITE_TOKEN;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const searchData = async () => {
    const apiLink = `https://api.themoviedb.org/3/search/${searchTitle}?&query=${input}&include_adult=false&language=en-US`;
    try {
      const req = await fetch(apiLink, options);
      const res = await req.json();

      setSearchResults(res.results);
    } catch (err) {
      console.log(err.message);
    }
  };

  const toggleSearch = () => {
    setSearchTitle(searchTitle === "movie" ? "tv" : "movie");
  };

  const handleSearch = () => {
    searchData();
  };

  useEffect(() => {
    if (input.trim() !== "") {
      searchData();
    }
  }, [input, searchTitle]);

  return (
    <NavStore.Provider
      value={{
        theme,
        setTheme,
        isMenuOpen,
        setIsMenuOpen,
        setInput,
        searchResults,
        setSearchResults,
        // navLinks,
        toggleSearch,
        handleSearch,
        input,
        searchTitle,
      }}
    >
      {children}
    </NavStore.Provider>
  );
};

export default NavContext;

export const useNav = () => useContext(NavStore);
