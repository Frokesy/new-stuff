import { FC } from "react";
import ModalContainer from "../containers/ModalContainer"

interface DataProps {
    created_at: string;
    email: string;
    id: number;
    name: string;
    userId: string;
  }

interface UserModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    item: DataProps | undefined;
}

const UserModal: FC<UserModalProps> = ({ isOpen, setIsOpen, item }) => {
    console.log("from modal", item)
  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen}>
        <h2>User Modal</h2>
    </ModalContainer>
  )
}

export default UserModal
