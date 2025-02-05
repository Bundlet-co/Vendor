import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Missing from "./pages/Missing";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import AddCategory from "./pages/AddCategory";
import AddSubcategory from "./pages/AddSubcategory";
import Order from "./pages/Order";
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile";
import Persit from "./pages/Persit";
import RequiredAuth from "./pages/RequiredAuth";
import { MainProvider } from "./context/Maincontext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Verify from "./pages/Verify";
import Supplementry from "./pages/Supplementry";
import SingleOrder from "./pages/SingleOrder";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={
        <MainProvider>
          <Layout />
        </MainProvider> }>
        <Route path="login" element={ <Login /> } />
        <Route path="register" element={ <Signup /> } />
        <Route path="verify" element={<Verify/>}/>
        <Route element={ <Persit /> }>
          <Route element={ <RequiredAuth /> }>
            <Route index element={ <Home /> } />
            <Route path="product" element={ <ProductList /> } />
            <Route path="suplementry">
              <Route index element={<Supplementry/>}/>
            </Route>
            <Route path="add" element={ <AddProduct /> } />
            <Route path="category" element={ <AddCategory /> } />
            <Route path="sub-category" element={ <AddSubcategory /> } />
            <Route path="order">
              <Route index element={ <Order /> } />
              <Route path=":id" element={ <SingleOrder /> } />
            </Route>
            <Route path="profile" element={<Profile/>}/>
            <Route path="update" element={<UpdateProfile/>}/>
          </Route>
        </Route>
        
        {/* Missing Page */}
        <Route path="*" element={<Missing/>}/>
      </Route>
    </Routes>
  )
}

export default App