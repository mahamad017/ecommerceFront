import React, { useContext } from 'react'
import { Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './dashboard.module.scss'
import { useCookies } from 'react-cookie';
import { AppContext } from '../../../layout/Layout';
import Api from '../../../../tools/api';


const DashboardAdmin = () => {
    const [cookie, setCookie] = useCookies("token");
    const appContext = useContext(AppContext);
    let token;
    const onLogout = async () => {
        setCookie("token", null);

        token = appContext.appState.token != null ? appContext.appState.token : cookie?.token;
        if (token == null) return;

        await Api.fetch({ method: "PUT", url: "logout", token });

        appContext.logout();

        window.location.href = "/login";
    };
return (
    <div>
        <div className="position-fixed top-10 start-0 d-flex flex-column justify-content-between  my-3 rounded" style={{ height: "300px" }}>
            <Link to="dashboard" className="btn btn-info border text-light">
                dashboardUser
            </Link>
            <Link to="showproducts" className="btn btn-info border text-light">
                products
            </Link>

            <Link to="categories" className="btn btn-info border text-light">
                Categories
            </Link>
            <Link to="addProduct" className="btn btn-info border text-light">
                add product +
            </Link>
            <Link to="addcategory" className="btn btn-info border text-light">
                add category +
            </Link>
        </div>
    </div>
);
}

export default DashboardAdmin
