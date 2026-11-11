import { FaTicketAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-[#08090d] border-t border-white/10 text-white">
      {/* Footer Content */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-5 md:w-[35%]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-red-600 rounded-xl rotate-[-5deg] shadow-lg shadow-red-600/20">
                <FaTicketAlt className="text-white text-lg" />
              </div>

              <h2 className="text-sm font-bold">
                Cinema<span className="text-red-600">4</span>You
              </h2>
            </div>

            <p className="text-sm text-slate-400 leading-7 max-w-sm">
              Your curated guide to exceptional movies and television. Discover
              what to watch next.
            </p>
          </div>

          {/* Explore */}
          <div className="flex flex-col gap-7">
            <h3 className="text-[11px] font-bold tracking-widest text-white">
              EXPLORE
            </h3>

            <div className="flex flex-col gap-4 text-xs text-slate-400">
              <Link
                href="/movies"
                className="hover:text-red-500 transition-colors"
              >
                Movies
              </Link>

              <Link
                href="/series"
                className="hover:text-red-500 transition-colors"
              >
                TV Series
              </Link>

              <Link href="#" className="hover:text-red-500 transition-colors">
                Trending
              </Link>
            </div>
          </div>
          {/* Cinema */}
          <div className="flex flex-col gap-7">
            <h3 className="text-[11px] font-bold tracking-widest text-white">
              CINEMA4YOU
            </h3>

            <div className="flex flex-col gap-4 text-xs text-slate-400">
              <Link
                href="/contact"
                className="hover:text-red-500 transition-colors"
              >
                Contact us
              </Link>

              <Link href="#" className="hover:text-red-500 transition-colors">
                About
              </Link>

              <Link href="#" className="hover:text-red-500 transition-colors">
                Privacy
              </Link>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex flex-col gap-7">
            <h3 className="text-[11px] font-bold tracking-widest text-white">
              FOLLOW THE STORY
            </h3>

            <div className="flex items-center gap-3">
              <Link
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-[10px] text-slate-400 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all"
              >
                IG
              </Link>

              <Link
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-[10px] text-slate-400 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all"
              >
                X
              </Link>

              <Link
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-[10px] text-slate-400 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all"
              >
                YT
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-white/10 mt-16 mb-7"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
          <p className="text-[9px] tracking-wider text-slate-500">
            © 2026 CINEMA4YOU. ALL RIGHTS RESERVED.
          </p>

          <p className="text-[9px] tracking-wider text-slate-500">
            MADE WITH CARE FOR PEOPLE WHO LOVE CINEMA.
          </p>

          <p className="text-[9px] tracking-wider text-slate-500">
            POWERED BY{" "}
            <span className="text-teal-400 font-bold ml-1">TMDB</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
