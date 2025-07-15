import React from "react";

const courses = [
  {
    title: "ClearLife Reset",
    description: "Fuel your 30-day alcohol-free journey with science-backed support to elevate your well-being.",
    image: "/path/to/your/image.jpg", // Replace with your image path
    button: "Get Reset",
  },
  // Add more courses as needed
];

const MyCourses = () => (
  <div className="w-screen h-screen overflow-x-auto overflow-y-hidden flex snap-x snap-mandatory scroll-smooth bg-[#f4f4f5]">
    {/* Left: Heading Section */}
    <section className="w-screen h-screen flex items-center justify-center snap-start flex-shrink-0">
      <h2 className="text-3xl md:text-4xl font-light text-gray-900 max-w-xs text-left">
        A showcase of the web's<br />finest design + talent
      </h2>
    </section>
    {/* Course Cards */}
    {courses.map((course, idx) => (
      <section
        key={idx}
        className="w-screen h-screen flex items-center justify-center snap-start flex-shrink-0"
      >
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center w-[80vw] max-w-3xl h-[80vh]">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-80 object-contain rounded-xl mb-6 bg-black"
          />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
          <p className="text-gray-700 mb-6 text-center">{course.description}</p>
          <button className="bg-gray-900 text-white px-8 py-2 rounded-md font-medium hover:bg-gray-800 transition">
            {course.button}
          </button>
        </div>
      </section>
    ))}
  </div>
);

export default MyCourses; 