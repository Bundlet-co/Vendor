import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Toast from "./components/Toast";
import useMainContext from "./hooks/useMainContext";


const Layout = () =>
{
  const {show,message,status,closeToast} = useMainContext()
  return (
    <div className="flex flex-col h-screen">
      <div className="fixed w-full md:w-1/2 xl:w-1/5 z-40 bottom-4 left-4">
        <Toast status={ status } message={ message } show={show} onClose={closeToast} duration={3000}/>
      </div>
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
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Layout;
