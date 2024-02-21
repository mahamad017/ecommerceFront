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
            
            if (response != null) {
                appContext.showPopup(response.message);
            }
        } catch (error) {
            console.error(error);
            appContext.showPopup("An error occurred. Please try again later.");
        }
        //window.location.href = "/DashboardAdmin";
    };


    return (
        <>
            <Form className="border border-3 border-info rounded p-4 mt-3 bg-warning-subtle">
                <Form.Group className="mb-3 d-flex justify-content-between align-items-baseline" controlId="formBasicName">
                    <Form.Label className="me-2 text-nowrap w-75">category Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="category Name"
                        onChange={(e) => {
                            setState({ ...state, name: e.target.value });
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3 d-flex justify-content-between align-items-baseline" controlId="formBasicDescription">
                    <Form.Label className="me-2 text-nowrap w-75">Product Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Describe The category"
                        onChange={(e) => {
                            setState({ ...state, description: e.target.value });
                        }}
                    />
                </Form.Group>
                <div className="d-flex justify-content-center">
                    <Button onClick={(e) => {
                            callAddProduct()
                            e.preventDefault()
                        }} variant="info" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </>
    );
}
