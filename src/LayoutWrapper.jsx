import Toast from "./components/Toast";
import useMainContext from "./hooks/useMainContext";
import { Outlet } from "react-router-dom";

const LayoutWrapper = () =>
{
  const {show,message,status,closeToast} = useMainContext()
  return (
    <div className="flex flex-col h-screen">
      <div className="fixed w-full md:w-1/2 xl:w-1/5 z-40 bottom-4 left-4">
        <Toast status={ status } message={ message } show={show} onClose={closeToast} duration={3000}/>
      </div>
      <div className="h-full">
        <Outlet/>
      </div>
    </div>
  )
}

export default LayoutWrapper