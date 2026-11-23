import { FaTicketAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10">
      {/* Footer Content */}
      <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-12 md:py-20">
        <div className="flex flex-col justify-between gap-12 md:flex-row md:gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-5 md:w-[35%]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 rotate-[-5deg] items-center justify-center rounded-xl bg-red-600 shadow-lg shadow-red-600/20">
                <FaTicketAlt className="text-lg text-white" />
              </div>

              <h2 className="text-sm font-bold">
                Cinema<span className="text-red-600">4</span>You
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7">
              Your curated guide to exceptional movies and television. Discover
              what to watch next.
            </p>
          </div>

          {/* Explore */}
          <div className="flex flex-col gap-7">
            <h3 className="text-[11px] font-bold tracking-widest">EXPLORE</h3>

            <div className="flex flex-col gap-4 text-xs">
              <Link
                to="/movies"
                className="transition-colors hover:text-red-500 active:text-red-500"
              >
                Movies
              </Link>

              <Link
                to="/series"
                className="transition-colors hover:text-red-500 active:text-red-500"
              >
                TV Series
              </Link>

              <Link to="#" className="transition-colors hover:text-red-500 active:text-red-500">
                Trending
              </Link>
            </div>
          </div>

          {/* Cinema */}
          <div className="flex flex-col gap-7">
            <h3 className="text-[11px] font-bold tracking-widest">
              CINEMA4YOU
            </h3>

            <div className="flex flex-col gap-4 text-xs">
              <Link
                to="/contact"
                className="transition-colors hover:text-red-500 active:text-red-500"
              >
                Contact us
              </Link>

              <Link to="#" className="transition-colors hover:text-red-500 active:text-red-500">
                About
              </Link>

              <Link to="#" className="transition-colors hover:text-red-500 active:text-red-500">
                Privacy
              </Link>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex flex-col gap-7">
            <h3 className="text-[11px] font-bold tracking-widest">
              FOLLOW THE STORY
            </h3>

            <div className="flex items-center gap-3">
              <Link
                to="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[10px] transition-all hover:border-red-600 hover:bg-red-600 hover:text-white active:border-red-600 active:bg-red-600 active:text-white"
              >
                IG
              </Link>

              <Link
                to="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[10px] transition-all hover:border-red-600 hover:bg-red-600 hover:text-white active:border-red-600 active:bg-red-600 active:text-white"
              >
                X
              </Link>

              <Link
                to="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[10px] transition-all hover:border-red-600 hover:bg-red-600 hover:text-white active:border-red-600 active:bg-red-600 active:text-white"
              >
                YT
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-7 mt-16 w-full border-t border-white/10"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
          <p className="text-[9px] tracking-wider">
            © 2026 CINEMA4YOU. ALL RIGHTS RESERVED.
          </p>

          <p className="text-[9px] tracking-wider">
            MADE WITH CARE FOR PEOPLE WHO LOVE CINEMA.
          </p>

          <p className="text-[9px] tracking-wider">
            POWERED BY{" "}
            <span className="ml-1 font-bold text-teal-400">TMDB</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
