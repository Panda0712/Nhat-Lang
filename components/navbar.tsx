import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex border-b-2 border-[#94a3b8] border-opacity-15 py-6 px-4 items-center justify-around sm:gap-x-6 gap-x-4">
      <Link href="/">
        <Image
          src="/nl-logo.png"
          width={200}
          height={200}
          className="w-20 h-20 border-2 border-[#ffffff] rounded-full cursor-pointer"
          alt="logo-image"
        />
      </Link>
      <div className="relative">
        <input
          type="text"
          placeholder="Tìm kiếm phim..."
          className="border text-white border-[#94a3b8] pl-9 py-2 rounded-full text-sm outline-none bg-[#1e293b] focus:border-[#38bdf8]"
        />
        <span className="absolute left-[6px] top-[50%] translate-y-[-50%]">
          🔍
        </span>
      </div>
      <ul className="flex items-center sm:gap-x-8 gap-x-4">
        <Link href="/movies">
          <li
            className={`text-white hover:text-[#38bdf8] font-medium cursor-pointer transition-all`}
          >
            Phim
          </li>
        </Link>
        <Link href="/staffs">
          <li
            className={`text-white hover:text-[#38bdf8] font-medium cursor-pointer transition-all`}
          >
            Nhân viên
          </li>
        </Link>
        <Link href="/partners">
          <li
            className={`text-white hover:text-[#38bdf8] font-medium cursor-pointer transition-all`}
          >
            Đối tác
          </li>
        </Link>
        <Link href="/customers">
          <li
            className={`text-white hover:text-[#38bdf8] font-medium cursor-pointer transition-all`}
          >
            Khách hàng
          </li>
        </Link>
        <li className="relative group">
          <span className="text-white cursor-pointer font-medium transition-all">
            Giao dịch
          </span>
          <div className="w-[70px] h-3 absolute bottom-[-10px]"></div>
          <ul className="absolute min-w-[200px] left-[-80px] top-full mt-2 bg-[#1e293b] shadow-md rounded-md opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-10">
            <Link href="/transactions/partners">
              <li className="text-white border-b-[#dcdcdc] border-opacity-15 border-b-[1px] hover:text-[#38bdf8] px-4 py-3 text-sm cursor-pointer transition-all">
                Giao dịch với đối tác
              </li>
            </Link>
            <Link href="/transactions/customers">
              <li className="text-white hover:text-[#38bdf8] px-4 py-3 text-sm cursor-pointer transition-all">
                Giao dịch với khách hàng
              </li>
            </Link>
          </ul>
        </li>
        <Link href="/accounts">
          <li
            className={`text-white hover:text-[#38bdf8] font-medium cursor-pointer transition-all`}
          >
            Tài khoản
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
