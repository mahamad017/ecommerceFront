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
          <Link to="dashboard" className="nav-link">
              dashboardUser
          </Link>
          <Link to="showproducts" className="nav-link">
              products
          </Link>
          <Link to="addProduct" className="nav-link">
              addProduct +
          </Link>
          <Link to="categories" className="nav-link">
              CategoriesAction
          </Link>
          <Link to="addcategory" className="mx-auto">
              <Button className={styles.addButtons} variant="outline-info" size="lg">
                  addcategory +
              </Button>
          </Link>
          <Link onClick={onLogout} className="nav-link mt-1">
              Logout
          </Link>
      </div>
  );
}

export default DashboardAdmin
