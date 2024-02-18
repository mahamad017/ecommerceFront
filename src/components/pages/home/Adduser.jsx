import React, { useContext, useState } from "react";
import { AppContext } from "../../layout/Layout";
import Api from "../../../tools/api";
import { Button, Form } from "react-bootstrap";

const Adduser = () => {
    const [state, setState] = useState({});
    const appContext = useContext(AppContext);

    const callAddProduct = async () => {
        // Ensure both password and passwordConfirmation fields are provided and match
        if (!state.password || !state.password_confirmation || state.password !== state.password_confirmation) {
            appContext.showPopup("Please enter and confirm the password correctly");
            return;
        }
        console.log("state"+state);
        try {
            const response = await Api.fetch({
                url: "create-user",
                body: state,
                method: "POST",
                showPopup: appContext.showPopup,
                token: localStorage.getItem("token"),
            });
            console.log(response);
            if (response != null) {
                appContext.showPopup(response.message);
            }
        } catch (error) {
            console.error(error);
            appContext.showPopup("An error occurred. Please try again later.");
        }
        //window.location.href = "/";
    };

    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="User Name"
                        onChange={(e) => {
                            setState({ ...state, name: e.target.value });
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>User Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        onChange={(e) => {
                            setState({ ...state, email: e.target.value });
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(e) => {
                            setState({ ...state, password: e.target.value });
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPasswordConfirmation">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        onChange={(e) => {
                            setState({ ...state, password_confirmation: e.target.value });
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
};

export default Adduser;
