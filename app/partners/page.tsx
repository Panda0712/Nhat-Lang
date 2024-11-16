import { getPartners } from "../_lib/action";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function PartnerPage() {
  const { partners } = await getPartners();

  return (
    <div className="container text-white mx-auto max-w-[90%] pt-8 pb-20">
      <h1 className="sm:text-2xl text-base mb-12 mx-auto font-semibold text-center uppercase">
        Danh sách đối tác
      </h1>
      <DataTable columns={columns} data={partners} />
    </div>
  );
}
