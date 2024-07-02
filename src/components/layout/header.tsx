import { BadgeCent, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const Header = () => {
  const { handleLogout } = useContext(AuthContext);

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
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar sesión</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
