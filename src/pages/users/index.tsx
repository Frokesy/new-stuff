import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabaseClient";
import MainContainer from "../../components/containers/MainContainer";
import UserModal from "../../components/modals/UserModal";
import PageLoader from "../../components/defaults/PageLoader";

interface DataProps {
  created_at: string;
  email: string;
  id: number;
  name: string;
  userId: string;
}

const Users = () => {
  const [data, setData] = useState<DataProps[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<DataProps>()
  const [loading, setLoading] = useState<boolean>(true);


  const handleClick = (item: DataProps) => {
    setIsOpen(true)
    setSelectedData(item)
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data: users, error } = await supabase.from("users").select("*");
        if (error) {
          throw error;
        }
        setLoading(false)
        setData(users);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);
  return (
    <MainContainer active="users">
      <div className="flex flex-col bg-white mx-10 pt-14">
      <h2 className="text-[30px] font-bold mb-6">Users</h2>
        {loading ? (
          <div className="h-[60vh]">
            <PageLoader />
          </div>
        ) : (
          <div className="">
          <div className=" w-full inline-block align-middle">
            <div className="overflow-x-auto border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="pl-6 py-3 lg:text-[14px] text-[10px] font-bold text-left text-gray-500 uppercase "
                    >
                      User Id
                    </th>
                    <th
                      scope="col"
                      className="pl-6 py-3 lg:text-[14px] text-[10px] font-bold text-left text-gray-500 uppercase "
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 lg:text-[14px] text-[10px] font-bold text-left text-gray-500 uppercase "
                    >
                      Mobile Number
                    </th>
                    <th
                      scope="col"
                      className="py-3 lg:text-[14px] text-[10px] font-bold text-center text-gray-500 uppercase "
                    >
                      Email Address
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 lg:text-[14px] text-[10px] font-bold text-right text-gray-500 uppercase "
                    >
                      Date Joined
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((item) => (
                    <tr
                      key={item.userId}
                      onClick={() => handleClick(item)}
                      className="cursor-pointer hover:text-[#3A5743] transition-all duration-500 ease-in-out text-[#8D9091] hover:text-semibold hover:bg-neutral-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap lg:text-[14px] text-[12px]">
                        {item.userId.slice(0, 6)}
                      </td>
                      <td className="pr-6 py-4 whitespace-nowrap lg:text-[14px] text-[12px]">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 lg:text-[14px] text-[12px] font-medium text-left whitespace-nowrap">
                        +2349157881431
                      </td>
                      <td className="px-6 py-4 font-medium text-center whitespace-nowrap lg:text-[14px] text-[12px]">
                        {item.email}
                      </td>
                      <td className="pr-6 py-4 lg:text-[14px] text-[12px] text-right whitespace-nowrap">
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        )}
      </div>

      {isOpen && <UserModal isOpen={isOpen} setIsOpen={setIsOpen} item={selectedData} />}
    </MainContainer>
  );
};

export default Users;
