import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";



const Layout = () =>
{
  
  return (
    <div className="flex flex-col h-screen">
      
      {/* Header */ }
      <div className="bg-neutral-300 fixed w-full z-30 top-0">
        <Header/>
      </div>
      <div className="flex flex-grow pt-16 h-screen">
        {/* Sidebar */ }
        <div className="bg-neutral-300 h-full overflow-y-auto w-1/4 xl:w-1/5">
          <Sidebar/>
        </div>
        {/* MainContent */ }
        <div className="flex flex-grow border h-full overflow-y-auto w-3/4">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout;
