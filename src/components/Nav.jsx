import { useState } from "react";
import { useTheme } from "../contexts/ThemeProvider";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@heroui/react";

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
    const { theme, setTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { label: "Home", to: "/" },
        { label: "Movies", to: "/movies" },
        { label: "Series", to: "/series" },
        { label: "ContactUs", to: "/contact" },
    ];

    return (
        <nav className="sticky top-0 z-50 flex flex-wrap items-center justify-between py-6 px-4 lg:px-10 bg-[#090b10] backdrop-blur-md border-b border-zinc-800">

            <Link to="/" className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-[10px_3px] -rotate-6 bg-red-600 text-white shadow-md shadow-red-600/30 grid place-items-center">
                    <FilmIcon />
                </div>
                <p className="text-xl font-bold tracking-tight text-white">
                    Cinema<span className="text-red-600">4</span>You
                </p>
            </Link>

            <ul className="hidden lg:flex items-center gap-8">
                {navLinks.map((item) => (
                    <li key={item.label}>
                        <NavLink
                            to={item.to}
                            className="text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-white"
                        >
                            {item.label}
                        </NavLink>
                    </li>
                ))}
            </ul>

            <div className="flex items-center gap-3">

                <div className="hidden lg:flex w-56 py-2 px-2.5 text-sm rounded-4xl bg-[#1f2125] border-[0.5px] border-[#606060] text-white overflow-hidden justify-start items-center gap-3">
                    <SearchIcon className="w-4 h-4 text-[#ffffff82]" />
                    <input type="text" placeholder="Search titles..." className="border-0 outline-0 w-auto" />
                </div>

                <Button
                    isIconOnly
                    variant="flat"
                    size="sm"
                    aria-label="Toggle theme"
                    onPress={() => setTheme(() => (theme === "light" ? "dark" : "light"))}
                    className="w-8.75 h-8.75 bg-zinc-900 text-zinc-300 grid place-items-center hover:text-white border border-zinc-700"
                >
                    {theme === "dark" ? (
                        <SunIcon />
                    ) : (
                        <MoonIcon />
                    )}
                </Button>

                <Button
                    isIconOnly
                    variant="flat"
                    size="sm"
                    aria-label="Toggle mobile menu"
                    onPress={() => setIsMenuOpen((prev) => !prev)}
                    className="lg:hidden w-8.75 h-8.75 bg-zinc-900 text-zinc-300 grid place-items-center hover:text-white border border-zinc-700"
                >
                    {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </Button>
            </div>

            {isMenuOpen && (
                <div className="w-full flex lg:hidden flex-col items-start gap-4 pt-6 mt-4 border-t border-zinc-800">
                    <ul className="flex flex-col items-start gap-4 w-full">
                        {navLinks.map((item) => (
                            <li key={item.label} className="">
                                <NavLink
                                    to={item.to}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-white"
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    <div className="w-full max-w-xs py-2 px-2.5 text-sm rounded-4xl bg-[#1f2125] border-[0.5px] border-[#606060] text-white overflow-hidden flex justify-start items-center gap-3 mt-1">
                        <SearchIcon className="w-4 h-4 text-[#ffffff82]" />
                        <input type="text" placeholder="Search titles..." className="border-0 outline-0 w-full bg-transparent" />
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Nav;