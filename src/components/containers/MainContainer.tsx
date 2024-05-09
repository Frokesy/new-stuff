import React, { FC } from "react";
import SideNav from "../defaults/SideNav";

interface ContainerProps {
  children: React.ReactNode;
  active: string;
}

const MainContainer: FC<ContainerProps> = ({ children, active }) => {
  return (
    <div className="flex justify-between">
      <div className="w-[20%]">
        <SideNav active={active} />
      </div>
      <div className="w-[85%] px-10 pt-10 bg-[#f1f1f1]">{children}</div>
    </div>
  );
};

export default MainContainer;
