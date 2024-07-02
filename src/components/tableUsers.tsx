import { Eye } from "lucide-react";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import IUser from "@/interfaces/IUser";
import { useEffect, useState } from "react";
import api from "@/services/api";

const TableUsers = ({ openSheet }: { openSheet: (userId: number) => void }) => {
  const [users, setUsers] = useState<Array<IUser>>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await api.get("/api/users");
        setUsers(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Balance</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users &&
          users.map((user) =>
            rowUser({
              user,
              openSheet,
            })
          )}
      </TableBody>
    </Table>
  );
};

const rowUser = ({
  user,
  openSheet,
}: {
  user: IUser;
  openSheet: (userId: number) => void;
}) => {
  return (
    <TableRow key={user.id}>
      <TableCell className="">
        {user.id}
      </TableCell>
      <TableCell className="font-medium">
        {user.firstName} {user.lastName}
      </TableCell>
      <TableCell>${user.balance}</TableCell>
      <TableCell className="inline-flex gap-1">
        <Button onClick={() => {
          openSheet(user.accountNumber);
        }} size={"sm"} variant={"ghost"}>
          <Eye />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TableUsers;
