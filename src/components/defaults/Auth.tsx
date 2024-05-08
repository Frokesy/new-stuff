const Auth = () => {
  return (
    <div className="flex justify-between lg:w-[80vw] w-[90vw] h-[100vh] mx-auto items-center">
      <div className="lg:w-[55%] lg:block hidden">
        <img src="/assets/fruits.png" alt="heroimg" />
      </div>
      <div className="lg:w-[45%] w-[100%] lg:border-none border border-[#ccc] rounded-lg lg:pt-[25vh] py-[15vh] lg:h-[100%]">
        <div className="flex flex-col items-center">
          <h2 className="lg:text-[26px] text-[24px] font-semibold">Rehobothz Admin</h2>
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
              className="outline-none border border-[#ccc] w-[100%] rounded-lg py-2 px-3"
            />
          </div>
          <div className="flex flex-col space-y-2 w-[100%]">
            <label htmlFor="password" className="font-semibold">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="outline-none border border-[#ccc] w-[100%] rounded-lg py-2 px-3"
            />
          </div>
          <div className="flex justify-end">
            <button className="bg-[#19483a] text-[#fff] text-[14px] h-[40px] w-[110px] rounded-lg font-semibold px-8 py-1.5">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
