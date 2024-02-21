import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Layout, { AppContext } from "./layout/Layout";
import RegisterPage from "./pages/Register/Register";
import LoginPage from "./pages/login/Login";
import UserDetailsPage from "./pages/UserDetails";
import NoPage from "./pages/NoPage";
import MyOrdersPage from "./pages/orders/MyOrdersPage"
import { createContext, useState, useContext } from "react";
import AddProduct from "./pages/home/AddProduct";
import EditProduct from "./pages/home/EditProduct";
import Dashboard from "./pages/home/admin/Dashboard";
import CategoriesAction from "./pages/home/CategoriesAction";
import Addcategory from "./pages/home/addcategory";
import Cart from "./pages/home/Cart";
import Adduser from "./pages/home/admin/Adduser";
import DashboardAdmin from "./pages/home/admin/DashboardAdmin";
import AppBar from "./layout/AppBar";
import Product from "./pages/home/Product";

export const AuthContext = createContext(false)

export default function MyApp() {
    const [authState, setAuthState] = useState(false)
    const  appContext  = useContext(AppContext);
    const { cart, setCart } = AppContext;
    return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <AppContext.Provider value={{ cart, setCart }}>
                                {" "}
                                {}
                                <Layout />
                            </AppContext.Provider>
                        }
                    >
                        <Route index element={<Home />} />
                        {authState ? (
                            <>
                                <Route path="user" element={<UserDetailsPage />} />
                                <Route path="orders" element={<MyOrdersPage />} />
                                <Route path="DashboardAdmin/addProduct" element={<AddProduct />} />
                                <Route path="editProduct/:productId" element={<EditProduct />} />
                                <Route path="DashboardAdmin/dashboard" element={<Dashboard />} />
                                <Route path="DashboardAdmin/categories" element={<CategoriesAction />} />
                                <Route path="DashboardAdmin/addcategory" element={<Addcategory />} />
                                <Route path="cart" element={<Cart />} />
                                <Route path="DashboardAdmin/dashboard/adduser" element={<Adduser />} />
                                <Route path="DashboardAdmin" element={<DashboardAdmin />} />
                                <Route path="DashboardAdmin/showproducts" element={<Product />} />
                            </>
                        ) : (
                            <>
                                <Route path="register" element={<RegisterPage />} />
                                <Route path="login" element={<LoginPage />} />
                            </>
                        )}
                        <Route path="*" element={<NoPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}