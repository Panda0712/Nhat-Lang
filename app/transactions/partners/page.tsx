import { getPartnerTransactions } from "@/app/_lib/action";
import { TransactionClientWrapper } from "./partner-update";

export default async function PartnerTransactionsPage() {
  const { agreements } = await getPartnerTransactions();

  return (
    <div className="container text-white mx-auto max-w-[90%] pt-8 pb-20">
      <h1 className="sm:text-2xl text-base mb-12 mx-auto font-semibold text-center uppercase">
        Danh sách giao dịch đối tác
      </h1>
      <TransactionClientWrapper initialTransactions={agreements} />
    </div>
  );
}
