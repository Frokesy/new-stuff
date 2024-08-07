import { FC, useState } from "react";
import Loader from "../defaults/Loader.tsx";
import ModalContainer from "../containers/ModalContainer.tsx";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../utils/supabaseClient.ts";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutModal: FC<ModalProps> = ({ isOpen, setIsOpen }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error.message;
    }
    if (!error) {
      setLoading(false);
      setIsOpen(!isOpen);
      navigate("/");
    }
  };

  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="lg:w-[20vw] w-[100%]">
        <h2 className="text-[#333]">Are you sure you want to logout?</h2>
        <div className="flex justify-end mt-6">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-1 bg-[#ccc] text-[#333] h-[40px] w-[85px] text-[14px] font-semibold rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleLogout();
            }}
            className="px-4 py-1 bg-[#ff0406] text-[#fff] h-[40px] w-[85px] font-semibold rounded-md ml-4 text-[14px]"
          >
            {loading ? <Loader /> : "Logout"}
          </button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default LogoutModal;
