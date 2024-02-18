import { useState, useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Api from "../../../tools/api";
import { AppContext } from "../../layout/Layout";
import Button from "react-bootstrap/Button";

export default function AddProduct() {
    const [state, setState] = useState({});
    const [categories, setCategories] = useState([]);
    const appContext = useContext(AppContext);

    const callAddProduct = async () => {
        if (
            state.name == null ||
            state.description == null 
        
        ) {
            appContext.showPopup("Please enter all element values");
            return;
        }
// todo : token from cookie
        try {
            const response = await Api.fetch({
                url: "add-categories",
                body: state,
                method: "POST",
                showPopup: appContext.showPopup,
                token:localStorage.getItem('token')
            });
            console.log(response);
            if (response != null) {
                appContext.showPopup(response.message);
            }
        } catch (error) {
            console.error(error);
            appContext.showPopup("An error occurred. Please try again later.");
        }
        window.location.href = "/";
    };


    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Product Name"
                        onChange={(e) => {
                            setState({ ...state, id: e.target.value });
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Product Name"
                        onChange={(e) => {
                            setState({ ...state, name: e.target.value });
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicDescription">
                    <Form.Label>Product Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Describe The Product"
                        onChange={(e) => {
                            setState({ ...state, description: e.target.value });
                        }}
                    />
                </Form.Group>

                <Button
                    onClick={(e) => {
                        callAddProduct();
                        e.preventDefault();
                    }}
                    variant="primary"
                    type="submit"
                >
                    Submit
                </Button>
            </Form>
        </>
    );
}
