import { DollarSign, Scale } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./ui/sheet";
import { SetStateAction } from "react";

interface HistorialTransactionsProps {
    isSheetOpen: boolean;
    setIsSheetOpen: React.Dispatch<SetStateAction<boolean>>;
}

const HistorialTransactions = ({isSheetOpen, setIsSheetOpen}: HistorialTransactionsProps) => {
  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetContent className="p-0">
        <SheetHeader className="border-b pb-2 mb-2 p-2">
          <SheetTitle>Transactions</SheetTitle>
          <SheetDescription>
            History of transactions made by the user
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-2">
          <div className="inline-flex px-2 py-2 justify-between w-full hover:bg-muted">
            <div className="inline-flex gap-2">
              <div className="p-2 bg-primary/50 text-primary rounded-full">
                <DollarSign size={30} />
              </div>
              <div className="flex flex-col">
                <span className="text-md font-semibold">Income</span>
                <span className="text-xs">Payroll</span>
              </div>
            </div>
            <div className="flex flex-col w-full">
              <span className="text-xs text-right">2024-06-30</span>
              <span className="text-lg font-semibold text-right">
                $1,000,000.00
              </span>
            </div>
          </div>
          <div className="inline-flex px-2 py-2 justify-between w-full hover:bg-muted">
            <div className="inline-flex gap-2">
              <div className="p-2 bg-destructive/50 text-destructive rounded-full">
                <DollarSign className="" size={30} />
              </div>
              <div className="flex flex-col">
                <span className="text-md font-semibold">Expense</span>
                <span className="text-xs">Food</span>
              </div>
            </div>
            <div className="flex flex-col w-full">
              <span className="text-xs text-right">2024-06-30</span>
              <span className="text-lg font-semibold text-right">
                $1,000.00
              </span>
            </div>
          </div>
          <div className="inline-flex px-2 py-2 justify-between w-full hover:bg-muted">
            <div className="inline-flex gap-2">
              <div className="p-2 bg-secondary-foreground/50 text-secondary-foreground rounded-full">
                <Scale size={30} />
              </div>
              <div className="flex flex-col">
                <span className="text-md font-semibold">Balance</span>
                <span className="text-xs"></span>
              </div>
            </div>
            <div className="flex flex-col w-full">
              <span className="text-xs text-right">2024-06-30</span>
              <span className="text-lg font-semibold text-right">$1.00</span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HistorialTransactions;