import { Link } from "react-router-dom";
import { Button } from "@heroui/react";

import { FiArrowRight, FiChevronDown } from "react-icons/fi";

const Contact = () => {
  return (
    <section className="min-h-[calc(100vh-190px)] bg-[#08090d] px-6 py-20 text-white md:py-[104px]">
      <div className=" flex mx-auto w-[90%] max-w-[1464px] flex-col items-start gap-14 lg:flex-row lg:gap-[90px]">
        {/* LEFT SIDE */}
        <div className="flex w-full flex-col items-start pt-1 lg:w-[55%]">
          {/* Small Heading */}
          <div className="mb-9 flex items-center gap-3">
            <span className="h-[2px] w-[26px] bg-[#ed092b]"></span>

            <span className="text-[11px] font-extrabold tracking-[2.5px] text-[#dce0e8]">
              GET IN TOUCH
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="max-w-[680px] font-serif text-[clamp(60px,7vw,108px)] font-bold leading-[0.94] tracking-[-4px]">
            Let’s talk
            <br />
            about <span className="italic text-[#ed092b]">stories.</span>
          </h1>

          {/* Description */}
          <p className="mt-9 max-w-[580px] text-[14px] leading-[2] text-[#8c99ad] md:text-[15px]">
            Have a question, suggestion, or title we should know about? Our
            small team of movie obsessives would love to hear from you.
          </p>

          {/* Email */}
          <Link
            to="mailto:hello@cinema4you.com"
            className="mt-8 inline-block font-serif text-[24px] font-bold text-[#ed092b] underline decoration-1 underline-offset-[9px] transition-colors hover:text-[#ff3855]"
          >
            hello@cinema4you.com
          </Link>
        </div>

        {/* RIGHT SIDE - CONTACT FORM */}
        <div className="flex w-full flex-col bg-[#121620] px-7 py-10 md:px-12 md:py-12 lg:w-[45%]">
          <form className="flex w-full flex-col">
            {/* NAME */}
            <div className="mb-7 flex w-full flex-col">
              <label
                htmlFor="name"
                className="mb-4 text-[9px] font-extrabold tracking-[1.3px] text-[#9aabc4]"
              >
                YOUR NAME
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Jane Smith"
                required
                className="w-full border-0 border-b border-[#30333d] bg-transparent pb-[14px] text-[14px] font-semibold text-white outline-none transition-colors placeholder:text-[#8792a5] focus:border-[#ed092b]"
              />
            </div>

            {/* EMAIL */}
            <div className="mb-7 flex w-full flex-col">
              <label
                htmlFor="email"
                className="mb-4 text-[9px] font-extrabold tracking-[1.3px] text-[#9aabc4]"
              >
                EMAIL ADDRESS
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="jane@example.com"
                required
                className="w-full border-0 border-b border-[#30333d] bg-transparent pb-[14px] text-[14px] font-semibold text-white outline-none transition-colors placeholder:text-[#8792a5] focus:border-[#ed092b]"
              />
            </div>

            {/* SUBJECT */}
            <div className="mb-7 flex w-full flex-col">
              <label
                htmlFor="subject"
                className="mb-4 text-[9px] font-extrabold tracking-[1.3px] text-[#9aabc4]"
              >
                SUBJECT
              </label>

              <div className="relative flex w-full items-center border-b border-[#30333d] pb-[14px]">
                <select
                  id="subject"
                  name="subject"
                  defaultValue="General inquiry"
                  className="w-full cursor-pointer appearance-none border-0 bg-transparent text-[14px] font-bold text-white outline-none"
                >
                  <option className="bg-[#151923]">General inquiry</option>

                  <option className="bg-[#151923]">Movie suggestion</option>

                  <option className="bg-[#151923]">Technical support</option>

                  <option className="bg-[#151923]">Business inquiry</option>
                </select>

                <FiChevronDown
                  size={17}
                  className="pointer-events-none absolute right-1 text-white"
                />
              </div>
            </div>

            {/* MESSAGE */}
            <div className="flex w-full flex-col">
              <label
                htmlFor="message"
                className="mb-4 text-[9px] font-extrabold tracking-[1.3px] text-[#9aabc4]"
              >
                MESSAGE
              </label>

              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Tell us what's on your mind..."
                required
                className="w-full resize-none border-0 border-b border-[#30333d] bg-transparent pb-[14px] text-[14px] font-semibold leading-7 text-white outline-none transition-colors placeholder:text-[#8792a5] focus:border-[#ed092b]"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <div className="mt-6 flex w-full border-t border-[#30333d] pt-6">
              <Button
                type="submit"
                className="flex h-[55px] min-w-[186px] items-center justify-center gap-5 rounded-[3px] bg-[#ed092b] px-6 text-[11px] font-extrabold tracking-[1px] text-white transition-colors hover:bg-[#c90021]"
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
