import { Link, NavLink } from "react-router-dom";
import { Button } from "@heroui/react";
import { useNav } from "../contexts/Navbar/Navbar";
import { useTheme } from "../contexts/ThemeProvider";

const FilmIcon = () => (
  <svg
    aria-hidden="true"
    width="21"
    height="21"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 7a2 2 0 0 0 2-2h12a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H6a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4Z"></path>
    <path d="M13 7v2M13 11v2M13 15v2"></path>
  </svg>
);

const SearchIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const SunIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="w-5 h-5"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="w-5 h-5"
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

const MenuIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="w-5 h-5"
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="w-5 h-5"
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const Nav = () => {
  const {
    isMenuOpen,
    setIsMenuOpen,
    setInput,
    searchResults,
    toggleSearch,
    handleSearch,
    input,
    searchTitle,
  } = useNav();

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Movies", to: "/movies" },
    { label: "Series", to: "/series" },
    { label: "ContactUs", to: "/contact" },
  ];

  const { theme, setTheme } = useTheme();

  const themeButton = (
    <Button
      isIconOnly
      variant="flat"
      size="sm"
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="w-10 min-w-10 h-10 grid place-items-center rounded-full border border-zinc-700  transition-colors "
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </Button>
  );

  const searchTypeButton = (
    <Button
      variant="flat"
      onClick={toggleSearch}
      className="h-10 rounded-full border border-zinc-700  px-5 text-xs font-semibold  transition-colors"
    >
      {searchTitle === "tv" ? "🎬 Movie" : "📺 Series"}
    </Button>
  );

  const searchButton = (
    <Button
      onClick={handleSearch}
      className="h-10 px-6 rounded-full font-semibold bg-sky-500 text-white hover:bg-sky-600"
    >
      Search
    </Button>
  );

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-colors duration-300 ${
        theme === "light"
          ? "bg-[#F4F5F7] text-[#171923]"
          : "bg-[#090a0e] text-white"
      }`}
    >
      <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-10">
        {/* Main Navbar */}
        <div className="flex flex-wrap items-center justify-between gap-y-4 py-4 lg:py-5">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            {" "}
            <div className="w-10 h-10 rounded-[10px_3px] -rotate-6 bg-red-600 text-white shadow-md shadow-red-600/30 grid place-items-center">
              <FilmIcon />
            </div>
            <p className="text-xl sm:text-2xl font-bold tracking-tight">
              Cinema<span className="text-red-600">4</span>You
            </p>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-7 xl:gap-9">
            {navLinks.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `relative text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-red-600"
                        : ""
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop Search & Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="relative group flex items-center">
              <div className="flex w-52 xl:w-60 py-2.5 px-3 text-sm rounded-full  border border-[#606060]  items-center gap-3">
                <SearchIcon className="w-4 h-4 shrink-0 text-zinc-400" />

                <input
                  type="search"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    searchTitle === "movie"
                      ? "Search movies..."
                      : "Search series..."
                  }
                  className="border-0 outline-0 w-full min-w-0 bg-transparent  placeholder:text-zinc-500"
                />
              </div>

              {/* Search Dropdown */}
              <div
                className="
                  hidden
                  group-has-[input:not(:placeholder-shown)]:block
                  absolute top-full left-0 z-50 mt-3
                  w-full max-h-62.5 overflow-y-auto
                  rounded-xl border border-cyan-400/60
                  bg-[#202428] p-1 shadow-2xl
                "
              >
                {searchTitle === "movie"
                  ? searchResults.map((search) => (
                      <Link
                        to={`/movies/${search.id}`}
                        key={search.id}
                        onClick={() => setInput("")}
                        className="block px-4 py-3 text-sm text-gray-200 hover:bg-cyan-500/20 cursor-pointer transition-colors border-b border-gray-700/50 last:border-b-0"
                      >
                        {search.original_title}
                      </Link>
                    ))
                  : searchResults.map((search) => (
                      <Link
                        to={`/series/${search.id}`}
                        key={search.id}
                        onClick={() => setInput("")}
                        className="block px-4 py-3 text-sm text-gray-200 hover:bg-cyan-500/20 cursor-pointer transition-colors border-b border-gray-700/50 last:border-b-0"
                      >
                        {search.name}
                      </Link>
                    ))}
              </div>
            </div>

            {searchButton}
            {searchTypeButton}
            {themeButton}
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2">
            {themeButton}

            <Button
              isIconOnly
              variant="flat"
              size="sm"
              aria-label="Toggle mobile menu"
              onPress={() => setIsMenuOpen((prev) => !prev)}
              className="w-10 min-w-10 h-10 bg-zinc-900 text-zinc-300 grid place-items-center hover:text-white border border-zinc-700 rounded-full"
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="w-full lg:hidden flex flex-col gap-6 pt-5 pb-3 mt-2 border-t border-zinc-800">
              {/* Mobile Links */}
              <ul className="flex flex-col gap-1">
                {navLinks.map((item) => (
                  <li key={item.label}>
                    <NavLink
                      to={item.to}
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        `block w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-red-600/10 text-red-500 border-l-2 border-red-600"
                            : "hover:bg-white/5"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              {/* Mobile Search */}
              <div className="flex flex-col gap-3 border-t border-zinc-800 pt-5">
                <div className="relative group w-full">
                  <div className="flex items-center gap-3 w-full px-4 py-3 rounded-full bg-[#1f2125] border border-zinc-700">
                    <SearchIcon className="w-5 h-5 shrink-0 text-zinc-400" />

                    <input
                      type="search"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={
                        searchTitle === "movie"
                          ? "Search movies..."
                          : "Search series..."
                      }
                      className="w-full min-w-0 bg-transparent outline-none border-0 text-sm text-white placeholder:text-zinc-500"
                    />

                    {/* Search Mobile Dropdown */}
                    <div
                      className="
                        hidden
                        group-has-[input:not(:placeholder-shown)]:block
                        absolute top-full left-0 z-50 mt-3
                        w-full max-h-62.5 overflow-y-auto
                        rounded-xl border border-cyan-400/60
                        bg-[#202428] p-1 shadow-2xl
                      "
                    >
                      {searchTitle === "movie"
                        ? searchResults.map((search) => (
                            <Link
                              to={`/movies/${search.id}`}
                              key={search.id}
                              onClick={() => {
                                setInput("");
                                setIsMenuOpen(false);
                              }}
                              className="block px-4 py-3 text-sm text-gray-200 hover:bg-cyan-500/20 cursor-pointer transition-colors border-b border-gray-700/50 last:border-b-0"
                            >
                              {search.original_title}
                            </Link>
                          ))
                        : searchResults.map((search) => (
                            <Link
                              to={`/series/${search.id}`}
                              key={search.id}
                              onClick={() => {
                                setInput("");
                                setIsMenuOpen(false);
                              }}
                              className="block px-4 py-3 text-sm text-gray-200 hover:bg-cyan-500/20 cursor-pointer transition-colors border-b border-gray-700/50 last:border-b-0"
                            >
                              {search.name}
                            </Link>
                          ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full">
                  <div className="flex-1">{searchButton}</div>
                  <div className="flex-1">{searchTypeButton}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
