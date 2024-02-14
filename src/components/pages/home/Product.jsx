import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import styles from "./home.module.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../MyApp";

function Product({ product }) {
    const { authState } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

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
                        {authState && (
                            <Link to={`editProduct/${product.id}`}>
                                <Button variant="primary">Edit Product</Button>
                            </Link>
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
