import { DollarSign } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { SetStateAction } from "react";
import ITransaction from "@/interfaces/ITransaction";
import { Skeleton } from "./ui/skeleton";

interface HistorialTransactionsProps {
  isSheetOpen: boolean;
  setIsSheetOpen: React.Dispatch<SetStateAction<boolean>>;
  transactions: ITransaction[];
  loading: boolean;
}

const HistorialTransactions = ({
  isSheetOpen,
  setIsSheetOpen,
  transactions,
  loading,
}: HistorialTransactionsProps) => {
  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetContent className="p-0 overflow-auto">
        <SheetHeader className="border-b pb-2 mb-2 p-2">
          <SheetTitle>Transactions</SheetTitle>
          <SheetDescription>
            History of transactions made by the user
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-2">
          {loading && (
            <div className="inline-flex px-2 py-2 justify-between w-full hover:bg-muted">
              <div className="inline-flex gap-2">
                <Skeleton className="w-[46px] h-[46px] rounded-full" />
                <div className="flex flex-col justify-between">
                  <Skeleton className="w-[55px] h-[20px]" />
                  <Skeleton className="w-[30px] h-[10px]" />
                </div>
              </div>
              <div className="flex flex-col w-full justify-between items-end">
                <Skeleton className="w-[40px] h-[15px]" />
                <Skeleton className="w-[70px] h-[25px]" />
              </div>
            </div>
          )}
          {!loading &&
            transactions.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

interface TransactionCardProps {
  className?: string;
  transaction: ITransaction;
}

export const TransactionCard = ({ className = "", transaction }: TransactionCardProps) => {
  return (
    <div className={"inline-flex px-2 py-2 justify-between w-full hover:bg-muted " + className} >
      <div className="inline-flex gap-2">
        <div
          className={
            "p-2 rounded-full" +
            (transaction.type === "withdrawal"
              ? " bg-destructive/50 text-destructive "
              : " bg-primary/50 text-primary ")
          }
        >
          <DollarSign className="" size={30} />
        </div>
        <div className="flex flex-col">
          <span className="text-md font-semibold">{transaction.type}</span>
          <span className="text-xs">Food</span>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <span className="text-xs text-right">{transaction.date}</span>
        <span className="text-lg font-semibold text-right">
          {transaction.amount}
        </span>
      </div>
    </div>
  );
};

export default HistorialTransactions;
