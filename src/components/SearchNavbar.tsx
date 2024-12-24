import { useSidebar } from "@/state/useSidebar";
import { FiSidebar as SidebarTogglerIcon } from "react-icons/fi";
import { IoMdHelpCircleOutline as HelpIcon } from "react-icons/io";
import { LuMessageCircleMore as MessageIcon } from "react-icons/lu";
import { RiEqualizer2Line as EqualizerIcon } from "react-icons/ri";
import {
  IoNotificationsOutline as BellIcon,
  IoSearchOutline as SearchIcon,
} from "react-icons/io5";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const SearchNavbar = () => {
  const toggleSidebar = useSidebar((state) => state.toggleSidebar);
  return (
    <div className="p-2 flex items-center gap-8">
      <div className="flex gap-3">
        <button onClick={() => toggleSidebar()}>
          <SidebarTogglerIcon className="text-xl" />
        </button>
        <button
          type="button"
          className="bg-white border px-4 py-2 w-[300px] rounded-xl flex items-center capitalize text-gray-700"
        >
          <SearchIcon className="size-4 mr-2" />
          search your course
        </button>
      </div>
      <div className="flex gap-6">
        {[
          <HelpIcon />,
          <div>
            <span className="absolute size-2 rounded-full bg-rose-500 right-0"></span>
            <MessageIcon />
          </div>,
          <EqualizerIcon />,
          <div>
            <span className="absolute size-2 rounded-full bg-rose-500 right-0"></span>
            <BellIcon />
          </div>,
          ,
        ].map((icon, index) => (
          <div key={index}>
            <button
              type="button"
              className="relative text-[23px] text-gray-500"
            >
              {icon}
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-3 items-center">
        <Avatar className="rounded-md">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>adeline</AvatarFallback>
        </Avatar>
        <span className="capitalize text-nowrap font-semibold">
          adeline h. dancy
        </span>
      </div>
    </div>
  );
};

export default SearchNavbar;
