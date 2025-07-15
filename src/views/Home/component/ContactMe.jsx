import React from "react";
import tradingCube from "@/assets/image/trading.jpg";

const ContactMe = () => (
  <section className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-[#01070c] px-4 py-12">
    <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
      <img
        src={tradingCube}
        alt="Trading Time Cube"
        className="max-w-xs md:max-w-md rounded-3xl shadow-2xl"
        style={{ boxShadow: "0 0 80px 10px #a259ff" }}
      />
    </div>
    <div className="w-full md:w-1/2 flex flex-col items-center md:items-start md:pl-16">
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl px-8 py-10 w-full max-w-md">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-2">Nhận robot ngay!</h2>
        <p className="text-lg text-gray-200 mb-8">Kèm theo tư vấn cài đặt</p>
        <form className="w-full flex flex-col gap-4">
          <input
            type="text"
            placeholder="Họ tên"
            className="w-full rounded-xl bg-transparent border border-gray-500 text-white px-5 py-3 focus:outline-none focus:border-blue-500 transition"
          />
          <input
            type="email"
            placeholder="E-mail"
            className="w-full rounded-xl bg-transparent border border-gray-500 text-white px-5 py-3 focus:outline-none focus:border-blue-500 transition"
          />
          <div className="flex items-center w-full rounded-xl border border-gray-500 bg-transparent px-5 py-3 focus-within:border-blue-500 transition">
            <span className="mr-2 text-xl">🇻🇳</span>
            <span className="mr-2 text-white">+84</span>
            <input
              type="tel"
              placeholder="Số điện thoại"
              className="flex-1 bg-transparent text-white outline-none border-none"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 rounded-full text-lg shadow-lg transition"
          >
            Nhận robot
          </button>
        </form>
        <p className="text-xs text-gray-300 mt-6 text-center md:text-left">
          Bằng cách nhấp vào nút gửi, bạn đồng ý với việc xử lý dữ liệu cá nhân của mình theo{" "}
          <a href="#" className="underline text-blue-400">Chính sách quyền riêng tư</a>
        </p>
      </div>
    </div>
  </section>
);

export default ContactMe;