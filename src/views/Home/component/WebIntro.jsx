import React from "react";
import heroVideo from "@/assets/video/hero.mp4";

const WebIntro = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 pt-16 pb-12 overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black/70 z-10" />
      <div className="relative z-20 flex flex-col items-center justify-center">
        <div className="uppercase font-extrabold text-center leading-none text-white tracking-tight text-6xl sm:text-7xl md:text-8xl lg:text-9xl drop-shadow-lg fade-in-up fade-in-up-delay-1">
          LOREM
        </div>
        <div className="italic font-semibold text-center mt-3 bg-gradient-to-r from-cyan-400 via-blue-400 to-yellow-300 bg-clip-text text-transparent text-3xl sm:text-5xl md:text-6xl lg:text-7xl animated-gradient fade-in-up fade-in-up-delay-2">
          CONAN EDO
        </div>
        <div className="flex flex-row items-end justify-center mt-4 fade-in-up fade-in-up-delay-3">
          <span className="text-center font-medium text-white text-2xl sm:text-3xl md:text-4xl mr-3">
            Shinichi
          </span>
          <span className="uppercase font-extrabold bg-gradient-to-r from-orange-500 via-yellow-400 to-yellow-300 bg-clip-text text-transparent text-5xl sm:text-7xl md:text-8xl lg:text-9xl drop-shadow-lg animated-gradient">
            KUDO EWA
          </span>
        </div>
      </div>
      <div class="absolute bottom-0 h-[50px] bg-gradient-to-b from-transparent to-[#01070c] z-100">
      </div>
    </section>
  );
};

export default WebIntro; 