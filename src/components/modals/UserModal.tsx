import { FC } from "react";
import ModalContainer from "../containers/ModalContainer";
import { DataProps } from "../../pages/users";


interface UserModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  item: DataProps | undefined;
}

const UserModal: FC<UserModalProps> = ({ isOpen, setIsOpen, item }) => {
  console.log("from modal", item);
  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex justify-center items-center">
        <div className="bg-neutral-100 max-h-[90vh] w-[60vw] rounded-2xl p-10">
          <div className="bg-white flex pr-4 space-x-[2vw] rounded-xl">
            <img src="/assets/fruits.png" alt="fruits" className="w-[10rem]" />
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-[28px] font-semibold">{item?.name}</h2>
              <div className="flex justify-center items-center space-x-10 mt-4">
                <button className="py-2 px-6 bg-[#FCEFEF] text-[#CC2929] rounded-full text-[14px]">
                  Restrict
                </button>
                <button className="py-2 px-6 bg-[#276E59] text-[#fff] rounded-full text-[14px]">
                  Verify
                </button>
              </div>
            </div>
          </div>
          <div className="mt-10 bg-white flex flex-col space-y-3 px-6 py-4 rounded-xl">
            <h2 className="text-[20px] font-semibold mb-2">item Information</h2>
            <div className="flex items-center space-x-4">
              <span className="text-[#8D9091] text-[15px]">Phone:</span>
              <span className="text-[15px]">+2348148175713</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-[#8D9091] text-[15px]">Email:</span>
              <span className="text-[15px]">{item?.email}</span>
            </div>
          </div>
          <div className="flex justify-end mt-[3vh]">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-[#fff] py-2 px-10 rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default UserModal;
