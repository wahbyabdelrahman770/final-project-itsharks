import { Link } from "react-router-dom";
import { Button } from "@heroui/react";

import { FiArrowRight, FiChevronDown } from "react-icons/fi";
import { useTheme } from "../../contexts/ThemeProvider";

const Contact = () => {
  const { theme } = useTheme;
  return (
    <section className="min-h-[calc(100vh-190px)]  px-6 py-20  md:py-26">
      <div className=" flex mx-auto w-[90%] max-w-366 flex-col items-start gap-14 lg:flex-row lg:gap-22.5">
        {/* LEFT SIDE */}
        <div className="flex w-full flex-col items-start pt-1 lg:w-[55%]">
          {/* Small Heading */}
          <div className="mb-9 flex items-center gap-3">
            <span className="h-0.5 w-6.5 bg-[#ed092b]"></span>

            <span className="text-[11px] font-extrabold tracking-[2.5px] ">
              GET IN TOUCH
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="max-w-170 font-serif text-[clamp(60px,7vw,108px)] font-bold leading-[0.94] tracking-[-4px]">
            Let’s talk
            <br />
            about <span className="italic text-[#ed092b]">stories.</span>
          </h1>

          {/* Description */}
          <p className="mt-9 max-w-145 text-[14px] leading-loose  md:text-[15px]">
            Have a question, suggestion, or title we should know about? Our
            small team of movie obsessives would love to hear from you.
          </p>

          {/* Email */}
          <Link
            to="mailto:hello@cinema4you.com"
            className="mt-8 inline-block font-serif text-[24px] font-bold text-[#ed092b] underline decoration-1 underline-offset-[9px] transition-colors hover:text-[#ff3855] active:text-[#ff3855]"
          >
            hello@cinema4you.com
          </Link>
        </div>

        {/* RIGHT SIDE - CONTACT FORM */}
        <div
          className={`flex w-full flex-col ${theme === "dark" ? "border border-white" : "border border-gray-900"} px-7 py-10 md:px-12 md:py-12 lg:w-[45%]`}
        >
          <form className="flex w-full flex-col">
            {/* NAME */}
            <div className="mb-7 flex w-full flex-col">
              <label
                htmlFor="name"
                className="mb-4 text-[9px] font-extrabold tracking-[1.3px] "
              >
                YOUR NAME
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Jane Smith"
                required
                className="w-full border-0 border-b border-[#30333d] bg-transparent pb-3.5 text-[14px] font-semibold  outline-none transition-colors  focus:border-[#ed092b]"
              />
            </div>

            {/* EMAIL */}
            <div className="mb-7 flex w-full flex-col">
              <label
                htmlFor="email"
                className="mb-4 text-[9px] font-extrabold tracking-[1.3px] "
              >
                EMAIL ADDRESS
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="jane@example.com"
                required
                className="w-full border-0 border-b border-[#30333d] bg-transparent pb-3.5 text-[14px] font-semibold  outline-none transition-colors  focus:border-[#ed092b]"
              />
            </div>

            {/* SUBJECT */}
            <div className="mb-7 flex w-full flex-col">
              <label
                htmlFor="subject"
                className="mb-4 text-[9px] font-extrabold tracking-[1.3px] "
              >
                SUBJECT
              </label>

              <div className="relative flex w-full items-center border-b border-[#30333d] pb-3.5">
                <select
                  id="subject"
                  name="subject"
                  defaultValue="General inquiry"
                  className="w-full cursor-pointer appearance-none border-0 bg-transparent text-[14px] font-bold  outline-none"
                >
                  <option className="bg-[#151923]">General inquiry</option>

                  <option className="bg-[#151923]">Movie suggestion</option>

                  <option className="bg-[#151923]">Technical support</option>

                  <option className="bg-[#151923]">Business inquiry</option>
                </select>

                <FiChevronDown
                  size={17}
                  className="pointer-events-none absolute right-1 "
                />
              </div>
            </div>

            {/* MESSAGE */}
            <div className="flex w-full flex-col">
              <label
                htmlFor="message"
                className="mb-4 text-[9px] font-extrabold tracking-[1.3px] "
              >
                MESSAGE
              </label>

              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Tell us what's on your mind..."
                required
                className="w-full resize-none border-0 border-b border-[#30333d] bg-transparent pb-3.5 text-[14px] font-semibold leading-7  outline-none transition-colors  focus:border-[#ed092b]"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <div className="mt-6 flex w-full border-t border-[#30333d] pt-6">
              <Button
                type="submit"
                className="flex h-13.75 min-w-46.5 items-center justify-center gap-5 rounded-md bg-[#ed092b] px-6 text-[11px] font-extrabold tracking-[1px]  transition-colors hover:bg-[#c90021] active:bg-[#c90021]"
              >
                SEND MESSAGE
                <FiArrowRight size={19} />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
