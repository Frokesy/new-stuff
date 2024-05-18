import MainContainer from "../../components/containers/MainContainer";
import Cards from "../../components/defaults/Cards";
import Graph from "../../components/defaults/Chart";
import PieChart from "../../components/defaults/PieChart";

const Dashboard = () => {
  return (
    <MainContainer active="dashboard">
      <div className="mx-10 pt-14">
        <Cards />

        <div className="flex justify-between mt-10">
          <div className="w-[50%]">
            <Graph />
          </div>
          <div className="w-[45%]"><PieChart /></div>
        </div>
      </div>
    </MainContainer>
  );
};

export default Dashboard;
