import MainContainer from "../../components/containers/MainContainer";
import Cards from "../../components/defaults/Cards";
import Graph from "../../components/defaults/Chart";

const Dashboard = () => {
  return (
    <MainContainer active="dashboard">
      <div className="mx-10">
        <Cards />

        <div className="w-[50%] mt-10">
          <Graph />
        </div>
      </div>
    </MainContainer>
  );
};

export default Dashboard;
