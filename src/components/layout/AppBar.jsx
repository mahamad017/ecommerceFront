import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "./layout.module.scss";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./Layout";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import Api from "../../tools/api";
import Loading from "../shared/Loading";
import { Badge } from "react-bootstrap";
import DashboardAdmin from "../pages/home/admin/DashboardAdmin";

function AppBar() {
    const [cookie, setCookie] = useCookies("token");
    const [statistics, setStatistics] = useState([]);
    const appContext = useContext(AppContext);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [request, setrequest] = useState("");
    let token;

    const checkLogin = async () => {
        token = appContext.appState.token != null ? appContext.appState.token : cookie?.token;
        if (token == null || token == "") return;

        setLoading(true);

        const res = await Api.fetch({ url: "user", token });

        if (res != null && res.email != null) {
            appContext.login(token, res);
            setrequest(res.role);
        } else {
            appContext.logout();
            setCookie("token", null);
        }
        setLoading(false);
    };
    useEffect(() => {
        checkLogin();
        getStatistics();
    }, []);

    const onLogout = async () => {
        setCookie("token", null);

        token = appContext.appState.token != null ? appContext.appState.token : cookie?.token;
        if (token == null) return;

        await Api.fetch({ method: "PUT", url: "logout", token });

        appContext.logout();

        window.location.href = "/login";
    };
    const getStatistics = async () => {
        // call API
        const response = await Api.fetch({
            url: "statistics",
        });

        // check response
        if (response != null) setStatistics(response.data); // update state with recevied categories
    };

    return (
        <Navbar bg="info" data-bs-theme="light" expand="lg" className={styles.appbar + " " + "fw-bold"}>
            <Container fluid>
                <Link to="/" className="navbar-brand">
                    My Store
                </Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0 d-flex align-items-baseline" style={{ maxHeight: "100px" }} navbarScroll>
                        {loading ? (
                            <Loading />
                        ) : (
                            <>
                                {appContext.appState.user == null ? (
                                    <>
                                        <Link to="register" className="nav-link">
                                            Register
                                        </Link>
                                        <Link to="login" className="nav-link">
                                            Login
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        {request === "admin" ? (
                                            <>

                                                {/* <Link to="dashboard" className="nav-link">
                                                Users <Badge bg="secondary m-2">{statistics["user"]}</Badge>
                                            </Link> */}
                                                <Link to="DashboardAdmin" className="nav-link m-2">
                                                    Dashboard
                                                </Link>
                                            </>
                                        ) : (
                                            <>
                                                <Link to="orders" className="nav-link">
                                                    My Orders <Badge bg="secondary m-2">0{statistics["order"]}</Badge>
                                                </Link>
                                            </>
                                        )}
<<<<<<< HEAD
                                                <Link onClick={onLogout} className="nav-link mt-1 ">
                                                    Logout
                                                </Link>
=======
>>>>>>> edf98466e6bd6cf0b32ed0a498b3e154b206f08c
                                                <Link to="user" className="nav-link mt-1">
                                                    My Details
                                                </Link>
                                    </>
                                )}
                            </>
                        )}
                    </Nav>

                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                        />
                        <Button
                            onClick={(e) => {
                                appContext.setSearch(search);
                            }}
                            className="mx-1"
                            variant="outline-light"
                        >
                            Search
                        </Button>
                    </Form>
                    <Link onClick={onLogout} className="nav-link mt-1 border border-black rounded p-1">
                        Logout
                    </Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default AppBar;
