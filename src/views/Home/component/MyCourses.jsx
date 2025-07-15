    import React from "react";
    import { Swiper, SwiperSlide } from "swiper/react";
    import { Navigation, Pagination } from "swiper/modules";
    import "swiper/css";
    import "swiper/css/navigation";
    import "swiper/css/pagination";

    const courses = [
    {
        title: "ClearLife Reset",
        description: "Fuel your 30-day alcohol-free journey with science-backed support to elevate your well-being.",
        image: "/path/to/your/image.jpg",
        button: "Get Reset",
    },
    {
        title: "ClearLife Reset",
        description: "Fuel your 30-day alcohol-free journey with science-backed support to elevate your well-being.",
        image: "/path/to/your/image.jpg",
        button: "Get Reset",
    },
    {
        title: "ClearLife Reset",
        description: "Fuel your 30-day alcohol-free journey with science-backed support to elevate your well-being.",
        image: "/path/to/your/image.jpg",
        button: "Get Reset",
    },
    {
        title: "ClearLife Reset",
        description: "Fuel your 30-day alcohol-free journey with science-backed support to elevate your well-being.",
        image: "/path/to/your/image.jpg",
        button: "Get Reset",
    },
    ];

    const MyCourses = () => (
    <section className="bg-[#f4f4f5] min-h-screen flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-4xl">
        <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={40}
            slidesPerView={2}
            navigation
            pagination={{ clickable: true }}
            className="rounded-2xl"
        >
            {courses.map((course, idx) => (
            <SwiperSlide key={idx}>
                <div className="rounded-2xl shadow-lg p-6 flex flex-col items-center">
                {idx === 0 && (
                    <div className="w-full flex items-center justify-center h-full mb-6">
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900 max-w-xs text-center">
                        A showcase of the web's<br />finest design + talent
                    </h2>
                    </div>
                )}

                <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-80 object-contain rounded-xl mb-6 bg-black"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-6 text-center">{course.description}</p>
                <button className="bg-gray-900 text-white px-8 py-2 rounded-md font-medium hover:bg-gray-800 transition">
                    {course.button}
                </button>
                </div>
            </SwiperSlide>
            ))}
        </Swiper>
        </div>
    </section>
    );

    export default MyCourses;
