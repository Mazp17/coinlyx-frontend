import { BadgeCent } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";

const Header = () => {
  return (
    <header className="inline-flex justify-between h-14 w-full items-center gap-4 bg-background px-4 lg:h-[60px] lg:px-6 border-b">
      <a href="#" className="font-bold flex items-center gap-2 text-xl">
        <span className="bg-primary p-2 rounded-full text-white">
          <BadgeCent strokeWidth={2} size={23} />
        </span>
        Coinlyx
      </a>
      <Avatar>
        <AvatarFallback>MZ</AvatarFallback>
      </Avatar>
    </header>
  );
};

export default Header;
