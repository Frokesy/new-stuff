import MainContainer from "../../components/containers/MainContainer"
import Cards from "../../components/defaults/Cards"

const Dashboard = () => {
  return (
    <MainContainer active="dashboard">
        <div className="mx-10">
          <Cards />
        </div>
    </MainContainer>
  )
}

export default Dashboard
