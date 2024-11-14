import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="border-t-2 px-4 flex flex-col gap-6 border-opacity-15 pt-4 pb-6 border-[#94a3b8]">
      <div className="flex justify-around sm:gap-x-8 pb-6 gap-x-4 border-b-2 border-opacity-15 border-[#94a3b8]">
        <div>
          <div className="flex items-center gap-x-4">
            <Image
              src="/nl-logo.png"
              width={200}
              height={200}
              className="w-16 h-16 border-2 rounded-full"
              alt="logo-image"
            />
            <span className="text-white font-semibold">Nhật Lãng Film</span>
          </div>
          <p className="mt-5 text-white max-w-[300px]">
            Trung tâm phim Nhật Lãng, chuyên cung cấp kho tàng phim chất lượng
            được chọn lọc từ các hãng phim hàng đầu trên thế giới để đem đến
            trải nghiệm điện ảnh đỉnh cao.
          </p>
        </div>

        <ul className="mt-4">
          <h3 className="text-white uppercase mb-2 font-semibold">
            Điều hướng
          </h3>
          <Link href="/movies">
            <li
              className={`text-[#dcdcdc] mb-1 hover:text-[#38bdf8] font-medium cursor-pointer transition-all`}
            >
              Phim
            </li>
          </Link>
          <Link href="/staffs">
            <li
              className={`text-[#dcdcdc] mb-1 hover:text-[#38bdf8] font-medium cursor-pointer transition-all`}
            >
              Nhân viên
            </li>
          </Link>
          <Link href="/partners">
            <li
              className={`text-[#dcdcdc] mb-1 hover:text-[#38bdf8] font-medium cursor-pointer transition-all`}
            >
              Đối tác
            </li>
          </Link>
          <Link href="/customers">
            <li
              className={`text-[#dcdcdc] mb-1 hover:text-[#38bdf8] font-medium cursor-pointer transition-all`}
            >
              Khách hàng
            </li>
          </Link>
        </ul>

        <ul className="mt-4 text-white">
          <h3 className="text-white uppercase mb-2 font-semibold">
            Dịch vụ phim
          </h3>
          <p className="mb-1">Phim truyện</p>
          <p className="mb-1">Phim ca nhạc</p>
          <p className="mb-1">Phim sân khấu</p>
          <p className="mb-1">Phim khoa học</p>
        </ul>

        <ul className="mt-4 text-white">
          <h3 className="text-white uppercase mb-2 font-semibold">Liên hệ</h3>
          <div className="flex items-center mb-1 gap-x-2">
            <MdEmail />
            <p>Email: toilatatca@gmail.com</p>
          </div>
          <div className="flex items-center mb-1 gap-x-2">
            <FaPhoneAlt />
            <p>Số điện thoại: 0369332842</p>
          </div>
          <div className="flex items-center mb-1 gap-x-2">
            <FaLocationDot />
            <p className="max-w-[280px]">
              Địa chỉ: 280 An Dương Vương, phường 4, quận 5, TPHCM
            </p>
          </div>
        </ul>
      </div>
      <div className="flex items-center justify-around">
        <p className="text-white">Bản quyền © 2024 Toilatatca</p>
        <div className="flex items-center gap-x-4">
          <FaFacebook className="cursor-pointer transition-all hover:opacity-90 w-7 h-7 text-[#4267B2]" />
          <FcGoogle className="cursor-pointer transition-all hover:opacity-90 w-7 h-7" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
