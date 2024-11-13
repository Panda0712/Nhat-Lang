import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const page = () => {
  return (
    <main className="flex h-full flex-col items-center justify-center"></main>
  );
};

export default page;
