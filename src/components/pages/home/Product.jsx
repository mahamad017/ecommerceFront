import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import styles from "./home.module.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../MyApp";
import Api from "../../../tools/api";
import { AppContext } from "../../layout/Layout";
import { useCookies } from 'react-cookie';
import { Eye, Trash } from "react-bootstrap-icons";
import { Add, Edit } from "@mui/icons-material";


function Product({ product }) {
    const { authState } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const appContext = useContext(AppContext);
    const [cookies] = useCookies(['token']);
    const token = cookies.token;
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const [cart,setCart] = useState([{}])
    const [totalCartBalance, setTotalCartBalance] = useState(0);
    
    const handleSetCart = (id, name, qty,price) => {
              const newCartContent = [...cart, { id, name, qty,price }];
              setCart(newCartContent);
              setTotalCartBalance(totalCartBalance + price);
    }
    const handelRemoveCartProdact = (id ,price) => {

       let temp;
       const indexToRemove = cart.findIndex((item) => item.id === id);
       (indexToRemove !== -1) ? temp = [...cart.slice(0, indexToRemove), ...cart.slice(indexToRemove + 1)] :temp = cart; 
        setCart(temp)
        setTotalCartBalance(totalCartBalance - price);

    }
    const deleteProduct = async (id) => {
        try {
            const response = await Api.fetch({
            url: `deleteProduct/${id}`,
            method: "DELETE",
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
        window.location.href = '/'
    };
    
    return (
        <>
            <Card className={styles.product}>
                <Card.Img className={styles.image} variant="top" src={product.image} />
                <Card.Body>
                    <Card.Title className="mb-5">{product.name}</Card.Title>
                    <div className="d-flex justify-content-between">
                        <div className={styles.icons} variant="primary" onClick={handleShowModal}>
                            <Eye size={15} />
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
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{product.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={product.image} alt={product.name} className="img-fluid mb-2" />
                    <p>{product.description}</p>
                    <p style={{ fontWeight: "bold" }}>Price: {product.price}$</p>
                    <p>{product.description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className={styles.product}></div>
            <div className={styles.cartContainer}>
                <>
                    {!cart ? (
                        ""
                    ) : (
                        <>
                            {cart.map((item) => (
                                <div className={styles.dataContainer} key={item.id}>
                                    <div className={styles.name}>{item.name}</div>
                                    <div className={styles.qty}>{item.qty}</div>
                                    <div className={styles.qty}>{item.price}</div>

                                    <div
                                        onClick={() => {
                                            handelRemoveCartProdact(product.id, product.price);
                                        }}
                                    >
                                        <Trash color="red" size={15} />
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </>
                <div className={styles.totalPrice}>Total Price: {totalCartBalance} </div>
            </div>
        </>
    );
}

export default Product;
