import { BadgeCent, FolderDown, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import api from "@/services/api";

const Header = ({ isAdmin }: { isAdmin: boolean }) => {
  const { handleLogout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const downloadLogs = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/download-activity-log", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", "activity-log.csv");

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <header className="inline-flex justify-between h-14 w-full items-center gap-4 bg-background px-4 lg:h-[60px] lg:px-6 border-b">
      <a href="#" className="font-bold flex items-center gap-2 text-xl">
        <span className="bg-primary p-2 rounded-full text-white">
          <BadgeCent strokeWidth={2} size={23} />
        </span>
        Coinlyx
      </a>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarFallback>MZ</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          {isAdmin && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={downloadLogs}>
                <FolderDown className="h-4 w-4 mr-2" />
                <span>Dowload Logs</span>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>LogOut</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
