import { useState, useEffect } from "react";
import MainContainer from "../../components/containers/MainContainer";

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
}

const ProductsCatalogue = () => {
  const [data, setData] = useState({
    name: "Test Data",
    active: true,
    description: "Test Description",
    default_price_data: {
      currency: "USD",
      unit_amount: 5000,
    },
  });
  const [products, setProducts] = useState<ProductsProps[]>([]);
  const [prices, setPrices] = useState<{ [key: string]: number }>({});

  const createProduct = async () => {
    await fetch("http://localhost:4000/create-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: data }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      });
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
        setProducts(productsData);
      });
  };

  useEffect(() => {
    fetchAllProducts();
    fetchPrices();
  }, []);


  return (
    <MainContainer active="products">
      <div className="flex flex-col bg-white mt-4 mx-10">
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
                      Product Id
                    </th>
                    <th
                      scope="col"
                      className="pl-6 py-3 lg:text-[14px] text-[10px] font-bold text-left text-gray-500 uppercase "
                    >
                      Product Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 lg:text-[14px] text-[10px] font-bold text-left text-gray-500 uppercase "
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 lg:text-[14px] text-[10px] font-bold text-left text-gray-500 uppercase "
                    >
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((item) => (
                    <tr
                      key={item.id}
                      className="cursor-pointer hover:text-[#3A5743] transition-all duration-500 ease-in-out text-[#8D9091] hover:text-semibold hover:bg-neutral-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap lg:text-[14px] text-[12px]">
                        {item.id}
                      </td>
                      <td className="pr-6 py-4 whitespace-nowrap lg:text-[14px] text-[12px]">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 lg:text-[14px] text-[12px] font-medium text-left whitespace-nowrap">
                        {item.active ? "active" : "inactive"}
                      </td>
                      <td className="px-6 py-4 lg:text-[14px] text-[12px] font-medium text-left whitespace-nowrap">
                        {prices[item.default_price] ? `$${(prices[item.default_price] / 100).toFixed(2)}` : "not set"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default ProductsCatalogue;
