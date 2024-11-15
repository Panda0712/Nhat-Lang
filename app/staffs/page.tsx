import { getStaffs } from "../_lib/action";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function StaffPage() {
  const { staff } = await getStaffs();

  return (
    <div className="container text-white mx-auto max-w-[80%] pt-8 pb-20">
      <h1 className="sm:text-2xl text-base mb-12 mx-auto font-semibold text-center uppercase">
        Danh sách nhân viên
      </h1>
      <DataTable columns={columns} data={staff} />
    </div>
  );
}
