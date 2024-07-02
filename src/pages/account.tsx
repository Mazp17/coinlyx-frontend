import { TransactionCard } from "@/components/HistorialTransactions";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { AuthContext } from "@/context/AuthContext";
import ITransaction from "@/interfaces/ITransaction";
import api from "@/services/api";
import { useContext, useEffect, useState } from "react";

const Account = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data } = await api.get(
          `/api/transactions/account/${user?.accountNumber}`
        );
        setTransactions(data.data);
      } catch (error) {
        console.log(error);
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
          <Button size={"sm"}>New Transaction</Button>
        </header>
        <div className="flex flex-col gap-2">
          <div className="border p-4 rounded-md">
            <span className="text-sm font-light">Your balance</span>
            <h3 className="text-2xl font-bold">${user?.balance || 0.0}</h3>
          </div>
        </div>
        {transactions.map((transaction) => (
          <TransactionCard className="rounded-md border" key={transaction.id} transaction={transaction} />
        ))}
      </main>
      <Toaster />
    </div>
  );
};

export default Account;
