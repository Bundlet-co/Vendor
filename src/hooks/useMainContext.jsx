import { useContext } from "react";
import MainContext from "../context/Maincontext";


const useMainContext = () => {
  return useContext(MainContext)
}

export default useMainContext