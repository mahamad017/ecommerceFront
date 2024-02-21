import { Outlet } from "react-router-dom";
import AppBar from "./AppBar";
import Footer from "./Footer";
import styles from './layout.module.scss'
import { createContext, useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AuthContext } from "../MyApp";
import Api from "../../tools/api";


export const AppContext = createContext({})

export default function Layout() {
    const authContext = useContext(AuthContext)
   // const [request, setrequest] = useState("");
    let token =  localStorage.getItem('token');
    // const checkrequest = async () =>{
    //     const res = await Api.fetch({ url: "user", token });
    //         setrequest(res.role);
    // }
    const [appState, setAppState] = useState({
        popup: {
            show: false,
            message: '',
        },
        search: '',
       // request: '',
        category: null,
        user: null,
        token: null, // cookie
        cart: [] // cookie
    })
   // console.log("req"+request);
    //const setrequest = () => setAppState({ ...appState });
    const closePopup = () => setAppState({ ...appState, popup: { show: false } });
    const showPopup = (msg) => setAppState({ ...appState, popup: { message: msg, show: true } });
    const setSearch = (newText) => setAppState({ ...appState, search: newText })
    const setCategory = (newCategory) => setAppState({ ...appState, category: newCategory })
    const setCart = ({ id, qty }) => {
        const newCart = [...appState.cart]; // Deep copy the cart array
        newCart.push({ id, qty }); // Add the new product
        setAppState({ ...appState, cart: newCart });
    };
    const login = (token, user) => {
        authContext.setAuthState(true)
        setAppState({ ...appState, token, user })
    }
    const logout = () => {
        authContext.setAuthState(false)
        setAppState({ ...appState, token: null, user: null })
    }
    return (
        <AppContext.Provider
            value={{
                appState,
                setAppState,
                closePopup,
                showPopup,
                setSearch,
                setCategory,
                setCart,
                //setrequest,
                // setToken, setUser
                login,
                logout,
            }}
        >
            <div className={styles.layout}>
                <AppBar />
                <div className={styles.page}>
                    <Outlet />
                </div>
                <div className={styles.page}>                    
                </div>
                <Footer />
                <Modal show={appState.popup.show} onHide={closePopup}>
                    <Modal.Header closeButton>
                        <Modal.Title>Alert</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{appState.popup.message}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closePopup}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </AppContext.Provider>
    );
}