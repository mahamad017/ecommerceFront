import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import styles from "./home.module.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../MyApp";
import Api from "../../../tools/api";
import { AppContext } from "../../layout/Layout";

function Product({ product }) {
    const { authState } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const [state, setState] = useState({});
    const appContext = useContext(AppContext);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const deleteProduct = async (id) => {
        try {
            const response = await Api.fetch({
            url: `deleteProduct/${id}`,
            body: state,
            method: "DELETE",
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
                        <Button variant="primary" onClick={handleShowModal}>
                            View
                        </Button>
                        { authState && (
                        <>
                            <Link to={`editProduct/${product.id}`}>
                                <Button variant="primary">Edit</Button>
                            </Link>
                            <Button variant="danger" onClick={ () => deleteProduct(product.id) }>Delete</Button>
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
        </>
    );
}

export default Product;
