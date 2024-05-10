import MainContainer from "../../components/containers/MainContainer"
import Card from "../../components/defaults/Card"

const Dashboard = () => {
  return (
    <MainContainer active="dashboard">
        <div className="w-[100%] border border-red-500">
          <Card />
        </div>
    </MainContainer>
  )
}

export default Dashboard
