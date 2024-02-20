import { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import styles from "./home.module.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../MyApp";
import Api from "../../../tools/api";
import { AppContext } from "../../layout/Layout";
import { useCookies } from "react-cookie";
import { Cursor, Eye, Trash } from "react-bootstrap-icons";
import { Add, Edit } from "@mui/icons-material";

function Product() {
    const { authState } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const appContext = useContext(AppContext);
    const [cookies] = useCookies(["token"]);
    const token = cookies.token;
    const [cart, setCart] = useState([]);
    const [totalCartBalance, setTotalCartBalance] = useState(0);
    const [products, setProducts] = useState([]);
    const [showProduct, setShowProducts] = useState({ name: "", description: "", price: 0 });

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const handleSetCart = (id, name, qty, price) => {
        const newCartContent = [...cart, { id, name, qty, price }];
        setCart(newCartContent);
        setTotalCartBalance(totalCartBalance + price);
    };
    const handelRemoveCartProdact = (id, price) => {
        let temp;
        const indexToRemove = cart.findIndex((item) => item.id === id);
        indexToRemove !== -1 ? (temp = [...cart.slice(0, indexToRemove), ...cart.slice(indexToRemove + 1)]) : (temp = cart);
        setCart(temp);
        setTotalCartBalance(totalCartBalance - price);
    };
    const deleteProduct = async (id) => {
        try {
            const response = await Api.fetch({
                url: `deleteProduct/${id}`,
                method: "DELETE",
                token: token,
                showPopup: appContext.showPopup,
            });
            console.log(response);
            if (response != null) {
                appContext.showPopup(response.message);
            }
        } catch (error) {
            console.error(error);
            appContext.showPopup("An error occurred. Please try again later.");
        }
    };

    const getProducts = async () => {
        let params;
        if (appContext.appState.search != null) {
            params = { name: appContext.appState.search };
        }
        if (appContext.appState.category != null) {
            params = { ...params, category: appContext.appState.category };
        }
        const response = await Api.fetch({
            url: "products",
            params: params,
        });

        if (response != null) {
            const productsRes = [];
            if (response.data != null) {
                for (const keyIndex in response.data) {
                    productsRes.push(response.data[keyIndex]);
                }
            }
            setProducts(productsRes);
        }
    };
    const callorder = async () => {
        try {
            const response = await Api.fetch({
                url: "addorders",
                method: "POST",
                Body:cart,
                token: token,
                showPopup: appContext.showPopup,
            });
            console.log(response)
    if (response != null) {
    appContext.showPopup(response.message);
    }
} catch (error) {
    console.error(error);
    appContext.showPopup("An error occurred. Please try again later.");
    }
   
};
    

    useEffect(() => {
        getProducts();
     
    }, []);

    return (
        // card div
        <>
            {products == null || products.length == 0 ? (
                <h1>No Product has been found!</h1>
            ) : (
                <div className={styles.products}>
                    {products.map((product) => (
                        <Card className={styles.product}>
                            <Card.Img className={styles.image} variant="top" src={product.image} />
                            <Card.Body>
                                <Card.Title className="mb-5">{product.name}</Card.Title>
                                <div className="d-flex justify-content-between">
                                    <div
                                        className={styles.icons}
                                        variant="primary"
                                        onClick={() => {
                                            handleShowModal();
                                            setShowProducts(product);
                                        }}
                                    >
                                        <div className={styles.icons} variant="primary">
                                            <Eye size={15} />
                                        </div>
                                    </div>
                                    {authState && (
                                        <>
                                            <Link to={`editProduct/${product.id}`}>
                                                <div className={styles.icons} variant="primary">
                                                    <Edit size={15} />
                                                </div>
                                            </Link>
                                            <div className={styles.icons} variant="danger" onClick={() => deleteProduct(product.id)}>
                                                <Trash color="red" size={15} />
                                            </div>
                                            <div className={styles.icons} variant="primary" onClick={() => handleSetCart(product.id, product.name, 1, product.price)}>
                                                <Add size={15} />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            )}

            {/* <div className={styles.product}></div> */}

            {cart.length === 0 ? (
                " "
            ) : (
                <>
                    <div className={styles.cartContainer}>
                        {cart.map((item) => (
                            <div className={styles.dataContainer} key={item.id}>
                                <div className={styles.name}>{item.name}</div>
                                <div className={styles.qty}>{item.qty}</div>
                                <div className={styles.qty}>{item.price}</div>
                                <div
                                    onClick={() => {
                                        handelRemoveCartProdact(item.id, item.price);
                                    }}
                                >
                                    {/* Render trash icon */}
                                    <Trash color="red" size={15} />
                                </div>
                            </div>
                         
                        ))}
                        <div className={styles.totalPrice}>Total Price: {totalCartBalance} </div>
                        <Button
                            variant="primary"
                            onClick={() => {
                                callorder();
                            }}
                        >
                            submit
                        </Button>
                    </div>
                </>
            )}

            {/* model div */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{showProduct.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={showProduct.image} alt={showProduct.name} className="img-fluid mb-2" />
                    <p>{showProduct.description}</p>
                    <p style={{ fontWeight: "bold" }}>Price: {showProduct.price}$</p>
                    <p>{showProduct.description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Product;
