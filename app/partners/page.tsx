import { createClient } from "@/utils/supabase/server";
import { getPartners, getUserByEmail } from "../_lib/action";
import { PartnerClientWrapper } from "./partner-update";
import { redirect } from "next/navigation";
import PartnerCustomer from "./partner-customer";

export default async function PartnerPage() {
  const { partners } = await getPartners();

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const userData = await getUserByEmail(user?.email ?? "");

  return (
    <div className="container text-white mx-auto max-w-[90%] pt-8 pb-20">
      <h1 className="sm:text-2xl text-base mb-12 mx-auto font-semibold text-center uppercase">
        Danh sách đối tác
      </h1>
      {userData?.role !== "ADMIN" ? (
        <PartnerCustomer initialPartners={partners} />
      ) : (
        <PartnerClientWrapper initialPartners={partners} />
      )}
    </div>
  );
}
