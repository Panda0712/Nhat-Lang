import { createClient } from "@/utils/supabase/server";
import { getCustomers } from "../_lib/action";
import { CustomerClientWrapper } from "./customer-update";
import { redirect } from "next/navigation";

export default async function CustomerPage() {
  const { customers } = await getCustomers();

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  return (
    <div className="container text-white mx-auto max-w-[90%] pt-8 pb-20">
      <h1 className="sm:text-2xl text-base mb-12 mx-auto font-semibold text-center uppercase">
        Danh sách khách hàng
      </h1>
      <CustomerClientWrapper initialCustomers={customers} />
    </div>
  );
}
