import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Api from "../../../tools/api";
import { AppContext } from "../../layout/Layout";
import Button from "react-bootstrap/Button";
import { useCookies } from 'react-cookie';


export default function EditProduct() {
const [state, setState] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    category: ""
});
const [categories, setCategories] = useState([]);
const [product, setProduct] = useState({});
const appContext = useContext(AppContext);
const { productId } = useParams();
const [cookies] = useCookies(['token']);
const token = cookies.token;

const callEditProduct = async () => {
    console.log(state)
    if (
        state.name == null || state.name.length === 0 ||
        state.description == null || state.description.length === 0 ||
        state.image == null || state.image.length === 0 ||
        state.price == null || state.price.length === 0 ||
        state.category == null || state.category.length === 0
    ) {
    appContext.showPopup("Please enter all element values");
    return;
}

    try {
        const response = await Api.fetch({
        url: `editProduct/${productId}`,
        body: state,
        method: "PUT",
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

useEffect(() => {
    const getCategories = async () => {
    try {
        const response = await Api.fetch({ url: "categories" });

        if (response != null && Array.isArray(response.data)) {
        setCategories(response.data);
        }
    } catch (error) {
        console.error(error);
    }
    };
    getCategories();
}, []);

useEffect(() => {
    const getProduct = async () => {
    try {
        const response = await Api.fetch({ url: `showProduct/${productId}` });
        if (response != null && Array.isArray(response.data)) {
        setState(response.data[0]);
        }
    } catch (error) {
        console.error(error);
    }
    };
    getProduct();
}, []);

return (
    <>
    <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Product Name</Form.Label>
        <Form.Control
            type="text"
            placeholder="Product Name"
            value={state.name}
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
            value={state.description}
            onChange={(e) => {
            setState({ ...state, description: e.target.value });
            }}
        />
        </Form.Group>
        <>
        <img src={state.image} alt="" />
        </>
        <Form.Group className="mb-3" controlId="formBasicImage">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
            type="text"
            placeholder="Put Image Url"
            value={state.image}
            onChange={(e) => {
            setState({ ...state, image: e.target.value });
            }}
        />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
            type="number"
            placeholder="Product Price"
            value={state.price}
            onChange={(e) => {
            setState({ ...state, price: e.target.value });
            }}
        />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCategory">
        <Form.Label>Select Category</Form.Label>
        <Form.Control
            as="select"
            value={state.category}
            onChange={(e) => {
            setState({ ...state, category: e.target.value });
            }}
        >
            <option value="">Select a category</option>
            {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
                {cat.name}
            </option>
            ))}
        </Form.Control>
        </Form.Group>
        <Button
        onClick={(e) => {
            callEditProduct();
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