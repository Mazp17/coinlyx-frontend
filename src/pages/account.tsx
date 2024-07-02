import { TransactionCard } from "@/components/HistorialTransactions";
import ModalCreateTransaction from "@/components/createTransaction";
import Header from "@/components/layout/header";
import { Toaster } from "@/components/ui/toaster";
import { AuthContext } from "@/context/AuthContext";
import ITransaction from "@/interfaces/ITransaction";
import api from "@/services/api";
import { CircleHelp } from "lucide-react";
import { useContext, useEffect, useState } from "react";

const Account = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    setLoading(true);
    const fetchTransactions = async () => {
      try {
        const { data } = await api.get(
          `/api/transactions/account/${user?.accountNumber}`
        );
        setTransactions(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-background/70 w-full ">
      <Header />
      <main className="w-[80%] mt-3 space-y-3">
        <header className="w-full inline-flex justify-between">
          <h1 className="text-lg font-semibold">Your Account</h1>
          <ModalCreateTransaction />
        </header>
        <div className="flex flex-col gap-2">
          <div className="border p-4 rounded-md">
            <span className="text-sm font-light">Your balance</span>
            <h3 className="text-2xl font-bold">${user?.balance || 0.0}</h3>
          </div>
        </div>
        {(transactions.length === 0 && !loading) && (
          <div
            className={
              "inline-flex px-2 py-2 justify-between w-full hover:bg-muted border rounded-md"
            }
          >
            <div className="inline-flex gap-2">
              <div
                className={
                  "p-2 rounded-full bg-muted-foreground/50 text-secondary-foreground "
                }
              >
                <CircleHelp />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-md font-semibold">
                  Not transactions yet
                </span>
              </div>
            </div>
          </div>
        )}
        {transactions.map((transaction) => (
          <TransactionCard
            className="rounded-md border"
            key={transaction.id}
            transaction={transaction}
          />
        ))}
      </main>
      <Toaster />
    </div>
  );
};

export default Account;
