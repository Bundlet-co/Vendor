import axios from "axios";

//export const dev_url = "http://localhost:3500/merchant"
export const dev_url = "https://bundlet-server.vercel.app/merchant"

export default axios.create( {
      baseURL: dev_url,
      withCredentials:true
} );


export const axiosPrivate = axios.create({
      baseURL: dev_url,
      withCredentials:true
})
