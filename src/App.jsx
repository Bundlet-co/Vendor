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


const App = () => {
  return (
    <Routes>
      <Route path="/" element={ <Layout /> }>
        <Route index element={ <Home /> } />
        <Route path="product" element={ <ProductList /> } />
        <Route path="add" element={ <AddProduct /> } />
        <Route path="category" element={ <AddCategory /> } />
        <Route path="sub-category" element={ <AddSubcategory /> } />
        <Route path="order" element={ <Order /> } />
        <Route path="profile" element={<Profile/>}/>
        <Route path="update" element={<UpdateProfile/>}/>
        {/* Missing Page */}
        <Route path="*" element={<Missing/>}/>
      </Route>
    </Routes>
  )
}

export default App