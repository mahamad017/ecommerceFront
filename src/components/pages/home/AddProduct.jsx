import { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Api from '../../../tools/api';
import { AppContext } from '../../layout/Layout';
import Button from 'react-bootstrap/Button';
export default function AddProduct() {
    const [state, setState] = useState({});
    const appContext = useContext(AppContext)

    const callAddProduct = async () => {
        if ((state.product == null || state.product.length === 0) ||
            (state.description == null || state.description.length === 0) ||
            (state.image == null || state.image.length === 0) ||
            (state.price == null || state.price.length === 0)
        ) {
            appContext.showPopup('enter all elements values please');
        }
        console.log(state)
        const response = await Api.fetch({
            url: 'products',
            body: state,
            method: 'POST',
            showPopup: appContext.showPopup,
        })
        console.log(response)
        if (response != null) {
            // show message
            appContext.showPopup(response.message);

        }
    }

return <>
    <Form>
        <Form.Group className="mb-3" controlId="fromBasicName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control type="text" placeholder="Product Name"
                onChange={(e) => {
                    setState({ ...state, name: e.target.value })
                }}
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="fromBasicDescription">
            <Form.Label>Product Description</Form.Label>
            <Form.Control type="text" placeholder="Describe The Product"
                onChange={(e) => {
                    setState({ ...state, description: e.target.value })
                }}
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="fromBasicImage">
            <Form.Label>Image URL</Form.Label>
            <Form.Control type="text" placeholder="Put Image Url"
                onChange={(e) => {
                    setState({ ...state, image: e.target.value })
                }}
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="fromBasicPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" placeholder="Product Price"
                onChange={(e) => {
                    setState({ ...state, price: e.target.value })
                }}
                
            />
            </Form.Group>
            <Button onClick={(e) => {
                    callAddProduct()
                    e.preventDefault()
                }} variant="primary" type="submit">
                    Submit
            </Button>
    </Form>
    </>;
    }