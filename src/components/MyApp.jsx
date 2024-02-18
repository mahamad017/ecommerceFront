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
import Dashboard from "./pages/home/Dashboard";
import CategoriesAction from "./pages/home/CategoriesAction";
import Addcategory from "./pages/home/addcategory";
import Cart from "./pages/home/Cart";

export const AuthContext = createContext(false)

export default function MyApp() {
    const [authState, setAuthState] = useState(false)
    const  appContext  = useContext(AppContext);
    const { cart, setCart } = appContext
    return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                <AppContext.Provider value={{ cart, setCart }}> {}
                <Layout />
                </AppContext.Provider>
            }>
                <Route index element={<Home />} />
                        {authState ? (
                            <>
                                <Route path="user" element={<UserDetailsPage />} />
                                <Route path="orders" element={<MyOrdersPage />} />
                                <Route path="addProduct" element={<AddProduct />} />
                                <Route path="editProduct/:productId" element={<EditProduct />} />
                                <Route path="dashboard" element={<Dashboard />} />
                                <Route path="categories" element={<CategoriesAction />} />
                                <Route path="addcategory" element={ <Addcategory /> } />
                                <Route path="cart" element={ <Cart /> } />
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