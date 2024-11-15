import { Oswald } from "next/font/google";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { colors } from "./_constants/color";
import Link from "next/link";

export const font = Oswald({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const page = () => {
  return (
    <main
      className={`flex text-white h-full py-12 flex-col items-center justify-center ${font.className}`}
    >
      <div className="text-white mb-12 pb-12 border-b-2 border-[#94a3b8] border-opacity-15">
        <h1 className="sm:text-2xl text-base mb-3 mx-auto max-w-[70%] font-normal text-center uppercase">
          Nhật Lãng - Nơi hội tụ kho tàng phim đỉnh cao, chất lượng và trải
          nghiệm điện ảnh chân thực nhất
        </h1>
        <p className="sm:text-base text-sm mb-16 text-[#dcdcdc] text-center max-w-[60%] mx-auto">
          Trung tâm phim Nhật Lãng được thành lập vào năm 2024 với chỉ vỏn vẹn 4
          thành viên, sau đó phát triển thành thế lực lớn mạnh với kho tàng hàng
          trăm phim lớn nhỏ vô cùng chất lượng, hứa hẹn đem đến trải nghiệm bùng
          nổ nhất cho khách hàng.
        </p>
        <div className="mx-auto relative w-[80%] h-[500px] shadow-lg">
          <Image
            src="/home-background2.jpg"
            className="rounded-md"
            layout="fill"
            quality={100}
            alt="homescreen-background"
          />
        </div>
      </div>

      <div className="w-full pt-2 pb-12 border-b-2 border-[#94a3b8] border-opacity-15">
        <h1 className="sm:text-2xl text-base mb-20 mx-auto font-normal text-center uppercase">
          Cốt lõi của Nhật Lãng
        </h1>
        <ul className="flex w-full justify-around items-center sm:gap-x-8 gap-x-4">
          <li>
            <div className="relative w-[300px] h-[350px]">
              <Image
                src="/feature-thumb.jpg"
                layout="fill"
                alt="feature-movie-thumb"
                className="rounded-md"
              />
            </div>
            <p className="text-center sm:text-lg text-sm mt-2">Phim truyện</p>
          </li>
          <li>
            <div className="relative w-[300px] h-[350px]">
              <Image
                src="/science-thumb.jpg"
                layout="fill"
                alt="feature-movie-thumb"
                className="rounded-md"
              />
            </div>
            <p className="text-center sm:text-lg text-sm mt-2">Phim khoa học</p>
          </li>
          <li>
            <div className="relative w-[300px] h-[350px]">
              <Image
                src="/music-thumb.jpg"
                layout="fill"
                className="rounded-md"
                alt="feature-movie-thumb"
              />
            </div>
            <p className="text-center sm:text-lg text-sm mt-2">Phim ca nhạc</p>
          </li>
          <li>
            <div className="relative w-[300px] h-[350px]">
              <Image
                src="/thretical-thumb.jpg"
                layout="fill"
                alt="feature-movie-thumb"
                className="rounded-md"
              />
            </div>
            <p className="text-center sm:text-lg text-sm mt-2">Phim sân khấu</p>
          </li>
        </ul>
      </div>

      <div className="pt-12 pb-8">
        <h1 className="sm:text-2xl text-base mb-3 mx-auto font-normal text-center uppercase">
          Kênh liên lạc của Nhật Lãng
        </h1>
        <p className="sm:text-base text-sm mb-6 text-[#dcdcdc] text-center max-w-[80%] mx-auto">
          Tìm hiểu thêm về các kênh liên lạc của chúng tôi nếu bạn muốn cập nhật
          những thông tin, thông báo từ Nhật Lãng một cách sớm nhất.
        </p>
        <ul className="flex items-center gap-x-6 justify-center">
          <Link href="https://instagram.com" target="_blank">
            <li className="transition-all hover:opacity-90 cursor-pointer">
              <FaInstagram
                style={{ color: colors.instagram }}
                className="w-8 h-8"
              />
            </li>
          </Link>
          <Link href="https://facebook.com">
            <li className="transition-all hover:opacity-90 cursor-pointer">
              <FaFacebook
                style={{ color: colors.facebook }}
                className="w-8 h-8"
              />
            </li>
          </Link>
          <Link href="https://youtube.com">
            <li className="transition-all hover:opacity-90 cursor-pointer">
              <FaYoutube
                style={{ color: colors.youtube }}
                className="w-8 h-8"
              />
            </li>
          </Link>
        </ul>
      </div>
    </main>
  );
};

export default page;
