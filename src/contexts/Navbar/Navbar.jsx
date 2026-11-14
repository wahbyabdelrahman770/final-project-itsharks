import { useTheme } from "@heroui/react";
import React, { createContext, useContext, useEffect, useState } from "react";
export const NavStore = createContext({});

const NavContext = ({ children }) => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTitel, setSearchTitel] = useState("movie");
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
    const apiLink = `https://api.themoviedb.org/3/search/${searchTitel}?&query=${input}&include_adult=false&language=en-US`;
    try {
      const req = await fetch(apiLink, options);
      const res = await req.json();

      setSearchResults(res.results);
    } catch (err) {
      console.log(err.message);
    }
  };

  const toggleSearch = () => {
    setSearchTitel(searchTitel === "movie" ? "tv" : "movie");
  };

  const handleSearch = () => {
    searchData();
  };

  useEffect(() => {
    if (input.trim() !== "") {
      searchData();
    }
  }, [input, searchTitel]);

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
        searchTitel,
      }}
    >
      {children}
    </NavStore.Provider>
  );
};

export default NavContext;

export const useNav = () => useContext(NavStore);
