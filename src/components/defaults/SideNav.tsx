import { FC } from "react";
import { FaHome, FaPowerOff, FaTools } from "react-icons/fa";
import { FaPeopleGroup, FaShop } from "react-icons/fa6";

interface SideNavProps {
    active: string;
}

const SideNav: FC<SideNavProps> = ({ active }) => {
  return (
    <div className="pt-10 h-screen bg-[#19483a] text-[#fff]">
      <div className="flex flex-col px-6">
        <div className={`flex items-center space-x-3 py-4 ${active === 'dashboard' && 'bg-[#fff] text-[#19483a] px-3 rounded-lg font-semibold'}`}>
            <FaHome size={20} />
            <span className="text-[16px]">Dashboard</span>
        </div>
        <div className="flex items-center space-x-3 py-4">
            <FaShop size={20} />
            <span className="text-[16px]">Product Catalogue</span>
        </div>
        <div className="flex items-center space-x-3 py-4">
            <FaPeopleGroup size={20} />
            <span className="text-[16px]">Users</span>
        </div>
        <div className="flex items-center space-x-3 py-4">
            <FaTools size={20} />
            <span className="text-[16px]">Settings</span>
        </div>
        <div className="flex items-center space-x-3 py-4">
            <FaPowerOff size={20} />
            <span className="text-[16px]">Logout</span>
        </div>
      </div>
    </div>
  )
}

export default SideNav
