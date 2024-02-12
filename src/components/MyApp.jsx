import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/Home";
import Layout from "./layout/Layout";
import RegisterPage from "./pages/Register/Register";
import LoginPage from "./pages/login/Login";
import UserDetailsPage from "./pages/UserDetails";
import NoPage from "./pages/NoPage";
import MyOrdersPage from "./pages/orders/MyOrdersPage"
import { createContext, useState } from "react";
import AddProduct from "./pages/home/AddProduct";

export const AuthContext = createContext(false)

export default function MyApp() {
    const [authState, setAuthState] = useState(false)

    return <AuthContext.Provider value={{ authState, setAuthState }}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Layout /> }>
                    <Route index element={<HomePage />} />
                    {
                        authState ?
                            <>
                                <Route path="user" element={<UserDetailsPage />} />
                                <Route path="orders" element={ <MyOrdersPage /> } />
                                <Route path="addProduct" element={ <AddProduct /> }/>
                            </>
                            :
                            <>
                                <Route path="register" element={<RegisterPage />} />
                                <Route path="login" element={<LoginPage />} />
                            </>
                    }
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </AuthContext.Provider>
}