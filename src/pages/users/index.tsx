import MainContainer from "../../components/containers/MainContainer";

const Users = () => {
  return (
    <MainContainer active="users">
      <div className="flex flex-col bg-white mt-4 w-[100%]">
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
                      className="pr-6 py-3 lg:text-[14px] text-[10px] font-bold text-left text-gray-500 uppercase "
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
                      className="px-6 py-3 lg:text-[14px] text-[10px] font-bold text-center text-gray-500 uppercase "
                    >
                      Date Joined
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="cursor-pointer hover:text-[#3A5743] transition-all duration-500 ease-in-out text-[#8D9091] hover:text-semibold hover:bg-neutral-200">
                    <td className="px-6 py-4 whitespace-nowrap lg:text-[14px] text-[12px]">
                      635981586200289
                    </td>
                    <td className="pr-6 py-4 whitespace-nowrap lg:text-[14px] text-[12px]">
                        Frokeslini Noah
                    </td>
                    <td className="px-6 py-4 lg:text-[14px] text-[12px] font-medium text-center whitespace-nowrap">
                      +2349157881431
                    </td>
                    <td className="px-6 py-4 font-medium text-center whitespace-nowrap lg:text-[14px] text-[12px]">
                      frokeslini@gmail.com
                    </td>
                    <td className="pr-6 py-4 lg:text-[14px] text-[12px] whitespace-nowrap">
                      03/12/2022
                    </td>
                  </tr>
                </tbody>
                <tbody className="divide-y divide-gray-200">
                  <tr className="cursor-pointer hover:text-[#3A5743] transition-all duration-500 ease-in-out text-[#8D9091] hover:text-semibold hover:bg-neutral-200">
                    <td className="px-6 py-4 lg:text-[14px] text-[12px] whitespace-nowrap">
                      635981586200289
                    </td>
                    <td className="pr-6 py-4 whitespace-nowrap lg:text-[14px] text-[12px]">
                      Ayanfeoluwa Akindele
                    </td>
                    <td className="px-6 py-4 lg:text-[14px] text-[12px] font-medium text-center whitespace-nowrap">
                      +2348148175713
                    </td>
                    <td className="px-6 py-4 font-medium text-center whitespace-nowrap lg:text-[14px] text-[12px]">
                      frokeslini@gmail.com
                    </td>
                    <td className="pr-6 py-4 lg:text-[14px] text-[12px] whitespace-nowrap">
                      03/12/2022
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default Users;
