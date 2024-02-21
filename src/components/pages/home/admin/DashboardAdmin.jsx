import React, { useContext } from 'react'
import { Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../home.module.scss'
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
        <div className='d-flex justify-content-between bg-info my-3'>
            <Link to="dashboard" className="btn btn-info border border-dark">
                dashboardUser
            </Link>
            <Link to="showproducts" className="btn btn-info border border-dark">
                products
            </Link>
            
            <Link to="categories" className="btn btn-info border border-dark">
                CategoriesAction
            </Link>
        </div>
        <div className='d-flex justify-content-between w-100'>
            <Link to="addProduct">
                <Button className={styles.addButtons} variant="outline-info" size="lg">
                addProduct +
                </Button>
            </Link>
            <Link to="addcategory">
                <Button className={styles.addButtons} variant="outline-info" size="lg">
                    addcategory +
                </Button>
            </Link>
        </div>
    </div>
  );
}

export default DashboardAdmin
