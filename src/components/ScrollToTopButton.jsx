import { FaArrowUpLong } from "react-icons/fa6";

const ScrollToTopButton = () => {
    return <button className="fixed bottom-[5%] right-[5%] z-1000 w-10 h-10 bg-red-500 border-0 rounded-[50%] text-white cursor-pointer flex justify-center items-center" onClick={() => { scrollTo({ top: 0, behavior: "smooth" }); }}><FaArrowUpLong /></button>;
};

export default ScrollToTopButton;