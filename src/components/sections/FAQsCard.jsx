import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const faqs = [
  {
    question: "I like it but I think it will be too difficult to customize",
    answer: "Our template is built for easy customization with clear documentation and modular code.",
  },
  {
    question: "What platform is the template made for?",
    answer: "It's designed for modern web frameworks and is fully responsive.",
  },
  {
    question: "Is it optimized for speed and performance?",
    answer: "Yes, the template is highly optimized for fast load times and smooth interactions.",
  },
  {
    question: "If I get stuck when customizing can I get help from you?",
    answer: "Absolutely! Our support team is ready to help you with any issues.",
  },
  {
    question: "Where will my site be hosted?",
    answer: "You can host your site anywhere you like. The template is platform-agnostic.",
  },
];

export default function FAQsCard() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="w-full flex flex-col items-center justify-center py-12 px-2 relative">
      {/* Underlaid animated/blurred background */}
      <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none">
        <div className="w-[480px] h-[480px] bg-gradient-to-br from-orange-400/30 via-fuchsia-500/20 to-cyan-400/30 rounded-full blur-3xl opacity-70 animate-pulse" />
      </div>
      <div className="max-w-lg w-full mx-auto rounded-2xl shadow-2xl relative overflow-hidden border border-orange-400/30 bg-white/20 backdrop-blur-2xl ring-1 ring-orange-400/20">
        {/* Orange Glow Top */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 via-gray-500 to-gray-400 opacity-80" />
        {/* Header */}
        <div className="flex flex-col items-center gap-2 pt-8 pb-4 px-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block w-7 h-7 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold text-lg shadow-md">*</span>
            <span className="text-lg font-bold text-white tracking-wide font-serif">Câu hỏi thường gặp</span>
          </div>
        </div>
        <div className="border-b border-gray-400/20 mx-6 mb-2" />
        {/* Trusted By */}
        <div className="flex flex-col items-center gap-2 px-6 pb-2">
          <span className="text-xs text-gray-300 tracking-widest uppercase mb-1">Trusted by companies like</span>
          <div className="flex gap-6 opacity-90">
            <span className="font-black text-white text-lg tracking-widest">LOGO</span>
            <span className="font-black text-white text-lg tracking-widest">IPSUM</span>
            <span className="font-black text-white text-lg tracking-widest">LUMI</span>
          </div>
        </div>
        {/* FAQ Section */}
        <div className="px-4 pb-8 pt-2">
          <div className="flex flex-col gap-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`border border-gray-700 rounded-xl bg-[#23232a]/80 backdrop-blur-lg transition-all duration-200 group ${openIndex === idx ? 'border-orange-400 shadow-lg' : 'hover:border-orange-400/60 hover:shadow-md'} cursor-pointer`}
              >
                <button
                  className="w-full flex items-center justify-between px-4 py-4 text-left focus:outline-none group"
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  aria-expanded={openIndex === idx}
                  aria-controls={`faq-panel-${idx}`}
                >
                  <span className="font-semibold text-white text-base md:text-lg font-serif">
                    {faq.question}
                  </span>
                  <span
                    className={`ml-4 text-2xl font-bold text-orange-400 transition-transform duration-300 flex items-center ${openIndex === idx ? "rotate-180" : ""}`}
                  >
                    <FiChevronDown />
                  </span>
                </button>
                {openIndex === idx && (
                  <div
                    id={`faq-panel-${idx}`}
                    className="px-4 pb-4 text-base text-white font-medium animate-fade-in"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
} 