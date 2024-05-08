import { useState } from "react";
import Loader from "./Loader";
import { supabase } from "../../../utils/supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Auth = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const validateField = (value: string) => {
    if (value === "") {
      return false;
    } else {
      return true;
    }
  };

  const isUsernameValid = validateField(data.username);
  const isPasswordValid = validateField(data.password);

  const handleLogin = async () => {
    setLoading(true);
    setError({
      username: isUsernameValid ? "" : "Field is required",
      password: isPasswordValid ? "" : "Field is required",
    });

    if (isUsernameValid && isPasswordValid) {
      try {
        const { data: admin, error } = await supabase.from("admin").select("*");

        console.log(error);
        if (!error) {
          setLoading(false);
          const user = admin?.find(
            (admin) =>
              admin.username === data.username &&
              admin.password === data.password
          );
          if (user) {
            toast.success("Login successful", {
              position: "top-center",
              theme: "light",
              autoClose: 2000,
              hideProgressBar: true,
              draggable: true,
            });
            setTimeout(() => {
              window.location.href = "/home";
            }, 2000);
          } else {
            toast.error("Invalid username or password", {
              position: "top-center",
              theme: "light",
              autoClose: 2000,
              hideProgressBar: true,
              draggable: true,
            });
          }
        }
      } catch (error) {
        toast.error(error as string, {
          position: "top-center",
          theme: "light",
          autoClose: 2000,
          hideProgressBar: true,
          draggable: true,
        });
        setLoading(false);
      }
    } else {
      setLoading(false);
      if (!isUsernameValid) {
        setTimeout(() => {
          setError((prevState) => ({ ...prevState, username: "" }));
        }, 3000);
      }
      if (!isPasswordValid) {
        setTimeout(() => {
          setError((prevState) => ({ ...prevState, password: "" }));
        }, 3000);
      }
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="flex justify-between lg:w-[80vw] w-[90vw] h-[100vh] mx-auto items-center">
        <div className="lg:w-[55%] lg:block hidden">
          <img src="/assets/fruits.png" alt="heroimg" />
        </div>
        <div className="lg:w-[45%] w-[100%] lg:border-none border border-[#ccc] rounded-lg lg:pt-[25vh] py-[15vh] lg:h-[100%]">
          <div className="flex flex-col items-center">
            <h2 className="lg:text-[26px] text-[24px] font-semibold">
              Rehobothz Admin
            </h2>
            <p className="text-[#808080] font-semibold lg:text-[16px] text-[14px]">
              Welcome back Admin, please proceed to login.
            </p>
          </div>
          <div className="field-input lg:mx-20 mx-6 mt-10 flex flex-col space-y-6">
            <div className="flex flex-col space-y-2 w-[100%]">
              <label htmlFor="username" className="font-semibold">
                Username:
              </label>
              <input
                type="text"
                id="username"
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
                className={`outline-none border border-[#ccc] w-[100%] rounded-lg py-2 px-3 ${
                  error.username && "border-red-500"
                }`}
              />
              <span className="text-red-500 text-[14px] italic">
                {error.username}
              </span>
            </div>
            <div className="flex flex-col space-y-2 w-[100%]">
              <label htmlFor="password" className="font-semibold">
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className={`outline-none border border-[#ccc] transition-all duration-300 ease-in-out w-[100%] rounded-lg py-2 px-3 ${
                  error.password && "border-red-500"
                }`}
              />
              <span className="text-red-500 text-[14px] italic">
                {error.password}
              </span>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleLogin}
                className="bg-[#19483a] text-[#fff] text-[14px] h-[40px] w-[110px] rounded-lg font-semibold px-8 py-1.5"
              >
                {loading ? <Loader /> : "Login"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
