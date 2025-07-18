import React from "react";

const SloganRunning = () => {
  return (
    <div className="overflow-hidden w-full h-100 flex items-center bg-transparent">
      <svg
        className="animate-slogan-runner"
        width="100%"
        height="100%"
        viewBox="0 0 1400 144"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ minWidth: 1400, display: 'block' }}
      >
        <text
          x="0"
          y="115"
          fontSize="110"
          fontWeight="900"
          stroke="#9ca3af"
          strokeWidth="1"
          fill="transparent"
          style={{ letterSpacing: 0, strokeDasharray: '16,10', strokeLinecap: 'round' }}
        >
          Never give up
        </text>
      </svg>
      <style>{`
        @keyframes slogan-runner {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-slogan-runner {
          animation: slogan-runner 18s linear infinite;
          display: block;
        }
      `}</style>
    </div>
  );
};

export default SloganRunning; 