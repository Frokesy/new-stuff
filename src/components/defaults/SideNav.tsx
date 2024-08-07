import { FC } from "react";
import { FaHome, FaPowerOff, FaTools } from "react-icons/fa";
import { FaPeopleGroup, FaShop } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
interface SideNavProps {
  active: string;
  logout: () => void;
}

const SideNav: FC<SideNavProps> = ({ active, logout }) => {

  return (
      <div className="pt-10 h-screen bg-[#19483a] text-[#fff]">
        <div className="flex flex-col px-6">
          <NavLink
            to="/dashboard"
            className={`flex items-center space-x-3 py-4 ${
              active === "dashboard" &&
              "bg-[#fff] text-[#19483a] px-3 rounded-lg transition-all duration-500 ease-in-out font-semibold"
            }`}
          >
            <FaHome size={20} />
            <span className="text-[16px]">Dashboard</span>
          </NavLink>
          <NavLink
            to="/products-catalogue"
            className={`flex items-center space-x-3 py-4 ${
              active === "products" &&
              "bg-[#fff] text-[#19483a] px-3 rounded-lg transition-all duration-500 ease-in-out font-semibold"
            }`}
          >
            <FaShop size={20} />
            <span className="text-[16px]">Products Catalogue</span>
          </NavLink>
          <NavLink
            to="/users"
            className={`flex items-center space-x-3 py-4 ${
              active === "users" &&
              "bg-[#fff] text-[#19483a] px-3 rounded-lg transition-all duration-500 ease-in-out font-semibold"
            }`}
          >
            <FaPeopleGroup size={20} />
            <span className="text-[16px]">Users</span>
          </NavLink>
          <NavLink
            to="/settings"
            className={`flex items-center space-x-3 py-4 ${
              active === "settings" &&
              "bg-[#fff] text-[#19483a] px-3 rounded-lg transition-all duration-500 ease-in-out font-semibold"
            }`}
          >
            <FaTools size={20} />
            <span className="text-[16px]">Settings</span>
          </NavLink>
          <div
            onClick={() => logout()}
            className="flex items-center text-red-500 font-semibold cursor-pointer space-x-3 py-4"
          >
            <FaPowerOff size={20} />
            <span className="text-[16px]">Logout</span>
          </div>
        </div>
      </div>
  );
};

export default SideNav;
