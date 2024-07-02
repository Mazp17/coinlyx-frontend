import HistorialTransactions from "@/components/HistorialTransactions";
import CreateUser from "@/components/createUser";
import Header from "@/components/layout/header";
import TableUsers from "@/components/tableUsers";
import { Toaster } from "@/components/ui/toaster";
import ITransaction from "@/interfaces/ITransaction";
import api from "@/services/api.ts";
import { useState } from "react";



const Users = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [transactions, setTransactions] = useState<ITransaction[]>([])
  const [loading, setLoading] = useState(false);
  const openSheet = async (accountNumber: number) => {
    setLoading(true);
    setTransactions([]);
    setIsSheetOpen(true);
    const { data } = await api.get(`/api/transactions/account/${accountNumber}`);
    setTransactions(data.data);
    setLoading(false);

  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-background/70 w-full ">
      <Header  isAdmin/>
      <main className="w-[80%] mt-3 space-y-2">
        <HistorialTransactions
          loading={loading}
          isSheetOpen={isSheetOpen}
          setIsSheetOpen={setIsSheetOpen}
          transactions={transactions}
        ></HistorialTransactions>
        <header className="w-full inline-flex justify-between">
          <h1 className="text-lg font-semibold">Users</h1>
          <CreateUser></CreateUser>
        </header>
        <TableUsers openSheet={openSheet}></TableUsers>
      </main>
      <Toaster />
    </div>
  );
};

export default Users;
