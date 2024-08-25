import { BsPersonVcard } from "react-icons/bs";
import Analysis from "../components/Home/Analysis";
import Chart from "../components/Home/Chart";
import TopProduct from "../components/Home/TopProduct";
import RecentOrder from "../components/Home/RecentOrder";
import { FaDollarSign, FaShoppingBag } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";


const Home = () => {
  return (
    <div className="p-4 w-full h-full overflow-y-auto">
      <p className="font-extrabold text-xl capitalize text-primary">Dashboard</p>

      {/* Analyitic Cards */ }
      <div className="grid grid-cols-4 gap-4 my-8">
        <Analysis title="Customers" amount={ 5000 } change={ 20 } changeType="up" iconColor="danger" Icon={ <BsPersonVcard size={22} className="text-danger" /> } />
        <Analysis title="Order" amount={ 10000 } change={ 5 } changeType="down" iconColor="primary" Icon={ <FaShoppingBag size={22} className="text-primary" /> } />
        <Analysis title="Revenue" amount={ 3000 } change={ 2 } changeType="up" iconColor="success" Icon={ <FaDollarSign size={22} className="text-success" /> } />
        <Analysis title="Expenses" amount={10000} change={50} changeType="up" iconColor="warning" Icon={<FaSackDollar size={22} className="text-warning"/>}/>
      </div>
      {/* Chart */}
      <Chart />
      {/* Top Product and recent orders */ }
      <div className="grid grid-cols-2 gap-4 my-8">
        <div className="col-span-full xl:col-span-1">
          <TopProduct />
        </div>
        <div className="col-span-full xl:col-span-1">
          <RecentOrder/>
        </div>
      </div>
    </div>
  )
}

export default Home