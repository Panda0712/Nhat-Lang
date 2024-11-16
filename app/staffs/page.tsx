import { getStaffs } from "../_lib/action";
import { StaffClientWrapper } from "./staff-update";

export default async function StaffPage() {
  const { staff } = await getStaffs();

  return (
    <div className="container text-white mx-auto max-w-[90%] pt-8 pb-20">
      <h1 className="sm:text-2xl text-base mb-12 mx-auto font-semibold text-center uppercase">
        Danh sách nhân viên
      </h1>
      <StaffClientWrapper initialStaffs={staff} />
    </div>
  );
}
