import { useState, useEffect } from "react";
import MainContainer from "../../components/containers/MainContainer";
import { FaCircle, FaPlus, FaSquare } from "react-icons/fa";
import NewProduct from "../../components/NewProduct";
import ProductAccordion from "../../components/accordion/ProductAccordion";
import PageLoader from "../../components/defaults/PageLoader";

interface ProductsProps {
  active: boolean;
  created: number;
  default_price: string;
  id: string;
  images: object[];
  livemode: false;
  metadata: object;
  name: string;
  object: string;
  type: string;
  updated: string;
  description: string;
}

const ProductsCatalogue = () => {
  const [products, setProducts] = useState<ProductsProps[]>([]);
  const [editedProduct, setEditedProduct] = useState<ProductsProps>();
  const [prices, setPrices] = useState<{ [key: string]: number }>({});
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEditActive, setEditActive] = useState<boolean>(false);
  const [showAccordion, setShowAccordion] = useState<boolean>(false);
  const [accordionId, setAccordionId] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  const formatDate = (unixTimestamp: number) => {
    const date = new Date(unixTimestamp * 1000);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const fetchPrices = async () => {
    await fetch("http://localhost:4000/fetch-prices", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((pricesData) => {
        const pricesMap: { [key: string]: number } = {};
        pricesData.forEach((price: { id: string; unit_amount: number }) => {
          pricesMap[price.id] = price.unit_amount;
        });
        setPrices(pricesMap);
      });
  };

  const fetchAllProducts = async () => {
    await fetch("http://localhost:4000/fetch-products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((productsData) => {
        setLoading(false);
        setProducts(productsData);
      });
  };

  useEffect(() => {
    fetchAllProducts();
    fetchPrices();
  }, []);

  const activateAccordion = (id: string) => {
    setShowAccordion(true);
    setAccordionId(id);
  };

  const activateProductEdit = () => {
    setEditedProduct(products.find((item) => item.id === accordionId));
    setEditActive(true);
  };
  return (
    <MainContainer active="products">
      <div className="relative">
        <div className="flex flex-col mx-10 pt-14">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-[30px] font-bold">Products Catalog</h2>
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center space-x-3 bg-[#19483a] text-[#fff] font-semibold px-6 py-3 rounded-lg"
            >
              <FaPlus />
              <p>Add Product</p>
            </button>
          </div>
          {loading ? (
            <div className="h-[60vh]">
              <PageLoader />
            </div>
          ) : (
            <div className="">
              <div className=" w-full inline-block align-middle">
                <div className="overflow-x-auto border rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
                    <thead className="">
                      <tr>
                        <th
                          scope="col"
                          className="lg:text-[14px] py-3 text-[10px] font-bold text-gray-500"
                        ></th>
                        <th
                          scope="col"
                          className="lg:text-[14px] py-3 text-[10px] font-bold text-left text-[#333]"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="lg:text-[14px] text-[10px] font-bold text-left text-gray-500"
                        >
                          Pricing
                        </th>
                        <th
                          scope="col"
                          className="lg:text-[14px] text-[10px] font-bold text-left text-gray-500"
                        >
                          Created
                        </th>
                        <th
                          scope="col"
                          className="lg:text-[14px] text-[10px] font-bold text-left text-gray-500"
                        >
                          Updated
                        </th>
                        <th
                          scope="col"
                          className="lg:text-[14px] text-[10px] font-bold text-left text-gray-500"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {products.map((item) => (
                        <tr
                          key={item.id}
                          className="cursor-pointer hover:text-[#3A5743] transition-all duration-500 ease-in-out text-[#8D9091] hover:text-semibold hover:bg-neutral-200"
                        >
                          <td className="px-3 whitespace-nowrap w-[10%] lg:text-[14px] text-[12px]">
                            {item?.images[0] ? (
                              <img
                                src={item?.images[0] as unknown as string}
                                alt="img"
                                className="w-[40px] h-[40px] object-cover"
                              />
                            ) : (
                              <FaSquare
                                className="w-[3rem] rotate-45 pl-3 text-[#ccc]"
                                size={24}
                              />
                            )}
                          </td>
                          <td className="py-4 w-[15%] whitespace-nowrap lg:text-[14px] text-[12px]">
                            {item.name}
                          </td>
                          <td className="py-4 lg:text-[14px] w-[10%] text-[12px] font-medium text-left whitespace-nowrap">
                            {prices[item.default_price]
                              ? `£${(prices[item.default_price] / 100).toFixed(
                                  2
                                )}`
                              : "not set"}
                          </td>
                          <td className="py-4 lg:text-[14px] w-[10%] text-[12px] font-medium whitespace-nowrap">
                            {formatDate(item.created)}
                          </td>
                          <td className="py-4 lg:text-[14px] w-[10%] text-[12px] font-medium text-left whitespace-nowrap">
                            {formatDate(parseInt(item.updated))}
                          </td>
                          <td className="py-4 lg:text-[14px] text-[12px] font-medium text-left whitespace-nowrap">
                            {item.active ? "active" : "inactive"}
                          </td>
                          <td className="px-6 text-[#333] lg:text-[14px] text-[12px] text-left whitespace-nowrap">
                            <div className="flex flex-col relative">
                              <div
                                onClick={() => activateAccordion(item.id)}
                                className="flex space-x-1 justify-end py-2 w-[10%] absolute right-0 -top-2"
                              >
                                <FaCircle size={4} />
                                <FaCircle size={4} />
                                <FaCircle size={4} />
                              </div>
                              {showAccordion && accordionId === item.id && (
                                <ProductAccordion item={item} handleClick={activateProductEdit} />
                              )}
                            </div>
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
        {isOpen && <NewProduct setIsOpen={setIsOpen} />}
        {isEditActive && <NewProduct isEditActive={isEditActive} setIsOpen={setEditActive} editedProduct={editedProduct} />}
      </div>
    </MainContainer>
  );
};

export default ProductsCatalogue;
