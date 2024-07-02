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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

const TableUsers = ({ openSheet }: { openSheet: (userId: number) => void }) => {
  const [users, setUsers] = useState<Array<IUser>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get(`/api/users?page=${currentPage}`);
        setUsers(response.data.data);
        setTotalPages(response.data.meta.last_page);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, [currentPage]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
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
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={prevPage}/>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">{currentPage}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">{totalPages}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext onClick={nextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
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
      <TableCell className="">{user.id}</TableCell>
      <TableCell className="font-medium">
        {user.firstName} {user.lastName}
      </TableCell>
      <TableCell>${user.balance}</TableCell>
      <TableCell className="inline-flex gap-1">
        <Button
          onClick={() => {
            openSheet(user.accountNumber);
          }}
          size={"sm"}
          variant={"ghost"}
        >
          <Eye />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TableUsers;
