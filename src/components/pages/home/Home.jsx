import { useContext, useEffect, useState } from "react";
import Categories from "./Categories";
import Product from "./Product";
import styles from "./home.module.scss";
import { AppContext } from "../../layout/Layout";
import Api from "../../../tools/api";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import CategoriesAction from "./CategoriesAction";


export default function Home() {
    const appContext = useContext(AppContext);
    const [categories, setCategories] = useState([]);
    const getCategories = async () => {
        const response = await Api.fetch({ url: "categories" });
        if (response != null) setCategories(response.data); 
    };


    useEffect(() => {
        if (categories.length === 0) getCategories();
    }, [appContext.appState.search, appContext.appState.category]);

    return (
        <div className={styles.home}>
            <Categories categories={ categories } />
            <Product  />
            <div className="d-flex justify-content-evenly mt-3">
                <Link to="addProduct" className="mx-auto">
                    <Button className={styles.addButtons} variant="outline-info" size="lg">addProduct +</Button>
                </Link>
                <Link to="addcategory" className="mx-auto">
                    <Button className={styles.addButtons} variant="outline-info" size="lg">addcategory +</Button>
                </Link>
            </div>


        </div>
    );
}
