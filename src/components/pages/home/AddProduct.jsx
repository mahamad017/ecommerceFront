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
    url: "addProduct",
    body: state,
    method: "POST",
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

useEffect(() => {
getCategories();
}, []);

return (
<>
    <Form>
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
    <Form.Group className="mb-3" controlId="formBasicImage">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
        type="text"
        placeholder="Put Image Url"
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
        onChange={(e) => {
            setState({ ...state, price: e.target.value });
        }}
        />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicCategory">
        <Form.Label>Select Category</Form.Label>
        <Form.Control
            as="select"
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
    <Button onClick={(e) => {
            callAddProduct()
            e.preventDefault()
        }} variant="primary" type="submit">
        Submit
    </Button>
    </Form>
</>
);
}